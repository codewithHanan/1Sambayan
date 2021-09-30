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
const upload = require("../../services/multer");

//----- Community -----//
router.get("/", getCommunity);
router.get("/community-list", getCommunities);
router.post(
  "/create",
  [protect, authorize("admin"), upload.single("image")],
  create
);
router.put(
  "/update",
  [protect, authorize("admin"), upload.single("image")],
  update
);

module.exports = router;
