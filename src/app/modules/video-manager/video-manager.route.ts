import express from "express";
import { getAuthToken } from "../../../utils/auth";
import fs from 'fs';
import { runAppendScript, uploadAllVideos } from "./video-manager.controller";

const VideoManagerRoute = express.Router();


VideoManagerRoute.get("/merge", runAppendScript);
VideoManagerRoute.get("/upload", uploadAllVideos);

// import { getOAuthClient } from "../../../utils/auth";

// VideoManagerRoute.get("/authorize", (req, res) => {
//     const oAuth2Client = getOAuthClient();
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: "offline",
//         scope: ["https://www.googleapis.com/auth/youtube.upload"],
//     });

//     res.redirect(authUrl);
// });

// VideoManagerRoute.get("/oauth2callback", async (req, res) => {
//     const code = req.query.code as string;

//     if (!code) {
//         return res.status(400).json({ error: "Missing authorization code" });
//     }

//     const oAuth2Client = getOAuthClient();

//     try {
//         const { tokens } = await oAuth2Client.getToken(code);
//         oAuth2Client.setCredentials(tokens);

//         // Store the token
//         fs.writeFileSync("token.json", JSON.stringify(tokens));

//         res.json({ message: "Authentication successful!", tokens });
//     } catch (error) {
//         console.error("Error retrieving access token", error);
//         res.status(500).json({ error: "Failed to retrieve access token" });
//     }
// });


export default VideoManagerRoute;
