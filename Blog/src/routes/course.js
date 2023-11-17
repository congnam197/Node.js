const express = require("express");
const router = express.Router();

//import đối tượng HomeController
const courseController = require("../app/controllers/CourseController");
router.get("/create", courseController.create);
router.post("/  ", courseController.store);
router.get("/:id/edit", courseController.editCourse);
router.patch("/:id/restore", courseController.restore);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);
router.delete("/:id/force", courseController.deleteForce);
router.get("/:slug", courseController.show);

module.exports = router;
