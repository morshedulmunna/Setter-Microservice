const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  tagline: {
    type: String,
    required: true,
  },
  tittle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  subTittle: {
    type: String,
    required: true,
  },
});

const Hero = mongoose.model("hero", heroSchema);

module.exports = Hero;
