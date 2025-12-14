import express from "express";
import {
  clientSubmissionInfo,
  clientSubmissionInfoForOne,
  EvaluationSubmission,
  EventSubmissionFunc,
  eventVideoUpload,
} from "./submission.controller";
import multer from "multer";

const SubmissionRoute = express.Router();

// Use simple disk destination (files go into /uploads)
const upload = multer({ dest: "uploads/" });

const uploadMemory = multer({ storage: multer.memoryStorage() });

SubmissionRoute.post("/event", upload.array("files[0]"), EventSubmissionFunc);
SubmissionRoute.get("/list", clientSubmissionInfo);
SubmissionRoute.get("/list/:id", clientSubmissionInfoForOne);
SubmissionRoute.post("/submit-evaluation", EvaluationSubmission);

// ⬇⬇ Important change here
SubmissionRoute.post("/video-upload", uploadMemory.single("video"), eventVideoUpload);

export default SubmissionRoute;