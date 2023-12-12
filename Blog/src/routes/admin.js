const express = require("express");
const router = express.Router();
const Verify = require("../app/middleware/verify/Verify");
const VerifyRole = require("../app/middleware/verify/VerifyRole");

const adminController = require("../app/controllers/AdminController");

router.get(
  "/stored/courses",
   Verify,
   VerifyRole,
  adminController.storedCourses
);
router.get("/trash/courses", 
Verify, VerifyRole, 
adminController.trashCourses);

module.exports = router;
