const mongoose = require("mongoose");

const birthdayReminderLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    personId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },

    birthdayDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["sent", "failed"],
      default: "sent",
    },

    sentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

birthdayReminderLogSchema.index(
  {
    userId: 1,
    personId: 1,
    birthdayDate: 1,
  },
  {
    unique: true,
  }
);

const BirthdayReminderLog = mongoose.model(
  "BirthdayReminderLog",
  birthdayReminderLogSchema
);

module.exports = BirthdayReminderLog;