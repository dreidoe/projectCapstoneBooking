import express from "express";
import cors from "cors";
import config from "./config.js";
import router from "./user/routes.js";
import decodedUser from "./middleware/decoded-user.js";

export default () => {
  const app = express();

  // * Middleware order matters!
  app.use(express.json());
  app.use(decodedUser);

  app.use(cors());
  app.use("/user/routes.js/", router);

  app.use((_, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.listen(config.port, () => {
    console.info(`Server running on: http://localhost:${config.port}`);
  });
};
