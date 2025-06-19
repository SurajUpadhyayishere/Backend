import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routers.js";
import userRouter from "./routes/user.routers.js";
import subscribtionRouter from "./routes/subscribtion.js";
import ConnectToDatabase from "./database/mongo_db.js";

const app = express();
const hostname = "localhost";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscribtions", subscribtionRouter);

app.listen(PORT, hostname, () => {
  console.log(`Subscribtion Tracking is running on http://localhost:${PORT}`);
  ConnectToDatabase();
});

export default app;
