const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
const moment = require("moment");

class AdminController {
  //[GET] /admin/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    //sắp xếp
    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        //name:'asc'
        //truyền động
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([
      courseQuery.lean().populate('level'),
      Course.countDocumentsWithDeleted({ deleted: true }).exec(),
    ])
      .then(([course, deletedCount]) => {
        res.render("me/storedCourses", {
          deletedCount,
          course: multipleMongooseToObject(course),
        });
      })
      .catch(next);
  }

  //[GET] /admin/trash/course
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .sort({ deletedAt: -1 })
      .lean()
      .populate('level')
      .then((courses) => {
        res.render("me/trashCourse", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}
module.exports = new AdminController();
