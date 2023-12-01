const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const router = require("./routes");
const moment = require("moment");
const db = require("./config/db");
//biến môi trường
const env = require("dotenv");
//middleWare
const SortMiddleware = require("./app/middleware/SortMiddleware");
//thêm các phương thức submit cho form
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
//thông báo khi redirect
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "codegym",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success");
  res.locals.error_messages = req.flash("error");
  res.locals.session = req.session;
  next();
});

//config biến mt
env.config();

app.use(methodOverride("_method"));

// để sử dụng request body ở create;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
// app.use(morgan("combined"));

// config file từ public
app.use(express.static(path.join(__dirname, "/public")));

//custom middleware
app.use(SortMiddleware);

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    //  method custom helpers
    helpers: {
      //index
      sum(a, b) {
        return a + b;
      },

      //format date
      formatDate(date) {
        return moment(date).format("DD/MM/YYYY");
      },
      // sort custom
      sortable: (field, sort) => {
        //check file active
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "bi bi-arrow-down-up",
          asc: "bi bi-sort-down",
          desc: "bi bi-sort-up",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// import database
db.connect();

//routes
router(app);

//run server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
