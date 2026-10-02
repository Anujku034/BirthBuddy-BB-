const Person = require("../../models/person");

const createPerson = async(req,res) => {
    try{
        const{
            fullName,
            phone,
            dateOfBirth,
            notes,
            sendWhatsAppReminder,
            customMessage,

        } = req.body;
        const profilePhoto = req.file 
            ? `/uploads/${req.file.filename}`
            : null;
        const person = await Person.create({
            userId: req.user.userId,
            fullName,
            phone,
            dateOfBirth,
            profilePhoto,
            notes,
            sendWhatsAppReminder,
            customMessage,
        });
        res.status(201).json({
            message: "Person added successfully",
            person,
        });

    }catch(error){
        console.error("CREATE PERSON ERROR:", error);
        res.status(500).json({
            message: "Failed to add person",
            error: error.message,
        });
    }
};

module.exports = {createPerson};