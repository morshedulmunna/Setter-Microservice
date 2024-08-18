const { BACKEND_HOST } = require("../constant");
const { AppError } = require("../libs/error");
const Hero = require("../models/hero.model");

// Create a new hero
exports.createHero = async (req, res) => {
  try {
    const { tagline, tittle, subTittle } = req.body;
    const image = req.file;

    // Check for missing fields before processing
    if (!tagline || !tittle || !subTittle || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newHero = new Hero({
      tagline,
      tittle,
      subTittle,
      image: `${BACKEND_HOST}/uploads/heros/${image.filename}`,
    });
    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

// Get all heroes
exports.getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find({}).sort({ createdAt: -1 });
    res.status(200).json(heroes);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

// Get a single hero by ID
exports.getHeroById = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) throw new AppError("Hero section not found", 400);
    res.status(200).json(hero);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

// Update a hero
exports.updateHero = async (req, res) => {
  console.log(req.body, req.file);
  try {
    const { tagline, tittle, subTittle, image } = req.body;
    const imageFile = req.file;
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, {
      tagline,
      tittle,
      subTittle,
      image: imageFile
        ? `${BACKEND_HOST}/uploads/heros/${imageFile.filename}`
        : image,
    });

    if (!updatedHero) throw new AppError("Hero section not found", 400);

    res.status(200).json(updatedHero);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

// Delete a hero
exports.deleteHero = async (req, res, next) => {
  try {
    const deletedHero = await Hero.findByIdAndDelete(req.params.id);
    if (!deletedHero) {
      return res.status(404).json({ message: "Hero section not found" });
    }
    res.status(200).json({ message: "Hero deleted" });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
