const express = require("express");
const router = express.Router();

// Controller Functions //
const { registerUser, login } = require("../../methods/User/account");
const { forgotPassword } = require("../../methods/User/profile");

//----- USER Registration -----//
router.post("/register", registerUser);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

module.exports = router;
