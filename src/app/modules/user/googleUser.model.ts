import { model, Schema } from "mongoose";
import { IGoogleUser } from "./googleUser.interface";

const googleUserSchema = new Schema<IGoogleUser>({
    googleId: {
        type: String,
        required: true,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: false,
        default: "Username",
        trim: true,
    }
});

export const GoogleUser = model("GoogleUser", googleUserSchema);