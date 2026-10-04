const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        personId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
            required: true,

        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        status:{
            type: String,
            enum:["send","delivered","pending","failed"],
            default: "pending",
        },
        channel:{
            type:String,
            enum:["whatsapp"],
            default:"whatsapp",
        },
        sendAt:{
            type:Date,
            default:Date.now,
        },

    },{
        timestamps:true,
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;