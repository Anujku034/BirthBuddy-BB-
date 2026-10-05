const ReminderSettings = require("../../models/ReminderSettings");

const getReminderSettings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const settings = await ReminderSettings.findOne({
      userId,
    });

    if (!settings) {
      return res.status(200).json({
        reminderTime: "09:00",
      });
    }

    return res.status(200).json({
      reminderTime: settings.reminderTime,
    });
  } catch (error) {
    console.error("GET REMINDER SETTINGS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch reminder settings",
    });
  }
};

const updateReminderSettings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reminderTime } = req.body;

    if (!reminderTime) {
      return res.status(400).json({
        message: "Reminder time is required",
      });
    }

    const settings = await ReminderSettings.findOneAndUpdate(
      { userId },
      {
        reminderTime,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Reminder time updated successfully",
      reminderTime: settings.reminderTime,
    });
  } catch (error) {
    console.error("UPDATE REMINDER SETTINGS ERROR:", error);

    return res.status(500).json({
      message: "Failed to update reminder settings",
    });
  }
};

module.exports = {
  getReminderSettings,
  updateReminderSettings,
};