import mongoose, { Schema,model } from "mongoose";

//step 1:  Create Schema
//step 2: Create Model

//create  Schema:data structure
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is Required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide valid email id"],
    },
    password: {
      type: String,
      Required: [true, "User Password is Required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

//Model:Using schema structure
const userModel = mongoose.model("userModel", userSchema);

export default userModel;
