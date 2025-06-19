import mongoose from "mongoose";

//create Schema
//create Model

const subscribtionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "INR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      status: "expired",
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
        validator:(value) => value <= (value),
        message:"Start date is must be in past",
        }
    },
    renewalDate:{
        type:Date,
        required:true,
        validator: function(value){
            return  value  > this.startsWith
        },
        message:"Renewal date must be after start date"

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true
    }
  },
  { timestamps: true }
);


