const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Swal = require("sweetalert2");

const user = require("../model/User");

class UserController {
  //[POST] user/register

  register = async (req, res) => {
    const { name, email, password } = req.body;
    const error = req.data;
    if (error) {
      res.render("register", { error });
    } else
      try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
          console.log("lỗi email tồn tại");
          const message = "Email đã tồn tại ";
          res.render("register", { message });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
          });
          console.log("user :", newUser);
          // const token = jwt.sign(
          //   { email: newUser.email, id: newUser._id },
          //   process.env.JWT_SECRET,
          //   { expiresIn: "1h" }
          // );
          //console.log("token:", token);
          res.redirect("/login");
        }
      } catch (error) {
        console.log("Internal Server Error");
      }
  };

  //[POST] user/login
  login = async (req, res) => {
    const { email, password } = req.body;
    const error = req.data;
    if (error) {
      res.render("login", { error });
    } else {
      try {
        const existingUser = await user.findOne({ email });
        const isPasswordCrt = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!existingUser) {
          const message = "Người dùng không tồn tại.";
          res.render("login", { message });
        } else if (!isPasswordCrt) {
          res.render("login", { message: "Mật khẩu không đúng" });
        } else {
          const option = {
            maxAge: 20 * 60 * 1000, //20p
            httpOnly: true, //The cookie is only accessible by the web server
            secure: true,
            sameSite: "None",
          };
          const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("SessionID", token, option);
          res.cookie("user", existingUser.name);
          res.redirect("/home");
        } 
      } catch (error) {
        console.log(error);
      }
    }
  };

  // [PATH] /user/update/id
  updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("user not unavailable...");
    }
    try {
      const updatedProfile = await user.findByIdAndUpdate(
        _id,
        { $set: { name: name, about: about, tags: tags } },
        { new: true }
      );
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };

  //[GET] /user/logout
  logout = async (req, res, next) => {
    res.clearCookie("SessionID");
    res.clearCookie("user");
    res.redirect('/home');
  };
}

module.exports = new UserController();
