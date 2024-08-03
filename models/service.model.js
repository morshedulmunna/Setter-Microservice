const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const CompanyService = mongoose.model("service", serviceSchema);

module.exports = CompanyService;
