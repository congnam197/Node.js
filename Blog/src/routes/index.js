const siteRouter = require("./site");
const coursesRouter = require("./course");
const adminController = require("./admin");
const userController = require('./user')

function route(app) {
  app.use("/courses", coursesRouter);
  app.use("/admin", adminController);
  app.use("/", siteRouter);
  app.use('/user',userController);
}

module.exports = route;
