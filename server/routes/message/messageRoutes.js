const express = require("express");
const {getTodaysBirthdays,sendBirthdayMessage,updateMessageStatus,getRecentMessages} = require("../../controllers/message/messageController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();
router.get("/todays-birthdays",authMiddleware,getTodaysBirthdays);
router.post("/send-birthday-message",authMiddleware,sendBirthdayMessage);
router.put("/messages/:messageId/status",authMiddleware,updateMessageStatus);
router.get("/recent-messages",authMiddleware,getRecentMessages);







module.exports = router;