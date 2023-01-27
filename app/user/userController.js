import mongoose from "mongoose";
import config from "../merchant/config";
import User from "./user.js";
mongoose.set(strictQuery, false);

// Connect to the database
mongoose
  .connect(config.dbConn)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
