const siteRouter = require("./site");
const coursesRouter = require("./course");
const meController = require("./me");

function route(app) {
  app.use("/courses", coursesRouter);
  app.use("/me", meController);
  app.use("/", siteRouter);
}

module.exports = route;
