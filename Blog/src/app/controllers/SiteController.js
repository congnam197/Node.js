const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  //[GET] /news
  news(req, res) {
    res.render("news");
  }
  //[GET] /home
  home(req, res, next) {
    Course.find({})
      .sort({ createdAt: 1 })
      .lean()
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);

  }

  //[GET] /login
  login(req, res) {
    res.render("login");
  }

  //[GET] /register
  register(req, res) {
    res.render("register");
  }
}
module.exports = new SiteController();
