import mongoose from "mongoose";
import config from "../config.js";

mongoose
.connect(config.dbConn)
.then(() => {
  console.info("Connected to the database");
})
.catch((err) => {
  console.error("Error connecting to the database", err.message);
});

// create a method to add a update merchant by username

updateMerchantByUserName(username, updatedMerchant) {
  return Merchant.updateOne({
    username,
    updatedMerchant,
    returnDocument: "after",
    returnValidators: true,
  });
},