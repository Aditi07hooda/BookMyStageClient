export const evaluationCriteria = ["Criteria-1", "Criteria-2", "Criteria-3", "Criteria-4", "Criteria-5"] as const;
// Define the TypeScript interface for evaluation scores
export interface Evaluation {
  criterion: (typeof evaluationCriteria)[number]; // Only accepts predefined criteria
  score: number;
  feedback: string;
}

// Define the TypeScript interface for the EventSubmission model
export interface EventSubmissionDataType extends Document {
  id: string;
  eventUserId: string;
  eventname: string;
  eventimg: string;
  submissionDate: string;
  userEmail: string;
  videoPath?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  certificatePath?: string;
  feedbackReportPath?: string;
  youtube: boolean;
  evaluated:boolean;
  evaluation: Evaluation[];
  aggregateRating: number;
  evaluatedBy?: string;
  videoPublicId?: string;
}