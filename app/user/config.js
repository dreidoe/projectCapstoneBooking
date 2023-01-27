// the config file is used to store the database connection string
// and to retrieve it from the environment variables
//  .env file
import dotenv from "dotenv";

dotenv.config();

export default {
  dbConn: process.env.DB_CONN,
};
