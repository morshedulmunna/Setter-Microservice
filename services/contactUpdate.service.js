const ContactUpdateFooter = require("../models/contactFooter.model");
const ContactUpdate = require("../models/contactupdate.model");

const saveContactInfo = async (req, res) => {
  try {
    const { title, description, address, email, phone } = req.body;

    // Check if an entry already exists in the ContactUpdate collection
    const existingEntry = await ContactUpdate.findOne({});

    if (existingEntry) {
      // Update the existing entry
      existingEntry.title = title;
      existingEntry.description = description;
      existingEntry.address = address;
      existingEntry.email = email;
      existingEntry.phone = phone;

      // Save the updated entry
      await existingEntry.save();
      return res
        .status(200)
        .json({ message: "Contact information updated successfully." });
    } else {
      // Create a new entry if no entry exists
      const newEntry = new ContactUpdate({
        title,
        description,
        address,
        email,
        phone,
      });

      // Save the new entry
      await newEntry.save();
      return res
        .status(201)
        .json({ message: "Contact information saved successfully." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the contact information.",
    });
  }
};
const saveContactInfoFooter = async (req, res) => {
  try {
    const { twitter, description, youtube, linkedIn, facebook } = req.body;

    // Check if an entry already exists in the ContactUpdate collection
    const existingEntry = await ContactUpdateFooter.findOne({});

    if (existingEntry) {
      // Update the existing entry
      existingEntry.twitter = twitter;
      existingEntry.description = description;
      existingEntry.youtube = youtube;
      existingEntry.linkedIn = linkedIn;
      existingEntry.facebook = facebook;

      // Save the updated entry
      await existingEntry.save();
      return res
        .status(200)
        .json({ message: "Contact information updated successfully." });
    } else {
      // Create a new entry if no entry exists
      const newEntry = new ContactUpdateFooter({
        description,
        youtube,
        twitter,
        linkedIn,
        facebook,
      });

      // Save the new entry
      await newEntry.save();
      return res
        .status(201)
        .json({ message: "Contact information saved successfully." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the contact information.",
    });
  }
};

const getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactUpdate.findOne({});
    if (!contactInfo) {
      return res
        .status(404)
        .json({ message: "Contact information not found." });
    }
    return res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the contact information.",
    });
  }
};

const getContactInfoFooter = async (req, res) => {
  try {
    const contactInfo = await ContactUpdateFooter.findOne({});
    if (!contactInfo) {
      return res
        .status(404)
        .json({ message: "Contact information not found." });
    }
    return res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the contact information.",
    });
  }
};

module.exports = {
  saveContactInfo,
  getContactInfo,
  saveContactInfoFooter,
  getContactInfoFooter,
};
