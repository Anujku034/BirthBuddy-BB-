const express = require("express");

const {
  savePushSubscription,
} = require("../../controllers/push/pushController");

const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/push-subscription",
  authMiddleware,
  savePushSubscription
);

module.exports = router;