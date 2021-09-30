const asyncHandler = require("../../middlewares/async");
const Event = require("../../models/Event/Event");

const methods = {
  //----- Create Event -----//
  create: asyncHandler(async (req, res, next) => {
    try {
      const { title, description } = req.body.props;
      let video, image;

      if (req.files.video) {
        video = req.files.video[0].filename;
      }
      if (req.files.image) {
        image = req.files.image[0].filename;
      }
      const ownerId = req.user._id;

      // Saving User in DataBase
      const event = await Event.create({
        title,
        description,
        image,
        video,
        owner: ownerId,
      });

      res.status(200).json({ event: event });
    } catch (err) {
      next(err);
    }
  }),

  //----- Update Event -----//
  update: asyncHandler(async (req, res, next) => {
    try {
      const { title, description, eventId } = req.body.props;
      let video, image;

      if (req.files.video) {
        video = req.files.video[0].filename;
      }
      if (req.files.image) {
        image = req.files.image[0].filename;
      }
      let event = await Event.findById(eventId);

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

      const updatedEvent = await event.save();

      res.status(200).json({ message: "Success!", Event: updatedEvent });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get Event -----//
  getEvent: asyncHandler(async (req, res, next) => {
    try {
      const eventId = req.body.eventId;
      const event = await Event.findById(eventId);
      res.status(200).json({ event });
    } catch (err) {
      next(err);
    }
  }),

  //----- Get list of Events -----//
  getEvents: asyncHandler(async (req, res, next) => {
    try {
      const events = await Event.find({});
      res.status(200).json({ events });
    } catch (err) {
      next(err);
    }
  }),

  //----- Search Event -----//
  search: asyncHandler(async (req, res, next) => {
    try {
      const title = req.body.title;
      const events = await Event.find({ title: title });
      res.status(200).json({ events });
    } catch (err) {
      next(err);
    }
  }),
};

module.exports = methods;
