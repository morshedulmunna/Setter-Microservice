const mongoose = require("mongoose");

const topProductSchema = new mongoose.Schema(
  {
    product_logo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    features: {
      type: Array,
      required: true,
      default: [],
    },
    photos: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TopProduct = mongoose.model("topProduct", topProductSchema);

module.exports = TopProduct;
