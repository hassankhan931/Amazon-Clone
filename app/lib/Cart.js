import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
