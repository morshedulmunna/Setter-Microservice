const mongoose = require("mongoose");

const topProductSchema = new mongoose.Schema(
  {
    product_logo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      default: null,
    },
    features: {
      type: Array,
      default: [],
    },
    photos: {
      type: Array,
      default: [],
    },
    isContentAvailable: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TopProduct = mongoose.model("topProduct", topProductSchema);

module.exports = TopProduct;
