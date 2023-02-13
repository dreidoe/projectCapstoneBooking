import { Router } from "express";
import mongoose from "mongoose";
import userController from "./userController.js";

const router = new Router();

// http://localhost:3000/user
router.get("/", (_, res) => {
  res.send("Hello from the user router");
});

// http://localhost:3000/user/create
router.post("/create", async (req, res) => {
  const user = await userController.createUser(req.body);

  res.json(user);
});

// TODO: create a route to login
router.post("/login", async (req, res) => {
  if (req.user) {
    return res.json({ message: "You are already logged in" });
  }

  const { username, password } = req.body;

  // Will return a JWT token or null
  const jwt = await userController.login(username, password);

  if (jwt) {
    res.json({ token: jwt });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
// create a route to logout
router.get("/logout", async (req, res) => {
  if (req.user) {
    req.logout();
    res.json({ message: "You have been logged out" });
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
});
//  create a route to get all users by username
router.get("/users", async (req, res) => {
  const users = await userController.getUsersByUserName(req.user.username);

  res.json(users);
});
// create a route to view all appointments by username
router.get("/appointments", async (req, res) => {
  const appointments = await userController.viewAppointmentsByUserName(
    req.user.username
  );

  res.json(appointments);
});

// create a route to push a request to the appointment array
router.post("/appointments", async (req, res) => {
  const { request } = req.body;

  const appointment = await userController.pushRequestToAppointment(
    req.user.username,
    request
  );

  res.json(appointment);
});

// create a route to delete a unapproved request from the request array
router.delete("/requests", async (req, res) => {
  const { request } = req.body;

  const request2delete = await userController.deleteRequestFromRequest(
    req.user.username,
    request
  );

  res.json(request2delete);
});

//   create a route to delete a approved request from the appointment array
router.delete("/appointments", async (req, res) => {
  const { request } = req.body;

  const approved2delete = await userController.deleteRequestFromAppointment(
    req.user.username,
    request
  );

  res.json(approved2delete);
});
// create a route to view all request by merchant
router.get("/requests", async (req, res) => {
  const requestsByMerchant = await userController.viewRequestsByMerchant(
    req.user.username
  );

  res.json(requestsByMerchant);
});

// create a route to view all appointments by username
router.get("/appointments", async (req, res) => {
  const appointments = await userController.viewAppointmentsByUserName(
    req.user.username
  );

  res.json(appointments);
});

// create a route to view all request from user by merchants
router.get("/requests", async (req, res) => {
  const requestsByUser = await userController.viewRequestsByMerchant(
    req.user.username
  );

  res.json(requestsByUser);
});

// create a route to delete a user by username
router.delete("/users", async (req, res) => {
  const { username } = req.body;

  const user2delete = await userController.deleteUserByUserName(username);

  res.json(user2delete);
});

// create a route to create a new merchant
router.post("/create/user", async (req, res) => {
  const { username, password } = req.body;

  const user = await userController.create(username, password);

  res.json(user);
});

// create a route to view all request by a specific user
router.get("/requests", async (req, res) => {
  const requestsByUser = await userController.viewRequestsByUser(
    req.user.username
  );

  res.json(requestsByUser);
});

// create a route to view all request by a specific merchant
router.get("/requests", async (req, res) => {
  const requestsByMerchant = await userController.viewRequestsByMerchant(
    req.user.username
  );

  res.json(requestsByMerchant);
});
// create a route to login a user
router.post("/login", async (req, res) => {
  if (req.user) {
    return res.json({ message: "You are already logged in" });
  }

  const { username, password } = req.body;

  // Will return a JWT token or null
  const jwt = await userController.login(username, password);

  if (jwt) {
    res.json({ token: jwt });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
// create a route to logout a user
router.get("/logout", async (req, res) => {
  if (req.user) {
    req.logout();
    res.json({ message: "You have been logged out" });
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
});
// create a route to view a merchant by username
router.get("/merchants", async (req, res) => {
  const merchants = await userController.getMerchantsByUserName(
    req.user.username
  );

  res.json(merchants);
});
// create a route to view all request by a user
router.get("/requests", async (req, res) => {
  const requestsByUser = await userController.viewRequestsByUser(
    req.user.username
  );

  res.json(requestsByUser);
});

router.get("/:id", async (req, res) => {
  const foundUser = await userController
    .getStudentById(req.params.id)
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError && err.kind === "ObjectId") {
        res.status(400).json({ message: "Invalid ID" });
      } else {
        res.status(500).json({ message: err.message });
      }
    });

  if (foundUser) {
    res.json(foundUser);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

export default router;
