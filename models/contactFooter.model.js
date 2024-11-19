const mongoose = require("mongoose");

const contactUpdateFooterSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  youtube: {
    type: String,
    required: true,
  },

  twitter: {
    type: String,
    required: true,
  },

  linkedIn: {
    type: String,
    required: true,
  },

  facebook: {
    type: String,
    required: true,
  },
});

const ContactUpdateFooter = mongoose.model(
  "contactUpdateFooter",
  contactUpdateFooterSchema
);

module.exports = ContactUpdateFooter;
