const mongoose = require("mongoose");
const reminderSettingsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,

        },
        reminderTime: {
            type: String,
            default: "9:00",
        },

    },
    {
        timestamps: true,
    }
);

const ReminderSettings = mongoose.model(
    "ReminderSettings",
    reminderSettingsSchema
);

module.exports = ReminderSettings;