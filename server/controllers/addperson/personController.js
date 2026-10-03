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
            ? req.file.path
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
// Get all persons of logged-in user
const getAllPersons = async (req, res) => {
    try{
        const persons = await Person.find({
            userId: req.user.userId,

        }).sort({createAt:1});
        return res.status(200).json({
            message: "Person fetched successfully",
            persons,
        });

    }catch(error){
        console.error("GET PERSON ERROR:",error);
        return res.status(500).json({
            message: "Failed to fetch persons",
        });
    }
};
const getPersonById = async(req,res) => {
    try{
        const {id} = req.params;
        const person = await Person.findOne({
            _id: id,
            userId: req.user.userId,
        });
        if(!person){
            return res.status(404).json({
                message: "Person not found",
            });
        }
        return res.status(200).json({
            message: "Person fetch successfully",
            person,
        });
    }
    catch(error){
        console.error("GET PERSON ERROR:",error);
        return res.status(500).json({
            message: "Failed to fetch person",
        });
    }
};
const deletePerson = async(req,res) => {
    try{
        const {id} = req.params;
        const person = await Person.findOneAndDelete({
            _id: id,
            userId: req.user.userId,
        });
        if(!person){

            return res.status(404).json({
                message: "Person not found",
            });
        }
        return res.status(200).json({
            message: "Person deleted successfully",
        });
    }catch(error){
        console.error("DELETE PERSON ERROR:", error);
        return res.status(500).json({
            message: "Failed to delete person",
        });
    }
}
const updatePerson = async(req, res) => {
    try{
        const{id} = req.params;
        const {
            fullName,
            phone,
            dateOfBirth,
            notes,
            sendWhatsAppReminder,
            customMessage,

        } = req.body;
        const person = await Person.findOne({
            _id: id,
            userId: req.user.userId,
        });

        if (!person) {
            return res.status(404).json({
                message: "Person not found",
            });
        }

        // Keep old photo if no new photo is uploaded
        const profilePhoto = req.file
            ? req.file.path
            : person.profilePhoto;
        const updatedPerson = await Person.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.userId,
            },
            {
                fullName,
                phone,
                dateOfBirth,
                notes,
                sendWhatsAppReminder,
                customMessage,
            },
            {
                new: true,
                runValidators: true,
            }
           

        );
        if(!updatedPerson){
            return res.status(404).json({
                message: "Person not found",
            });
        }
        return res.status(200).json({
            message: "Person updated successfully",
            person: updatedPerson,
        });
    }catch(error){
        console.error("UPDATE PERSON ERROR:", error);
        return res.status(500).json({
            message: "Failed to update person",
        });
    }
};
module.exports = {createPerson,getAllPersons,deletePerson,updatePerson,getPersonById};