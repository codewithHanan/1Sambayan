const asyncHandler = require("../../middlewares/async");
const Community = require("../../models/Coummunity/Coummunity");

const methods = {
  //----- Create Community -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, image, video } = req.body.props;
      const ownerId = req.user._id;

      // Saving User in DataBase
      const community = await Community.create({
        title,
        description,
        image,
        video,
        owner: ownerId,
      });

      res.status(200).json({ community });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Community -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, designation, image, video, communityId } =
        req.body.props;

      let community = await Community.findById(communityId);

      if (title) {
        community.title = title;
      }
      if (description) {
        community.description = description;
      }
      if (designation) {
        community.designation = designation;
      }
      if (image) {
        community.image = image;
      }

      const updatedCommunity = await community.save();

      res
        .status(200)
        .json({ message: "Success!", Community: updatedCommunity });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get Event -----//
  getCommunity: asyncHandler(async (req, res, next) => {
    try {
      const communityId = req.body.communityId;
      const community = await Community.findById(communityId);
      res.status(200).json({ community });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of Events -----//
  getCommunities: asyncHandler(async (req, res, next) => {
    try {
      const communities = await Community.find({});
      res.status(200).json({ communities });
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = methods;
