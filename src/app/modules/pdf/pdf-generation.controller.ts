import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { EventSubmission } from "../submission/submission.model";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateCertificate = async (req: Request, res: Response) => {
  try {
    const { eventName, competititorName, date } = req.body;

    if (!eventName || !competititorName || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const certificateExist = await checkCertificateExistence(
      eventName,
      competititorName,
      date
    );

    if (certificateExist.check) {
      return res.status(200).json({
        message: "Certificate already exists for the given details",
        certificateUrl: certificateExist.certificatePath,
      });
    }

    // Load template PDF
    const templatePath = path.join(
      __dirname,
      "./public/certificate-template.pdf"
    );
    const templateBytes = fs.readFileSync(templatePath);

    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];

    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // ---------------------- Write Text ---------------------- //

    // 1. Event name (big red text)
    page.drawText(competititorName, {
      x: 350,
      y: 290,
      size: 32,
      font: boldFont,
      color: rgb(0.65, 0, 0),
    });

    page.drawText(eventName, {
      x: 474,
      y: 228,
      size: 18,
      font: normalFont,
      color: rgb(0, 0, 0),
    });

    // 3. Date line
    page.drawText(date, {
      x: 612,
      y: 198,
      size: 18,
      font: normalFont,
      color: rgb(0, 0, 0),
    });

    // ------------------------------------------------------- //

    // Create PDF buffer
    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    const uploadToCloudinary = (): Promise<any> =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            type: "upload",
            folder: "certificates",
            public_id: `${eventName.replace(/\s+/g, "_")}_${uuid()}`,
            format: "pdf",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(pdfBuffer);
      });

    const result = await uploadToCloudinary();

    // upload to db
    await EventSubmission.findOneAndUpdate(
      {
        eventname: eventName,
        userEmail: competititorName,
        submissionDate: date,
      },
      {
        certificatePath: result.secure_url,
      }
    );

    return res.status(200).json({
      message: "Certificate generated successfully",
      certificateUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    return res.status(500).json({
      message: "Internal server error while generating certificate",
    });
  }
};

const checkCertificateExistence = async (
  eventName: string,
  competitorName: string,
  date: string
) => {
  // Implement logic to check if a certificate already exists
  const check = await EventSubmission.findOne({
    eventname: eventName,
    userEmail: competitorName,
    submissionDate: date,
    certificatePath: { $exists: true, $ne: null },
  });

  if (check != null && check?.certificatePath != "") {
    return {
      check: true,
      certificatePath: check?.certificatePath,
    };
  }
  return { check: false, certificatePath: null };
};
