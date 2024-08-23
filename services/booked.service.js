const Booked = require("../models/book.model");

const createBooking = async (bookingData) => {
  try {
    const newBooking = new Booked(bookingData);
    await newBooking.save();
    return newBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllBookings = async () => {
  try {
    const bookings = await Booked.find();
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getBookingById = async (id) => {
  try {
    const booking = await Booked.findById(id);
    if (!booking) throw new Error("Booking not found");
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteBookingById = async (id) => {
  try {
    const deletedBooking = await Booked.findByIdAndDelete(id);
    if (!deletedBooking) throw new Error("Booking not found");
    return deletedBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBookingById,
};
