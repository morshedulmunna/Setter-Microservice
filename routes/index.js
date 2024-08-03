const version = "/api/v1";

module.exports = function (app) {
  app.use(`${version}`, require("./health"));
  app.use(`${version}`, require("./hero.js"));
  app.use(`${version}`, require("./service.js"));
};
