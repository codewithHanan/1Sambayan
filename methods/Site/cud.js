const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const Site = require("../../models/Site");

//REGISTER USER API
const methods = {
  //----- Create site -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { name, email, phone, footer, logo, socialMediaLinks } =
        req.body.props;

      //----- Check If user exist with this Email or not -----//
      const IsSite = await Site.findOne({ email: email });
      if (IsSite) {
        res
          .status(404)
          .send("A Site already registered with this Email Address");
      } else {
        // Saving User in DataBase
        const site = await Site.create({
          name,
          email,
          owner: req.user._id,
          phone,
          footer,
          logo,
          socialMediaLinks,
        });

        res.status(200).json({ site: site });
      }
    } catch (err) {
      next(err);
    }

    const { name, email, phone, logo, footerText, socialMediaLinks } =
      req.body.props;
  }),

  //----- Update Site settings -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { name, email, phone, footer, logo, socialMediaLinks } =
        req.body.props;
      const updatedSite = await Site.findOneAndUpdate(
        { email: email },
        {
          name,
          email,
          phone,
          footer,
          logo,
          socialMediaLinks,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Success!", site: updatedSite });
    } catch (err) {
      next(err);
    }

    const { name, email, phone, logo, footerText, socialMediaLinks } =
      req.body.props;
  }),
};
module.exports = methods;
