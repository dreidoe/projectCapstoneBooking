import { Schema, model } from "mongoose";

export default model(
  "Merchant",
  new Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true},
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [15, "Username must be at most 20 characters long"],
    },
    email: {type: String, required: true},
    password: {type: String, required: [true, "Password is required"],
    minLength:[12, "Password must be at least 12 characters long"],
    },

    avatar: { type: String, required: false },
    id: { type: String, required: true },
  })
);

export client  model(
  "Client",
  new Schema({
    fullName: { type: String, required: true },
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [15, "Username must be at most 20 characters long"],
    },

    avatar: { type: String, required: false },
    id: { type: String, required: true },
  })
);