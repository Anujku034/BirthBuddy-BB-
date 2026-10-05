const mongoose = require("mongoose");

const whatsappSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        connected: {
            type: Boolean,
            default: false,
        },
        connectedAt: {
            type: Date,
            default: null,

        },
    },
    {
        timestamps: true,
    }
);

const WhatsApp = mongoose.model("WhatsApp",whatsappSchema);
module.exports = WhatsApp;

