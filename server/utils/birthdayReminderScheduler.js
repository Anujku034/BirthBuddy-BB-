const cron = require("node-cron");
const ReminderSettings = require("../models/ReminderSettings");
const Notification = require("../models/Notification");
const Person = require("../models/person");
const User = require("../models/User");

const {
  sendBirthdayReminderEmail,
} = require("../services/emailService");

const startBirthdayReminderScheduler = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const currentTime = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      console.log("Scheduler checking:", currentTime);

      const reminderSettings = await ReminderSettings.find({
        reminderTime: currentTime,
      });

      if (reminderSettings.length === 0) {
        return;
      }

      for (const settings of reminderSettings) {
        const userId = settings.userId;

        const user = await User.findById(userId);

        if (!user) {
          console.log(`User not found: ${userId}`);
          continue;
        }

        const today = new Date();

        const persons = await Person.find({
          userId,
        });

        const todaysBirthdays = [];
        let newNotificationCreated = false;

        for (const person of persons) {
          const birthDate = new Date(person.dateOfBirth);

          if (
            birthDate.getMonth() === today.getMonth() &&
            birthDate.getDate() === today.getDate()
          ) {
            todaysBirthdays.push(person);

            const existingNotification =
              await Notification.findOne({
                userId,
                personId: person._id,
                type: "birthday",
                createdAt: {
                  $gte: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  ),
                  $lt: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() + 1
                  ),
                },
              });

            if (!existingNotification) {
              await Notification.create({
                userId,
                type: "birthday",
                title: `${person.fullName}'s birthday 🎂`,
                message: `Today is ${person.fullName}'s birthday. Don't forget to wish them!`,
                personId: person._id,
              });

              newNotificationCreated = true;

              console.log(
                `🔔 Notification created for ${person.fullName}`
              );
            } else {
              console.log(
                `⏭️ Notification already exists for ${person.fullName}`
              );
            }
          }
        }

        // No birthdays or email already sent
        if (
          todaysBirthdays.length === 0 ||
          !newNotificationCreated
        ) {
          continue;
        }

        const names = todaysBirthdays.map(
          (person) => person.fullName
        );

        try {
          await sendBirthdayReminderEmail(
            user.email,
            user.fullName,
            todaysBirthdays
          );

          console.log(
            `📧 Birthday reminder email sent to ${user.email}`
          );
        } catch (error) {
          console.error(
            `❌ Failed to send birthday reminder email to ${user.email}:`,
            error.message
          );
        }
      }
    } catch (error) {
      console.error(
        "BIRTHDAY REMINDER SCHEDULER ERROR:",
        error
      );
    }
  });

  console.log("🎂 Birthday reminder scheduler started");
};

module.exports = startBirthdayReminderScheduler;