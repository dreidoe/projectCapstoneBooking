import express from "express";
import cors from "cors";
import config from "./config.js";

// TODO: Consider naming this to be more specific for when we use other routers
import router from "./user/routes.js";
// import decodedUser from "./middleware/decoded-user.js";

export default () => {
  const app = express();

  // * Middleware order matters!
  app.use(express.json());
  // TODO: Add the decodedUser middleware for the jwt stuff
  // app.use(decodedUser);

  // TODO: Consider restricting this to just the :5173 port
  app.use(cors());

  // http://localhost:3000/user/routes
  app.use("/user", router);

  app.use((_, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.listen(config.port, () => {
    console.info(`Server running on: http://localhost:${config.port}`);
  });
};
