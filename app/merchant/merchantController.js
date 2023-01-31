import mongoose from "mongoose";
import config from "../config.js";
import Merchant from "./Merchant.js";
mongoose.set("strictQuery", false);

mongoose
  .connect(config.dbConn)
  .then(() => {
    console.info("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err.message);
  });

const merchantController = {
  // GET all Merchants
  getAllMerchants() {
    return Merchant.find({});
  },
  show(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return Merchant.findById(id);
    }

    // Wrap the error in a rejected promise so that it can be CAUGHT.
    return Promise.reject(new Error("Invalid ID"));
  },

  // CREATE a new Merchant
  createMerchant(merchant) {
    return Merchant.create(merchant);
  },
  // Show a Merchant by username
  showByUserName(username) {
    return Merchant.findOne({ username });
  },
  // UPDATE a Merchant
  updateByUserName(username, updatedMerchant) {
    return Merchant.updateOne({
      username,
      updatedMerchant,
      returnDocument: "after",
      returnValidators: true,
    });
  },
  // DELETE a Merchant
  deleteById(id2Delete) {
    if (mongoose.Types.ObjectId.isValid(id2Delete)) {
      return Merchant.findByIdAndDelete(id2Delete);
    }
    return Promise.reject(new Error("Invalid ID"));
  },
  // DELETE a Merchant by username
  deleteByUserName(username) {
    return Merchant.findOneAndDelete({ username });
  },

  // create a method to view all request by users from merchants

  viewAllRequests() {
    return Merchant.find({}).select("requests");
  },
};

export default merchantController;
