// Importing required modules
const express = require("express");
const app = express();
const port = 8080;
const { engine } = require("express-handlebars");
const path = require("path");
const { check, validationResult } = require("express-validator");
const cors = require("cors");

// Configuring Express to use body-parser middleware for parsing incoming request bodies in a middleware before handlers and available under the req.body property.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Configuring the view engine to use Handlebars and setting the views directory
app.engine("hbs", engine({ extname: ".hbs" }, path.join(__dirname, "views")));
app.set("view engine", "hbs");
app.set("views", "./views");

// Defining a GET route for the root URL ("/") which renders the registration page
app.get("/", (req, res) => {
  res.render("registration");
});

// Defining a POST route for the "/save" URL which handles form submission and validation
app.post(
  "/save",
  // Defining validation rules using express-validator
  check("name").notEmpty().withMessage("Tên không được để trống"),
  check("email").isEmail().withMessage("Email không hợp lệ"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu phải chứa ít nhất 8 kí tự"),
  (req, res) => {
    // Checking if any validation errors occurred
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = {};
      result.array().forEach((error) => {
        errors[error.path] = error.msg;
      });
      console.log(errors);
      // If validation errors occurred, rendering the registration page with error messages
      res.render("registration", { errors });
    } else {
      // If no validation errors occurred, rendering the home-page with the submitted data
      res.render("home-page", {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });
    }
  }
);

// Starting the server on the specified port
app.listen(port, () => {
  console.log(` App listening on port ${port}`);
});
//
//This code sets up an Express server with a registration form that uses the Handlebars view engine. The server listens on port 8080 and handles form submissions with validation using the express-validator module. If validation errors occur, the server renders the registration page with error messages. If no errors occur, the server renders the home-page with the submitted data..</s>
