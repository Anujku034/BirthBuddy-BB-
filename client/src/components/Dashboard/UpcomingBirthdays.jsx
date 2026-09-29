import React from "react";
import {
  CalendarDays,
  Users,
  Gift,
  Cake,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MoreVertical,
  Heart,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import upcomingBirthdaysHero from "../../assets/dashboard/upcomingBirthdaysHero.png";


// ============================================================
// STATIC DATA
// ============================================================

const birthdays = [
  {
    name: "Rahul Sharma",
    relation: "College Friend",
    date: "12 September 2025",
    days: "Today",
    message: "Send your wishes now!",
    today: true,
  },
  {
    name: "Priya Singh",
    relation: "School Friend",
    date: "15 September 2025",
    days: "3 days left",
    message: "Make their day special! 🎁",
  },
  {
    name: "Amit Verma",
    relation: "Colleague",
    date: "20 September 2025",
    days: "8 days left",
    message: "Send a wonderful year! 🎉",
  },
  {
    name: "Sneha Patel",
    relation: "Family",
    date: "25 September 2025",
    days: "13 days left",
    message: "Don't forget to send wishes! ❤️",
  },
  {
    name: "Vikram Gupta",
    relation: "Gym Buddy",
    date: "02 October 2025",
    days: "20 days left",
    message: "Plan something special! 🎉",
  },
  {
    name: "Neha Sharma",
    relation: "Cousin",
    date: "10 October 2025",
    days: "28 days left",
    message: "Birthdays make life brighter! ✨",
  },
];

const weekBirthdays = [
  {
    name: "Rahul Sharma",
    date: "12 September 2025",
    days: "Today",
    today: true,
  },
  {
    name: "Priya Singh",
    date: "15 September 2025",
    days: "3 days left",
  },
];


// ============================================================
// MAIN COMPONENT
// ============================================================

function UpcomingBirthdays() {
  return (
    <div className="min-h-screen bg-[#f7f8ff] px-3 py-4 sm:px-5 lg:px-7">

      <div className="mx-auto max-w-[1500px]">

        {/* ====================================================
            HERO HEADER
        ==================================================== */}

        <section className="relative mb-3 h-[150px] overflow-hidden rounded-[17px] border border-white bg-gradient-to-r from-[#faf8ff] via-[#f5efff] to-[#eee5ff] shadow-[0_8px_30px_rgba(73,45,150,0.07)]">

          {/* Decorative glow */}

          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#ddc9ff]/40 blur-3xl" />

          <div className="absolute right-[35%] -top-20 h-52 w-52 rounded-full bg-[#ffd9ed]/30 blur-3xl" />


          {/* Heading */}

          <div className="relative z-10 px-5 pt-5 sm:px-7">

            <div className="flex items-center gap-2">

              <h1 className="text-[26px] font-extrabold tracking-[-0.8px] text-[#101631] sm:text-[31px]">
                Upcoming Birthdays
              </h1>

              <CalendarDays
                size={28}
                strokeWidth={2.4}
                className="text-[#ef3157]"
              />

            </div>

            <p className="mt-0.5 text-[10px] font-medium text-[#77829d] sm:text-[12px]">
              Here are the upcoming birthdays. Get ready to spread happiness! 🎉
            </p>

          </div>


          {/* Hero image */}

          <img
            src={upcomingBirthdaysHero}
            alt="Upcoming birthdays"
            className="absolute bottom-[-9px] right-[2%] hidden h-[155px] w-auto object-contain md:block"
          />

        </section>


        {/* ====================================================
            STAT CARDS
        ==================================================== */}

        <section className="mb-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4">

          <StatCard
            icon={Users}
            value="6"
            label="Upcoming"
            title="All"
            iconBg="bg-[#eee9ff]"
            iconColor="text-[#6338ef]"
            active
          />

          <StatCard
            icon={CalendarDays}
            value="1"
            label="Birthday"
            title="Today"
            iconBg="bg-[#ffecef]"
            iconColor="text-[#ef405b]"
          />

          <StatCard
            icon={CalendarDays}
            value="2"
            label="Birthdays"
            title="This Week"
            iconBg="bg-[#eeeaff]"
            iconColor="text-[#6538ef]"
          />

          <StatCard
            icon={Gift}
            value="4"
            label="Birthdays"
            title="This Month"
            iconBg="bg-[#fff1dc]"
            iconColor="text-[#f39b17]"
          />

        </section>


        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <section className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_275px]">


          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <div>

            {/* Search / Filters */}

            <div className="mb-2 flex flex-col gap-2 rounded-[10px] border border-[#e5e7ef] bg-white p-2 shadow-[0_4px_15px_rgba(35,45,90,0.04)] sm:flex-row">

              {/* Search */}

              <div className="relative flex-1">

                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8290a8]"
                />

                <input
                  type="text"
                  placeholder="Search by name..."
                  className="h-[32px] w-full rounded-[6px] border border-[#e0e3eb] bg-white pl-9 pr-3 text-[9px] font-medium text-[#59647d] outline-none placeholder:text-[#9aa3b6] focus:border-[#7550ee]"
                />

              </div>


              {/* Time Filter */}

              <button
                type="button"
                className="flex h-[32px] min-w-[115px] items-center justify-between rounded-[6px] border border-[#e0e3eb] px-3 text-[9px] font-semibold text-[#5d6780]"
              >

                <span className="flex items-center gap-1.5">

                  <CalendarDays size={12} />

                  All Time

                </span>

                <ChevronDown size={11} />

              </button>


              {/* Sort */}

              <button
                type="button"
                className="flex h-[32px] min-w-[120px] items-center justify-between rounded-[6px] border border-[#e0e3eb] px-3 text-[9px] font-semibold text-[#5d6780]"
              >

                <span className="flex items-center gap-1.5">

                  <Sparkles size={11} />

                  Sort by Date

                </span>

                <ChevronDown size={11} />

              </button>

            </div>


            {/* Birthday List */}

            <div className="overflow-hidden rounded-[10px] border border-[#e5e7ef] bg-white shadow-[0_5px_20px_rgba(35,45,90,0.05)]">

              {birthdays.map((person, index) => (
                <BirthdayRow
                  key={person.name}
                  person={person}
                  isLast={index === birthdays.length - 1}
                />
              ))}

            </div>

          </div>


          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div className="space-y-3">


            {/* =================================================
                CALENDAR
            ================================================= */}

            <CalendarCard />


            {/* =================================================
                THIS WEEK
            ================================================= */}

            <div className="rounded-[10px] border border-[#e5e7ef] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.05)]">

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <div className="flex h-[25px] w-[25px] items-center justify-center rounded-[7px] bg-[#eee9ff]">

                    <CalendarDays
                      size={14}
                      className="text-[#6338ef]"
                    />

                  </div>

                  <h2 className="text-[10px] font-extrabold text-[#1d233d]">
                    Upcoming This Week
                  </h2>

                </div>

                <span className="rounded-[5px] bg-[#f0f1f7] px-2 py-1 text-[8px] font-bold text-[#68738d]">
                  2
                </span>

              </div>


              {weekBirthdays.map((person) => (
                <WeekBirthday
                  key={person.name}
                  person={person}
                />
              ))}

            </div>


            {/* =================================================
                QUOTE
            ================================================= */}

            <div className="relative overflow-hidden rounded-[10px] border border-[#dfd2ff] bg-gradient-to-br from-[#f8f3ff] to-[#eee5ff] p-3">

              <div className="absolute right-[-15px] top-[-20px] h-16 w-16 rounded-full bg-[#d7c3ff]/40 blur-xl" />

              <span className="relative text-[28px] font-serif font-bold leading-none text-[#7044e9]">
                “
              </span>

              <p className="relative -mt-1 ml-5 font-serif text-[10px] italic leading-[15px] text-[#4b5270]">
                Every birthday is a new beginning
                <br />
                filled with love, hope and happiness.
                <span className="ml-1">
                  ❤️
                </span>
              </p>

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
  title,
  iconBg,
  iconColor,
  active,
}) {
  return (
    <div
      className={`flex h-[58px] items-center gap-2 rounded-[9px] border px-3 shadow-[0_4px_15px_rgba(35,45,90,0.04)] ${
        active
          ? "border-[#8663ff] bg-[#faf8ff]"
          : "border-[#e5e7ef] bg-white"
      }`}
    >

      <div
        className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] ${iconBg}`}
      >

        <Icon
          size={17}
          strokeWidth={2.5}
          className={iconColor}
        />

      </div>


      <div>

        <div className="flex items-center gap-1.5">

          <span className="text-[9px] font-bold text-[#7c86a0]">
            {title}
          </span>

        </div>

        <div className="flex items-end gap-1.5">

          <span className="text-[16px] font-extrabold leading-none text-[#18203a]">
            {value}
          </span>

          <span className="text-[7px] font-medium text-[#8a93a8]">
            {label}
          </span>

        </div>

      </div>

    </div>
  );
}


// ============================================================
// BIRTHDAY ROW
// ============================================================

function BirthdayRow({
  person,
  isLast,
}) {
  return (
    <div
      className={`relative flex min-h-[61px] items-center gap-2 px-3 py-2 transition hover:bg-[#fafaff] sm:gap-3 ${
        !isLast ? "border-b border-[#edf0f5]" : ""
      }`}
    >

      {/* Avatar */}

      <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#dce5ef] to-[#c3cddc] shadow-sm">

        <div className="relative mt-1">

          <div className="mx-auto h-[12px] w-[12px] rounded-full bg-[#68748c]" />

          <div className="mt-[-1px] h-[12px] w-[22px] rounded-t-[14px] bg-[#68748c]" />

        </div>

      </div>


      {/* Name */}

      <div className="min-w-[105px] flex-1">

        <h3 className="text-[10px] font-extrabold text-[#1b213b] sm:text-[11px]">
          {person.name}
        </h3>

        <p className="mt-0.5 text-[7px] text-[#7d87a0] sm:text-[8px]">
          {person.date}
        </p>

      </div>


      {/* Days */}

      <div
        className={`hidden min-w-[75px] items-center justify-center gap-1 rounded-[6px] px-2 py-1.5 sm:flex ${
          person.today
            ? "bg-[#ffe9ee] text-[#ef405b]"
            : "bg-[#fff3df] text-[#e68d12]"
        }`}
      >

        <Cake
          size={12}
          strokeWidth={2.4}
        />

        <span className="whitespace-nowrap text-[8px] font-extrabold">
          {person.days}
        </span>

      </div>


      {/* Message */}

      <p className="hidden min-w-[150px] flex-1 text-[8px] text-[#737e99] lg:block">
        {person.message}
      </p>


      {/* Wish */}

      <button
        type="button"
        className="flex h-[28px] items-center gap-1 rounded-[7px] bg-[#dcf8eb] px-2.5 text-[8px] font-extrabold text-[#08ae76] transition hover:bg-[#c8f4df]"
      >

        <FaWhatsapp
          size={13}
          fill="#08ae76"
        />

        <span className="hidden sm:inline">
          Wish
        </span>

      </button>


      {/* More */}

      <button
        type="button"
        className="text-[#737e98]"
      >

        <MoreVertical size={14} />

      </button>

    </div>
  );
}


// ============================================================
// CALENDAR
// ============================================================

function CalendarCard() {
  const days = [
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ["31", "1", "2", "3", "4", "5", "6"],
    ["7", "8", "9", "10", "11", "12", "13"],
    ["14", "15", "16", "17", "18", "19", "20"],
    ["21", "22", "23", "24", "25", "26", "27"],
    ["28", "29", "30", "1", "2", "3", "4"],
  ];

  return (
    <div className="rounded-[10px] border border-[#e5e7ef] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.05)]">

      {/* Calendar header */}

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <CalendarDays
            size={15}
            className="text-[#6338ef]"
          />

          <h2 className="text-[10px] font-extrabold text-[#20263f]">
            September 2025
          </h2>

        </div>


        <div className="flex items-center gap-2">

          <button type="button">
            <ChevronLeft
              size={13}
              className="text-[#7a849d]"
            />
          </button>

          <button type="button">
            <ChevronRight
              size={13}
              className="text-[#7a849d]"
            />
          </button>

        </div>

      </div>


      {/* Days */}

      <div className="grid grid-cols-7 gap-y-1 text-center">

        {days[0].map((day) => (
          <div
            key={day}
            className="py-1 text-[7px] font-extrabold text-[#7e879d]"
          >
            {day}
          </div>
        ))}


        {days
          .slice(1)
          .flat()
          .map((day, index) => {

            const isToday = day === "12";
            const isBirthday = day === "15" || day === "25";

            return (
              <div
                key={`${day}-${index}`}
                className="flex items-center justify-center"
              >

                <span
                  className={`flex h-[23px] w-[23px] items-center justify-center rounded-full text-[7px] font-semibold ${
                    isToday
                      ? "bg-[#6538ef] text-white shadow-[0_3px_8px_rgba(99,56,239,0.25)]"
                      : isBirthday
                      ? "bg-[#fff0d9] text-[#9a681b]"
                      : day === "26"
                      ? "bg-[#eee9ff] text-[#6338ef]"
                      : "text-[#58627b]"
                  }`}
                >
                  {day}
                </span>

              </div>
            );
          })}

      </div>

    </div>
  );
}


// ============================================================
// WEEK BIRTHDAY
// ============================================================

function WeekBirthday({
  person,
}) {
  return (
    <div className="flex items-center gap-2 border-b border-[#edf0f5] py-2 last:border-b-0">

      {/* Avatar */}

      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#dce5ef] to-[#c4cfde]">

        <div className="relative mt-1">

          <div className="mx-auto h-[8px] w-[8px] rounded-full bg-[#68748c]" />

          <div className="mt-[-1px] h-[9px] w-[16px] rounded-t-[10px] bg-[#68748c]" />

        </div>

      </div>


      <div className="min-w-0 flex-1">

        <h3 className="truncate text-[8px] font-extrabold text-[#252b44]">
          {person.name}
        </h3>

        <p className="text-[7px] text-[#7d87a0]">
          {person.date}
        </p>

      </div>


      <span
        className={`whitespace-nowrap rounded-[5px] px-2 py-1 text-[7px] font-extrabold ${
          person.today
            ? "bg-[#ffe9ee] text-[#ef405b]"
            : "bg-[#fff1dc] text-[#df8b16]"
        }`}
      >
        {person.days}
      </span>

    </div>
  );
}


export default UpcomingBirthdays;