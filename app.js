require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { globalErrorHandler, AppError } = require("./libs/error");
const mongoose = require("mongoose");
const morgan = require("morgan");
const errorLogStream = require("./logs");

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log({
      message: `Connected to mongodb database! & port: ${process.env.PORT}`,
    });
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    console.log("Retrying connection...");
    setTimeout(connectDatabase, 5000);
  }
};
connectDatabase();
// Routes
routes(app);

// Middleware to catch undefined routes
app.all("/*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error);
});

// Configure Morgan to log errors
app.use(
  morgan("combined", {
    stream: errorLogStream,
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// Global error handling middleware
app.use(globalErrorHandler);

app.listen(() => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
