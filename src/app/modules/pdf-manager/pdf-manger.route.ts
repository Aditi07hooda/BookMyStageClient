import express from "express";
import { CertificateGenerate, getCertificates } from "./pdf-manger.controller";
const PDFManagerRoute = express.Router();


PDFManagerRoute.get("/generate-certificate", CertificateGenerate);
PDFManagerRoute.get("/user-certificates/:email", getCertificates);


export default PDFManagerRoute;
