const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const bookingService = require("../services/booked.service");

const router = express.Router();

// Create a new booking
router.post("/booked", async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = await bookingService.createBooking(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings
router.get("/booked", authMiddleware, async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a booking by ID
router.get("/booked/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Delete a booking by ID
router.delete("/booked/:id", authMiddleware, async (req, res) => {
  try {
    const deletedBooking = await bookingService.deleteBookingById(
      req.params.id
    );
    res
      .status(200)
      .json({ message: "Booking deleted successfully", deletedBooking });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
