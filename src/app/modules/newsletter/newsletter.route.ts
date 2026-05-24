// newsletter.route.ts

import express from "express";
import { subscribeNewsletter } from "./newsletter.controller";

const NewsLetterRoute = express.Router();

NewsLetterRoute.post("/subscribe", subscribeNewsletter);

export default NewsLetterRoute;