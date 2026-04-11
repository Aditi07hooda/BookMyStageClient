import express from 'express';
import { generateCertificate, getEvaluationReport } from './pdf-generation.controller';

const pdfGenerationRoutes = express.Router();

pdfGenerationRoutes.post("/generate-certificate", generateCertificate);
pdfGenerationRoutes.post("/generate-evaluation-report", getEvaluationReport);
export default pdfGenerationRoutes;