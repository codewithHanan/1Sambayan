const mongoose = require("mongoose");

//----- Site SCHEMA -----//
const SiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  video: [
    {
      title: String,
      buttonLink: String,
    },
  ],
  address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    zip: { type: String, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
  footer: {
    type: String,
  },
  url: {
    type: String,
  },
  slogan: {
    type: String,
  },
  copyright: {
    type: String,
  },

  logo: {
    type: String,
  },
  socialMediaLinks: {
    Facebook: String,
    Twitter: String,
    Instagram: String,
    LinkedIn: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Site", SiteSchema);
