const mongoose = require("mongoose");

const bookedSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    pickup_date_time: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booked = mongoose.model("booked", bookedSchema);

module.exports = Booked;
