const express = require("express");
const router = express.Router();
const Verify = require("../app/middleware/verify/Verify");
const VerifyRole = require("../app/middleware/verify/VerifyRole");
//import đối tượng HomeController
const courseController = require("../app/controllers/CourseController");

router.get("/create",Verify,VerifyRole, courseController.create);
router.post("/store", courseController.store);
router.get("/:id/edit",Verify,VerifyRole,  courseController.editCourse);
router.patch("/:id/restore", courseController.restore);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);
router.delete("/:id/force", courseController.deleteForce);
router.get("/:slug", courseController.show);

module.exports = router;
