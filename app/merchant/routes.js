import { Router } from "express";
import userController from "./controller.js";

const router = new Router();

router.post("/create", async (req, res) => {
  const { username, password } = req.body;

  const merchant = await userController.create(username, password);

  res.json(merchant);
});

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

export default router;
