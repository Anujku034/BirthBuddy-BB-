const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:birthbuddy.app@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const sendPushNotification = async (subscription, data) => {
  try {
    const payload = JSON.stringify(data);

    const response = await webpush.sendNotification(
      subscription,
      payload
    );

    console.log("Push notification sent successfully");

    return response;
  } catch (error) {
    console.error(
      "SEND PUSH NOTIFICATION ERROR:",
      error.body || error.message
    );

    throw error;
  }
};

module.exports = {
  sendPushNotification,
};