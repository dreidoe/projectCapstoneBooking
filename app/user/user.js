import mongoose, { Schema, model } from "mongoose";
// Schema for the users
const requestServicesSchema = new Schema({
  merchant: { type: Schema.Types.ObjectId, ref: "Merchant" },
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const availabilitySchema = new Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const request = new Schema({
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  merchant: { type: Schema.Types.ObjectId, ref: "Merchant" },
});

const appointments = new Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  merchant: { type: Schema.Types.ObjectId, ref: "Merchant" },
});

export default model(
  "User",
  new Schema({
    _id: mongoose.Schema.types.ObjectId,
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    DOB: { type: Date, required: true },
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [20, "Username cannot exceed 20 characters"],
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
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
    appointments: [appointments],
    requests: [request],
    availability: [availabilitySchema],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],

    avatar: { type: String, required: false, default: "images/profilePic.png" },
  })
);

const mainModel = mongoose.model("User", userSchema);
