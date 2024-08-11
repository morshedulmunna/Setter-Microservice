const { BACKEND_HOST } = require("../constant");
const { AppError } = require("../libs/error");
const Testimonial = require("../models/testimonial.model");

// Create a new hero
exports.createTestimonial = async (req, res) => {
  try {
    const { comment, name, designation } = req.body;
    const icon = req.files;

    // Check for missing fields before processing
    if (!comment || !name) {
      return res
        .status(400)
        .json({ message: "Comment & name Filed are require!" });
    }

    const newTestimonial = new Testimonial({
      company_logo: `${BACKEND_HOST}/uploads/testimonial/${icon.company_logo[0].filename}`,
      comment,
      name,
      profile_image: `${BACKEND_HOST}/uploads/testimonial/${icon.profile_image[0].filename}`,
      designation,
    });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonial = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonial);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

exports.deleteAllTestimonial = async (req, res) => {
  try {
    const deleteAllTestimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );
    if (!deleteAllTestimonial) {
      throw new AppError("Testimonial section not found", 400);
    }
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};
