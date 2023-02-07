import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";
import config from "../config.js";
import { servicesOfferedSchema } from "./services-offered-schema.js";
import { appointmentsSchema } from "./appointments-schema.js";
import { requestServicesSchema } from "./request-services-schema.js";

const merchantSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  DOB: { type: Date, required: true },
  userName: {
    type: String,
    trim: true,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
    minLength: [3, "Username must be at least 3 characters long"],
    maxLength: [20, "Username cannot exceed 20 characters"],
  },
  email: { type: String, required: true, unique: true, trim: true },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minLength: [12, "Password must be at least 12 characters long"],
    phone: "615-555-5551",
    validate: {
      validator: function (password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(
          password
        );
      },
      message:
        "Password must be at least 12 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  },
  businessName: { type: String, required: true, trim: true },
  services: [servicesOfferedSchema],
  appointments: [appointmentsSchema],
  requests: [requestServicesSchema],
});

merchantSchema.pre("save", async function (next) {
  // * Only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    const generatedSalt = await bcrypt.genSalt(config.saltRounds);
    this.password = await bcrypt.hash(this.password, generatedSalt);
  }

  next();
});

merchantSchema.statics.login = async function (username, password) {
  // * Find the merchant by username (case insensitive)
  const merchant = await this.findOne({ username });

  let isMatch = false;
  // * If there is a user, compare the password
  if (merchant) {
    isMatch = await bcrypt.compare(password, merchant.password);
  }

  return isMatch
    ? jwt.sign(
        {
          user: {
            id: merchant._id,
            username: merchant.username,
          },
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      )
    : null;
};

export default model("Merchant", merchantSchema);
