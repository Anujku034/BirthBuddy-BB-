const PushSubscription = require("../../models/PushSubscription");
const webpush = require("../../services/pushService");

// Save push subscription
const subscribeToPush = async (req, res) => {
  try {
    const userId = req.user.userId;
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({
        message: "Invalid push subscription",
      });
    }

    const existingSubscription = await PushSubscription.findOne({
      userId,
      endpoint: subscription.endpoint,
    });

    if (existingSubscription) {
      return res.status(200).json({
        message: "Push subscription already exists",
      });
    }

    await PushSubscription.create({
      userId,
      endpoint: subscription.endpoint,
      keys: subscription.keys,
    });

    return res.status(201).json({
      message: "Push notification subscription successful",
    });
  } catch (error) {
    console.error("SUBSCRIBE PUSH ERROR:", error);

    return res.status(500).json({
      message: "Failed to subscribe to push notifications",
    });
  }
};

// Send push notification
const sendPushNotification = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, message } = req.body;

    const subscriptions = await PushSubscription.find({
      userId,
    });

    if (subscriptions.length === 0) {
      return res.status(404).json({
        message: "No push subscription found",
      });
    }

    const payload = JSON.stringify({
      title,
      message,
    });

    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: subscription.keys,
          },
          payload
        );
      } catch (error) {
        console.error("PUSH SEND ERROR:", error.message);

        // Remove expired/invalid subscription
        if (error.statusCode === 404 || error.statusCode === 410) {
          await PushSubscription.deleteOne({
            _id: subscription._id,
          });
        }
      }
    }

    return res.status(200).json({
      message: "Push notification sent successfully",
    });
  } catch (error) {
    console.error("SEND PUSH ERROR:", error);

    return res.status(500).json({
      message: "Failed to send push notification",
    });
  }
};

module.exports = {
  subscribeToPush,
  sendPushNotification,
};