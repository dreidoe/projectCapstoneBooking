import express from "express";
import cors from "cors";
import config from "./config.js";

import userRouter from "./user/routes.js";
// import decodedUser from "./middleware/decoded-user.js";

export default () => {
  const app = express();

  // * Middleware order matters!
  app.use(express.json());
  // TODO: Add the decodedUser middleware for the jwt stuff
  // app.use(decodedUser);

  // TODO: Consider restricting this to just the :5173 port
  app.use(cors());

  // http://localhost:3000/user
  app.use("/user", userRouter);

  app.use((_, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.listen(config.port, () => {
    console.info(`Server running on: http://localhost:${config.port}`);
  });
};
