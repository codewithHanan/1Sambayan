const express = require("express");
const router = express.Router();

// Controller Functions //
const accountMethods = require("../../methods/User/account");
const { editProfile } = require("../../methods/User/profile");
const { protect } = require("../../middlewares/auth");

//----- Edit Profile -----//
router.post("/edit-profile", protect, editProfile);

module.exports = router;
