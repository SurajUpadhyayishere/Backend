import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routers.js";
import userRouter from "./routes/user.routers.js";
import subscriptionRouter from "./routes/subscription.js";
import ConnectToDatabase from "./database/mongo_db.js";
import errorMiddleware from "./middleware/err.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";

//declare express in app
const app = express();
const hostname = "localhost";

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
// app.use(arcjetMiddleware);

//Conntecting routes with endpoints
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use(errorMiddleware)

//Connection To Port 
app.listen(PORT, hostname, () => {
  console.log(`Subscribtion Tracking is running on http://localhost:${PORT}`);
  //Connect to mongodb
  ConnectToDatabase();
});

export default app;