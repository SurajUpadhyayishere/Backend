import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ title: "Get the User" }));
userRouter.get("/:id", (req, res) => res.send({ title: "Get the User Detail" }));
userRouter.post("/", (req, res) => res.send({ title: "Create the User" }));
userRouter.put("/:id", (req, res) => res.send({ title: "Update the User" }));
userRouter.delete("/:id", (req, res) =>  res.send({ title: "Delete the  User" }));

export default userRouter;
