const Booked = require("../models/book.model");

const createBooking = async (bookingData) => {
  try {
    // Check if the booking already exists
    const existingBooking = await Booked.findOne({
      email: bookingData.email,
      pickup_date_time: bookingData.pickup_date_time,
    });

    if (existingBooking) {
      // If a booking already exists, return an error message
      return { message: "This booking already exists." };
    }

    // Create and save the new booking if no existing booking is found
    const newBooking = new Booked(bookingData);
    await newBooking.save();
    return newBooking;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllBookings = async (page = 1, limit = 10) => {
  try {
    // Calculate the number of documents to skip based on page and limit
    const skip = (page - 1) * limit;

    // Use aggregation to get the paginated bookings and the total count
    const [bookings, totalBookings] = await Promise.all([
      Booked.find().skip(skip).limit(limit), // Fetch the bookings
      Booked.countDocuments(), // Get the total count of bookings
    ]);

    return {
      bookings,
      totalBookings,
      totalPages: Math.ceil(totalBookings / limit),
      currentPage: page,
    };
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
