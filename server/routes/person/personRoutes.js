const express = require("express");
const{createPerson,getAllPersons,deletePerson,updatePerson,getPersonById} = require("../../controllers/addperson/personController");
const authMiddleware = require("../../middleware/authMiddleware");
const upload = require("../../middleware/upload");
const router = express.Router();

router.post("/add-person",authMiddleware,upload.single("profilePhoto"),createPerson);
router.get("/persons",authMiddleware,getAllPersons);
router.delete("/persons/:id",authMiddleware,deletePerson);
router.put("/persons/:id",authMiddleware, upload.single("profilePhoto"),updatePerson);
router.get("/persons/:id",authMiddleware,getPersonById);
module.exports = router;