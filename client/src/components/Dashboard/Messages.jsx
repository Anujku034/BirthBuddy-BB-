import React from "react";

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
  FileText,
  Eye,
  Gift,
} from "lucide-react";

import messagesHero from "../../assets/dashboard/messagesHero.png";


// ============================================================
// STATIC DATA
// ============================================================

const messages = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    message: "Happy birthday, Rahul! 🎉",
    date: "12 Sep 2025, 9:00 AM",
    status: "Sent",
  },
  {
    id: 2,
    name: "Priya Singh",
    phone: "+91 8765432109",
    message: "Wishing you a wonderful year...",
    date: "05 Sep 2025, 9:00 AM",
    status: "Sent",
  },
  {
    id: 3,
    name: "Mom",
    phone: "+91 9876543211",
    message: "Happy birthday, Mom! ❤️",
    date: "28 Aug 2025, 9:00 AM",
    status: "Sent",
  },
  {
    id: 4,
    name: "Amit Verma",
    phone: "+91 9123456780",
    message: "Many happy returns of the day...",
    date: "20 Aug 2025, 9:00 AM",
    status: "Sent",
  },
  {
    id: 5,
    name: "Neha Sharma",
    phone: "+91 8877665544",
    message: "Happy birthday, Neha! 😊",
    date: "15 Aug 2025, 9:00 AM",
    status: "Sent",
  },
  {
    id: 6,
    name: "Vikram Gupta",
    phone: "+91 7654321098",
    message: "Have an amazing year ahead! 🎂",
    date: "02 Aug 2025, 9:00 AM",
    status: "Delivered",
  },
  {
    id: 7,
    name: "Saurav Mehta",
    phone: "+91 9123004455",
    message: "Stay happy and keep shining! ✨",
    date: "12 Jul 2025, 9:00 AM",
    status: "Failed",
  },
];


// ============================================================
// STATUS STYLES
// ============================================================

const statusStyles = {
  Sent: "bg-[#dcf8eb] text-[#08ae76]",
  Delivered: "bg-[#e1f1ff] text-[#3182d8]",
  Failed: "bg-[#ffe3e9] text-[#ed4760]",
};


// ============================================================
// MAIN COMPONENT
// ============================================================

function Messages() {
  return (
    <div className="min-h-screen bg-[#f7f8ff] px-3 py-4 sm:px-5 lg:px-7">

      <div className="mx-auto max-w-[1500px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="relative mb-4 h-[150px] overflow-hidden rounded-[18px] border border-white bg-gradient-to-r from-[#faf8ff] via-[#f6efff] to-[#eee7ff] shadow-[0_8px_30px_rgba(73,45,150,0.07)]">

          {/* Decorative glow */}

          <div className="absolute -left-16 -top-24 h-56 w-56 rounded-full bg-[#dfcaff]/40 blur-3xl" />

          <div className="absolute right-[30%] -top-20 h-52 w-52 rounded-full bg-[#f6d1ff]/40 blur-3xl" />


          {/* Heading */}

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


          {/* =================================================
              HERO IMAGE
          ================================================= */}

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

          <div className="overflow-hidden rounded-[11px] border border-[#e5e7ef] bg-white shadow-[0_5px_22px_rgba(35,45,90,0.05)]">

            {/* Filters */}

            <div className="border-b border-[#edf0f5] p-2">

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

            <div>

              {messages.map((message, index) => (
                <MessageListItem
                  key={message.id}
                  message={message}
                  active={index === 0}
                />
              ))}

            </div>

          </div>


          {/* =================================================
              RIGHT MESSAGE PREVIEW
          ================================================= */}

          <div className="flex min-h-[520px] flex-col overflow-hidden rounded-[11px] border border-[#e5e7ef] bg-white shadow-[0_5px_22px_rgba(35,45,90,0.05)]">

            {/* Person Header */}

            <div className="flex items-center justify-between border-b border-[#edf0f5] px-4 py-3">

              <div className="flex items-center gap-3">

                <ProfilePlaceholder />

                <div>

                  <h3 className="text-[11px] font-extrabold text-[#171c38]">
                    Rahul Sharma
                  </h3>

                  <p className="text-[9px] text-[#77829c]">
                    +91 9876543210
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-2">

                <span className="rounded-[6px] bg-[#dcf8eb] px-3 py-1.5 text-[8px] font-extrabold text-[#08ae76]">
                  Sent
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
                12 September 2025
              </span>

            </div>


            {/* Chat Area */}

            <div className="relative flex-1 overflow-hidden bg-gradient-to-b from-white to-[#fbfbff] px-5 py-5">

              {/* Decorative Gift Background */}

              <div className="pointer-events-none absolute inset-0 opacity-[0.035]">

                <div className="grid grid-cols-4 gap-10 p-8">

                  {Array.from({ length: 20 }).map((_, index) => (
                    <Gift
                      key={index}
                      size={28}
                      className="text-[#6638ed]"
                    />
                  ))}

                </div>

              </div>


              {/* Message Bubble */}

              <div className="relative ml-auto max-w-[330px] rounded-[11px] rounded-tr-[3px] bg-gradient-to-br from-[#e5fff4] to-[#d9faed] px-4 py-3 shadow-sm">

                <p className="text-[10px] font-medium leading-[17px] text-[#29354d]">

                  Happy birthday, Rahul! 🎉

                  <br />
                  <br />

                  Wishing you a year filled with happiness,
                  success and amazing opportunities.

                  <br />

                  Keep shining! ✨

                  <br />
                  <br />

                  Have a fantastic day! 🎂 ❤️

                </p>


                <div className="mt-2 flex items-center justify-end gap-1">

                  <span className="text-[8px] text-[#78839a]">
                    9:00 AM
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

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-1.5">

                  <FileText
                    size={14}
                    className="text-[#6338ef]"
                  />

                  <span className="text-[10px] font-extrabold text-[#252b45]">
                    Message Template
                  </span>

                </div>


                <button
                  type="button"
                  className="flex items-center gap-1 text-[8px] font-bold text-[#6338ef]"
                >

                  <Eye size={11} />

                  See All

                </button>

              </div>


              <div className="flex gap-2">

                {/* Template */}

                <button
                  type="button"
                  className="flex h-[36px] flex-1 items-center justify-between rounded-[6px] border border-[#dfe2eb] bg-white px-3 text-[9px] font-semibold text-[#59637d]"
                >

                  <span>
                    Birthday Wishes 🎉
                  </span>

                  <ChevronDown size={12} />

                </button>


                {/* Send */}

                <button
                  type="button"
                  className="flex h-[36px] items-center justify-center gap-2 rounded-[6px] bg-gradient-to-r from-[#6533ef] to-[#7c3fff] px-4 text-[9px] font-bold text-white shadow-[0_5px_12px_rgba(101,51,239,0.22)]"
                >

                  <Send size={13} />

                  Send Message on WhatsApp

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
}) {
  return (
    <div
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

      <ProfilePlaceholder />


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

          <p className="truncate text-[8px] font-medium text-[#7c86a0]">
            {message.message}
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