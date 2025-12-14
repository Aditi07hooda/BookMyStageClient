import express from 'express';
import { generateCertificate } from './pdf-generation.controller';

const pdfGenerationRoutes = express.Router();

pdfGenerationRoutes.post("/generate-certificate", generateCertificate);

export default pdfGenerationRoutes;