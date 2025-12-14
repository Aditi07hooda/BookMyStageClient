
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { google } from "googleapis";
import { Request, Response } from "express";


const TOKEN_PATH = path.join(__dirname, "../../../../token.json");
const VIDEO_DIRECTORY = path.join(__dirname, "../../../../youtube_ready");

// Function to get OAuth2 authentication
async function getAuth() {
  const credentials = JSON.parse(fs.readFileSync("client_secret.json", "utf8"));
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
  auth.setCredentials(token);
  return auth;
}

// Function to upload video
async function uploadVideo(filePath: string, title: string, description: string, tags:string[], youtube: any) {
  try {
    console.log(`Uploading: ${title}...`);

    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: title,
          description: description,
          tags: tags,
          categoryId: "22" 
        },
        status: {
          privacyStatus: "public",
          selfDeclaredMadeForKids: false,
        }
      },
      media: {
        body: fs.createReadStream(filePath)
      }
    });

    const videoId = response.data.id;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(`Uploaded: ${title} - Video URL: ${videoUrl}`);

    return videoUrl;
  } catch (error) {
    console.error(`Error uploading ${title}:`, error);
  }
}

// Function to traverse directories and upload videos
export async function uploadAllVideos(req: Request, res: Response) {
  try {
    const auth = await getAuth();
    const youtube = google.youtube({ version: "v3", auth });

    const subfolders = fs.readdirSync(VIDEO_DIRECTORY);

    for (const subfolder of subfolders) {
      const subfolderPath = path.join(VIDEO_DIRECTORY, subfolder);
      if (!fs.lstatSync(subfolderPath).isDirectory()) continue;

      const files = fs.readdirSync(subfolderPath);
      for (const file of files) {
        if (!file.endsWith(".mp4")) continue;

        const filePath = path.join(subfolderPath, file);
        const title = `${path.basename(file, path.extname(file))} | ${subfolder} | BookMyStage`; // Video name without extension
        const description = `${title} - ${subfolder}`; // Title and subfolder as description
        const tags = [title, subfolder, "video", "upload"];
        await uploadVideo(filePath, title, description, tags, youtube);
      }
    }

    res.json({ message: "All videos uploaded successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to upload videos" });
  }
}




// Function to format date & time in a readable format
const getReadableTimestamp = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return now.toLocaleString("en-GB", options).replace(",", "");
};

export const runAppendScript = async (req: Request, res: Response) => {
  const logFilePath = path.join(__dirname, "append_log.txt");

  exec("bash append.sh", (error, stdout, stderr) => {
    const timestamp = getReadableTimestamp();
    let logMessage = `[${timestamp}] Script executed:\n`;

    if (error) {
      logMessage += `Error: ${error.message}\n`;
      console.error(logMessage);
      fs.appendFileSync(logFilePath, logMessage + "\n");
      return res.status(500).json({ message: "Execution failed", error: error.message });
    }

    if (stderr) {
      logMessage += `Warnings: ${stderr}\n`;
      console.warn(`Script stderr: ${stderr}`);
    }

    logMessage += `Output:\n${stdout}\n`;
    console.log(logMessage);

    // Append log to file
    fs.appendFileSync(logFilePath, logMessage + "\n");

    res.status(200).json({ message: "Script executed successfully", log: stdout || stderr });
  });
};



