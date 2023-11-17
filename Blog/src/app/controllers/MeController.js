const Course = require("../model/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
const moment = require("moment");

class MeController {
  //[GET] /me/stored/courses
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
      courseQuery.lean(),
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

  //[GET] /me/trash/course
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .sort({ deletedAt: -1 })
      .lean()
      .then((courses) => {
        res.render("me/trashCourse", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}
module.exports = new MeController();
