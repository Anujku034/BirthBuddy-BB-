const Person = require("../../models/person");
const Message = require("../../models/Message");

// ===============================
// GET TODAY'S BIRTHDAYS
// ===============================
const getTodaysBirthdays = async (req, res) => {
  try {
    const userId = req.user.userId;

    const persons = await Person.find({ userId });

    const today = new Date();

    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    const currentYear = today.getFullYear();

    const todaysBirthdays = [];

    for (const person of persons) {
      const birthDate = new Date(person.dateOfBirth);

      if (
        birthDate.getMonth() === todayMonth &&
        birthDate.getDate() === todayDate
      ) {
        const birthdayDate = new Date(
          currentYear,
          birthDate.getMonth(),
          birthDate.getDate()
        );

        // IMPORTANT:
        // Find ANY existing message for today's birthday,
        // not only a "sent" message.
        const existingMessage = await Message.findOne({
          userId,
          personId: person._id,
          birthdayDate: birthdayDate,
        }).sort({ createdAt: -1 });

        todaysBirthdays.push({
          person,

          status: existingMessage?.status || "pending",

          message: existingMessage || null,
        });
      }
    }

    return res.status(200).json({
      message: "Today's birthdays fetched successfully",

      birthdays: todaysBirthdays,
    });
  } catch (error) {
    console.error("GET TODAY'S BIRTHDAYS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch today's birthdays",
    });
  }
};

// ===============================
// CREATE BIRTHDAY MESSAGE
// ===============================
const sendBirthdayMessage = async (req, res) => {
  try {
    const { personId, message } = req.body;

    const userId = req.user.userId;

    if (!personId || !message) {
      return res.status(400).json({
        message: "Person ID and message are required",
      });
    }

    // Find person belonging to logged-in user
    const person = await Person.findOne({
      _id: personId,
      userId,
    });

    if (!person) {
      return res.status(404).json({
        message: "Person not found",
      });
    }

    const today = new Date();

    const personBirthDate = new Date(person.dateOfBirth);

    const birthdayDate = new Date(
      today.getFullYear(),
      personBirthDate.getMonth(),
      personBirthDate.getDate()
    );

    // Check whether a message already exists
    const existingMessage = await Message.findOne({
      userId,
      personId,
      birthdayDate,
    }).sort({ createdAt: -1 });

    // If already exists, return that message
    if (existingMessage) {
      return res.status(200).json({
        message: "Birthday message already exists",
        data: existingMessage,
      });
    }

    // Create NEW pending message
    const newMessage = await Message.create({
      userId,
      personId,
      message,

      // IMPORTANT:
      // Do NOT mark it as sent here.
      status: "pending",

      channel: "whatsapp",

      // It is not actually sent yet
      sendAt: null,

      birthdayDate,
    });

    return res.status(201).json({
      message: "Birthday message created successfully",

      data: newMessage,
    });
  } catch (error) {
    console.error("SEND BIRTHDAY MESSAGE ERROR:", error);

    return res.status(500).json({
      message: "Failed to create birthday message",
    });
  }
};

// ===============================
// UPDATE MESSAGE STATUS
// ===============================
const updateMessageStatus = async (req, res) => {
  try {
    const { messageId } = req.params;

    const { status } = req.body;

    const userId = req.user.userId;

    // Only these three statuses are allowed
    if (!["pending", "sent", "failed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid message status",
      });
    }

    // Find message belonging to logged-in user
    const message = await Message.findOne({
      _id: messageId,
      userId,
    });

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    // Update status
    message.status = status;

    // If user selects Sent, save the time
    if (status === "sent") {
      message.sendAt = new Date();
    }

    // If changed back to pending/failed
    if (status !== "sent") {
      message.sendAt = null;
    }

    await message.save();

    return res.status(200).json({
      message: "Message status updated successfully",

      data: message,
    });
  } catch (error) {
    console.error("UPDATE MESSAGE STATUS ERROR:", error);

    return res.status(500).json({
      message: "Failed to update message status",
    });
  }
};

// GET RECENT SENT MESSAGES
const getRecentMessages = async (req, res) => {
  try {
    const userId = req.user.userId;

    const messages = await Message.find({
      userId,
      status: "sent",
    })
      .populate(
        "personId",
        "fullName phone profilePhoto"
      )
      .sort({ sendAt: -1 })
      .limit(20);

    const recentMessages = messages.map(
      (message) => ({
        _id: message._id,

        name:
          message.personId?.fullName ||
          "Unknown",

        message: message.message,

        date: message.sendAt,

        status: message.status,

        profilePhoto:
          message.personId?.profilePhoto ||
          null,

        phone:
          message.personId?.phone ||
          "",
      })
    );

    return res.status(200).json({
      message:
        "Recent messages fetched successfully",

      messages: recentMessages,
    });
  } catch (error) {
    console.error(
      "GET RECENT MESSAGES ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch recent messages",
    });
  }
};
module.exports = {
  getTodaysBirthdays,
  sendBirthdayMessage,
  updateMessageStatus,
  getRecentMessages,
};