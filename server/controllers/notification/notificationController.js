const Notification = require("../../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const notifications = await Notification.find({
      userId,
    })
      .populate("personId", "fullName phone profilePhoto")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
};

const getUnreadNotificationCount = async (req, res) => {
  try {
    const userId = req.user.userId;

    const count = await Notification.countDocuments({
      userId,
      read: false,
    });

    return res.status(200).json({
      count,
    });
  } catch (error) {
    console.error("GET UNREAD NOTIFICATION COUNT ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch unread notification count",
    });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        read: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("MARK NOTIFICATION READ ERROR:", error);

    return res.status(500).json({
      message: "Failed to mark notification as read",
    });
  }
};

const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Notification.updateMany(
      {
        userId,
        read: false,
      },
      {
        read: true,
      }
    );

    return res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("MARK ALL NOTIFICATIONS READ ERROR:", error);

    return res.status(500).json({
      message: "Failed to mark all notifications as read",
    });
  }
};

module.exports = {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};