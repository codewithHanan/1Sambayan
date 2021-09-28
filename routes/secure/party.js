const express = require("express");
const router = express.Router();

// Controller Functions //
const { create, update, getParties, getParty } = require("../../methods/Party/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- POST -----//
router.get("/", getParty);
router.get("/party-list", [protect, authorize("admin")], getParties);
router.post("/create", [protect, authorize("admin")], create);
router.put("/update", [protect, authorize("admin")], update);

module.exports = router;
