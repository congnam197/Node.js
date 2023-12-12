const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");

const Verify = async (req, res, next) => {

  //lấy token từ cookies
  const token = req.cookies.SessionID;
  try {
    if (!token) {
      const error = "Đăng nhập để tiếp tục";
      req.flash("error", error);
      res.redirect('/home')
    } else {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
          });
        } else {
          const { id } = decoded;
          const user = await User.findById(id).lean();
          const { password, ...data } = user;
          req.user = data;
          next();
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log(error);
  }
};
module.exports = Verify;
