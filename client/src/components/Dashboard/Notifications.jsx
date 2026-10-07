import React, { useContext, useEffect, useState } from "react";
import { Bell, Cake, CheckCheck } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
const Notifications = () => {
  const { accessToken } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    try {
      const response = await axiosInstance.get(
        "/notifications",
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
      await axiosInstance.put(
        `/notifications/${id}/read`,
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
      await axiosInstance.put(
        "/notifications/read-all",
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

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        className="
          flex
          h-full
          items-center
          justify-center
          bg-[#f8f9fd]
          dark:bg-[#0f0d1b]
        "
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="
              h-8
              w-8
              animate-spin
              rounded-full
              border-2
              border-[#e1d8ff]
              border-t-[#6337ef]
              dark:border-[#30274b]
              dark:border-t-[#9b72ff]
            "
          />

          <p
            className="
              text-sm
              text-[#8c95aa]
              dark:text-[#9c96b2]
            "
          >
            Loading notifications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        h-full
        overflow-y-auto
        bg-[#f8f9fd]
        p-4
        transition-colors
        duration-300

        sm:p-5
        lg:p-6

        dark:bg-[#0f0d1b]
      "
    >
      <div className="mx-auto max-w-[900px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-5 flex items-center justify-between gap-3">

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#eee9ff]
                  shadow-sm

                  dark:bg-[#251b3b]
                "
              >
                <Bell
                  size={17}
                  className="
                    text-[#6337ef]
                    dark:text-[#a77aff]
                  "
                />
              </div>

              <h1
                className="
                  text-xl
                  font-extrabold
                  text-[#20263d]

                  dark:text-white
                "
              >
                Notifications
              </h1>
            </div>

            <p
              className="
                mt-2
                text-xs
                text-[#8c95aa]

                dark:text-[#9c96b2]
              "
            >
              Stay updated with birthday reminders.
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="
                flex
                shrink-0
                items-center
                gap-1.5
                rounded-xl
                border
                border-transparent
                px-3
                py-2
                text-[10px]
                font-bold
                text-[#6337ef]
                transition-all

                hover:bg-[#eeeaff]

                dark:text-[#a77aff]
                dark:hover:bg-[#251b3b]
              "
            >
              <CheckCheck size={14} />
              <span className="hidden sm:inline">
                Mark all as read
              </span>
              <span className="sm:hidden">
                Read all
              </span>
            </button>
          )}
        </div>

        {/* =====================================================
            NOTIFICATIONS LIST
        ===================================================== */}

        <div className="space-y-3">

          {/* ===================================================
              EMPTY STATE
          =================================================== */}

          {notifications.length === 0 ? (
            <div
              className="
                rounded-2xl
                border
                border-[#e5e7ef]
                bg-white
                p-10
                text-center
                shadow-[0_10px_35px_rgba(40,35,80,0.04)]
                transition-colors

                dark:border-[#2b263d]
                dark:bg-[#181522]
                dark:shadow-[0_10px_35px_rgba(0,0,0,0.18)]
              "
            >
              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#f1edff]

                  dark:bg-[#29203f]
                "
              >
                <Bell
                  size={30}
                  className="
                    text-[#a7a1b7]
                    dark:text-[#776d91]
                  "
                />
              </div>

              <h2
                className="
                  text-sm
                  font-bold
                  text-[#20263d]

                  dark:text-white
                "
              >
                No notifications
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#8c95aa]

                  dark:text-[#918aa5]
                "
              >
                Your birthday reminders will appear here.
              </p>
            </div>
          ) : (

            /* =================================================
               NOTIFICATION CARDS
            ================================================= */

            notifications.map((notification) => {
              const person = notification.personId;

              return (
                <div
                  key={notification._id}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    p-4
                    transition-all
                    duration-300

                    hover:-translate-y-[2px]
                    hover:shadow-[0_15px_35px_rgba(55,40,110,0.08)]

                    ${
                      notification.read
                        ? `
                          border-[#e5e7ef]
                          bg-white

                          dark:border-[#2b263d]
                          dark:bg-[#181522]
                        `
                        : `
                          border-[#dcd3ff]
                          bg-[#fcfaff]
                          shadow-[0_8px_25px_rgba(99,55,239,0.05)]

                          dark:border-[#4a3970]
                          dark:bg-[#1e182c]
                          dark:shadow-[0_8px_25px_rgba(130,80,230,0.08)]
                        `
                    }
                  `}
                >

                  {/* Subtle purple glow for unread */}

                  {!notification.read && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-10
                        -top-10
                        h-24
                        w-24
                        rounded-full
                        bg-[#d9ccff]/40
                        blur-2xl

                        dark:bg-[#8051ff]/10
                      "
                    />
                  )}

                  <div className="relative flex items-start gap-3">

                    {/* =========================================
                        PROFILE
                    ========================================= */}

                    {person?.profilePhoto ? (
                      <img
                        src={person.profilePhoto}
                        alt={person.fullName}
                        className="
                          h-11
                          w-11
                          shrink-0
                          rounded-full
                          object-cover
                          ring-2
                          ring-white
                          shadow-md

                          dark:ring-[#29233a]
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#eee9ff]
                          text-[#6337ef]
                          shadow-sm

                          dark:bg-[#29203f]
                          dark:text-[#a77aff]
                        "
                      >
                        <Cake size={19} />
                      </div>
                    )}

                    {/* =========================================
                        CONTENT
                    ========================================= */}

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <h2
                            className="
                              truncate
                              text-sm
                              font-extrabold
                              text-[#20263d]

                              dark:text-white
                            "
                          >
                            {notification.title}
                          </h2>

                          <p
                            className="
                              mt-1
                              text-xs
                              leading-5
                              text-[#6f7890]

                              dark:text-[#aaa4bb]
                            "
                          >
                            {notification.message}
                          </p>

                        </div>

                        {/* Unread dot */}

                        {!notification.read && (
                          <span
                            className="
                              mt-1
                              h-2
                              w-2
                              shrink-0
                              rounded-full
                              bg-[#6337ef]
                              shadow-[0_0_0_4px_rgba(99,55,239,0.10)]

                              dark:bg-[#a77aff]
                              dark:shadow-[0_0_0_4px_rgba(167,122,255,0.10)]
                            "
                          />
                        )}

                      </div>

                      {/* =======================================
                          FOOTER
                      ======================================= */}

                      <div
                        className="
                          mt-3
                          flex
                          flex-col
                          gap-3

                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >

                        <span
                          className="
                            text-[9px]
                            text-[#9aa1b2]

                            dark:text-[#777188]
                          "
                        >
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

                        {/* =====================================
                            WHATSAPP BUTTON
                        ===================================== */}

                        {person && (
                          <button
                            type="button"
                            onClick={() =>
                              handleWishOnWhatsApp(
                                notification
                              )
                            }
                            className="
                              flex
                              w-full
                              items-center
                              justify-center
                              rounded-xl
                              bg-gradient-to-r
                              from-[#6337ef]
                              to-[#7b42f5]
                              px-4
                              py-2.5
                              text-[10px]
                              font-extrabold
                              text-white
                              shadow-[0_8px_20px_rgba(99,55,239,0.20)]
                              transition-all
                              duration-300

                              hover:-translate-y-0.5
                              hover:shadow-[0_12px_25px_rgba(99,55,239,0.28)]

                              active:translate-y-0

                              sm:w-auto
                            "
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