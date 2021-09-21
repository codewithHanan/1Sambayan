const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

//REGISTER USER API
const methods = {
  //----- Forgot Password -----//
  forgotPassword: asyncHandler(async (req, res, next) => {
    try {
      const { oldPassword, newPassword, email } = req.body;
      if (!oldPassword && !newPassword && !email)
        return res.status(400).json({ message: "Missing fields" });

      //----- check if user exists in Database -----//
      let user = await User.findOne({ email: email }).select("password");
      if (!user)
        return res.status(401).json({ message: "Invalid Permissions" });

      const isPassword = await user.matchPassword(oldPassword);
      if (isPassword) {
        user.password = newPassword;
        await user.save();
        return res
          .status(200)
          .json({ message: "Password updated successfully!" });
      } else {
        //----- Incorrect Password -----//
        return res.status(401).json({ message: "Invalid Permissions" });
      }
    } catch (err) {
      next(err);
    }
  }),

  //----- Forgot Password -----//
  editProfile: asyncHandler(async (req, res, next) => {
    const { name, email, phone, logo, footerText, socialMediaLinks } =
      req.body.props;
  }),
};
module.exports = methods;
