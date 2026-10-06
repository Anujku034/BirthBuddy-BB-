const express = require("express");

const {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = require("../../controllers/notification/notificationController");

const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/notifications",
  authMiddleware,
  getNotifications
);

router.get(
  "/notifications/unread-count",
  authMiddleware,
  getUnreadNotificationCount
);

router.put(
  "/notifications/:id/read",
  authMiddleware,
  markNotificationAsRead
);

router.put(
  "/notifications/read-all",
  authMiddleware,
  markAllNotificationsAsRead
);

module.exports = router;