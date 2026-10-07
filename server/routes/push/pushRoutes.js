const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const {
  subscribeToPush,
  sendPushNotification,
} = require("../../controllers/push/pushController");

router.post(
  "/subscribe",
  authMiddleware,
  subscribeToPush
);

router.post(
  "/send",
  authMiddleware,
  sendPushNotification
);

module.exports = router;