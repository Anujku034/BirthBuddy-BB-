import React, { useState,useEffect,useContext } from "react";

import {
  CalendarDays,
  Users,
  Gift,
  Cake,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Sparkles,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import upcomingBirthdaysHero from "../../assets/dashboard/upcomingBirthdaysHero.png";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const formatBirthdayDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
// calculating upcoming birthdays
const getNextBirthday = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const birthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  birthday.setHours(0,0,0,0);
  const todayDate = new Date(today);
  todayDate.setHours(0,0,0,0);
  if(birthday < todayDate){
    birthday.setFullYear(today.getFullYear() + 1);
  }
  return birthday;
}
// convert the api data into birthday data
const getDaysLeft = (birthday) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const birthdayDate = new Date(birthday);
  birthdayDate.setHours(0,0,0,0);
  const difference = birthdayDate -  today;
  return Math.ceil(difference/(1000 * 60 * 60 * 24));
   
};
const getBirthdayStatus = (days) => {
  if(days === 0) return "Today";
  if(days === 1) return "Tomorrow";
  return `In ${days} days`;
};

function UpcomingBirthdays() {
  const[contacts,setContacts] = useState([]);
  const[loading,setLoading] = useState(true);
  const[serverError,setServerError] = useState("");
  const{accessToken, setAccessToken} = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [sortBy, setSortBy] = useState("Nearest Birthday");
  const navigate = useNavigate();
  
  
  const upcomingBirthdays = contacts
  .map((person) => {
    const nextBirthday = getNextBirthday(person.dateOfBirth);
    const days = getDaysLeft(nextBirthday);
    return{
      ...person,
      name: person.fullName,
      date: formatBirthdayDate(nextBirthday),
      days: getBirthdayStatus(days),
      daysLeft: days,
      today: days === 0,
      message: person.customMessage || "Make their birthday special! 🎉",
      profilePhoto: person.profilePhoto || null,
      nextBirthday,
    };
  })
  .sort((a,b) => a.nextBirthday - b.nextBirthday);
  //const birthdays = upcomingBirthdays;
  // this week list
  const weekBirthdays = upcomingBirthdays.filter(
    (person) => person.daysLeft >= 0 && person.daysLeft <= 7
  );
  
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayBirthdays = upcomingBirthdays.filter(
    (person) => person.daysLeft === 0
  );
  const thisweekBirthdays = upcomingBirthdays.filter(
    (person) => person.daysLeft >= 0 && person.daysLeft <= 7
  );
  const thisMonthBirthdays = upcomingBirthdays.filter((person) =>{
    const birthdayMonth = person.nextBirthday.getMonth();
    return birthdayMonth === today.getMonth();
  });
  const filteredBirthdays = upcomingBirthdays
  .filter((person) => {
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const days = person.daysLeft;

    let matchesDate = true;

    if (dateFilter === "Today") {
      matchesDate = days === 0;
    }

    if (dateFilter === "This Week") {
      matchesDate = days >= 0 && days <= 7;
    }

    if (dateFilter === "This Month") {
      matchesDate =
        person.nextBirthday.getMonth() === today.getMonth();
    }

    return matchesSearch && matchesDate;
  })
  .sort((a, b) => {
    if (sortBy === "Nearest Birthday") {
      return a.nextBirthday - b.nextBirthday;
    }

    if (sortBy === "Farthest Birthday") {
      return b.nextBirthday - a.nextBirthday;
    }

    return 0;
  });
  const birthdays = filteredBirthdays;
  const getAllPersons = async() => {
    try{
      setLoading(true);
      setServerError("");
      const response = await axios.get(
        "http://localhost:3000/api/persons",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setContacts(response.data.persons);

    }catch(error){
      // if access token expire
      if(error.response?.status === 401) {
        try{
          const refreshResponse = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );
          const newAccessToken = refreshResponse.data.accessToken;
          setAccessToken(newAccessToken);
          // retry
          const retryResponse = await axios.get(
            "http://localhost:3000/api/persons",
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          setContacts(retryResponse.data.persons);
        }catch(refreshError) {
          if(refreshError.response?.status === 401) {
            alert("Session expired. Please login again");
            setTimeout(() => {
              navigate("/login");
            },2000);
          }
        }
      }else{
        console.log("GET PERSONS ERROR:", error);
        setServerError("Failed to load birthdays.");
      }
    } finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    if(accessToken) {
      getAllPersons();
    }
  },[accessToken]);
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
            value={upcomingBirthdays.length}
            label="Upcoming"
            title="All"
            iconBg="bg-[#eee9ff]"
            iconColor="text-[#6338ef]"
            
          />

          <StatCard
            icon={CalendarDays}
            value={todayBirthdays.length}
            label="Birthday"
            title="Today"
            iconBg="bg-[#ffecef]"
            iconColor="text-[#ef405b]"
          />

          <StatCard
            icon={CalendarDays}
            value={thisweekBirthdays.length}
            label="Birthdays"
            title="This Week"
            iconBg="bg-[#eeeaff]"
            iconColor="text-[#6538ef]"
          />

          <StatCard
            icon={Gift}
            value={thisMonthBirthdays.length}
            label="Birthdays"
            title="This Month"
            iconBg="bg-[#fff1dc]"
            iconColor="text-[#f39b17]"
          />

        </section>

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <section className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_275px]">

          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <div>

            {/* Search and Filters */}

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}

                />

              </div>

              {/* Time Filter */}

             <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-[32px] min-w-[115px] appearance-none rounded-[6px] border border-[#e0e3eb] bg-white px-3 pr-7 text-[9px] font-semibold text-[#5d6780] outline-none focus:border-[#7550ee]"
                >
                  <option value="All Time">All Time</option>
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>

                <ChevronDown
                  size={11}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#7c86a0]"
                />
              </div>
              {/* Sort Filter */}

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-[32px] min-w-[140px] appearance-none rounded-[6px] border border-[#e0e3eb] bg-white px-3 pr-7 text-[9px] font-semibold text-[#5d6780] outline-none focus:border-[#7550ee]"
                >
                  <option value="Nearest Birthday">
                    Nearest Birthday
                  </option>

                  <option value="Farthest Birthday">
                    Farthest Birthday
                  </option>
                </select>

                <ChevronDown
                  size={11}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#7c86a0]"
                />
              </div>
            </div>

            {/* ==================================================
                UPCOMING BIRTHDAYS
            ================================================== */}

            <div className="max-h-[400px] overflow-y-auto overflow-x-hidden rounded-[10px] border border-[#e5e7ef] bg-white shadow-[0_5px_20px_rgba(35,45,90,0.05)]">

              {birthdays.length > 0 ? (
                birthdays.map((person, index) => (
                  <BirthdayRow
                    key={person._id || person.name}
                    person={person}
                    isLast={index === birthdays.length - 1}
                  />
                ))
              ) : (
                <EmptyBirthdayState />
              )}

            </div>

          </div>

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div className="space-y-3">

            {/* Calendar */}

            <CalendarCard />

            {/* Upcoming This Week */}

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
                  {weekBirthdays.length}
                </span>

              </div>

              {/* 400px scrolling */}

              <div className="max-h-[100px] overflow-y-auto overflow-x-hidden">

                {weekBirthdays.length > 0 ? (
                  weekBirthdays.map((person) => (
                    <WeekBirthday
                      key={person._id || person.name}
                      person={person}
                    />
                  ))
                ) : (
                  <div className="flex min-h-[100px] items-center justify-center">

                    <p className="text-center text-[9px] text-[#8c95aa]">
                      No birthdays this week
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* Quote */}

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
// EMPTY BIRTHDAY STATE
// ============================================================

function EmptyBirthdayState() {
  return (
    <div className="flex min-h-[180px] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#eee9ff]">

          <Cake
            size={18}
            className="text-[#6338ef]"
          />

        </div>

        <p className="text-[11px] font-bold text-[#252b45]">
          No upcoming birthdays
        </p>

        <p className="mt-1 text-[9px] text-[#8c95aa]">
          Your upcoming birthdays will appear here.
        </p>

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

      {/* Profile */}

      <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#eee9ff] shadow-sm">

        {person.profilePhoto ? (
          <img
            src={person.profilePhoto}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[12px] font-extrabold text-[#6338ef]">
            {person.name?.charAt(0)}
          </span>
        )}

      </div>

      {/* Name and date */}

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

      {/* WhatsApp Wish */}

      <NavLink to="/dashboard/messages"
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

      </NavLink>

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
// LIVE CALENDAR
// ============================================================

function CalendarCard() {

  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  // First day of the month
  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  // Number of days in current month
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  // Number of days in previous month
  const daysInPreviousMonth = new Date(
    year,
    month,
    0
  ).getDate();

  const calendarDays = [];

  // ==========================================================
  // PREVIOUS MONTH DAYS
  // ==========================================================

  for (let i = firstDay - 1; i >= 0; i--) {

    calendarDays.push({
      day: daysInPreviousMonth - i,
      currentMonth: false,
    });

  }

  // ==========================================================
  // CURRENT MONTH DAYS
  // ==========================================================

  for (let day = 1; day <= daysInMonth; day++) {

    calendarDays.push({
      day,
      currentMonth: true,
    });

  }

  // ==========================================================
  // NEXT MONTH DAYS
  // ==========================================================

  let nextDay = 1;

  while (calendarDays.length < 42) {

    calendarDays.push({
      day: nextDay,
      currentMonth: false,
    });

    nextDay++;

  }

  // ==========================================================
  // PREVIOUS MONTH
  // ==========================================================

  const handlePreviousMonth = () => {

    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );

  };

  // ==========================================================
  // NEXT MONTH
  // ==========================================================

  const handleNextMonth = () => {

    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );

  };

  return (
    <div className="rounded-[10px] border border-[#e5e7ef] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.05)]">

      {/* Calendar Header */}

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <CalendarDays
            size={15}
            className="text-[#6338ef]"
          />

          <h2 className="text-[10px] font-extrabold text-[#20263f]">
            {monthName} {year}
          </h2>

        </div>

        {/* Navigation */}

        <div className="flex items-center gap-1">

          <button
            type="button"
            onClick={handlePreviousMonth}
            className="rounded p-1 transition hover:bg-[#f1edff]"
          >

            <ChevronLeft
              size={13}
              className="text-[#7a849d]"
            />

          </button>

          <button
            type="button"
            onClick={handleNextMonth}
            className="rounded p-1 transition hover:bg-[#f1edff]"
          >

            <ChevronRight
              size={13}
              className="text-[#7a849d]"
            />

          </button>

        </div>

      </div>

      {/* Week Days */}

      <div className="grid grid-cols-7 gap-y-1 text-center">

        {weekDays.map((day) => (
          <div
            key={day}
            className="py-1 text-[7px] font-extrabold text-[#7e879d]"
          >
            {day}
          </div>
        ))}

        {/* Calendar Dates */}

        {calendarDays.map((item, index) => {

          const isToday =
            item.currentMonth &&
            item.day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={`${item.day}-${index}`}
              className="flex items-center justify-center"
            >

              <span
                className={`
                  flex h-[23px] w-[23px]
                  items-center justify-center
                  rounded-full
                  text-[7px]
                  font-semibold
                  transition

                  ${
                    !item.currentMonth
                      ? "text-[#c4c9d5]"
                      : isToday
                      ? "bg-[#6538ef] text-white shadow-[0_3px_8px_rgba(99,56,239,0.25)]"
                      : "text-[#58627b] hover:bg-[#eee9ff] hover:text-[#6338ef]"
                  }
                `}
              >
                {item.day}
              </span>

            </div>
          );

        })}

      </div>

    </div>
  );
}

// ============================================================
// UPCOMING THIS WEEK ITEM
// ============================================================

function WeekBirthday({
  person,
}) {
  return (
    <div className="flex items-center gap-2 border-b border-[#edf0f5] py-2 last:border-b-0">

      {/* Profile */}

      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eee9ff]">

        {person.profilePhoto ? (
          <img
            src={person.profilePhoto}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[9px] font-extrabold text-[#6338ef]">
            {person.name?.charAt(0)}
          </span>
        )}

      </div>

      {/* Name */}

      <div className="min-w-0 flex-1">

        <h3 className="truncate text-[8px] font-extrabold text-[#252b44]">
          {person.name}
        </h3>

        <p className="text-[7px] text-[#7d87a0]">
          {person.date}
        </p>

      </div>

      {/* Days */}

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