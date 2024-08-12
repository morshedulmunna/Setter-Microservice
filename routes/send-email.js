const express = require("express");
const SendMailService = require("../services/email-send");
const router = express.Router();

// Create an instance of SendMailService
const sendMailService = new SendMailService();

// Define the route handler
router.post("/send-email", async (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  const emailOptions = {
    email: email,
    subject: subject,
    template: "emailTemplate.ejs",
    data: { name, email, subject, message, phone },
  };

  try {
    // Call the sendEmail method
    await sendMailService.sendEmail(emailOptions);

    // Send a success response
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

module.exports = router;
