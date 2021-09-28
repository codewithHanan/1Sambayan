const mongoose = require("mongoose");

//----- Event SCHEMA -----//
const CandidateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  image: [
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

module.exports = mongoose.model("Candidate", CandidateSchema);
