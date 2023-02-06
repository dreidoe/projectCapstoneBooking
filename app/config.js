// the config file is used to store the database connection string
// and to retrieve it from the environment variables
//  .env file
import dotenv from "dotenv";

dotenv.config();

export default {
  dbConn: process.env.DB_CONN,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
};
