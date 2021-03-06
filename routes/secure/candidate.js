const express = require("express");
const router = express.Router();

// Controller Functions //
const { create, update, getCandidates, getCandidate } = require("../../methods/Candidate/cud");
const { protect, authorize } = require("../../middlewares/auth");

//----- POST -----//
router.get("/", getCandidate);
router.get("/cadidate-list", [protect, authorize("admin")], getCandidates);
router.post("/create", [protect, authorize("admin")], create);
router.put("/update", [protect, authorize("admin")], update);

module.exports = router;
