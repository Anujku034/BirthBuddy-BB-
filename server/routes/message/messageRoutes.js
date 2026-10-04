const express = require("express");
const {getTodaysBirthdays,sendBirthdayMessage} = require("../../controllers/message/messageController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();
router.get("/todays-birthdays",authMiddleware,getTodaysBirthdays);
router.post("/send-birthday-message",authMiddleware,sendBirthdayMessage);








module.exports = router;