const VerifyRole = async (req, res, next) => {
  try {
    const user = req.user;
    const { role } = user;
    console.log("role", role);
    if (role != "0x88") {
      return res.status(401).json({
        message: "Bạn không được phép xem trang này ",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = VerifyRole;
