const Course = require("../model/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  //[GET] /courses/:slug
  show(req, res, next) {
    let slug = req.params.slug;
    Course.findOne({ slug: slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    const message =res.authError;
    if(message){
      res.render("error/error-page");
    }
  
    res.render("courses/create");
  }

  //[POST] /courses/store
  async store(req, res, next) {
    const formData = req.body;
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
    Course.findById(courseId)
      .lean()
      .exec()
      .then((course) => {
        res.render("courses/edit", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/me/stored/courses");
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
