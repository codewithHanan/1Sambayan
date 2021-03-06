const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User/User");

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

  //----- Edit Profile -----//
  getProfile: asyncHandler(async (req, res, next) => {
    try {
      const user = req.user;
      return res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }),

  //----- Edit Profile -----//
  editProfile: asyncHandler(async (req, res, next) => {
    try {
      let { firstName, lastName, email, image, phone } = req.body.props;
      let user = req.user;
      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (email) {
        user.email = email;
      }
      if (image) {
        user.profileImage = image;
      }
      if (phone) {
        user.phone = phone;
      }
      await user.save();
      return res.status(200).json({ message: "profile updated successfully!" });
    } catch (err) {
      next(err);
    }
  }),

  //----- Edit Profile -----//
  updateProfile: asyncHandler(async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        image,
        phone,
      } = req.body.props;

      const userId = req.user._id;
      // console.log("ownerId", ownerId);
      const user = await User.findOne({ _id: userId });
      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (email) {
        user.email = email;
      }
      if (image) {
        user.profileImage = image;
      }
      if (phone) {
        user.phone = phone;
      }
      await user.save();
      return res.status(200).json({ message: "profile updated successfully!" });
    } catch (err) {
      next(err);
    }
  }),
};
module.exports = methods;
