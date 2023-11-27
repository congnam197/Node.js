const VerifyRole = async (req, res, next) => {
  try {
    const user = req.user;
    const { role } = user;
    let messAuth ={};
    console.log("role", role);
    if (role != "0x88") {
      messAuth[message]= "Bạn không được phép xem trang này ";
       res.authError =messAuth;
    }
    next();
  } catch (err) {
   console.log(err)
  }
};

module.exports = VerifyRole;
