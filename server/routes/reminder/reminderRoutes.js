const express = require("express");

const {
  getReminderSettings,
  updateReminderSettings,
} = require("../../controllers/reminder/reminderController");

const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/reminder-settings",
  authMiddleware,
  getReminderSettings
);

router.put(
  "/reminder-settings",
  authMiddleware,
  updateReminderSettings
);

module.exports = router;