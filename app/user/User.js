import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { model, Schema } from "mongoose";
import { appointmentSchema } from "../appointment/Appointment.js";
import { availabilitySchema } from "../availability/Availability.js";
import config from "../config.js";
import { requestServicesSchema } from "../request/Request.js";
import { serviceSchema } from "../service/service-offered.js";

export const userSchema = new Schema({
  userType: {
    type: String,

    enum: ["user", "merchant"],
  },
  name: { type: String },
  // lastName: { type: String, required: true, trim: true, toLowerCase: true },
  DOB: { type: Date },
  username: { toLowerCase: true, type: String, trim: true },
  email: { type: String },
  password: { type: String, trim: true },

  phone: { type: Number },

  // TODO: 'businessName' should be unique
  // TODO: 'businessName' should be required IF 'userType' is 'merchant'
  businessName: { type: String },
  services: [serviceSchema],
  appointments: [appointmentSchema],
  requests: [requestServicesSchema],
  availability: [availabilitySchema],
  // TODO: Consider specifying a 'userType' field to differentiate between users and merchants (enum: ['user', 'merchant'])
});

userSchema.pre("save", async function (next) {
  // * Only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    const generatedSalt = await bcrypt.genSalt(config.saltRounds);
    this.password = await bcrypt.hash(this.password, generatedSalt);
  }

  next();
});

userSchema.statics.login = async function (username, password) {
  // * Find the merchant by username (case insensitive)
  const user = await this.findOne({ username });

  let isMatch = false;
  // * If there is a user, compare the password
  if (user) {
    isMatch = await bcrypt.compare(password, user.password);
  }

  return isMatch
    ? jwt.sign(
        {
          user: {
            id: user._id,
            username: user.username,
          },
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      )
    : null;
};

export default model("Merchant", userSchema);
