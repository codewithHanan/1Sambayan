const express = require("express");
const router = express.Router();

// Controller Functions //
const { create, update, getPosts, getPost } = require("../../methods/Post/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- POST -----//
router.get("/", [protect, authorize("admin")], getPost);
router.get("/post-list", [protect, authorize("admin")], getPosts);
router.post("/create", [protect, authorize("admin")], create);
router.put("/update", [protect, authorize("admin")], update);

module.exports = router;
