const express = require("express");
const router = express.Router();

// Controller Functions //
const {
  siteMethods,
  siteHeaderMethods,
  sitePageMethods,
} = require("../../methods/Site/cud");
const { create, update, getSite } = siteMethods;
const { protect, authorize } = require("../../middlewares/auth");

//----- Site -----//
router.get("/", getSite);
router.post("/create-site", [protect, authorize("admin")], create);
router.put("/update-site", [protect, authorize("admin")], update);

//----- Site Header-----//
router.get("/", siteHeaderMethods.getSiteHeader);
router.get("/header-list", siteHeaderMethods.getSiteHeaders);
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

//----- Site Pages-----//
router.get("/pages", sitePageMethods.getPages);
router.post(
  "/create-page",
  [protect, authorize("admin")],
  sitePageMethods.create
);
router.put(
  "/update-page",
  [protect, authorize("admin")],
  sitePageMethods.update
);

module.exports = router;
