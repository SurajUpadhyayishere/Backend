import { Router } from "express";
import  {getUsers,getUser} from  "../controllers/user.controller.js"
import authMiddleware  from "../middleware/auth.middleware.js"

//Setup  Router
const userRouter = Router();

//Connect to user controller with endpoints
userRouter.get("/", getUsers);
userRouter.get("/:id",authMiddleware,getUser );
userRouter.post("/", (req, res) => res.send({ title: "Create the User" }));
userRouter.put("/:id", (req, res) => res.send({ title: "Update the User" }));
userRouter.delete("/:id", (req, res) =>  res.send({ title: "Delete the  User" }));

export default userRouter;
