const  mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,

        },
        profilePhoto: {
            type:String,
        },
        notes: {
            type: String,
            trim: true,
        },
        sendWhatsAppReminder: {
            type: Boolean,
            default: false,
        },
        customMessage: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

const Person = mongoose.model("Person",personSchema);
module.exports = Person;
