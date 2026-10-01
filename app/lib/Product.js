import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: null,
    },

    emoji: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
