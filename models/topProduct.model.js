const mongoose = require("mongoose");

const topProductSchema = new mongoose.Schema(
  {
    product_logo: {
      type: String,
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    features: {
      type: [
        {
          description: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    photos: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          caption: {
            type: String,
            required: false,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TopProduct = mongoose.model("topProduct", topProductSchema);

module.exports = TopProduct;
