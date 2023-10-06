const express = require("express");
const onboardingController = require("../controllers/onboardingController");

const router = express.Router();

router
  .route("/")
  .get(onboardingController.getViews)
  .post(onboardingController.getMail);

module.exports = router;
