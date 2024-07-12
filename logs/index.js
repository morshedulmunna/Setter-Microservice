const fs = require("fs");
const path = require("path");

const getLogFileName = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // const hours = String(date.getHours()).padStart(2, "0");
  // const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}.log`;
};

const logFilePath = path.join(__dirname, getLogFileName());

const errorLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

module.exports = errorLogStream;
