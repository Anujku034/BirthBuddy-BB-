import React from "react";
import {
  CalendarDays,
  Cake,
  Gift,
  MessageSquareText,
  Users,
  Send,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import dashboardHero from "../../assets/dashboard/dashboardHero.png";
import { FaWhatsapp } from "react-icons/fa";


// ======================================================
// STATIC DATA
// Later this data will come from backend/API
// ======================================================

const upcomingBirthdays = [
  {
    name: "Rahul Sharma",
    date: "12 September 2025",
    status: "Today",
  },
  {
    name: "Priya Singh",
    date: "15 September 2025",
    status: "3 days left",
  },
  {
    name: "Amit Verma",
    date: "20 September 2025",
    status: "8 days left",
  },
  {
    name: "Sneha Patel",
    date: "25 September 2025",
    status: "13 days left",
  },
  {
    name: "Vikram Gupta",
    date: "02 October 2025",
    status: "20 days left",
  },
];

const recentMessages = [
  {
    name: "Rahul Sharma",
    message: "Happy birthday, Rahul! 🎉",
    date: "12 Sep 2025, 9:00 AM",
  },
  {
    name: "Priya Singh",
    message: "Wishing you a wonderful year ahead, Priya! 🎂",
    date: "05 Sep 2025, 9:00 AM",
  },
  {
    name: "Mom",
    message: "Happy birthday, Mom! ❤️",
    date: "28 Aug 2025, 9:00 AM",
  },
  {
    name: "Amit Verma",
    message: "Many happy returns of the day, Amit! 🎉",
    date: "20 Aug 2025, 9:00 AM",
  },
  {
    name: "Neha",
    message: "Happy birthday, Neha! 😊",
    date: "15 Aug 2025, 9:00 AM",
  },
];


// ======================================================
// DASHBOARD
// ======================================================

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] px-4 py-5 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1500px]">


        {/* ==================================================
            HERO SECTION
        ================================================== */}

        <section className="relative min-h-[260px] overflow-hidden rounded-[24px] border border-[#e8ddff] bg-gradient-to-r from-[#faf8ff] via-[#f5edff] to-[#eee3ff] px-6 py-7 shadow-[0_8px_30px_rgba(87,48,170,0.08)] sm:px-8 lg:px-9">

          {/* Background Glow */}

          <div className="absolute -left-20 -bottom-24 h-56 w-56 rounded-full bg-[#c9b3ff]/30 blur-3xl" />

          <div className="absolute right-[30%] top-[-100px] h-52 w-52 rounded-full bg-[#e2c8ff]/30 blur-3xl" />


          {/* Hero Text */}

          <div className="relative z-10 max-w-[650px]">

            <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#101631] sm:text-[40px] lg:text-[46px]">

              Welcome Back, Anuj!{" "}

              <span className="inline-block">
                👋
              </span>

            </h1>


            <p className="mt-3 text-[15px] font-medium text-[#435073] sm:text-[17px] lg:text-[18px]">

              Here's your birthday overview. Don't forget to
              spread happiness! ❤️

            </p>


            {/* Quote Card */}

            <div className="mt-6 flex max-w-[455px] items-start rounded-2xl border border-white/80 bg-white/45 px-5 py-4 shadow-sm backdrop-blur-md sm:mt-7 sm:px-6 sm:py-5">

              <span className="mr-3 text-[40px] font-serif font-bold leading-[32px] text-[#6938ef]">
                “
              </span>

              <p className="font-serif text-[17px] italic leading-6 text-[#2c3656] sm:text-[19px] sm:leading-7">

                Birthdays are small reminders
                <br />
                of the big love in our lives.”

              </p>

            </div>

          </div>


          {/* Hero Image */}

          <div className="pointer-events-none absolute bottom-0 right-[1%] hidden h-full w-[48%] md:block lg:w-[45%]">

            <img
              src={dashboardHero}
              alt="Birthday celebration"
              className="absolute bottom-0 right-0 h-[245px] w-auto object-contain drop-shadow-[0_15px_25px_rgba(75,40,150,0.18)] lg:h-[275px]"
            />

          </div>

        </section>



        {/* ==================================================
            STATISTICS
        ================================================== */}

        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">


          {/* Total Contacts */}

          <StatCard
            icon={Users}
            value="12"
            label="Total Contacts"
            iconBg="bg-[#eee9ff]"
            iconColor="text-[#6038ef]"
            decorativeColor="text-[#ded7fa]"
          />


          {/* This Week */}

          <StatCard
            icon={CalendarDays}
            value="3"
            label="Birthdays This Week"
            iconBg="bg-[#fff0f3]"
            iconColor="text-[#ef334f]"
            decorativeColor="text-[#ffd9e0]"
          />


          {/* This Month */}

          <StatCard
            icon={Gift}
            value="7"
            label="Birthdays This Month"
            iconBg="bg-[#fff6e5]"
            iconColor="text-[#f59e0b]"
            decorativeColor="text-[#ffeabe]"
          />


          {/* Messages */}

          <StatCard
            icon={Send}
            value="24"
            label="Messages Sent"
            iconBg="bg-[#e8faf2]"
            iconColor="text-[#10ad79]"
            decorativeColor="text-[#d2f4e7]"
          />

        </section>



        {/* ==================================================
            BOTTOM CONTENT
        ================================================== */}

        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_0.95fr]">


          {/* =================================================
              UPCOMING BIRTHDAYS
          ================================================== */}

          <div className="rounded-[21px] border border-[#e7eaf4] bg-white p-5 shadow-[0_6px_25px_rgba(30,40,80,0.05)] sm:p-6">


            {/* Header */}

            <div className="flex items-center justify-between border-b border-[#edf0f6] pb-4">

              <div className="flex items-center gap-3">

                <CalendarDays
                  size={27}
                  strokeWidth={2.3}
                  className="text-[#6038ef]"
                />

                <h2 className="text-[20px] font-extrabold text-[#111733] sm:text-[22px]">
                  Upcoming Birthdays
                </h2>

              </div>


              <button
                type="button"
                className="flex items-center gap-1 text-[14px] font-semibold text-[#5125e7] transition hover:text-[#3e16ce] sm:text-[16px]"
              >

                View All

                <ArrowRight size={16} />

              </button>

            </div>


            {/* Birthday List */}

            <div>

              {upcomingBirthdays.map((person, index) => (

                <BirthdayRow
                  key={person.name}
                  person={person}
                  isLast={index === upcomingBirthdays.length - 1}
                />

              ))}

            </div>

          </div>



          {/* =================================================
              RECENT MESSAGES
          ================================================== */}

          <div className="rounded-[21px] border border-[#e7eaf4] bg-white p-5 shadow-[0_6px_25px_rgba(30,40,80,0.05)] sm:p-6">


            {/* Header */}

            <div className="flex items-center justify-between border-b border-[#edf0f6] pb-4">

              <div className="flex items-center gap-3">

                <FaWhatsapp
                  size={27}
                  strokeWidth={2.3}
                  className="text-[#6038ef]"
                />

                <h2 className="text-[20px] font-extrabold text-[#111733] sm:text-[22px]">
                  Recent Messages
                </h2>

              </div>


              <button
                type="button"
                className="flex items-center gap-1 text-[14px] font-semibold text-[#5125e7] transition hover:text-[#3e16ce] sm:text-[16px]"
              >

                View All

                <ArrowRight size={16} />

              </button>

            </div>


            {/* Messages */}

            <div>

              {recentMessages.map((message, index) => (

                <MessageRow
                  key={`${message.name}-${index}`}
                  message={message}
                  isLast={index === recentMessages.length - 1}
                />

              ))}

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}



// ======================================================
// STAT CARD
// ======================================================

function StatCard({
  icon: Icon,
  value,
  label,
  iconBg,
  iconColor,
  decorativeColor,
}) {
  return (

    <div className="group relative h-[110px] overflow-hidden rounded-[18px] border border-[#e8eaf4] bg-white p-5 shadow-[0_5px_20px_rgba(35,45,90,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(80,50,180,0.10)]">


      <div className="flex h-full items-center gap-4">


        {/* Main Icon */}

        <div
          className={`flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-[17px] ${iconBg}`}
        >

          <Icon
            size={33}
            strokeWidth={2.2}
            className={iconColor}
          />

        </div>


        {/* Text */}

        <div>

          <h3 className="text-[30px] font-extrabold leading-none text-[#111733]">
            {value}
          </h3>

          <p className="mt-2 text-[14px] font-medium text-[#526080] sm:text-[15px]">
            {label}
          </p>

        </div>

      </div>


      {/* Decorative Background Icon */}

      <Icon
        size={63}
        strokeWidth={1}
        className={`absolute -right-1 -top-1 opacity-70 ${decorativeColor}`}
      />

    </div>

  );
}



// ======================================================
// BIRTHDAY ROW
// ======================================================

function BirthdayRow({ person, isLast }) {
  return (

    <div
      className={`flex min-h-[76px] items-center gap-3 py-3 ${
        !isLast ? "border-b border-[#edf0f6]" : ""
      }`}
    >


      {/* =================================================
          AVATAR PLACEHOLDER

          IMPORTANT:
          No image is used here.

          Later:

          <img
             src={person.image}
             alt={person.name}
          />

          will be added here.
      ================================================== */}

      <div className="h-[53px] w-[53px] shrink-0 rounded-full border-[3px] border-white bg-gradient-to-br from-[#edf0f6] to-[#dce1ec] shadow-[0_2px_8px_rgba(30,40,80,0.12)]">
      </div>


      {/* Name + Date */}

      <div className="min-w-0 flex-1">

        <h3 className="truncate text-[16px] font-bold text-[#121832] sm:text-[17px]">
          {person.name}
        </h3>

        <p className="mt-1 text-[13px] text-[#586684] sm:text-[15px]">
          {person.date}
        </p>

      </div>


      {/* Birthday Status */}

      <div className="hidden items-center gap-2 md:flex">

        <Cake
          size={23}
          strokeWidth={2}
          className="text-[#ef4438]"
          fill="#ef4438"
        />

        <span
          className={`whitespace-nowrap text-[14px] font-semibold sm:text-[16px] ${
            person.status === "Today"
              ? "text-red-500"
              : "text-[#526080]"
          }`}
        >
          {person.status}
        </span>

      </div>


      {/* Wish Button */}

      <button
        type="button"
        className="flex h-[40px] items-center gap-2 rounded-xl bg-[#e2faf1] px-3 text-[14px] font-bold text-[#08a970] transition-all duration-200 hover:bg-[#cdf6e4] sm:px-4"
      >

        <FaWhatsapp
          size={19}
          strokeWidth={2.5}
          className="text-[#08a970]"
          fill="#08a970"
        />

        <span className="hidden sm:block">
          Wish
        </span>

      </button>

    </div>

  );
}



// ======================================================
// MESSAGE ROW
// ======================================================

function MessageRow({ message, isLast }) {
  return (

    <div
      className={`flex min-h-[76px] items-center gap-3 py-3 ${
        !isLast ? "border-b border-[#edf0f6]" : ""
      }`}
    >


      {/* Avatar Placeholder */}

      <div className="h-[52px] w-[52px] shrink-0 rounded-full border-[3px] border-white bg-gradient-to-br from-[#edf0f6] to-[#dce1ec] shadow-[0_2px_8px_rgba(30,40,80,0.12)]">
      </div>


      {/* Message Information */}

      <div className="min-w-0 flex-1">

        <h3 className="text-[15px] font-bold text-[#121832] sm:text-[16px]">
          {message.name}
        </h3>

        <p className="truncate text-[13px] text-[#536080] sm:text-[15px]">
          {message.message}
        </p>

        <p className="text-[12px] text-[#687492] sm:text-[14px]">
          {message.date}
        </p>

      </div>


      {/* Sent Badge */}

      <span className="shrink-0 rounded-xl bg-[#e1faf1] px-3 py-2 text-[13px] font-bold text-[#09a873] sm:px-4 sm:text-[14px]">
        Sent
      </span>

    </div>

  );
}


export default Dashboard;