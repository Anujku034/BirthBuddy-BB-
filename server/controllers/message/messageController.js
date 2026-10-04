const Person = require("../../models/person");
const Message = require("../../models/Message");

const getTodaysBirthdays = async(req,res) => {
    try{
        const userId = req.user.userId;
        // Get all persons of logged-in user
        const persons = await Person.find({
            userId,
        });
        const today = new Date();
        
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();
        const currentYear = today.getFullYear();

        const todaysBirthdays = [];

        for(const person of persons){
            const birthDate = new Date(person.dateOfBirth);
            // check birthday month and date
            if(birthDate.getMonth() === todayMonth && birthDate.getDate() === todayDate){
                // this year's birthday
                const birthdayDate = new Date(
                    currentYear,
                    birthDate.getMonth(),
                    birthDate.getDate()
                );
                // check whether message already sent for this birthday
                const sentMessage = await Message.findOne({
                    userId,
                    personId: person._id,
                    birthdayDate:birthdayDate,
                    status:"sent",
                });
                todaysBirthdays.push({
                    person,
                    status: sentMessage ? "sent" : "pending",
                    message: sentMessage || null,
                });
            }
        }
        return res.status(200).json({
            message:"Today's birthdays fetched successfully",
            birthdays: todaysBirthdays,
        });
    }catch(error){
        console.error("GET TODAY'S BIRTHDAYS ERROR:",error);
        return res.status(500).json({
            message:"Failed to fetch today's birthdays",
        });
    }
};
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

    const birthdayDate = new Date(
      today.getFullYear(),
      new Date(person.dateOfBirth).getMonth(),
      new Date(person.dateOfBirth).getDate()
    );

    // Check if already sent today
    const existingMessage = await Message.findOne({
      userId,
      personId,
      birthdayDate,
      status: "sent",
    });

    if (existingMessage) {
      return res.status(400).json({
        message: "Birthday message already sent",
      });
    }

    const newMessage = await Message.create({
      userId,
      personId,
      message,
      status: "sent",
      sentAt: new Date(),
      birthdayDate,
    });

    return res.status(201).json({
      message: "Birthday message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    console.error("SEND BIRTHDAY MESSAGE ERROR:", error);

    return res.status(500).json({
      message: "Failed to send birthday message",
    });
  }
};
module.exports = {getTodaysBirthdays,sendBirthdayMessage};