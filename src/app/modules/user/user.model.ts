import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { EvaluatorEligibleEvent } from "../evaluators/evaluatorEligibleEvent.model";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  evaluator: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  pincode: {
    type: String,
    trim: true,
  },
});

// pre-deleteOne hook: before deleting user what will happen - on deleting user, delete associated evaluator eligible events also get deleted if the user is an evaluator
userSchema.pre("deleteOne", async function (next) {
  const user = await this.model.findOne(this.getFilter()).exec();
  if (user) {
    await EvaluatorEligibleEvent.deleteOne({ userId: user._id });
  }
  next(); // proceed to delete user in users collection
});

export const User = model("User", userSchema);
