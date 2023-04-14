const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  // checkout,
  // paymentVerification,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
// router.route("/payment/process").post(isAuthenticatedUser, checkout);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;