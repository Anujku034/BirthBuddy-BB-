const PushSubscription = require("../../models/PushSubscription");

const savePushSubscription = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { endpoint, keys } = req.body;

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return res.status(400).json({
        message: "Invalid push subscription",
      });
    }

    const existingSubscription = await PushSubscription.findOne({
      userId,
      endpoint,
    });

    if (existingSubscription) {
      existingSubscription.keys = keys;

      await existingSubscription.save();

      return res.status(200).json({
        message: "Push subscription updated successfully",
      });
    }

    await PushSubscription.create({
      userId,
      endpoint,
      keys,
    });

    return res.status(201).json({
      message: "Push subscription saved successfully",
    });
  } catch (error) {
    console.error("SAVE PUSH SUBSCRIPTION ERROR:", error);

    return res.status(500).json({
      message: "Failed to save push subscription",
    });
  }
};

module.exports = {
  savePushSubscription,
};