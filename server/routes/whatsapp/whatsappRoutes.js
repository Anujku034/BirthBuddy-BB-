const express = require("express");

const {connectWhatsApp,disconnectWhatsApp,getWhatsAppStatus,} = require("../../controllers/whatsapp/whatsappController");

const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/connect-whatsapp",authMiddleware,connectWhatsApp);
router.post("/disconnect-whatsapp",authMiddleware,disconnectWhatsApp);
router.get("/whatsapp-status",authMiddleware,getWhatsAppStatus);


module.exports = router;