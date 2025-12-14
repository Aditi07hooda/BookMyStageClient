import { Request, Response } from "express";
import { EvaluatorEligibleEvent } from "./evaluatorEligibleEvent.model";
import { EventSubmission } from "../submission/submission.model";

export const setEligibleEvents = async (req: Request, res: Response) => {
  try {
    const { userId, eligibleEventsFromUser } = req.body;
    const isUserPresent = await EvaluatorEligibleEvent.findOne({
      userId: userId,
    });

    if (isUserPresent && eligibleEventsFromUser.length > 0) {
      isUserPresent.eligibleEvents = [
        ...new Set([
          ...isUserPresent.eligibleEvents,
          ...eligibleEventsFromUser,
        ]),
      ];

      try {
        await isUserPresent.save();
        return res
          .status(200)
          .json({ message: "Eligible events set successfully" });
      } catch (error) {
        console.error("Error saving new evaluator:", error);
        return res.status(500).json({
          message: "Internal server error while saving new evaluator",
        });
      }
    }

    const newEvaluator = new EvaluatorEligibleEvent({
      userId: userId,
      eligibleEvents: eligibleEventsFromUser,
    });

    try {
      await newEvaluator.save();
      return res
        .status(200)
        .json({ message: "Eligible events set successfully" });
    } catch (error) {
      console.error("Error saving new evaluator:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while saving new evaluator" });
    }
  } catch (error) {
    console.error("Error setting eligible events:", error);
    return res.status(500).json({
      message: "Internal server error while handling setEligibleEvents request",
    });
  }
};

export const getAllEventsReviewForOneEvaluator = async (
  req: Request,
  res: Response
) => {
  try {
    const evaluatorEmailId = req.params.evaluatorEmailId;

    const reviewedEvents = await EventSubmission.find({
      evaluatedBy: evaluatorEmailId,
      evaluated: true,
    });

    if (reviewedEvents.length == 0) {
      return res.status(200).json({
        message: "No reviewed events found for you!!",
      });
    }

    return res.status(200).json({
      message: "Reviewed events fetched successfully",
      data: reviewedEvents,
    });
  } catch (error) {
    console.error("Error getting reviewed events for the evaluator:", error);
    return res.status(500).json({
      message:
        "Error getting reviewed events for you due to some internal server error!!",
    });
  }
};
