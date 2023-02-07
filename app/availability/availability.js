import { Schema } from "mongoose";
import { userSchema } from "../user/User.js";

export const availabilitySchema = new Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});
