import fs from "fs";
import path from "path";
import { google } from "googleapis";

const TOKEN_PATH = path.join(__dirname, "token.json");

export function getOAuthClient() {
    const credentials = JSON.parse(fs.readFileSync("client_secret.json", "utf8"));
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
}

export function getAuthToken(callback: (auth: any) => void) {
    const oAuth2Client = getOAuthClient();

    if (fs.existsSync(TOKEN_PATH)) {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
        oAuth2Client.setCredentials(token);
        callback(oAuth2Client);
    } else {
        getNewToken(oAuth2Client, callback);
    }
}

function getNewToken(oAuth2Client: any, callback: (auth: any) => void) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/youtube.upload"],
    });

    console.log(`Authorize this app by visiting this URL: ${authUrl}`);

    oAuth2Client.getToken("AUTHORIZATION_CODE", (err: any, token: any) => {
        if (err) {
            console.error("Error retrieving access token", err);
            return;
        }

        // Store the token
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
        console.log("Token stored to", TOKEN_PATH);
        oAuth2Client.setCredentials(token);
        callback(oAuth2Client);
    });
}
