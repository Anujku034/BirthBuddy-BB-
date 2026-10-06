import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import {
  MessageSquareText,
  Send,
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  CheckCheck,
  Gift,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import messagesHero from "../../assets/dashboard/messagesHero.png";

// ============================================================
// STATUS STYLES
// ============================================================

const statusStyles = {
  Sent: "bg-[#dcf8eb] text-[#08ae76]",
  Delivered: "bg-[#e1f1ff] text-[#3182d8]",
  Failed: "bg-[#ffe3e9] text-[#ed4760]",
  Pending: "bg-[#fff3e7] text-[#f07832]",
};

// ============================================================
// MAIN COMPONENT
// ============================================================

function Messages() {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected person from left list
  const [selectedBirthday, setSelectedBirthday] = useState(null);

  // Message input
  const [messageText, setMessageText] = useState("");

  const { accessToken, setAccessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  // ============================================================
  // GET TODAY'S BIRTHDAYS
  // ============================================================

  const getTodaysBirthdays = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/todays-birthdays",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBirthdays(response.data.birthdays);

      if (response.data.birthdays.length > 0) {
        setSelectedBirthday((currentSelected) => {
          if (!currentSelected) {
            return response.data.birthdays[0];
          }

          const updatedSelected = response.data.birthdays.find(
            (item) =>
              item.person._id === currentSelected.person._id
          );

          return updatedSelected || response.data.birthdays[0];
        });
      } else {
        setSelectedBirthday(null);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          // Refresh access token
          const refreshResponse = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          const newAccessToken =
            refreshResponse.data.accessToken;

          setAccessToken(newAccessToken);

          // Retry original API
          const retryResponse = await axios.get(
            "http://localhost:3000/api/todays-birthdays",
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          setBirthdays(retryResponse.data.birthdays);

          if (retryResponse.data.birthdays.length > 0) {
            setSelectedBirthday((currentSelected) => {
              if (!currentSelected) {
                return retryResponse.data.birthdays[0];
              }

              const updatedSelected =
                retryResponse.data.birthdays.find(
                  (item) =>
                    item.person._id ===
                    currentSelected.person._id
                );

              return (
                updatedSelected ||
                retryResponse.data.birthdays[0]
              );
            });
          } else {
            setSelectedBirthday(null);
          }
        } catch (refreshError) {
          if (refreshError.response?.status === 401) {
            alert("Session expired. Please login again.");

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      } else {
        console.error(
          "GET TODAY'S BIRTHDAYS ERROR:",
          error
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SEND BIRTHDAY MESSAGE
  // ============================================================

  const sendBirthdayMessage = async (personId, message) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/send-birthday-message",
        {
          personId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert(response.data.message);

      setMessageText("");

      // Refresh today's birthday list
      getTodaysBirthdays();
    } catch (error) {
      console.error("SEND MESSAGE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to send birthday message"
      );
    }
  };

  // ============================================================
  // LOAD DATA
  // ============================================================

  useEffect(() => {
    if (accessToken) {
      getTodaysBirthdays();
    }
  }, [accessToken]);

  useEffect(() => {
    if (selectedBirthday?.status === "pending") {
      setMessageText(
        `Happy birthday, ${selectedBirthday.person.fullName}! 🎉`
      );
    } else {
      setMessageText("");
    }
  }, [selectedBirthday]);

  return (
    <div className="min-h-screen bg-[#f7f8ff] px-3 py-4 sm:px-5 lg:px-7">
      <div className="mx-auto max-w-[1500px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="relative mb-4 h-[150px] overflow-hidden rounded-[18px] border border-white bg-gradient-to-r from-[#faf8ff] via-[#f6efff] to-[#eee7ff] shadow-[0_8px_30px_rgba(73,45,150,0.07)]">

          <div className="absolute -left-16 -top-24 h-56 w-56 rounded-full bg-[#dfcaff]/40 blur-3xl" />

          <div className="absolute right-[30%] -top-20 h-52 w-52 rounded-full bg-[#f6d1ff]/40 blur-3xl" />

          <div className="relative z-10 px-5 pt-5 sm:px-7">
            <div className="flex items-center gap-2">
              <h1 className="text-[27px] font-extrabold tracking-[-0.8px] text-[#101631] sm:text-[32px]">
                Messages
              </h1>

              <MessageSquareText
                size={29}
                strokeWidth={2.4}
                className="text-[#6338ef]"
              />
            </div>

            <p className="mt-0.5 text-[11px] font-medium text-[#78829c] sm:text-[13px]">
              View and manage all the birthday wishes you've sent.
            </p>
          </div>

          <img
            src={messagesHero}
            alt="Birthday messages"
            className="pointer-events-none absolute bottom-[-12px] right-[3%] hidden h-[155px] w-auto object-contain md:block"
          />
        </section>

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <section className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={Send}
            value="24"
            label="Total Messages Sent"
            bg="bg-[#eee9ff]"
            color="text-[#6437ee]"
          />

          <StatCard
            icon={CheckCircle2}
            value="22"
            label="Delivered"
            bg="bg-[#e4faf2]"
            color="text-[#09b879]"
          />

          <StatCard
            icon={Clock3}
            value="1"
            label="Pending"
            bg="bg-[#fff3e7]"
            color="text-[#f07832]"
          />

          <StatCard
            icon={XCircle}
            value="1"
            label="Failed"
            bg="bg-[#ffecef]"
            color="text-[#ee405b]"
          />

        </section>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <section className="grid grid-cols-1 gap-3 xl:grid-cols-[1.05fr_0.95fr]">

          {/* =================================================
              LEFT MESSAGE LIST
          ================================================= */}

          <div className="flex h-[520px] flex-col overflow-hidden rounded-[11px] border border-[#e5e7ef] bg-white shadow-[0_5px_22px_rgba(35,45,90,0.05)]">

            {/* Filters */}

            <div className="shrink-0 border-b border-[#edf0f5] p-2">
              <div className="flex gap-2">

                {/* Search */}

                <div className="relative flex-1">

                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b86a0]"
                  />

                  <input
                    type="text"
                    placeholder="Search messages, people..."
                    className="h-[34px] w-full rounded-[6px] border border-[#dfe2eb] bg-white pl-9 pr-3 text-[10px] outline-none placeholder:text-[#9aa3b6] focus:border-[#7650ee]"
                  />

                </div>

                {/* Time filter */}

                <button
                  type="button"
                  className="flex h-[34px] min-w-[110px] items-center justify-between gap-2 rounded-[6px] border border-[#dfe2eb] px-3 text-[9px] font-semibold text-[#5d6781]"
                >
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    All Time
                  </span>

                  <ChevronDown size={12} />
                </button>

              </div>
            </div>

            {/* Messages */}

            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">

              {loading ? (

                <div className="px-4 py-8 text-center text-[10px] text-[#7c86a0]">
                  Loading birthdays...
                </div>

              ) : birthdays.length === 0 ? (

                <div className="px-4 py-8 text-center text-[10px] text-[#7c86a0]">
                  No birthdays today.
                </div>

              ) : (

                birthdays.map((item) => (
                  <MessageListItem
                    key={item.person._id}
                    message={{
                      id: item.person._id,
                      name: item.person.fullName,
                      date: "Today",

                      message:
                        item.status === "sent"
                          ? "Birthday message sent"
                          : "Birthday message pending",

                      status:
                        item.status === "sent"
                          ? "Sent"
                          : "Pending",

                      // ADDED
                      profilePhoto:
                        item.person.profilePhoto,

                      // ADDED
                      phone: item.person.phone,
                    }}
                    active={
                      selectedBirthday?.person._id ===
                      item.person._id
                    }
                    onClick={() =>
                      setSelectedBirthday(item)
                    }
                  />
                ))

              )}

            </div>
          </div>

          {/* =================================================
              RIGHT MESSAGE PREVIEW
          ================================================= */}

          <div className="flex min-h-[520px] flex-col overflow-hidden rounded-[11px] border border-[#e5e7ef] bg-white shadow-[0_5px_22px_rgba(35,45,90,0.05)]">

            {/* Person Header */}

            <div className="flex items-center justify-between border-b border-[#edf0f5] px-4 py-3">

              <div className="flex items-center gap-3">

                {selectedBirthday?.person.profilePhoto ? (
                  <img
                    src={
                      selectedBirthday.person.profilePhoto
                    }
                    alt={
                      selectedBirthday.person.fullName
                    }
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <ProfilePlaceholder />
                )}

                <div>

                  <h3 className="text-[11px] font-extrabold text-[#171c38]">
                    {selectedBirthday?.person.fullName ||
                      "Select a person"}
                  </h3>

                  <p className="text-[9px] text-[#77829c]">
                    {selectedBirthday?.person.phone ||
                      "No phone number"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <span
                  className={`rounded-[6px] px-3 py-1.5 text-[8px] font-extrabold ${
                    selectedBirthday?.status === "sent"
                      ? "bg-[#dcf8eb] text-[#08ae76]"
                      : "bg-[#fff3e7] text-[#f07832]"
                  }`}
                >
                  {selectedBirthday?.status === "sent"
                    ? "Sent"
                    : "Pending"}
                </span>

                <button type="button">
                  <MoreVertical
                    size={15}
                    className="text-[#69738d]"
                  />
                </button>

              </div>

            </div>

            {/* Date */}

            <div className="flex items-center justify-center border-b border-[#f0f1f6] py-2">

              <span className="rounded-full bg-[#f6f7fb] px-4 py-1 text-[8px] font-semibold text-[#7a849d]">

                {selectedBirthday
                  ? new Date(
                      selectedBirthday.person.dateOfBirth
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "No birthday selected"}

              </span>

            </div>

            {/* Chat Area */}

            <div className="relative flex-1 overflow-hidden bg-gradient-to-b from-white to-[#fbfbff] px-5 py-5">

              {/* Decorative Gift Background */}

              <div className="pointer-events-none absolute inset-0 opacity-[0.035]">

                <div className="grid grid-cols-4 gap-10 p-8">

                  {Array.from({ length: 20 }).map(
                    (_, index) => (
                      <Gift
                        key={index}
                        size={28}
                        className="text-[#6638ed]"
                      />
                    )
                  )}

                </div>

              </div>

              {/* Message Bubble */}

              <div className="relative ml-auto max-w-[330px] rounded-[11px] rounded-tr-[3px] bg-gradient-to-br from-[#e5fff4] to-[#d9faed] px-4 py-3 shadow-sm">

                <p className="whitespace-pre-line text-[10px] font-medium leading-[17px] text-[#29354d]">

                  {selectedBirthday?.message?.message ||
                    `Happy birthday, ${
                      selectedBirthday?.person
                        .fullName || ""
                    }! 🎉`}

                </p>

                <div className="mt-2 flex items-center justify-end gap-1">

                  <span className="text-[8px] text-[#78839a]">

                    {selectedBirthday?.message?.sentAt
                      ? new Date(
                          selectedBirthday.message.sentAt
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Not sent yet"}

                  </span>

                  <CheckCheck
                    size={13}
                    className="text-[#229f79]"
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                MESSAGE TEMPLATE
            ================================================= */}

            <div className="border-t border-[#e9ebf2] bg-white p-3">

              <div className="flex gap-2">

                {/* Message Input */}

                <textarea
                  value={messageText}
                  onChange={(e) =>
                    setMessageText(e.target.value)
                  }
                  rows={2}
                  disabled={
                    selectedBirthday?.status === "sent"
                  }
                  placeholder="Send your Best wishes to Close one"
                  className="flex h-[50px] flex-1 resize-none rounded-[6px] border border-[#dfe2eb] bg-white px-3 py-2 text-[9px] font-semibold text-[#59637d] outline-none"
                />

                {/* Send */}

                <button
                  type="button"
                  disabled={!selectedBirthday}
                  onClick={() => {
                    if (!selectedBirthday) {
                      alert("Please select a birthday");
                      return;
                    }

                    if (!messageText.trim()) {
                      alert("Please enter a message");
                      return;
                    }

                    const phone = selectedBirthday.person.phone;

                    if (!phone) {
                      alert("WhatsApp number is not available");
                      return;
                    }

                    const whatsappUrl = `https://wa.me/${phone.replace(
                      /\D/g,
                      ""
                    )}?text=${encodeURIComponent(messageText)}`;

                    window.open(whatsappUrl, "_blank");
                  }}
                  className={`flex h-[36px] items-center justify-center rounded-[6px] px-5 text-[9px] font-extrabold text-white ${
                    !selectedBirthday
                      ? "cursor-not-allowed bg-gray-300"
                      : "bg-[#6337ef] hover:bg-[#5428d8]"
                  }`}
                >
                  Wish on WhatsApp
                </button>

              </div>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  icon: Icon,
  value,
  label,
  bg,
  color,
}) {
  return (
    <div className="flex h-[58px] items-center gap-3 rounded-[10px] border border-[#e7e9f1] bg-white px-3 shadow-[0_4px_15px_rgba(35,45,90,0.04)]">

      <div
        className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[9px] ${bg}`}
      >
        <Icon
          size={19}
          strokeWidth={2.5}
          className={color}
        />
      </div>

      <div>

        <h3 className="text-[16px] font-extrabold leading-none text-[#171c38]">
          {value}
        </h3>

        <p className="mt-1 text-[9px] font-medium text-[#727d98]">
          {label}
        </p>

      </div>

    </div>
  );
}

// ============================================================
// MESSAGE LIST ITEM
// ============================================================

function MessageListItem({
  message,
  active,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`relative flex min-h-[57px] cursor-pointer items-center gap-2 border-b border-[#edf0f5] px-3 py-2 transition ${
        active
          ? "bg-[#f8f5ff]"
          : "hover:bg-[#fafaff]"
      }`}
    >

      {/* Active indicator */}

      {active && (
        <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-[#6638ee]" />
      )}

      {/* Profile */}

      {message.profilePhoto ? (
        <img
          src={message.profilePhoto}
          alt={message.name}
          className="h-[34px] w-[34px] shrink-0 rounded-full object-cover"
        />
      ) : (
        <ProfilePlaceholder />
      )}

      {/* Message details */}

      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between gap-2">

          <h3 className="truncate text-[10px] font-extrabold text-[#1c223c]">
            {message.name}
          </h3>

          <span className="shrink-0 text-[8px] text-[#7e88a0]">
            {message.date}
          </span>

        </div>

        <div className="mt-1 flex items-center justify-between gap-2">

          {/* PHONE NUMBER */}

          <p className="truncate text-[8px] font-medium text-[#7c86a0]">
            {message.phone || "No phone number"}
          </p>

          <span
            className={`shrink-0 rounded-[5px] px-2 py-1 text-[7px] font-extrabold ${
              statusStyles[message.status]
            }`}
          >
            {message.status}
          </span>

        </div>

      </div>

      <ChevronRight
        size={14}
        className="shrink-0 text-[#7c86a0]"
      />

    </div>
  );
}

// ============================================================
// PROFILE PLACEHOLDER
// ============================================================

function ProfilePlaceholder() {
  return (
    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#dce4ef] to-[#bfc9db] shadow-sm">

      <div className="relative mt-1">

        <div className="mx-auto h-[10px] w-[10px] rounded-full bg-[#69748d]" />

        <div className="mt-[-1px] h-[10px] w-[18px] rounded-t-[12px] bg-[#69748d]" />

      </div>

    </div>
  );
}

export default Messages;