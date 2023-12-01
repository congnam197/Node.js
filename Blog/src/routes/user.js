const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const Verify = require("../app/middleware/verify/Verify");

//import đối tượng HomeController
const userController = require("../app/controllers/UserController");
const Validate = require("../app/middleware/Validator");
router.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Địa chỉ email không hợp lệ")
    .normalizeEmail(),
  check("name")
    .not()
    .isEmpty()
    .withMessage("Tên không được để trống")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Mật khẩu ít nhất 8 kí tự"),
  Validate,
  userController.register
);
router.post(
  "/login",
  check("email")
    .isEmail()
    .withMessage("Địa chỉ email không hợp lệ")
    .normalizeEmail(),
  check("password").not().isEmpty().withMessage("Mật khẩu không được để trống"),
  Validate,
  userController.login
);

router.get("/logout", userController.logout);
router.patch("/update/:id", Verify, userController.updateProfile);
router.get("/verification/:token", userController.verification);
router.get("/info/:id", userController.getInfo);

module.exports = router;
