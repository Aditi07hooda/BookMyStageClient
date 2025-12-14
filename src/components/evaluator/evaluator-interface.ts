export interface Score {
  score: number;
  feedback: string;
}

export interface Contestant {
  _id: string;
  eventUserId: string;
  eventimg: string;
  eventname: string;
  userEmail: string;
  videoPath: string;
  videoUrl: string;
  videoThumbnail: string;
  certificatePath: string;
  feedbackReportPath: string;
  id: string;
  evaluation: EventEvaluation[];
  aggregateRating: number;
  evaluatedBy: string[];
  submissionDate: string;
  evaluated: boolean;
}

export interface EventEvaluation {
  criterion: string;
  score: number;
  feedback: string;
}

export interface CriteriaRating {
  rating: number;
  feedback: string;
}

export interface Rating {
  contestantId: string;
  criteria: { [key: string]: CriteriaRating };
  submitted?: boolean;
  averageRating?: number;
}

export interface ApiResponse {
  success: boolean;
  contestants: Contestant[];
  total: number;
}

export interface User {
  [x: string]: any;
  _id: string;
  name: string;
  email: string;
  role: string;
  date: string;
  phone: string;
  photo: string;
  gender: string;
  evaluator?: boolean;
  eligibleEvents?: string[];
}
