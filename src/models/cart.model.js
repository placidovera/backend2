import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
            ref: "Product"
        },
        quantity: {
          type: Number,
          default: 1,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

export const Cart = mongoose.model("carts", cartSchema);
