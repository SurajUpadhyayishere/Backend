import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createSubscription, getUsersSubscription } from "../controllers/subscribtion.controller.js";

//Setup Router
const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send( {title:"Get the subscribtion"}));
subscriptionRouter.get("/:id", (req, res) =>res.send({title:"Get the subscribtion detail"}));

//creating subscription
subscriptionRouter.post("/", authMiddleware,createSubscription);
subscriptionRouter.put("/:id", (req, res) => res.send({title:"Update the subscribtion"}));
subscriptionRouter.delete("/:id", (req, res) => res.send({title:"Delete the subscribtion"}));

//getting subscription
subscriptionRouter.get("/user/:id",authMiddleware,getUsersSubscription);
subscriptionRouter.put("/:id/cancel", (req, res) => res.send({title:"Cancel the subscribtion"}));

export default subscriptionRouter;

