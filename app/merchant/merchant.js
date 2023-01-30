import { Schema, model } from "mongoose";

export default model(
  "Merchant"
  new  Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
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
    minLength: [
      12,
      "Password must be at least 12 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
    ].regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/),
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  avatar: { type: String, required: false, default: "images/profilePic.png" },

});
);


