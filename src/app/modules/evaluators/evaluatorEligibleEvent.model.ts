import { model, Schema } from "mongoose";
import { IEvaluatorEligibleEvent } from "./evaluator.interface";
import { User } from "../user/user.model";

const evaluatorEligibleEventSchema = new Schema<IEvaluatorEligibleEvent>({
  userId: {
    type: Schema.ObjectId,
    ref: "users",
    required: true,
  },
  eligibleEvents: {
    type: [String],
    required: true,
  },
});

// Pre-save hook: validate user existence before saving
evaluatorEligibleEventSchema.pre("save", async function (next) {
  try {
    const user = await User.findById(this.userId);
    if (!user) {
      const err = new Error("User not found");
      return next(err);
    }
    next(); // proceed to save in evaluator eligible events collection
  } catch (error: any) {
    next(error);
  }
});

export const EvaluatorEligibleEvent = model(
  "EvaluatorEligibleEvent",
  evaluatorEligibleEventSchema
);
