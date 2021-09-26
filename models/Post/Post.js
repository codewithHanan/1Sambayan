const mongoose = require("mongoose");

//----- Post SCHEMA -----//
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: [
    {
      type: String,
      required: false,
    },
  ],
  video: [
    {
      type: String,
      required: false,
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
