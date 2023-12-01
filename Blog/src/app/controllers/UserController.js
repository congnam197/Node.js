const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const user = require("../model/User");
const { Result } = require("express-validator");
const { mongooseToObject } = require("../../util/mongoose");

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

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS,
            },
          });

          const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          const url = `http://localhost:3000/user/verification/${token}`;

          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Xác nhận email để hoàn tất đăng ký !!",
            text: "Xác minh email",
            html: `<p>Nhấp vào liên kết này để xác minh email của bạn. <a href="${url}">Nhấn vào đây</a></p> `,
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            console.log(info);
            res.status(201).json({
              status: "Đăng kí thành công",
              message: " Vui lòng kiểm tra email để xác thực tài khoản",
            });
          });

          // const date = new Intl.DateTimeFormat("en-US", {
          //   year: "numeric",
          //   month: "numeric",
          //   day: "numeric",
          //   hour: "numeric",
          //   minute: "numeric",
          //   second: "numeric",
          //   hour12: true,
          // }).format(new Date());
        }
      } catch (error) {
        console.log(error);
      }
  };

  //[GET] /user/verification
  verification = async (req, res, next) => {
    const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    if (id) {
      const updatedUser = await user.findByIdAndUpdate(id, { confirmed: true });
      if (updatedUser) {
        res.redirect("/login");
      } else {
        res.status(404);
        throw new Error("Không tìm thấy người dùng");
      }
    } else {
      res.status(404);
      throw new Error("Không tìm thấy người dùng");
    }
  };

  //[POST] user/login
  login = async (req, res) => {
    const { email, password } = req.body; //information user
    const error = req.data; // validate error
    if (error) {
      res.render("login", { error });
    } else {
      try {
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
          console.log("lỗi email tồn tại");
          const message = "Người dùng không tồn tại.";
          res.render("login", { message });
        } else {
          const isPasswordCrt = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (!isPasswordCrt) {
            console.log("lỗi password tồn tại");
            const message = "Mật khẩu không đúng";
            res.render("login", { message });
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
            req.session.user = existingUser;
            console.log(existingUser);
            req.flash("success", "Đăng nhập thành công");
            res.redirect("/home");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // [PATH] /user/update/id
  updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("user not unavailable...");
    }
    try {
      const updatedProfile = await user.findByIdAndUpdate(
        _id,
        { $set: { name: name, avatar: avatar } },
        { new: true }
      );
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };

  //[GET] /user/info/id
  getInfo = async (req, res, next) => {
    const {id:_id} = req.params;
    user
      .findById(_id )
      .lean()
      .then((user) => {
        console.log(user);
        res.render("me/infoUser", { user: mongooseToObject(user) });
      })
      .catch(next);
  };

  //[GET] /user/logout
  logout = async (req, res, next) => {
    res.clearCookie("SessionID");
    res.clearCookie("user");
    req.session.user = "";
    res.redirect("/home");
  };
}

module.exports = new UserController();
