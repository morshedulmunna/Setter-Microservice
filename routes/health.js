const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

router.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy 100%", version: "1.0.0" });
});

module.exports = router;
