const express = require("express");
const router = express.Router();

// Controller Functions //
const { create, update } = require("../../methods/Site/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- Create Site -----//
router.post("/create-site", [protect, authorize("admin")], create);
router.put("/update-site", [protect, authorize("admin")], update);

module.exports = router;
