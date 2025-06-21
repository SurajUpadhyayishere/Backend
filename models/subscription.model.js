import mongoose from "mongoose";

//step 1:  create Schema
//step 2:  create Model

const subscriptionSchema = new mongoose.Schema(
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
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= value,
        message: "Start date is must be in past",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validator: function (value) {
        return value > this.startDate;
      },
      message: "Renewal date must be after start date",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function () {
  if (!this.renewalDate) {
    const renewalPeriod = {
      day: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
    this.renewalDate.getDate() + renewalPeriod[this.frequency]
    );

    if (this.renewalDate > new Date()) {
      this.status = "expired";
    }
    next();
  }
});

const subscriptionModel = mongoose.model(
  "subscriptionModel",
  subscriptionSchema
);

export default subscriptionModel;
