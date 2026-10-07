import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import axiosInstance from "../../api/axiosInstance";
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
  Heart,
  ArrowUpRight,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import upcomingBirthdaysHero from "../../assets/dashboard/upcomingBirthdaysHero.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


/* ============================================================
   HELPERS
============================================================ */

const formatBirthdayDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getNextBirthday = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  const birthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  birthday.setHours(0, 0, 0, 0);

  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  if (birthday < todayDate) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  return birthday;
};

const getDaysLeft = (birthday) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const birthdayDate = new Date(birthday);
  birthdayDate.setHours(0, 0, 0, 0);

  const difference = birthdayDate - today;

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
};

const getBirthdayStatus = (days) => {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";

  return `In ${days} days`;
};


/* ============================================================
   MAIN COMPONENT
============================================================ */

function UpcomingBirthdays() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const {
    accessToken,
    setAccessToken,
  } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [sortBy, setSortBy] = useState("Nearest Birthday");

  const navigate = useNavigate();


  /* ==========================================================
     GET ALL PERSONS
  ========================================================== */

  const getAllPersons = async () => {
    try {
      setLoading(true);
      setServerError("");

      const response = await axiosInstance.get(
        "/persons",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setContacts(response.data.persons || []);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const refreshResponse = await axiosInstance.post(
            "/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          const newAccessToken =
            refreshResponse.data.accessToken;

          setAccessToken(newAccessToken);

          const retryResponse = await axiosInstance.get(
            "/persons",
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          setContacts(
            retryResponse.data.persons || []
          );
        } catch (refreshError) {
          console.log(
            "REFRESH TOKEN ERROR:",
            refreshError
          );

          if (refreshError.response?.status === 401) {
            setServerError(
              "Session expired. Please login again."
            );

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      } else {
        console.log(
          "GET PERSONS ERROR:",
          error
        );

        setServerError(
          "Failed to load birthdays. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (accessToken) {
      getAllPersons();
    }
  }, [accessToken]);


  /* ==========================================================
     PREPARE BIRTHDAY DATA
  ========================================================== */

  const upcomingBirthdays = contacts
    .map((person) => {
      const nextBirthday = getNextBirthday(
        person.dateOfBirth
      );

      const days = getDaysLeft(nextBirthday);

      return {
        ...person,
        name: person.fullName,
        date: formatBirthdayDate(nextBirthday),
        days: getBirthdayStatus(days),
        daysLeft: days,
        today: days === 0,
        message:
          person.customMessage ||
          "Make their birthday special! 🎉",
        profilePhoto:
          person.profilePhoto || null,
        nextBirthday,
      };
    })
    .sort(
      (a, b) =>
        a.nextBirthday - b.nextBirthday
    );


  /* ==========================================================
     STATISTICS
  ========================================================== */

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayBirthdays =
    upcomingBirthdays.filter(
      (person) => person.daysLeft === 0
    );

  const thisWeekBirthdays =
    upcomingBirthdays.filter(
      (person) =>
        person.daysLeft >= 0 &&
        person.daysLeft <= 7
    );

  const thisMonthBirthdays =
    upcomingBirthdays.filter(
      (person) =>
        person.nextBirthday.getMonth() ===
        today.getMonth()
    );


  /* ==========================================================
     FILTER + SORT
  ========================================================== */

  const filteredBirthdays =
    upcomingBirthdays
      .filter((person) => {
        const matchesSearch =
          person.name
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        let matchesDate = true;

        if (dateFilter === "Today") {
          matchesDate =
            person.daysLeft === 0;
        }

        if (dateFilter === "This Week") {
          matchesDate =
            person.daysLeft >= 0 &&
            person.daysLeft <= 7;
        }

        if (dateFilter === "This Month") {
          matchesDate =
            person.nextBirthday.getMonth() ===
            today.getMonth();
        }

        return matchesSearch && matchesDate;
      })
      .sort((a, b) => {
        if (sortBy === "Nearest Birthday") {
          return (
            a.nextBirthday - b.nextBirthday
          );
        }

        if (sortBy === "Farthest Birthday") {
          return (
            b.nextBirthday - a.nextBirthday
          );
        }

        return 0;
      });

  const birthdays = filteredBirthdays;


  /* ==========================================================
     THIS WEEK
  ========================================================== */

  const weekBirthdays =
    upcomingBirthdays.filter(
      (person) =>
        person.daysLeft >= 0 &&
        person.daysLeft <= 7
    );


  /* ==========================================================
     OPEN MESSAGE PAGE
  ========================================================== */

  const openMessagePage = (person) => {
    navigate("/dashboard/messages", {
      state: {
        selectedPerson: person,
      },
    });
  };


  /* ==========================================================
     RESET FILTERS
  ========================================================== */

  const resetFilters = () => {
    setSearchTerm("");
    setDateFilter("All Time");
    setSortBy("Nearest Birthday");
  };


  /* ==========================================================
     LOADING
  ========================================================== */

  if (
    !accessToken ||
    (loading && contacts.length === 0)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8ff] px-4 dark:bg-[#090911]">
        <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-white/80 bg-white p-8 text-center shadow-[0_30px_80px_rgba(69,45,140,0.15)] dark:border-white/10 dark:bg-[#14131d] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)]">

          <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#d9c8ff] blur-3xl dark:bg-[#7045ef]/20" />

          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#6a3df0] to-[#a06cff] text-white shadow-[0_12px_30px_rgba(105,61,240,0.3)]">
            <CalendarDays size={28} />
          </div>

          <div className="relative">
            <h2 className="text-[16px] font-black text-[#171c35] dark:text-white">
              Loading birthdays
            </h2>

            <p className="mt-1 text-[11px] text-[#7d879e] dark:text-[#8f94a7]">
              Getting your birthday list ready...
            </p>
          </div>

          <div className="relative mx-auto mt-5 h-1.5 w-32 overflow-hidden rounded-full bg-[#eeeafa] dark:bg-white/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-[#6938ef] to-[#a76cff]" />
          </div>
        </div>
      </div>
    );
  }


  /* ==========================================================
     UI
  ========================================================== */

  return (
    <div className="min-h-screen bg-[#f5f6ff] px-3 py-4 text-[#171c35] transition-colors duration-500 dark:bg-[#090911] dark:text-white sm:px-5 lg:px-7">

      <div className="mx-auto max-w-[1550px]">

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="group relative mb-5 min-h-[175px] overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br from-[#fbf9ff] via-[#f6efff] to-[#e9ddff] shadow-[0_20px_60px_rgba(75,49,150,0.12)] transition-all duration-500 hover:shadow-[0_28px_75px_rgba(75,49,150,0.18)] dark:border-white/10 dark:from-[#211a34] dark:via-[#181526] dark:to-[#11111b] dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#d6c0ff]/60 blur-3xl transition-transform duration-700 group-hover:scale-125 dark:bg-[#794cff]/10" />

          <div className="absolute left-[38%] -top-24 h-60 w-60 rounded-full bg-[#ffd6e7]/40 blur-3xl dark:bg-[#ff6b9d]/10" />

          <div className="absolute bottom-[-90px] right-[25%] h-56 w-56 rounded-full bg-[#cbb4ff]/30 blur-3xl dark:bg-[#7448ef]/10" />

          <div className="relative z-10 flex min-h-[175px] items-center px-5 py-7 sm:px-8 lg:px-10">

            <div className="max-w-[650px]">

              <div className="mb-2 flex items-center gap-2">

                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/70 text-[#ef3157] shadow-[0_8px_20px_rgba(70,40,120,0.10)] backdrop-blur-md dark:bg-white/10">
                  <CalendarDays size={17} />
                </span>

                <span className="rounded-full bg-white/60 px-3 py-1 text-[8px] font-black uppercase tracking-[0.15em] text-[#7451d9] shadow-sm backdrop-blur-md dark:bg-white/10 dark:text-[#b09bff]">
                  Birthday Planner
                </span>

              </div>

              <h1 className="text-[29px] font-black leading-tight tracking-[-1.2px] text-[#101631] sm:text-[36px] lg:text-[42px] dark:text-white">
                Upcoming Birthdays
              </h1>

              <p className="mt-2 max-w-[520px] text-[11px] font-medium leading-5 text-[#74809a] sm:text-[12px] dark:text-[#969caf]">
                Here are the upcoming birthdays. Get ready to spread happiness and make every special day memorable! 🎉
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[8px] font-bold text-[#59627a] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#aeb3c4]">
                  <Sparkles size={11} className="text-[#7040ef]" />
                  Never miss a birthday
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[8px] font-bold text-[#59627a] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#aeb3c4]">
                  <Heart size={11} className="text-[#ef5275]" />
                  Spread happiness
                </div>

              </div>
            </div>
          </div>

          <img
            src={upcomingBirthdaysHero}
            alt="Upcoming birthdays"
            className="absolute bottom-[-8px] right-[1%] hidden h-[175px] w-auto object-contain drop-shadow-[0_25px_25px_rgba(72,43,130,0.20)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03] md:block lg:h-[190px]"
          />

        </section>


        {/* ==================================================
            STATS
        ================================================== */}

        <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={Users}
            value={upcomingBirthdays.length}
            label="Upcoming"
            title="All"
            iconBg="bg-[#eee8ff]"
            iconColor="text-[#6338ef]"
          />

          <StatCard
            icon={CalendarDays}
            value={todayBirthdays.length}
            label="Birthday"
            title="Today"
            iconBg="bg-[#ffe9ee]"
            iconColor="text-[#ef405b]"
          />

          <StatCard
            icon={CalendarDays}
            value={thisWeekBirthdays.length}
            label="Birthdays"
            title="This Week"
            iconBg="bg-[#eae5ff]"
            iconColor="text-[#6338ef]"
          />

          <StatCard
            icon={Gift}
            value={thisMonthBirthdays.length}
            label="Birthdays"
            title="This Month"
            iconBg="bg-[#fff0d9]"
            iconColor="text-[#ed9818]"
          />

        </section>


        {/* ==================================================
            MAIN
        ================================================== */}

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">


          {/* =================================================
              LEFT
          ================================================= */}

          <div className="min-w-0">

            {/* SEARCH / FILTERS */}

            <div className="mb-3 rounded-[22px] border border-white/80 bg-white/90 p-3 shadow-[0_12px_35px_rgba(40,45,90,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-[#12121b]/90 dark:shadow-[0_15px_40px_rgba(0,0,0,0.25)]">

              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eee9ff] text-[#6338ef] dark:bg-[#30264b] dark:text-[#a991ff]">
                    <SlidersHorizontal size={14} />
                  </div>

                  <div>
                    <h2 className="text-[10px] font-black text-[#22283f] dark:text-white">
                      Find a birthday
                    </h2>

                    <p className="text-[8px] text-[#8b94a9] dark:text-[#777d91]">
                      Search, filter and sort your contacts
                    </p>
                  </div>

                </div>

                {(searchTerm ||
                  dateFilter !== "All Time" ||
                  sortBy !== "Nearest Birthday") && (

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[8px] font-bold text-[#7550ee] transition hover:bg-[#f1edff] dark:hover:bg-[#30264b]"
                  >
                    <RotateCcw size={10} />
                    Reset
                  </button>

                )}

              </div>


              <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto_auto]">

                <div className="relative">

                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8490a8] dark:text-[#73798d]"
                  />

                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-[#e1e4ed] bg-[#fafbff] pl-9 pr-4 text-[10px] font-medium text-[#3e4761] outline-none transition-all placeholder:text-[#a0a8ba] hover:border-[#cfd3e0] focus:border-[#7550ee] focus:bg-white focus:shadow-[0_0_0_4px_rgba(117,80,238,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-[#666c7e] dark:hover:border-white/20 dark:focus:bg-white/[0.05]"
                  />

                </div>


                <div className="relative">

                  <select
                    value={dateFilter}
                    onChange={(e) =>
                      setDateFilter(e.target.value)
                    }
                    className="h-10 w-full min-w-[130px] appearance-none rounded-xl border border-[#e1e4ed] bg-[#fafbff] px-3 pr-8 text-[9px] font-bold text-[#5d6780] outline-none transition focus:border-[#7550ee] dark:border-white/10 dark:bg-white/[0.035] dark:text-[#aeb3c4]"
                  >
                    <option>All Time</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>

                  <ChevronDown
                    size={12}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7c86a0]"
                  />

                </div>


                <div className="relative">

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value)
                    }
                    className="h-10 w-full min-w-[155px] appearance-none rounded-xl border border-[#e1e4ed] bg-[#fafbff] px-3 pr-8 text-[9px] font-bold text-[#5d6780] outline-none transition focus:border-[#7550ee] dark:border-white/10 dark:bg-white/[0.035] dark:text-[#aeb3c4]"
                  >
                    <option>
                      Nearest Birthday
                    </option>

                    <option>
                      Farthest Birthday
                    </option>
                  </select>

                  <ChevronDown
                    size={12}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7c86a0]"
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                BIRTHDAY LIST
            ================================================= */}

            <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white/90 shadow-[0_18px_45px_rgba(40,45,90,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#12121b]/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.30)]">

              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-[#edf0f5] px-4 py-3 dark:border-white/10 sm:px-5">

                <div>
                  <h2 className="text-[12px] font-black text-[#20263f] dark:text-white">
                    Birthday List
                  </h2>

                  <p className="mt-0.5 text-[8px] text-[#8b94a9] dark:text-[#777d91]">
                    {birthdays.length}{" "}
                    {birthdays.length === 1
                      ? "birthday"
                      : "birthdays"}{" "}
                    found
                  </p>
                </div>

                <div className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-[#f1edff] px-2 text-[8px] font-black text-[#6941df] dark:bg-[#30264b] dark:text-[#aa95ff]">
                  {birthdays.length}
                </div>

              </div>


              {/* =================================================
                  LEFT LIST SCROLL AREA — 400PX
              ================================================= */}

              <div className="max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#c9c0e8] scrollbar-track-transparent dark:scrollbar-thumb-[#51466e]">

                {birthdays.length > 0 ? (

                  birthdays.map((person, index) => (

                    <BirthdayRow
                      key={
                        person._id ||
                        person.name
                      }
                      person={person}
                      isLast={
                        index ===
                        birthdays.length - 1
                      }
                      onWish={() =>
                        openMessagePage(person)
                      }
                    />

                  ))

                ) : (

                  <EmptyBirthdayState
                    hasFilters={
                      searchTerm ||
                      dateFilter !== "All Time"
                    }
                    resetFilters={
                      resetFilters
                    }
                  />

                )}

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="mx-auto w-full max-w-[280px] space-y-5 xl:mx-0">


            {/* COMPACT CALENDAR */}

            <CalendarCard />


            {/* =================================================
                UPCOMING THIS WEEK
            ================================================= */}

            <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white/90 p-4 shadow-[0_15px_40px_rgba(40,45,90,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#12121b]/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#eee9ff] to-[#ddd4ff] text-[#6338ef] shadow-[0_7px_15px_rgba(99,56,239,0.12)] dark:from-[#342954] dark:to-[#28203e] dark:text-[#a995ff]">
                    <CalendarDays size={16} />
                  </div>

                  <div>
                    <h2 className="text-[11px] font-black text-[#20263f] dark:text-white">
                      Upcoming This Week
                    </h2>

                    <p className="text-[8px] text-[#8b94a9] dark:text-[#777d91]">
                      Your next celebrations
                    </p>
                  </div>

                </div>

                <span className="rounded-lg bg-[#f0f1f7] px-2.5 py-1.5 text-[8px] font-black text-[#68738d] dark:bg-white/10 dark:text-[#aeb3c4]">
                  {weekBirthdays.length}
                </span>

              </div>


              {/* =================================================
                  ONLY THIS LIST SCROLLS — 100PX
              ================================================= */}

              <div className="max-h-[100px] overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-thumb-[#c9c0e8] scrollbar-track-transparent dark:scrollbar-thumb-[#51466e]">

                {weekBirthdays.length > 0 ? (

                  weekBirthdays.map(
                    (person) => (

                      <WeekBirthday
                        key={
                          person._id ||
                          person.name
                        }
                        person={person}
                        onWish={() =>
                          openMessagePage(
                            person
                          )
                        }
                      />

                    )
                  )

                ) : (

                  <div className="flex min-h-[100px] items-center justify-center text-center">

                    <div>

                      <Cake
                        size={22}
                        className="mx-auto mb-2 text-[#9b8bcf]"
                      />

                      <p className="text-[9px] font-bold text-[#727c94] dark:text-[#969caf]">
                        No birthdays this week
                      </p>

                    </div>

                  </div>

                )}

              </div>

            </div>


            {/* QUOTE */}

            <div className="group relative overflow-hidden rounded-[24px] border border-[#ded2ff] bg-gradient-to-br from-[#f9f4ff] via-[#f1e8ff] to-[#e8dcff] p-5 shadow-[0_15px_40px_rgba(100,70,180,0.10)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(100,70,180,0.16)] dark:border-[#493b67] dark:from-[#211a34] dark:via-[#191526] dark:to-[#14121e]">

              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#d4c0ff]/50 blur-2xl dark:bg-[#794cff]/10" />

              <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-[#ffcadf]/30 blur-2xl dark:bg-[#ff6d9f]/10" />

              <div className="relative">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 text-[#7044e9] shadow-sm backdrop-blur-md dark:bg-white/10 dark:text-[#aa96ff]">
                  <Sparkles size={16} />
                </div>

                <p className="font-serif text-[12px] font-bold italic leading-5 text-[#4d5470] dark:text-[#b8b2c9]">
                  Every birthday is a new beginning filled with love, hope and happiness.
                  <span className="ml-1">❤️</span>
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <div className="h-px w-8 bg-[#9675ed] dark:bg-[#8061d2]" />

                  <span className="text-[7px] font-black uppercase tracking-[0.18em] text-[#7854d4] dark:text-[#a48eff]">
                    BirthdayBuddy
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ERROR */}

        {serverError && (

          <div className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-30px)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-red-200 bg-white px-4 py-3 shadow-[0_20px_50px_rgba(239,68,68,0.18)] dark:border-red-500/20 dark:bg-[#19141a]">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10">
              <span className="text-sm">!</span>
            </div>

            <p className="text-[10px] font-bold text-red-600 dark:text-red-400">
              {serverError}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  value,
  label,
  title,
  iconBg,
  iconColor,
}) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-white/80 bg-white/90 p-3 shadow-[0_10px_30px_rgba(40,45,90,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(55,45,120,0.13)] dark:border-white/10 dark:bg-[#12121b]/90 dark:shadow-[0_12px_35px_rgba(0,0,0,0.25)]">

      <div className="absolute -right-7 -top-7 h-16 w-16 rounded-full bg-[#f0ecff] blur-xl dark:bg-[#7148ef]/10" />

      <div className="relative flex items-center gap-3">

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconBg} shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_7px_15px_rgba(40,30,100,0.08)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3`}
        >
          <Icon
            size={19}
            strokeWidth={2.5}
            className={iconColor}
          />
        </div>

        <div className="min-w-0">

          <p className="text-[9px] font-bold text-[#7d879e] dark:text-[#808699]">
            {title}
          </p>

          <div className="mt-0.5 flex items-end gap-1.5">

            <span className="text-[22px] font-black leading-none tracking-[-0.8px] text-[#171d37] dark:text-white">
              {value}
            </span>

            <span className="mb-0.5 text-[8px] font-semibold text-[#929aae] dark:text-[#73798c]">
              {label}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   BIRTHDAY ROW
============================================================ */

function BirthdayRow({
  person,
  isLast,
  onWish,
}) {
  return (
    <div
      className={`group relative flex min-h-[82px] items-center gap-3 px-4 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#faf8ff] hover:to-white dark:hover:from-[#1b1827] dark:hover:to-[#15151f] sm:gap-4 sm:px-5 ${
        !isLast
          ? "border-b border-[#edf0f5] dark:border-white/10"
          : ""
      }`}
    >

      {/* AVATAR */}

      <div className="relative shrink-0">

        <div className="absolute inset-0 rounded-[17px] bg-[#8f6af3]/20 blur-md transition-all duration-300 group-hover:bg-[#8f6af3]/30" />

        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[17px] border-2 border-white bg-gradient-to-br from-[#eee9ff] to-[#ddd2ff] shadow-[0_8px_18px_rgba(78,53,145,0.16)] transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-[-2deg] group-hover:shadow-[0_12px_25px_rgba(78,53,145,0.22)] dark:border-[#302a40] dark:from-[#352a50] dark:to-[#28213d] sm:h-13 sm:w-13">

          {person.profilePhoto ? (

            <img
              src={person.profilePhoto}
              alt={person.name}
              className="h-full w-full object-cover"
            />

          ) : (

            <span className="text-[14px] font-black text-[#6338ef] dark:text-[#ac98ff]">
              {person.name?.charAt(0)?.toUpperCase()}
            </span>

          )}

        </div>

        {person.today && (

          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#ef405b] text-white shadow-md dark:border-[#12121b]">
            <Cake size={9} />
          </span>

        )}

      </div>


      {/* NAME */}

      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-2">

          <h3 className="truncate text-[11px] font-black text-[#1b213b] dark:text-white sm:text-[12px]">
            {person.name}
          </h3>

          {person.today && (

            <span className="rounded-full bg-[#ffe9ee] px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-[#ef405b] dark:bg-[#ef405b]/10 dark:text-[#ff7088]">
              Today
            </span>

          )}

        </div>

        <p className="mt-1 text-[8px] font-medium text-[#808aa1] dark:text-[#7f8699] sm:text-[9px]">
          {person.date}
        </p>


        {/* MOBILE STATUS */}

        <div className="mt-1.5 flex items-center gap-1.5 sm:hidden">

          <span
            className={`rounded-full px-2 py-0.5 text-[7px] font-black ${
              person.today
                ? "bg-[#ffe9ee] text-[#ef405b]"
                : "bg-[#fff1dc] text-[#df8b16]"
            }`}
          >
            {person.days}
          </span>

        </div>

      </div>


      {/* DESKTOP STATUS */}

      <div
        className={`hidden min-w-[92px] items-center justify-center gap-1.5 rounded-xl px-3 py-2 sm:flex ${
          person.today
            ? "bg-[#ffe9ee] text-[#ef405b] dark:bg-[#ef405b]/10 dark:text-[#ff7189]"
            : "bg-[#fff1dc] text-[#df8b16] dark:bg-[#df8b16]/10 dark:text-[#f1ac42]"
        }`}
      >

        <Cake size={12} />

        <span className="whitespace-nowrap text-[8px] font-black">
          {person.days}
        </span>

      </div>


      {/* MESSAGE */}

      <p className="hidden max-w-[220px] flex-1 truncate text-[8px] font-medium text-[#7a849c] lg:block">
        {person.message}
      </p>


      {/* WISH */}

      <button
        type="button"
        onClick={onWish}
        className="group/wish flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-br from-[#e0faed] to-[#d2f6e4] px-3 text-[8px] font-black text-[#08a96f] shadow-[0_6px_15px_rgba(8,174,118,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_9px_20px_rgba(8,174,118,0.18)] dark:from-[#103b2c] dark:to-[#123326] dark:text-[#46d99c]"
      >

        <FaWhatsapp
          size={14}
          className="transition-transform duration-300 group-hover/wish:scale-110"
        />

        <span className="hidden sm:inline">
          Wish
        </span>

        <ArrowUpRight
          size={11}
          className="hidden transition-transform group-hover/wish:translate-x-0.5 group-hover/wish:-translate-y-0.5 sm:block"
        />

      </button>


      {/* MORE */}

      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#7b849b] transition hover:bg-[#f2effb] hover:text-[#6338ef] dark:hover:bg-white/10 dark:hover:text-[#aa96ff]"
      >
        <MoreVertical size={15} />
      </button>

    </div>
  );
}


/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyBirthdayState({
  hasFilters,
  resetFilters,
}) {
  return (
    <div className="flex min-h-[320px] items-center justify-center px-5">

      <div className="text-center">

        <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#eee8ff] to-[#ddd3ff] text-[#6338ef] shadow-[0_12px_25px_rgba(99,56,239,0.15)] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#a995ff]">

          <Cake size={27} />

          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#6338ef] text-white shadow-md">
            <Sparkles size={11} />
          </span>

        </div>

        <h3 className="text-[13px] font-black text-[#252b45] dark:text-white">
          {hasFilters
            ? "No birthdays found"
            : "No upcoming birthdays"}
        </h3>

        <p className="mx-auto mt-1 max-w-[260px] text-[9px] leading-4 text-[#8c95aa] dark:text-[#777d91]">
          {hasFilters
            ? "Try changing your search or filters to find what you're looking for."
            : "Add people to BirthdayBuddy and their upcoming birthdays will appear here."}
        </p>

        {hasFilters && (

          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-xl bg-[#6338ef] px-4 py-2 text-[9px] font-black text-white shadow-[0_8px_20px_rgba(99,56,239,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(99,56,239,0.32)]"
          >
            Clear Filters
          </button>

        )}

      </div>

    </div>
  );
}


/* ============================================================
   COMPACT CALENDAR
============================================================ */

function CalendarCard() {
  const [currentDate, setCurrentDate] =
    useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const monthName =
    currentDate.toLocaleString("en-US", {
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

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const daysInPreviousMonth = new Date(
    year,
    month,
    0
  ).getDate();

  const calendarDays = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPreviousMonth - i,
      currentMonth: false,
    });
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    calendarDays.push({
      day,
      currentMonth: true,
    });
  }

  let nextDay = 1;

  while (calendarDays.length < 42) {
    calendarDays.push({
      day: nextDay,
      currentMonth: false,
    });

    nextDay++;
  }

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[24px] border border-white/80 bg-white/90 p-3 shadow-[0_15px_40px_rgba(40,45,90,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#12121b]/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

      {/* HEADER */}

      <div className="mb-2.5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#eee9ff] to-[#ddd4ff] text-[#6338ef] shadow-sm dark:from-[#342954] dark:to-[#28203e] dark:text-[#a995ff]">
            <CalendarDays size={14} />
          </div>

          <div>

            <h2 className="text-[10px] font-black text-[#20263f] dark:text-white">
              {monthName} {year}
            </h2>

            <button
              type="button"
              onClick={handleToday}
              className="mt-0.5 text-[6px] font-bold text-[#7653dc] hover:underline dark:text-[#a994ff]"
            >
              Go to today
            </button>

          </div>

        </div>


        <div className="flex items-center gap-0.5">

          <button
            type="button"
            onClick={handlePreviousMonth}
            className="flex h-6 w-6 items-center justify-center rounded-lg text-[#7a849d] transition hover:bg-[#f1edff] hover:text-[#6338ef] dark:hover:bg-white/10 dark:hover:text-[#aa96ff]"
          >
            <ChevronLeft size={12} />
          </button>

          <button
            type="button"
            onClick={handleNextMonth}
            className="flex h-6 w-6 items-center justify-center rounded-lg text-[#7a849d] transition hover:bg-[#f1edff] hover:text-[#6338ef] dark:hover:bg-white/10 dark:hover:text-[#aa96ff]"
          >
            <ChevronRight size={12} />
          </button>

        </div>

      </div>


      {/* WEEKDAYS */}

      <div className="mb-1 grid grid-cols-7">

        {weekDays.map((day) => (

          <div
            key={day}
            className="py-0.5 text-center text-[6px] font-black uppercase tracking-wide text-[#9aa2b5] dark:text-[#686f82]"
          >
            {day.charAt(0)}
          </div>

        ))}

      </div>


      {/* DATES */}

      <div className="grid grid-cols-7 gap-y-0.5">

        {calendarDays.map(
          (item, index) => {

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
                  className={`flex h-7 w-7 items-center justify-center rounded-[9px] text-[7px] font-bold transition-all duration-200 ${
                    !item.currentMonth
                      ? "text-[#c8ccd6] dark:text-[#414653]"
                      : isToday
                      ? "bg-gradient-to-br from-[#6338ef] to-[#8a58ff] text-white shadow-[0_5px_12px_rgba(99,56,239,0.30)]"
                      : "text-[#59627a] hover:-translate-y-0.5 hover:bg-[#eee9ff] hover:text-[#6338ef] dark:text-[#9298aa] dark:hover:bg-[#30264b] dark:hover:text-[#aa96ff]"
                  }`}
                >
                  {item.day}
                </span>

              </div>

            );
          }
        )}

      </div>

    </div>
  );
}


/* ============================================================
   WEEK BIRTHDAY
============================================================ */

function WeekBirthday({
  person,
  onWish,
}) {
  return (
    <div className="group flex items-center gap-2.5 border-b border-[#edf0f5] py-2.5 last:border-b-0 dark:border-white/10">

      <div className="relative shrink-0">

        <div className="absolute inset-0 rounded-xl bg-[#8f6af3]/20 blur-sm" />

        <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#eee9ff] to-[#ddd3ff] text-[#6338ef] shadow-[0_5px_12px_rgba(80,55,140,0.12)] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#a995ff]">

          {person.profilePhoto ? (

            <img
              src={person.profilePhoto}
              alt={person.name}
              className="h-full w-full object-cover"
            />

          ) : (

            <span className="text-[9px] font-black">
              {person.name
                ?.charAt(0)
                ?.toUpperCase()}
            </span>

          )}

        </div>

      </div>


      <div className="min-w-0 flex-1">

        <h3 className="truncate text-[8px] font-black text-[#252b44] dark:text-white">
          {person.name}
        </h3>

        <p className="mt-0.5 text-[6px] font-medium text-[#7d87a0] dark:text-[#777d91]">
          {person.date}
        </p>

      </div>


      <div className="flex flex-col items-end gap-1">

        <span
          className={`whitespace-nowrap rounded-lg px-1.5 py-1 text-[6px] font-black ${
            person.today
              ? "bg-[#ffe9ee] text-[#ef405b] dark:bg-[#ef405b]/10 dark:text-[#ff7189]"
              : "bg-[#fff1dc] text-[#df8b16] dark:bg-[#df8b16]/10 dark:text-[#f1ac42]"
          }`}
        >
          {person.days}
        </span>

        <button
          type="button"
          onClick={onWish}
          className="flex items-center gap-1 text-[6px] font-black text-[#08aa70] opacity-0 transition group-hover:opacity-100 dark:text-[#4cdda1]"
        >
          <FaWhatsapp size={8} />
          Wish
        </button>

      </div>

    </div>
  );
}


export default UpcomingBirthdays;