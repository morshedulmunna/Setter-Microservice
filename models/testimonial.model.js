const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    company_logo: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("testimonial", testimonialSchema);

module.exports = Testimonial;
