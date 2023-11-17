const express = require("express");
const app = express();
const port = 8080;
const { engine } = require("express-handlebars");
const path = require("path");
const { check, validationResult } = require("express-validator");
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.engine("hbs", engine({ extname: ".hbs" }, path.join(__dirname, "views")));
app.set("view engine", "hbs");
app.set("views", "./views");

//router
app.get("/", (req, res) => {
  res.render("registration");
});

app.post( "/save",(req, res, next) => {
    console.log(req.body);
    res.json(req.body);
  }
);

//run server
app.listen(port, () => {
  console.log(` App listening on port ${port}`);
});
