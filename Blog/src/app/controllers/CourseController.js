const Course = require("../model/Course");
const { mongooseToObject } = require("../../util/mongoose");
const LevelCourse = require("../model/LevelCourse");
const { multipleMongooseToObject } = require("../../util/mongoose");
require("../model/LevelCourse");

class CourseController {
  //[GET] /courses/:slug
  show(req, res, next) {
    let slug = req.params.slug;
    Course.findOne({ slug: slug })
      .populate("level")
      .lean()
      .exec()
      .then((course) => {
        console.log(course);
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    const message = res.authError;
    if (message) {
      res.render("error/error-page");
    }
    LevelCourse.find({})
      .lean()
      .then((level) => {
        res.render("courses/create", {
          levels: multipleMongooseToObject(level),
        });
      })
      .catch(next);
  }

  //[POST] /courses/store
  async store(req, res, next) {
    const formData = req.body;
    console.log(formData);
    console.log(req);
    const course = new Course(formData);
    await course
      .save()
      .then(() => {
        res.redirect("/home");
      })
      .catch(next);
  }

  //[GET] /courses/:id/edit
  editCourse(req, res, next) {
    let courseId = req.params.id;
    let levelsCourse = LevelCourse.find({});
    Promise.all([levelsCourse.lean(), Course.findById(courseId).lean().populate('level').exec()])
      .then(([levels, course]) => {
        console.log(course);
        res.render("courses/edit", {
          levels: multipleMongooseToObject(levels),
          course: mongooseToObject(course),
        });
      })
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/admin/stored/courses");
      })
      .catch(next);
  }

  //soft delete
  //[DELETE] /courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //force delete
  //[DELETE] /courses/:id/force
  deleteForce(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
module.exports = new CourseController();
