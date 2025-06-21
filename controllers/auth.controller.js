import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "../config/env.js";

// Sign Up  
export const SignUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    //checking existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      const error = new Error("User is already exist");
      error.statusCode = 409;
      throw error;
    }

    // adding string to hash and below one taking hash from salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await userModel.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({
        success: true,
        message: "User Created",
        data: { token, user: newUsers[0] },
      });
      
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

//Sign In
export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const User = await userModel.findOne({ email });

    if (!User) {
      const error = new Error("User is not exist");
      error.statusCode = 409;
      throw error;
    }

    const comparePassword = await bcrypt.compare(password, User.password);

    if (!comparePassword) {
      const error = new Error("Password is not match");
      error.statusCode = 409;
      throw error;
    }

    const token = jwt.sign({ userId: User._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    res.status(201).json({
      success: true,
      message: "User Sign in  Successfully",
      data: { token, user: User },
    });
  } catch (error) {
    next(error);
  }
};

//Sign Out
export const SignOut = async (req, res, next) => {};