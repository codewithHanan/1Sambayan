const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const Site = require("../../models/Site/Site");
const Candidate = require("../../models/Candidate/Candidate");

const methods = {
  //----- Create Header -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, image, } = req.body.props;
      const ownerId = req.user._id;

      // Saving User in DataBase
      const candidate = await Candidate.create({
        title,

        image,

        owner: ownerId,
      });

      res.status(200).json({ candidate: candidate });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Site Header -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title, image, candidateId } = req.body.props;
      let candidate = await Candidate.findById(candidateId);
      console.log(candidate);

      if (title) {
        candidate.title = title;
      }
      if (image) {
        candidate.image = image;
      }

      const updatedcandidate = await candidate.save();

      res.status(200).json({ message: "Success!", candidate: updatedcandidate });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get site Header -----//
  getCandidate: asyncHandler(async (req, res, next) => {
    try {
      const candidateId = req.body.candidateId;
      const candidate = await Candidate.findById(candidateId);
      res.status(200).json({ candidate: candidate });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of site headers -----//
  getCandidates: asyncHandler(async (req, res, next) => {
    try {
      const candidates = await Candidate.find({});
      res.status(200).json({ candidates: candidates });
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = methods;
