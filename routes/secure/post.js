const express = require("express");
const router = express.Router();

// Controller Functions //
const {
  create,
  update,
  getPosts,
  getPost,
  search,
  deletePost,
} = require("../../methods/Post/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- POST -----//
router.get("/", getPost);
router.get("/post-list", getPosts);
router.post("/create", [protect, authorize("admin")], create);
router.put("/update", [protect, authorize("admin")], update);
router.put("/search", search);
router.delete("/delete-post", deletePost);

module.exports = router;
