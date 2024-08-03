const { BACKEND_HOST } = require("../constant");
const { AppError } = require("../libs/error");
const CompanyService = require("../models/service.model");

// Create a new hero
exports.createCompanyService = async (req, res) => {
  try {
    const { tittle, description } = req.body;
    const icon = req.file;

    // Check for missing fields before processing
    if (!icon || !tittle || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newService = new CompanyService({
      icon: `${BACKEND_HOST}/uploads/service/${icon.filename}`,
      tittle,
      description,
    });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

// Get all heroes
exports.getServices = async (req, res) => {
  try {
    const services = await CompanyService.find();
    res.status(200).json(services);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};
