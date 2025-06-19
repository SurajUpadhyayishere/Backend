import mongoose from "mongoose";
import { MONGODB_URL, NODE_ENV } from "../config/env.js";

//check mongodb_url connect or not
if (!MONGODB_URL) {
  throw new Error(
    "Please define the mongodb uri environment variable inside .env.<production/development>.local"
  );
}

const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log(`Connecting to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.log(`Error found in connecting MongoDB in mongo_db.js: ${error}`);
    process.exit(1); //1 mean failure and exit,0 mean  success
  }
};

export default ConnectToDatabase;
