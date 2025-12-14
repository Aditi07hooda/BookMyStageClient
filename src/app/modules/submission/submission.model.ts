import { model, Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Importing the uuid package to generate unique IDs
import { EventSubmissionDataType, evaluationCriteria } from "./submission.interface";

// Define the Mongoose schema for EventSubmission
const EventSubmissionSchema = new Schema<EventSubmissionDataType>({
  id: {
    type: String,
    default: uuidv4, // Ensure uuidv4 generates a new UUID dynamically
    unique: true,
  },
  eventUserId: {
    type: String,
    required: true,
    index: true,
  },
  eventname: {
    type: String,
    required: true,
  },
  eventimg: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  videoPath: {
    type: String,
    required: false,
  },
  videoUrl: {
    type: String,
    required: false,
  },
  videoThumbnail: {
    type: String,
    required: false,
  },
  certificatePath: {
    type: String,
    required: false,
  },
  feedbackReportPath: {
    type: String,
    required: false,
  },
  youtube: {
    type: Boolean,
    default: false,
  },
  evaluation: {
    type: [
      {
        criterion: { type: String, enum: evaluationCriteria, required: true },
        score: { type: Number, required: true, min: 0, max: 10 },
        feedback: { type: String },
      },
    ],
    default: () => evaluationCriteria.map((criterion) => ({
      criterion,
      score: 0,
      feedback: "",
    })), // Ensure proper default array handling
  },
  evaluated: {
    type: Boolean,
    default: false,
  },
  aggregateRating: {
    type: Number,
    default: 0,
  },
  evaluatedBy: {
    type: String,
    required: false,
  },
  videoPublicId: {
    type: String,
    required: false,
  }
});

// Export the models
export const EventSubmission = model<EventSubmissionDataType>("EventSubmission", EventSubmissionSchema);
