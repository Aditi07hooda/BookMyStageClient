import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { EventSubmission } from "../submission/submission.model";
import { User } from "../user/user.model";
import { Request, Response } from "express";
import { log } from "console";
import { type } from "os";
import { ideahub } from "googleapis/build/src/apis/ideahub";
// File paths
const templatePath = path.join(__dirname, "..", "..", "..", "..", "public", "pdf", "CertificateTest.pdf"); // PDF template
const outputDir = path.join(__dirname, "..", "..", "..", "..", "generated_certificates"); // Output folder

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

async function getEvaluatedSubmissions() {
    try {
        const evaluatedSubmissions = await EventSubmission.find(
            { evaluated: true },
            "_id eventname eventUserId userEmail"
        );

        const userEmails = evaluatedSubmissions.map(submission => submission.userEmail);
        const users = await User.find({ email: { $in: userEmails } }, "name email");

        const userMap: Record<string, string> = {};
        users.forEach(user => userMap[user.email] = user.name);

        return evaluatedSubmissions.map(submission => ({
            eventId: submission._id,
            eventuserId: submission.eventUserId,
            eventName: submission.eventname,
            userEmail: submission.userEmail,
            userName: userMap[submission.userEmail] || "Unknown",
        }));
    } catch (error) {
        console.error("Error fetching evaluated submissions:", error);
        throw error;
    }
}
export async function CertificateGenerate(req: Request, res: Response) {
    try {
        const submissions = await getEvaluatedSubmissions();

        if (!fs.existsSync(templatePath)) {
            console.error("Certificate template not found!");
            return res.status(404).json({ error: "Certificate template not found!" });
        }

        let result: string[] = [];

        for (const submission of submissions) {
            const { eventId, eventuserId, userName, eventName } = submission;

            // Create a safe folder name (replace spaces & special characters)
            const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9_-]/g, "_");
            const folderName = `${sanitizedEventName}_${eventuserId}`;
            const folderPath = path.join(outputDir, folderName);

            // Ensure event-specific folder exists
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            // Load the PDF template
            const templateBytes = fs.readFileSync(templatePath);
            const pdfDoc = await PDFDocument.load(templateBytes);
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
            // Get the first page
            const page = pdfDoc.getPages()[0];


            // Draw text on the certificate
            page.drawText(userName, { x: 200, y: 1000, size: 60, font: timesRomanFont, color: rgb(0, 0, 0) });
            page.drawText(eventName, { x: 200, y: 750, size: 45, font: timesRomanFont, color: rgb(0, 0, 0) });

            // Generate certificate filename
            const certificateFilename = `certificate_${userName.replace(/\s+/g, "_")}_${eventId}.pdf`;
            const outputFilePath = path.join(folderPath, certificateFilename);
            const relativePath = path.relative(outputDir, outputFilePath); // Save relative path

            // Save the modified PDF
            const modifiedPdfBytes = await pdfDoc.save();
            fs.writeFileSync(outputFilePath, modifiedPdfBytes);

            console.log(`Certificate generated: ${outputFilePath}`);
            result.push(relativePath);

            // ✅ Update EventSubmission with certificate file path
            await EventSubmission.findByIdAndUpdate(eventId, { certificatePath: relativePath });
        }

        console.log("All certificates generated and updated successfully!");
        return res.status(200).json({ message: "Certificates generated successfully", data: result });

    } catch (error) {
        console.error("Error generating certificates:", error);
        return res.status(500).json({ error: "Error generating certificates" });
    }
}


export async function getCertificates(req: Request, res: Response) {
    try {
        const email = req.params.email as string; 
        console.log("User Email:", email);

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const eventSubmissions = await EventSubmission.find({ userEmail: email, certificatePath: { $ne: "" } });

        if (!eventSubmissions.length) {
            return res.status(200).json({ message: "No certificates found for the specified email" });
        }

        const certificates = eventSubmissions.map(submission => {
            const filePath = submission.certificatePath;
            console.log("Checking File:", filePath);
            
            if (!filePath) {
                console.log("❌ Skipping: File path is undefined or null");
                return null;
            }
        const fullpath = outputDir+"/"+filePath
            if (!fs.existsSync(fullpath)) {
                console.log("❌ File does not exist:", fullpath);
                return null;
            }
        
            console.log("✅ File found:", fullpath);
            const fileBuffer = fs.readFileSync(fullpath);
            const base64Data = fileBuffer.toString("base64");
        
            return {
                eventid:submission.id,
                eventName: submission.eventname,
                eventimg: submission. eventimg,
                certificate: `data:application/pdf;base64,${base64Data}`
            };
        }).filter(cert => cert !== null);
        
        res.status(200).json({ certificates });

    } catch (error) {
        console.error("Error fetching certificates:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
} 
