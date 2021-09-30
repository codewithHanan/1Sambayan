const express = require("express");
const router = express.Router();

// Controller Functions //
const {
  create,
  update,
  getCommunity,
  getCommunities,
} = require("../../methods/Community/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- Community -----//
router.get("/", getCommunity);
router.get("/community-list", getCommunities);
router.post("/create", [protect, authorize("admin")], create);
router.put("/update", [protect, authorize("admin")], update);

module.exports = router;
