const nodemailer = require("nodemailer");
const asyncHandler = require("../../middlewares/async");
const Site = require("../../models/Site/Site");
const Post = require("../../models/Post/Post");

const methods = {
  //----- Create Header -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, image, video } = req.body.props;
      const ownerId = req.user._id;

      // Saving User in DataBase
      const post = await Post.create({
        title,
        description,
        image,
        video,
        owner: ownerId,
      });

      res.status(200).json({ post: post });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Site Header -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, image, video, postId } = req.body.props;

      let post = await Post.findById(postId);

      if (title) {
        post.title = title;
      }
      if (description) {
        post.description = description;
      }
      if (image) {
        post.image = image;
      }
      if (video) {
        post.video = video;
      }

      const updatedPost = await post.save();

      res.status(200).json({ message: "Success!", Post: updatedPost });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get site Header -----//
  getPost: asyncHandler(async (req, res, next) => {
    try {
      const postId = req.body.postId;
      const post = await Post.findById(postId);
      res.status(200).json({ post: post });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of site headers -----//
  getPosts: asyncHandler(async (req, res, next) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ posts: posts });
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = methods;
