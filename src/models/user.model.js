import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: true
    },

    password: {
      type: String,
      required: true,
      select: false
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("users", UserSchema);
