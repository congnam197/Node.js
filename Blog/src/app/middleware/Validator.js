const { validationResult } = require("express-validator");

const Validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = {};
    errors.array().map((err) => (error[err.path] = err.msg));
    req.data = error;
  }
  next();
};
module.exports = Validate;
