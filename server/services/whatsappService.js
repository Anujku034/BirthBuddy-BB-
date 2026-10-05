const axios = require("axios");

const sendBirthdayReminder = async ({
  phoneNumber,
  userName,
  birthdayPersonName,
}) => {
  try {
    const url = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: phoneNumber.replace(/\D/g, ""),
        type: "template",
        template: {
          name: "birthday_reminder",
          language: {
            code: "en",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: userName,
                },
                {
                  type: "text",
                  text: birthdayPersonName,
                },
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "Birthday reminder sent successfully:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "SEND BIRTHDAY REMINDER ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = {
  sendBirthdayReminder,
};