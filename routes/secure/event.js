const express = require("express");
const router = express.Router();

// Controller Functions //
const {
  create,
  update,
  getEvent,
  getEvents,
} = require("../../methods/Event/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- EVENT -----//
router.get("/", [protect, authorize("admin")], getEvent);
router.get("/event-list", [protect, authorize("admin")], getEvents);
router.post("/create", [protect, authorize("admin")], create);
router.put("/update", [protect, authorize("admin")], update);

module.exports = router;
