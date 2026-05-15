import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pets",
      required: true
    }
  },
  { timestamps: true }
);

export const Adoption = mongoose.model("Adoptions", adoptionSchema);