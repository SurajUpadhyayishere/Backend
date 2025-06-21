import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import userModel from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    //make token workable
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //if token not found show error
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No Token Provided" });

    //Verify token and then search by userid
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select("-password");

    //Id and Password not match show error
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
    }
    res.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authMiddleware;
