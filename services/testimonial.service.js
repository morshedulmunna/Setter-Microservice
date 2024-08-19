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
    throw new AppError("Something went wrong!", 400);
  }
};
exports.updateTestimonial = async (req, res) => {
  try {
    const { comment, name, designation, company_logo, profile_image } =
      req.body;
    const { company_logo: companyLogoFiles, profile_image: profileImageFiles } =
      req.files || {};

    const updateData = {
      comment,
      name,
      designation,
      company_logo: companyLogoFiles
        ? `${BACKEND_HOST}/uploads/testimonial/${companyLogoFiles[0].filename}`
        : company_logo,
      profile_image: profileImageFiles
        ? `${BACKEND_HOST}/uploads/testimonial/${profileImageFiles[0].filename}`
        : profile_image,
    };

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTestimonial) throw new AppError("Testimonial not found", 404);

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong!", error });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonial = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonial);
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
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
    throw new AppError("Something went wrong!", 400);
  }
};
