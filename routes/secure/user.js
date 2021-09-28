const express = require("express");
const router = express.Router();

// Controller Functions //
const accountMethods = require("../../methods/User/account");
const { editProfile, getProfile,updateProfile } = require("../../methods/User/profile");
const { protect } = require("../../middlewares/auth");

//----- Edit Profile -----//
router.post("/edit-profile", protect, editProfile);
router.put("/update-profile", protect, updateProfile);

//----- Get Profile -----//
router.get("/profile", protect, getProfile);

module.exports = router;
