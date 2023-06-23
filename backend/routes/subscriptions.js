const express = require("express");
const { checkAuth } = require("../middlewares/checkAuth");
const {
  getSubscriptionPrices,
  stripeSession,
} = require("../controllers/subscriptions");
const router = express.Router();

router.get("/subscriptions", checkAuth, getSubscriptionPrices);
router.post("/stripe-session", checkAuth, stripeSession);

module.exports = router;
