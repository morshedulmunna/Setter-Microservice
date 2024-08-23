const version = "/api/v1";

module.exports = function (app) {
  app.use(`${version}`, require("./auth.js"));
  app.use(`${version}`, require("./health"));
  app.use(`${version}`, require("./hero.js"));
  app.use(`${version}`, require("./service.js"));
  app.use(`${version}`, require("./testimonial.js"));
  app.use(`${version}`, require("./topProduct.js"));
  app.use(`${version}`, require("./send-email.js"));
  app.use(`${version}`, require("./booked.js"));
};
