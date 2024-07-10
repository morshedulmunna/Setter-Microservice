const errorLogStream = require("../logs");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const globalErrorHandler = (err, req, res, next) => {
  // Set default values for statusCode and message
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Create a unique error ID
  const errorId = new Date().getTime();

  // Log error details to the error log file
  const errorLogDetails = `
    Error ID: ${errorId}
    Status: ${err.status}
    StatusCode: ${err.statusCode}
    URL: ${req.originalUrl}
    Message: ${err.message}
    Stack: ${err.stack}
    Timestamp: ${new Date().toISOString()}
  `;

  errorLogStream.write(errorLogDetails);

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      url: req.originalUrl,
      message: err.message,
      timestamp: new Date().toISOString(),
      errorId: errorId,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace only in development
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error("ERROR 💥", err);

    res.status(500).json({
      status: "error",
      statusCode: 500,
      url: req.originalUrl,
      message: "Something went very wrong!",
      timestamp: new Date().toISOString(),
      errorId: errorId,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace only in development
    });
  }

  next();
};

module.exports = {
  globalErrorHandler,
  AppError,
};
