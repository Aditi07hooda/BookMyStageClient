import { IUser } from "../user/user.interface";

export interface IEvaluatorEligibleEvent {
  userId: IUser;
  eligibleEvents: string[];
}