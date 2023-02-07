import initServer from "../server.js";
import initDb from "../db.js";
import User from "./User.js";
import mongoose from "mongoose";

initDb();
initServer();

const userController = {
  // GET all users
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

  // CREATE a new User
  createUser(merchant) {
    return User.create(merchant);
  },
  // Show a Merchant by username
  showByUserName(username) {
    return User.findOne({ username });
  },
  // UPDATE a Merchant
  updateByUserName(username, updatedMerchant) {
    return username.updateOne({
      username,
      updatedMerchant,
      returnDocument: "after",
      returnValidators: true,
    });
  },
  // DELETE a Merchant by ID
  deleteById(id2Delete) {
    if (mongoose.Types.ObjectId.isValid(id2Delete)) {
      return User.findByIdAndDelete(id2Delete);
    }
    return Promise.reject(new Error("Invalid ID"));
  },
  // DELETE a Merchant by username
  deleteByUserName(username) {
    return User.findOneAndDelete({ username });
  },

  // create a method to view all request by users from merchants

  viewAllRequests() {
    return User.find({}).select("requests");
  },

  // crete a method to view all requests by a specific user from username

  viewRequestsByUserName(username) {
    return username.findOne(username).select("+requests");
    if (username) {
      username.requests = [];
    }
    return username.save();
  },

  // create a method to view all appointments by username

  viewAppointmentsByUserName(username) {
    return username.findOne(username).select("+appointments");
    if (username) {
      username.appointments = [];
    }
  },

  // create a method to push a request to the appointment array

  pushRequestToAppointment(username, request) {
    return username.findOne(username).select("+appointments");
    if (username) {
      username.appointments.push(request);
      return username.save();
    }
  },

  // create a method to delete a unapproved request from the request array

  deleteRequestFromRequest(username, request) {
    return username.findOne(username).select("+requests");
    if (username) {
      username.requests = username.requests.filter(
        (req) => req._id !== request._id
      );
      return username.save();
    }
  },

  // create a method to delete a approved request from the appointment array

  deleteRequestFromAppointment(username, request) {
    return username.findOne(username).select("+appointments");
    if (username) {
      username.appointments = username.appointments.filter(
        (req) => req._id !== request._id
      );
      return username.save();
    }
  },

  // create a method to get all users by username

  getUsersByUserName(username) {
    return username.findOne(username).select("+users");
    if (username) {
      username.users = [];
    }
  },
  // login a user
  async login(username, password) {
    const loggedInUser = await User.login(username, password);
    return loggedInUser;
  },
};

export default merchantController;
