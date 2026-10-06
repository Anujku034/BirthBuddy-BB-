import React, { useContext, useEffect, useState } from "react";
import { Bell, Cake, CheckCheck } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Notifications = () => {
  const { accessToken } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("GET NOTIFICATIONS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("MARK NOTIFICATION READ ERROR:", error);
    }
  };

  const handleWishOnWhatsApp = async (notification) => {
    const person = notification.personId;

    if (!person?.phone) {
      alert("WhatsApp number is not available");
      return;
    }

    await markAsRead(notification._id);

    const message = `Happy Birthday ${person.fullName}! 🎂🎉`;

    const whatsappUrl = `https://wa.me/${person.phone.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error(
        "MARK ALL NOTIFICATIONS READ ERROR:",
        error
      );
    }
  };

  useEffect(() => {
    if (accessToken) {
      getNotifications();
    }
  }, [accessToken]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-[#8c95aa]">
          Loading notifications...
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#f8f9fd] p-5">
      <div className="mx-auto max-w-[900px]">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-[#20263d]">
              Notifications
            </h1>

            <p className="mt-1 text-xs text-[#8c95aa]">
              Stay updated with birthday reminders.
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-[10px] font-bold text-[#6337ef] hover:bg-[#eeeaff]"
            >
              <CheckCheck size={14} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="rounded-xl border border-[#e5e7ef] bg-white p-10 text-center">
              <Bell
                size={32}
                className="mx-auto mb-3 text-[#b5bbca]"
              />

              <h2 className="text-sm font-bold text-[#20263d]">
                No notifications
              </h2>

              <p className="mt-1 text-xs text-[#8c95aa]">
                Your birthday reminders will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const person = notification.personId;

              return (
                <div
                  key={notification._id}
                  className={`rounded-xl border bg-white p-4 ${
                    notification.read
                      ? "border-[#e5e7ef]"
                      : "border-[#dcd3ff] bg-[#fcfaff]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Profile */}
                    {person?.profilePhoto ? (
                      <img
                        src={person.profilePhoto}
                        alt={person.fullName}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eee9ff] text-[#6337ef]">
                        <Cake size={19} />
                      </div>
                    )}

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-sm font-extrabold text-[#20263d]">
                            {notification.title}
                          </h2>

                          <p className="mt-1 text-xs leading-5 text-[#6f7890]">
                            {notification.message}
                          </p>
                        </div>

                        {!notification.read && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6337ef]" />
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[9px] text-[#9aa1b2]">
                          {new Date(
                            notification.createdAt
                          ).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>

                        {person && (
                          <button
                            type="button"
                            onClick={() =>
                              handleWishOnWhatsApp(
                                notification
                              )
                            }
                            className="rounded-md bg-[#6337ef] px-4 py-2 text-[10px] font-extrabold text-white hover:bg-[#5428d8]"
                          >
                            Wish on WhatsApp
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;