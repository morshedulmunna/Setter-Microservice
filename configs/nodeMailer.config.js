const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email provider
  auth: {
    user: process.env.SENDER_EMAIL, // Replace with your email
    pass: process.env.SENDER_EMAIL_PASS, // Replace with your email password or app password
  },
});

module.exports = transporter;
