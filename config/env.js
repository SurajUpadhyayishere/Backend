import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV, MONGODB_URL,JWT_SECRET,JWT_EXPIRE,ARCJET_KEY,ARCJET_ENV } = process.env;
