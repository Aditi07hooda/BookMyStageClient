import express from 'express';
import { setEligibleEvents, getAllEventsReviewForOneEvaluator } from './evaluators.controller';

const evaluatorRoutes = express.Router();

evaluatorRoutes.post("/set-eligible-events", setEligibleEvents);
evaluatorRoutes.get("/get-reviewed-events/:evaluatorEmailId", getAllEventsReviewForOneEvaluator);

export default evaluatorRoutes;