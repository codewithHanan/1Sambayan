const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const Site = require("../../models/Site/Site");
const SiteHeader = require("../../models/Site/Header");

const siteMethods = {
  //----- Create site -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const {
        name,
        email,
        phone,
        video,
        footer,
        logo,
        socialMediaLinks,
        url,
        slogan,
        copyright,
      } = req.body.props;

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
          video,
          url,
          slogan,
          copyright,
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
  }),

  //----- Update Site settings -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const {
        name,
        email,
        phone,
        video,
        footer,
        logo,
        socialMediaLinks,
        url,
        slogan,
        copyright,
      } = req.body.props;

      const ownerId = req.user._id;
      const site = await Site.findOne({ owner: ownerId });

      if (name) {
        site.name = name;
      }
      if (email) {
        site.email = email;
      }
      if (name) {
        site.name = name;
      }
      if (phone) {
        site.phone = phone;
      }
      if (video) {
        site.video = video;
      }
      if (footer) {
        site.footer = footer;
      }
      if (logo) {
        site.logo = logo;
      }
      if (socialMediaLinks) {
        site.socialMediaLinks = socialMediaLinks;
      }
      if (url) {
        site.url = url;
      }
      if (slogan) {
        site.slogan = slogan;
      }
      if (copyright) {
        site.copyright = copyright;
      }
      const updatedSite = await site.save();

      res.status(200).json({ message: "Success!", site: updatedSite });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get Site settings document -----//
  getSite: asyncHandler(async (req, res, next) => {
    try {
      const owner = req.user;
      const site = await Site.findOne({ owner: owner._id });
      res.status(200).json({ site: site });
    } catch (err) {
      next(err);
    }
  }),
};

const siteHeaderMethods = {
  //----- Create Header -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, image, backgroundImage } = req.body.props;
      const siteOwner = req.user._id;
      const site = await Site.findOne({ owner: siteOwner });
      //----- Check If user exist with this Email or not -----//
      const IsSiteHeader = await SiteHeader.findOne({ title: title });
      if (IsSiteHeader) {
        res.status(404).send("A Site Header already exists with this title");
      } else {
        // Saving User in DataBase
        const siteHeader = await SiteHeader.create({
          title,
          description,
          image,
          backgroundImage,
          siteId: site._id,
        });

        res.status(200).json({ Header: siteHeader });
      }
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Site Header -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, image, backgroundImage, headerId } =
        req.body.props;

      let header = await SiteHeader.findById(headerId);

      if (title) {
        header.title = title;
      }
      if (description) {
        header.description = description;
      }
      if (image) {
        header.image = image;
      }
      if (backgroundImage) {
        header.backgroundImage = backgroundImage;
      }

      const updatedSiteHeader = await header.save();

      res.status(200).json({ message: "Success!", Header: updatedSiteHeader });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get site Header -----//
  getSiteHeader: asyncHandler(async (req, res, next) => {
    try {
      const headerId = req.body.headerId;
      const header = await SiteHeader.findById(headerId);
      res.status(200).json({ header: header });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of site headers -----//
  getSiteHeaders: asyncHandler(async (req, res, next) => {
    try {
      const headers = await SiteHeader.find({});
      res.status(200).json({ headers: headers });
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = { siteMethods, siteHeaderMethods };
