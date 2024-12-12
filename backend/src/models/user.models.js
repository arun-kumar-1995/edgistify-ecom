import mongoose from "mongoose";
import {
  UserRoles,
  AccountStatus,
} from "../constants/enums.constants.js";

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    role: {
      type: String,
      enum: UserRoles.values,
      default: UserRoles.USER,
    },
    accountStatus: {
      type: String,
      enum: AccountStatus.values,
      default: AccountStatus.PENDING,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", schema);
