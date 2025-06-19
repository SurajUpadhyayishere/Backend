import { Router } from "express";

const subscribtionRouter = Router();

subscribtionRouter.get("/", (req, res) => res.send( {title:"Get the subscribtion"}));
subscribtionRouter.get("/:id", (req, res) =>res.send({title:"Get the subscribtion detail"}));
subscribtionRouter.post("/", (req, res) => res.send({title:"Create the subscribtion"}));
subscribtionRouter.put("/:id", (req, res) => res.send({title:"Update the subscribtion"}));
subscribtionRouter.delete("/:id", (req, res) => res.send({title:"Delete the subscribtion"}));
subscribtionRouter.get("/user/:id", (req, res) => res.send({title:"Get All User the subscribtion"}));
subscribtionRouter.put("/:id/cancel", (req, res) => res.send({title:"Cancel the subscribtion"}));

export default subscribtionRouter;


// 5BDP3ED7cwJWFWdY

