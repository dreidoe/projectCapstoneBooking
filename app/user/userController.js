import mongoose from "mongoose";
import config from "../config";
import User from "./User.js";
mongoose.set("strictQuery", false);

// Connect to the database
mongoose
  .connect(config.dbConn)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

const userController = {
  // Get all users
  getAllUsers() {
    return User.find({});
  },
  show(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return User.findById(id);
    }

    // Wrap the error in a rejected promise so that it can be CAUGHT.
    return Promise.reject(new Error("Invalid ID"));
  },
};

export default userController;
