const express = require("express");
const router = express.Router();

// Controller Functions //
const { siteMethods, siteHeaderMethods } = require("../../methods/Site/cud");
const { create, update, getSite } = siteMethods;
const { protect, authorize } = require("../../middlewares/auth");

//----- Site -----//
router.get("/", [protect, authorize("admin")], getSite);
router.post("/create-site", [protect, authorize("admin")], create);
router.put("/update-site", [protect, authorize("admin")], update);

//----- Site Header-----//
router.get("/", [protect, authorize("admin")], siteHeaderMethods.getSiteHeader);
router.get(
  "/header-list",
  [protect, authorize("admin")],
  siteHeaderMethods.getSiteHeaders
);
router.post(
  "/create-header",
  [protect, authorize("admin")],
  siteHeaderMethods.create
);
router.put(
  "/update-header",
  [protect, authorize("admin")],
  siteHeaderMethods.update
);

module.exports = router;
