const cron = require("node-cron");
const BirthdayReminderLog = require("../models/BirthdayReminderLog");
const ReminderSettings = require("../models/ReminderSettings");
const WhatsApp = require("../models/WhatsApp");
const Person = require("../models/person");
const { sendBirthdayReminder } = require("../services/whatsappService");
const User = require("../models/User");
const startBirthdayReminderScheduler = () => {
    cron.schedule("* * * * *", async () => {
        try{
            const now = new Date();
            const currentTime = now.toLocaleTimeString("en-IN",{
                timeZone: "Asia/Kolkata",
                hour:"2-digit",
                minute: "2-digit",
                hour12: false,
            });
            console.log("Scheduler checking:", currentTime);
            const reminderSettings = await ReminderSettings.find({
                reminderTime: currentTime,
            });
            if(reminderSettings.length === 0) {
                return;
            }
            for(const settings of reminderSettings){
                const userId = settings.userId;
                const whatsapp = await WhatsApp.findOne({
                    userId,
                    connected: true,
                });
                if(!whatsapp){
                    console.log(`WhatsApp not connected for user ${userId}`);
                    continue;
                }
                const today = new Date();
                const persons = await Person.find({
                    userId,
                });
                for(const person of persons) {
                    const birthDate = new Date(person.dateOfBirth);
                    if(birthDate.getMonth() === today.getMonth() && birthDate.getDate() === today.getDate()){
                        const birthdayDate = new Date(
                        today.getFullYear(),
                        birthDate.getMonth(),
                        birthDate.getDate()
                        );

                        const existingLog = await BirthdayReminderLog.findOne({
                        userId,
                        personId: person._id,
                        birthdayDate,
                        });

                        if (existingLog) {
                        console.log(
                            `⏭️ Reminder already processed for ${person.fullName}`
                        );
                        continue;
                        }
                        const user = await User.findById(userId);
                        if (!user) {
                        console.log(`User not found: ${userId}`);
                        continue;
                        }

                        try {
                        await sendBirthdayReminder({
                            phoneNumber: whatsapp.phoneNumber,
                            userName: user.fullName,
                            birthdayPersonName: person.fullName,
                        });
                        await BirthdayReminderLog.create({
                            userId,
                            personId: person._id,
                            birthdayDate,
                            status: "sent",
                            sentAt: new Date(),
                        });
                        console.log(
                            `✅ Birthday reminder sent to ${user.fullName}`
                        );
                        } catch (error) {
                        console.error(
                            `❌ Failed to send birthday reminder for ${person.fullName}`
                        );
                        }
                    }
                }
            } 
        }
        catch(error){
            console.error("BIRTHDAY REMINDER SCHEDULER ERROR:",error);
        }
    })
    console.log("🎂 Birthday reminder scheduler started");
}
module.exports = startBirthdayReminderScheduler;