const { BACKEND_HOST } = require("../constant");
const { AppError } = require("../libs/error");
const TopProduct = require("../models/topProduct.model");

exports.createCompanyService = async (req, res) => {
  try {
    const { features, isContentAvailable, description, title } = req.body;
    const files = req.files;

    // Check for missing fields
    if (!files.product_logo || !isContentAvailable) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Prepare the paths for uploaded files
    const productLogoPath = `${BACKEND_HOST}/uploads/top-products/${files.product_logo[0].filename}`;
    const photoPaths = files.photos
      ? files.photos.map(
          (file) => `${BACKEND_HOST}/uploads/top-products/${file.filename}`
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

exports.getAllTopProduct = async (req, res, next) => {
  try {
    // Destructure query parameters
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = -1,
    } = req.query;

    // Create a search query based on provided search term
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } }, // Assuming `name` is a field in your schema
            { description: { $regex: search, $options: "i" } }, // Assuming `description` is a field in your schema
          ],
        }
      : {};

    // Convert `page` and `limit` to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the number of items to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch the filtered and paginated product list
    const topProductList = await TopProduct.find(searchQuery)
      .sort({ [sortBy]: sortOrder }) // Sort based on sortBy field and sortOrder
      .skip(skip)
      .limit(limitNumber);

    // Get the total number of items for pagination
    const totalItems = await TopProduct.countDocuments(searchQuery);

    // Prepare the response with pagination details
    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limitNumber),
      currentPage: pageNumber,
      itemsPerPage: limitNumber,
      topProductList,
    });
  } catch (error) {
    next(new AppError(error.message, 400));
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
