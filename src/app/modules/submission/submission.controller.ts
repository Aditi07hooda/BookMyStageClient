import crypto from "crypto"; // To encrypt file names
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { EventSubmission } from "./submission.model";
import {
  sendCertificateReadyEmail,
  sendEvaluationDoneEmail,
  sendSubmissionEmail,
} from "../email/email.controller";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { User } from "../user/user.model";
import { AgeCategory } from "./submission.interface";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const EventSubmissionFunc = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const eventId = req.body.eventId;
    const eventName = req.body.eventName;
    const files = req.files as Express.Multer.File[];

    // Validate request data
    if (!eventId || !eventName || !files || files.length === 0) {
      console.error("Invalid request: Missing eventId, eventName, or files");
      return res
        .status(400)
        .json({
          message: "Invalid request: eventId, eventName, or files missing",
        });
    }

    // Check if event with eventId exists in the database
    const eventSubmission = await EventSubmission.findOne({ id: eventId });

    if (!eventSubmission) {
      console.error(`Event with ID ${eventId} not found`);
      return res.status(404).json({ message: "Event not found" });
    }

    // Define the base directory for storing files
    const uploadBaseDir = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Base directory for storing files
    const eventDir = path.join(uploadBaseDir, eventName); // Directory for the specific event

    // Check if directory exists; if not, create it
    if (!fs.existsSync(eventDir)) {
      console.log(`Directory not found. Creating directory: ${eventDir}`);
      fs.mkdirSync(eventDir, { recursive: true });
    }

    // Move and encrypt file names for each uploaded file
    for (const file of files) {
      const existingFilePath = path.join(eventDir, file.originalname);
      const destPath = path.join(
        eventDir,
        `${eventId}${file.mimetype.includes("video") ? ".mp4" : ".pdf"}`
      ); // New file path
      // If the file exists, remove the existing file
      if (fs.existsSync(existingFilePath)) {
        console.log(`Removing existing file: ${existingFilePath}`);
        fs.unlinkSync(existingFilePath);
      }

      fs.renameSync(file.path, destPath); // Move file to the new destination
      console.log(`File saved to: ${destPath}`);

      // Update the video path in the database with the relative path
      try {
        // Store relative path in the database
        const relativePath = path
          .relative(uploadBaseDir, destPath)
          .replace(/\\/g, "/"); // Get relative path
        eventSubmission.videoPath = relativePath; // Store relative path in the database

        // Save the updated event submission with the new video path
        await eventSubmission.save();
        console.log("Database updated with video path:", relativePath);

        // await sendSubmissionEmail()
      } catch (dbError) {
        console.error("Error updating database:", dbError);
        return res
          .status(500)
          .json({ message: "Failed to update database with video path" });
      }
    }

    res
      .status(200)
      .json({ message: "Files uploaded and database updated successfully" });
  } catch (error) {
    // Handle unknown error type safely
    if (error instanceof Error) {
      console.error("Error in EventSubmissionFunc:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    } else {
      console.error("Unknown Error in EventSubmissionFunc:", error);
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const clientSubmissionInfo = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    const products = await EventSubmission.find({ userEmail: email });

    if (products.length === 0) {
      return res.status(200).send({ message: "No products found", data: [] });
    }

    res.status(200).send({ message: "success", data: products });
  } catch (e) {
    console.error("Error fetching client submissions:", e);
    // Only send an error response once.
    if (!res.headersSent) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
};

export const clientSubmissionInfoForOne = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await EventSubmission.find({ eventUserId: req.params.id });

    res.status(200).send({
      data: product,
    });
  } catch (e) {
    console.error("Error fetching client submission for one:", e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const EvaluationSubmission = async (req: Request, res: Response) => {
  try {
    const { evaluatorEmailId, contestantId, criteria } = req.body;
    if (!contestantId || !criteria || typeof criteria !== "object") {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Define valid criteria keys
    const validCriteriaKeys = [
      "Criteria-1",
      "Criteria-2",
      "Criteria-3",
      "Criteria-4",
      "Criteria-5",
    ];

    // Validate and transform criteria into an array format
    const evaluationArray = validCriteriaKeys.map((key) => {
      if (
        !criteria[key] ||
        typeof criteria[key].rating !== "number" ||
        typeof criteria[key].feedback !== "string"
      ) {
        return null; // Invalid entry
      }
      return {
        criterion: key,
        score: criteria[key].rating, // Ensure naming consistency
        feedback: criteria[key].feedback,
      };
    });

    if (evaluationArray.includes(null)) {
      return res
        .status(400)
        .json({ message: "Invalid evaluation criteria format" });
    }

    // calculate aggregateRating
    const totalScore = evaluationArray.reduce(
      (sum, evalItem) => sum + evalItem?.score,
      0
    );
    const aggregateRating = totalScore / evaluationArray.length;

    // Store evaluation in the database
    const updatedSubmission = await EventSubmission.findOneAndUpdate(
      { id: contestantId },
      {
        $set: {
          evaluation: evaluationArray,
          evaluated: true,
          aggregateRating: aggregateRating,
          evaluatedBy: evaluatorEmailId,
        },
      },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const data = await EventSubmission.findOne({ id: contestantId });
    const buyerEmail = data?.userEmail || "";
    const name = await User.findOne({ email: buyerEmail }).then(
      (user) => user?.name || "Participant"
    );
    const productName = data?.eventname || "";

    await sendEvaluationDoneEmail(
      buyerEmail,
      name,
      productName,
      process.env.FRONTEND_URL + "/dashboard"
    );

    await sendCertificateReadyEmail(
      buyerEmail,
      name,
      productName,
      process.env.FRONTEND_URL + "/dashboard"
    );

    return res
      .status(200)
      .json({
        message: "Evaluation submitted successfully",
        data: updatedSubmission,
      });
  } catch (error) {
    console.error("Error submitting evaluation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const eventVideoUpload = async (req: Request, res: Response) => {
  const { eventName, email, submissionId } = req.body;

  if (!eventName || !email) {
    return res
      .status(400)
      .json({ message: "eventName and email are required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Video file is required" });
  }

  const fileBuffer = req.file.buffer;

  // same naming you used in frontend
  const publicId = `${email}_EventVideo_${eventName}`;
  const folder = "eventUploadedVideos";

  // helper to upload from buffer using upload_stream
  const uploadToCloudinary = (buffer: Buffer) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder,
          public_id: publicId,
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }
          resolve(result);
        }
      );

      stream.end(buffer);
    });
  };

  let uploadResult: UploadApiResponse | null = null;

  try {
    // 1. Upload to Cloudinary
    uploadResult = await uploadToCloudinary(fileBuffer);
    const videoUrl = uploadResult.secure_url;

    // 2. Find submission
    const submissionQuery: any = {
      eventname: eventName,
      userEmail: email,
    };

    const submission = await EventSubmission.findOne(submissionQuery);

    if (!submission) {
      // rollback: delete video from Cloudinary
      await cloudinary.uploader.destroy(uploadResult.public_id, {
        resource_type: "video",
      });

      return res.status(404).json({ message: "Submission not found" });
    }

    // 3. Update submission with video URL (and store public_id for future deletes)
    submission.videoPath = videoUrl;
    submission.videoPublicId = uploadResult.public_id; // add this field in your schema

    await submission.save().catch(async (err: unknown) => {
      // rollback Cloudinary if DB save fails
      await cloudinary.uploader.destroy(uploadResult!.public_id, {
        resource_type: "video",
      });
      throw err;
    });

    const userName = await User.findOne({ email: email }).then(
      (user) => user?.name || "Participant"
    );

    await sendSubmissionEmail(
      email,
      userName,
      eventName,
      process.env.FRONTEND_URL + "/dashboard"
    );

    return res.status(200).json({
      message: "Video uploaded & URL updated successfully",
      data: submission,
    });
  } catch (error) {
    console.error("Error in eventVideoUpload:", error);

    // Extra safety: if upload succeeded but we crashed later, try cleanup
    if (uploadResult?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadResult.public_id, {
          resource_type: "video",
        });
      } catch (cleanupErr) {
        console.error("Failed to cleanup Cloudinary video:", cleanupErr);
      }
    }

    return res.status(500).json({
      message: "Server error while uploading video",
      error: (error as Error).message,
    });
  }
};
