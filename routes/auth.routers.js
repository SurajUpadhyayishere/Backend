import { Router } from "express";
import { SignIn, SignOut, SignUp } from "../controllers/auth.controller.js";

//Setup Router
const authRouter = Router();

//Connect auth controller to endpoints
authRouter.post("/sign-up", SignUp );
authRouter.post("/sign-in", SignIn );
authRouter.post("/sign-out", SignOut);

export default authRouter;