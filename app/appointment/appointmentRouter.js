// create a route to push a request to the appointment array
import { Router } from "express";
import mongoose from "mongoose";
import userController from "./userController.js";

const router = new Router();
router.post("/appointments", async (req, res) => {
  const { request } = req.body;

  const appointment = await userController.pushRequestToAppointment(
    req.user.username,
    request
  );

  res.json(appointment);
});

// create a route to view all appointments by username
router.get("/appointments", async (req, res) => {
  const appointments = await userController.viewAppointmentsByUserName(
    req.user.username
  );

  res.json(appointments);
});
export default router;
