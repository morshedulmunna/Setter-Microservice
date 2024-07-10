const fs = require("fs");
const path = require("path");

const errorLogStream = fs.createWriteStream(
  path.join(__dirname, "error.json"),
  {
    flags: "a",
  }
);

module.exports = errorLogStream;
