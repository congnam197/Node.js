const VerifyRole = async (req, res, next) => {
  try {
    const user = req.user;
    const { role } = user;
    console.log("role", role);
    if (role != "0x88") {
      res.render('error/errorPage')
    }
    next();
  } catch (err) {
   console.log(err)
  }
};

module.exports = VerifyRole;
