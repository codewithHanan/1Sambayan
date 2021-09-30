const express = require("express");
const router = express.Router();

// Controller Functions //
const {
  create,
  update,
  getEvent,
  getEvents,
  search,
} = require("../../methods/Event/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- EVENT -----//
router.get("/", getEvent);
router.get("/event-list", getEvents);
router.post("/create", [protect, authorize("admin")], create);
router.put("/update", [protect, authorize("admin")], update);
router.put("/search", search);

module.exports = router;
