const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");

const Verify = async (req, res, next) => {
  try {
    let authHeader = req.headers["cookie"];
    if (!authHeader) {
      return res.status(401).json({ message: "Đăng nhập để tiếp tục" });
    }
    const cookie = authHeader.split("=")[1];

    jwt.verify(cookie, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
        });
      }else{
      const { id } = decoded;
      const user = await User.findById(id).lean();
      const { password, ...data } = user;
      req.user = data;
      next();  
    }
  });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = Verify;
