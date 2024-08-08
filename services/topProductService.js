const { BACKEND_HOST } = require("../constant");
const { AppError } = require("../libs/error");
const TopProduct = require("../models/topProduct.model");

exports.createCompanyService = async (req, res) => {
  try {
    const { photos, features, description, title } = req.body;
    const files = req.files;

    // Check for missing fields
    if (!title || !description || !files || !files.product_logo) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Prepare the paths for uploaded files
    const productLogoPath = `${BACKEND_HOST}/uploads/service/${files.product_logo[0].filename}`;
    const photoPaths = files.photos
      ? files.photos.map(
          (file) => `${BACKEND_HOST}/uploads/service/${file.filename}`
        )
      : [];

    // Create a new instance of the CompanyService model
    const newService = new TopProduct({
      product_logo: productLogoPath,
      title,
      description,
      features: features,
      photos: photoPaths,
    });

    // Save the new service in the database
    await newService.save();

    // Respond with the newly created service
    res.status(201).json(newService);
  } catch (error) {
    // Handle errors and respond with an error message
    throw new AppError(error.message, 400);
  }
};

exports.getAllTopProduct = async (req, res) => {
  try {
    const topProductList = await TopProduct.find().sort({ createdAt: -1 });
    res.status(200).json(topProductList);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

exports.deleteAllTopProduct = async (req, res) => {
  try {
    const deleteAllTopProduct = await TopProduct.deleteMany();
    if (!deleteAllTopProduct) {
      throw new AppError("Testimonial section not found", 400);
    }
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};
