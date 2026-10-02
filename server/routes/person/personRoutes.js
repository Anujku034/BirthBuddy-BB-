const express = require("express");
const{createPerson} = require("../../controllers/addperson/personController");
const authMiddleware = require("../../middleware/authMiddleware");
const upload = require("../../middleware/upload");
const router = express.Router();

router.post("/add-person",authMiddleware,upload.single("profilePhoto"),createPerson);
module.exports = router;