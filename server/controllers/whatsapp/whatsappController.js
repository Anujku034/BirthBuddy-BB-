const WhatsApp = require("../../models/WhatsApp");

const connectWhatsApp = async(req,res) => {
    try{
        const {phoneNumber,confirmPhoneNumber} = req.body;
        const userId = req.user.userId;
        if(!phoneNumber || !confirmPhoneNumber){
            return res.status(400).json({
                message: "WhatsApp number and confrimation number are required",
            });

        }
        if(phoneNumber !== confirmPhoneNumber){
            return res.status(400).json({
                message: "WhatsApp numbers do not match",
            });
        }
        const existingWhatsApp = await WhatsApp.findOne({
            userId,
        });
        if(existingWhatsApp){
            existingWhatsApp.phoneNumber = phoneNumber;
            existingWhatsApp.connected = true,
            existingWhatsApp.connectedAt = new Date();
            
            await existingWhatsApp.save();

            return res.status(200).json({
                message: "WhatsApp connected successfully",
                whatsapp: existingWhatsApp,
            });
        }
        const whatsapp = await WhatsApp.create({
            userId,
            phoneNumber,
            connected: true,
            connectedAt: new Date(),
        });
        return res.status(201).json({
            message: "WhatsApp connected successfully",
            whatsapp,
        });

    }
    catch(error){
        console.log("CONNECT WHATSAPP ERROR:", error);

        return res.status(500).json({
            message: "Failed to connect WhatsApp",
        });
    }
};
const disconnectWhatsApp = async(req,res) => {
    try{
        const userId = req.user.userId;
        const whatsapp = await WhatsApp.findOne({
            userId,

        });
        if(!whatsapp){
            return res.status(404).json({
                message: "WhatsApp connection not found",
            });
        }
        whatsapp.connected = false;
        whatsapp.connectedAt = null;

        await whatsapp.save();
        
        return res.status(200).json({
            message: "WhatsApp disconnected successfully",
        });

    }catch(error) {
        console.error("DISCONNECT WHATSAPP ERROR:", error);

        return res.status(500).json({
            message: "Failed to disconnect WhatsApp",
        });
    }
};
const getWhatsAppStatus = async(req,res) => {
    try{
        const userId = req.user.userId;

        const whatsapp = await WhatsApp.findOne({
            userId,
        });
        if(!whatsapp){
            return res.status(200).json({
                connected: false,
                phoneNumber: null,
            });
        }
        return res.status(200).json({
            connected: whatsapp.connected,
            phoneNumber: whatsapp.phoneNumber,

        });

    }catch(error){
        console.error("GET WHATSAPP STATUS ERROR:", error);
        return res.status(500).json({
            message: "Failed to fetch WhatsApp status",
        });
    }
};

module.exports = {connectWhatsApp,disconnectWhatsApp,getWhatsAppStatus,};