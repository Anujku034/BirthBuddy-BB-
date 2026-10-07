import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Users,
  Cake,
  Gift,
  UserPlus,
  Search,
  CalendarDays,
  ArrowUpDown,
  Plus,
  ChevronDown,
  Pencil,
  Trash2,
  Phone,
  Sparkles,
  Heart,
  Clock3,
  X,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import axiosInstance from "../../api/axiosInstance";

/* ============================================================
   HELPERS
============================================================ */

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


const getDaysLeft = (dateOfBirth) => {
  if (!dateOfBirth) return 0;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const birthDate = new Date(dateOfBirth);

  const birthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  birthday.setHours(0, 0, 0, 0);

  if (birthday < today) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const difference = birthday - today;

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
};


const getBirthdayLabel = (days) => {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
};


const getInitials = (name) => {
  if (!name) return "?";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[1].charAt(0)
  ).toUpperCase();
};


const getBirthdayDate = (dateOfBirth) => {
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
    birthday.setFullYear(
      today.getFullYear() + 1
    );
  }

  return birthday;
};


/* ============================================================
   MAIN COMPONENT
============================================================ */

function AllContacts() {
  const [contacts, setContacts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [birthdayFilter, setBirthdayFilter] =
    useState("All Birthdays");

  const [sortBy, setSortBy] =
    useState("Name");

  const [sortOrder, setSortOrder] =
    useState("asc");

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  const {
    accessToken,
    setAccessToken,
  } = useContext(AuthContext);

  const navigate = useNavigate();


  /* ==========================================================
     GET ALL PERSONS
  ========================================================== */

  const getAllPersons = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axiosInstance.get(
        "/persons",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setContacts(
        response.data.persons || []
      );
    } catch (error) {
      console.log(
        "GET PERSONS ERROR:",
        error
      );

      if (error.response?.status === 401) {
        try {
          const refreshResponse =
            await axiosInstance.post(
              "/auth/refresh",
              {},
              {
                withCredentials: true,
              }
            );

          const newAccessToken =
            refreshResponse.data.accessToken;

          setAccessToken(newAccessToken);

          const retryResponse =
            await axiosInstance.get(
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
            "REFRESH ERROR:",
            refreshError
          );

          if (
            refreshError.response?.status ===
            401
          ) {
            setErrorMessage(
              "Session expired. Please login again."
            );

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      } else {
        setErrorMessage(
          "Unable to load contacts. Please try again."
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
     EDIT
  ========================================================== */

  const handleEdit = (id) => {
    navigate(
      `/dashboard/add-person/${id}`
    );
  };


  /* ==========================================================
     DELETE
  ========================================================== */

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      setErrorMessage("");

      await axiosInstance.delete(
        `/persons/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setContacts((prevContacts) =>
        prevContacts.filter(
          (contact) => contact._id !== id
        )
      );

      setDeleteTarget(null);
    } catch (error) {
      console.log(
        "DELETE PERSON ERROR:",
        error
      );

      if (error.response?.status === 401) {
        try {
          const refreshResponse =
            await axiosInstance.post(
              "/auth/refresh",
              {},
              {
                withCredentials: true,
              }
            );

          const newAccessToken =
            refreshResponse.data.accessToken;

          setAccessToken(newAccessToken);

          await axiosInstance.delete(
            `/persons/${id}`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          setContacts((prevContacts) =>
            prevContacts.filter(
              (contact) =>
                contact._id !== id
            )
          );

          setDeleteTarget(null);
        } catch (refreshError) {
          console.log(
            "DELETE REFRESH ERROR:",
            refreshError
          );

          if (
            refreshError.response?.status ===
            401
          ) {
            setErrorMessage(
              "Session expired. Please login again."
            );

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      } else {
        setErrorMessage(
          "Unable to delete this contact."
        );
      }
    } finally {
      setDeletingId(null);
    }
  };


  /* ==========================================================
     BIRTHDAY STATISTICS
  ========================================================== */

  const birthdaysThisWeek = useMemo(() => {
    return contacts.filter((contact) => {
      const days = getDaysLeft(
        contact.dateOfBirth
      );

      return days >= 0 && days <= 7;
    });
  }, [contacts]);


  const birthdaysThisMonth = useMemo(() => {
    const today = new Date();

    return contacts.filter((contact) => {
      const birthDate = new Date(
        contact.dateOfBirth
      );

      return (
        birthDate.getMonth() ===
        today.getMonth()
      );
    });
  }, [contacts]);


  const birthdaysToday = useMemo(() => {
    return contacts.filter(
      (contact) =>
        getDaysLeft(
          contact.dateOfBirth
        ) === 0
    );
  }, [contacts]);


  /* ==========================================================
     FILTER + SORT
  ========================================================== */

  const filteredContacts = useMemo(() => {
    let result = [...contacts];

    const search = searchTerm
      .trim()
      .toLowerCase();

    if (search) {
      result = result.filter((contact) => {
        return (
          contact.fullName
            ?.toLowerCase()
            .includes(search) ||
          contact.phone
            ?.toLowerCase()
            .includes(search) ||
          contact.email
            ?.toLowerCase()
            .includes(search) ||
          contact.notes
            ?.toLowerCase()
            .includes(search)
        );
      });
    }


    if (birthdayFilter === "Today") {
      result = result.filter(
        (contact) =>
          getDaysLeft(
            contact.dateOfBirth
          ) === 0
      );
    }


    if (birthdayFilter === "This Week") {
      result = result.filter((contact) => {
        const days = getDaysLeft(
          contact.dateOfBirth
        );

        return days >= 0 && days <= 7;
      });
    }


    if (birthdayFilter === "This Month") {
      const today = new Date();

      result = result.filter((contact) => {
        const birthDate = new Date(
          contact.dateOfBirth
        );

        return (
          birthDate.getMonth() ===
          today.getMonth()
        );
      });
    }


    result.sort((a, b) => {
      if (sortBy === "Name") {
        const nameA =
          a.fullName?.toLowerCase() || "";

        const nameB =
          b.fullName?.toLowerCase() || "";

        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }


      if (sortBy === "Birthday") {
        const dateA =
          getBirthdayDate(
            a.dateOfBirth
          );

        const dateB =
          getBirthdayDate(
            b.dateOfBirth
          );

        return sortOrder === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }


      return 0;
    });

    return result;
  }, [
    contacts,
    searchTerm,
    birthdayFilter,
    sortBy,
    sortOrder,
  ]);


  /* ==========================================================
     RESET FILTERS
  ========================================================== */

  const resetFilters = () => {
    setSearchTerm("");
    setBirthdayFilter("All Birthdays");
    setSortBy("Name");
    setSortOrder("asc");
  };


  /* ==========================================================
     LOADING SCREEN
  ========================================================== */

  if (
    loading &&
    contacts.length === 0
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f6ff] px-4 dark:bg-[#090911]">

        <div className="w-full max-w-sm rounded-[30px] border border-white/80 bg-white/90 p-8 text-center shadow-[0_25px_70px_rgba(74,51,145,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-[#14131d]">

          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#6338ef] to-[#a06cff] text-white shadow-[0_15px_35px_rgba(99,56,239,0.35)]">

            <Users size={28} />

            <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-[#c4aaff]" />

          </div>

          <h2 className="text-[15px] font-black text-[#1d233d] dark:text-white">
            Loading contacts
          </h2>

          <p className="mt-1 text-[10px] text-[#858da2] dark:text-[#777d91]">
            Getting your BirthdayBuddy contacts ready...
          </p>

          <div className="mx-auto mt-5 h-1.5 w-32 overflow-hidden rounded-full bg-[#ece9f8] dark:bg-white/10">

            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-[#6338ef] to-[#a06cff]" />

          </div>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f6ff] px-3 py-4 text-[#171c35] transition-colors duration-500 dark:bg-[#090911] dark:text-white sm:px-5 lg:px-7">

      <div className="mx-auto max-w-[1500px]">


        {/* ====================================================
            HERO
        ==================================================== */}

        <section className="group relative mb-5 min-h-[175px] overflow-hidden rounded-[30px] border border-white/90 bg-gradient-to-br from-[#fcfaff] via-[#f7efff] to-[#e8dcff] shadow-[0_20px_60px_rgba(70,48,140,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(70,48,140,0.18)] dark:border-white/10 dark:from-[#211a34] dark:via-[#181526] dark:to-[#10101a] dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#d6c0ff]/60 blur-3xl dark:bg-[#794cff]/10" />

          <div className="absolute right-[25%] top-[-100px] h-64 w-64 rounded-full bg-[#ffcae1]/40 blur-3xl dark:bg-[#ff4e91]/10" />

          <div className="absolute bottom-[-100px] left-[35%] h-48 w-48 rounded-full bg-[#bcdcff]/40 blur-3xl dark:bg-[#5085ff]/10" />


          <div className="relative z-10 flex min-h-[175px] items-center px-5 py-7 sm:px-8 lg:px-10">

            <div className="max-w-[650px]">

              <div className="mb-2 flex flex-wrap items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/75 text-[#6338ef] shadow-[0_8px_18px_rgba(78,53,145,0.12)] backdrop-blur-md dark:bg-white/10 dark:text-[#aa96ff]">
                  <Users size={18} />
                </div>

                <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.18em] text-[#7650db] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#aa96ff]">
                  Your People
                </span>

              </div>


              <h1 className="text-[30px] font-black leading-tight tracking-[-1.2px] text-[#101631] sm:text-[38px] lg:text-[42px] dark:text-white">
                All Contacts
              </h1>


              <p className="mt-2 max-w-[520px] text-[10px] font-medium leading-5 text-[#747e98] sm:text-[12px] dark:text-[#969caf]">
                Manage your people, remember their special days, and keep every important connection close. 💜
              </p>


              <div className="mt-4 flex flex-wrap gap-2">

                <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[8px] font-bold text-[#59627a] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#aeb3c4]">
                  <Heart
                    size={11}
                    className="text-[#ef5275]"
                  />
                  {contacts.length} people saved
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[8px] font-bold text-[#59627a] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#aeb3c4]">
                  <Sparkles
                    size={11}
                    className="text-[#7040ef]"
                  />
                  Never miss a birthday
                </div>

              </div>

            </div>

          </div>


          {/* DECORATIVE 3D OBJECT */}

          <div className="absolute right-[3%] top-1/2 hidden h-[170px] w-[300px] -translate-y-1/2 md:block">

            <div className="absolute left-[85px] top-[18px] h-[125px] w-[90px] rotate-[7deg] rounded-[18px] bg-gradient-to-br from-[#7f47f4] to-[#4e22d3] shadow-[0_25px_35px_rgba(66,33,160,0.30)] transition-transform duration-700 group-hover:rotate-[12deg] group-hover:-translate-y-2">

              <div className="absolute inset-x-2 top-2 h-1 rounded-full bg-white/20" />

              <div className="absolute left-1/2 top-[34px] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg">

                <Users
                  size={24}
                  className="text-[#7040e9]"
                />

              </div>

              <div className="absolute bottom-3 left-0 right-0 text-center text-[7px] font-black tracking-widest text-white/90">
                CONTACTS
              </div>

            </div>


            <div className="absolute right-0 top-[50px] w-[105px] rotate-[8deg] rounded-xl bg-[#fff3bf] px-3 py-3 text-center shadow-[0_18px_25px_rgba(90,72,30,0.16)] transition-transform duration-700 group-hover:rotate-[3deg] group-hover:-translate-y-2">

              <p className="text-[9px] font-black leading-4 text-[#413c34]">
                People
                <br />
                make life
                <br />
                special! 💜
              </p>

            </div>


            <span className="absolute left-[45px] top-[35px] text-xl transition-transform duration-700 group-hover:-translate-y-3">
              💗
            </span>

            <span className="absolute left-[25px] bottom-[28px] text-xl transition-transform duration-700 group-hover:-translate-y-2">
              ✨
            </span>

            <span className="absolute right-[75px] top-[5px] text-lg">
              ⭐
            </span>

          </div>

        </section>


        {/* ====================================================
            STAT CARDS
        ==================================================== */}

        <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={Users}
            value={contacts.length}
            label="Total Contacts"
            iconBg="bg-[#eee9ff]"
            iconColor="text-[#6338ef]"
          />

          <StatCard
            icon={Cake}
            value={birthdaysToday.length}
            label="Birthdays Today"
            iconBg="bg-[#ffe9ee]"
            iconColor="text-[#ef405b]"
          />

          <StatCard
            icon={Gift}
            value={birthdaysThisWeek.length}
            label="Birthdays This Week"
            iconBg="bg-[#fff0d9]"
            iconColor="text-[#ed9818]"
          />

          <StatCard
            icon={CalendarDays}
            value={birthdaysThisMonth.length}
            label="Birthdays This Month"
            iconBg="bg-[#e7e3ff]"
            iconColor="text-[#6338ef]"
          />

        </section>


        {/* ====================================================
            SEARCH + FILTER
        ==================================================== */}

        <section className="mb-4 rounded-[25px] border border-white/80 bg-white/90 p-3 shadow-[0_15px_40px_rgba(40,45,90,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#12121b]/95">

          <div className="mb-3 flex items-center justify-between">

            <div className="flex items-center gap-2.5">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#eee9ff] to-[#ddd4ff] text-[#6338ef] shadow-[0_7px_15px_rgba(99,56,239,0.12)] dark:from-[#342954] dark:to-[#28203e] dark:text-[#a995ff]">
                <SlidersHorizontal size={16} />
              </div>

              <div>

                <h2 className="text-[11px] font-black text-[#20263f] dark:text-white">
                  Find a Contact
                </h2>

                <p className="text-[8px] text-[#8b94a9] dark:text-[#777d91]">
                  Search, filter and organize your people
                </p>

              </div>

            </div>


            {(searchTerm ||
              birthdayFilter !==
                "All Birthdays" ||
              sortBy !== "Name" ||
              sortOrder !== "asc") && (

              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[8px] font-black text-[#7045e8] transition hover:bg-[#f1edff] dark:hover:bg-white/10"
              >
                Reset
              </button>

            )}

          </div>


          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_170px_170px_auto]">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8490a8] dark:text-[#73798d]"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search by name, phone, email or notes..."
                className="h-11 w-full rounded-xl border border-[#e0e3ec] bg-[#fafbff] pl-10 pr-4 text-[9px] font-medium text-[#3e4761] outline-none transition-all placeholder:text-[#a0a8ba] focus:border-[#7550ee] focus:bg-white focus:shadow-[0_0_0_4px_rgba(117,80,238,0.08)] dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-[#666c7e] dark:focus:bg-white/[0.05]"
              />

            </div>


            {/* BIRTHDAY FILTER */}

            <div className="relative">

              <CalendarDays
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#727d97]"
              />

              <select
                value={birthdayFilter}
                onChange={(e) =>
                  setBirthdayFilter(
                    e.target.value
                  )
                }
                className="h-11 w-full appearance-none rounded-xl border border-[#e0e3ec] bg-[#fafbff] px-9 pr-8 text-[9px] font-bold text-[#59637d] outline-none focus:border-[#7550ee] dark:border-white/10 dark:bg-white/[0.035] dark:text-[#aeb3c4]"
              >
                <option>
                  All Birthdays
                </option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7c86a0]"
              />

            </div>


            {/* SORT */}

            <div className="relative">

              <ArrowUpDown
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#727d97]"
              />

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [type, order] =
                    e.target.value.split("-");

                  setSortBy(type);
                  setSortOrder(order);
                }}
                className="h-11 w-full appearance-none rounded-xl border border-[#e0e3ec] bg-[#fafbff] px-9 pr-8 text-[9px] font-bold text-[#59637d] outline-none focus:border-[#7550ee] dark:border-white/10 dark:bg-white/[0.035] dark:text-[#aeb3c4]"
              >
                <option value="Name-asc">
                  Name A-Z
                </option>
                <option value="Name-desc">
                  Name Z-A
                </option>
                <option value="Birthday-asc">
                  Nearest Birthday
                </option>
                <option value="Birthday-desc">
                  Farthest Birthday
                </option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7c86a0]"
              />

            </div>


            {/* ADD */}

            <NavLink
              to="/dashboard/add-person"
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#6338ef] to-[#8b55ff] px-5 text-[9px] font-black text-white shadow-[0_10px_22px_rgba(99,56,239,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(99,56,239,0.35)] active:scale-95"
            >
              <Plus
                size={15}
                strokeWidth={2.7}
              />
              Add Person
              <ArrowUpRight size={12} />
            </NavLink>

          </div>

        </section>


        {/* ====================================================
            CONTACT LIST
        ==================================================== */}

        <section className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_18px_55px_rgba(40,45,90,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-[#12121b]/95">


          {/* HEADER */}

          <div className="flex items-center justify-between border-b border-[#edf0f5] px-4 py-4 dark:border-white/10 sm:px-5">

            <div>

              <h2 className="text-[13px] font-black text-[#20263f] dark:text-white">
                Contact List
              </h2>

              <p className="mt-0.5 text-[8px] text-[#8b94a9] dark:text-[#777d91]">
                {filteredContacts.length}{" "}
                {filteredContacts.length === 1
                  ? "contact"
                  : "contacts"}{" "}
                found
              </p>

            </div>


            <div className="flex items-center gap-2">

              <div className="hidden items-center gap-1.5 rounded-full bg-[#f1edff] px-3 py-1.5 text-[7px] font-black text-[#7045e8] dark:bg-[#30264b] dark:text-[#aa96ff] sm:flex">
                <Users size={10} />
                {contacts.length} Total
              </div>

              <div className="flex h-8 min-w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#eee9ff] to-[#ddd4ff] px-2.5 text-[8px] font-black text-[#6338ef] shadow-sm dark:from-[#352a50] dark:to-[#28213d] dark:text-[#aa96ff]">
                {filteredContacts.length}
              </div>

            </div>

          </div>


          {/* ==================================================
              DESKTOP TABLE
          ================================================== */}

          <div className="hidden md:block">

            <div className="max-h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-[#c9c0e8] scrollbar-track-transparent dark:scrollbar-thumb-[#51466e]">

              <table className="w-full min-w-[850px] border-collapse">

                <thead className="sticky top-0 z-20">

                  <tr className="border-b border-[#e8eaf1] bg-[#fafbff]/95 backdrop-blur-md dark:border-white/10 dark:bg-[#171620]/95">

                    <th className="w-[45px] px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 rounded accent-[#6337ef]"
                      />
                    </th>

                    <TableHeader
                      text="Name"
                    />

                    <TableHeader
                      text="Date of Birth"
                    />

                    <TableHeader
                      text="Days Left"
                    />

                    <TableHeader
                      text="Phone Number"
                    />

                    <TableHeader
                      text="Actions"
                    />

                  </tr>

                </thead>


                <tbody>

                  {filteredContacts.length > 0 ? (

                    filteredContacts.map(
                      (contact) => (

                        <DesktopContactRow
                          key={contact._id}
                          contact={contact}
                          onEdit={() =>
                            handleEdit(
                              contact._id
                            )
                          }
                          onDelete={() =>
                            setDeleteTarget(
                              contact
                            )
                          }
                          deleting={
                            deletingId ===
                            contact._id
                          }
                        />

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="p-0"
                      >
                        <EmptyState
                          hasFilters={
                            searchTerm ||
                            birthdayFilter !==
                              "All Birthdays"
                          }
                          resetFilters={
                            resetFilters
                          }
                        />
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ==================================================
              MOBILE CONTACT CARDS
          ================================================== */}

          <div className="block md:hidden">

            <div className="max-h-[400px] overflow-y-auto overscroll-contain p-3 scrollbar-thin scrollbar-thumb-[#c9c0e8] scrollbar-track-transparent dark:scrollbar-thumb-[#51466e]">

              {filteredContacts.length > 0 ? (

                <div className="space-y-3">

                  {filteredContacts.map(
                    (contact) => (

                      <MobileContactCard
                        key={contact._id}
                        contact={contact}
                        onEdit={() =>
                          handleEdit(
                            contact._id
                          )
                        }
                        onDelete={() =>
                          setDeleteTarget(
                            contact
                          )
                        }
                        deleting={
                          deletingId ===
                          contact._id
                        }
                      />

                    )
                  )}

                </div>

              ) : (

                <EmptyState
                  hasFilters={
                    searchTerm ||
                    birthdayFilter !==
                      "All Birthdays"
                  }
                  resetFilters={
                    resetFilters
                  }
                />

              )}

            </div>

          </div>

        </section>


        {/* ====================================================
            BOTTOM INFO
        ==================================================== */}

        {contacts.length > 0 && (

          <div className="mt-4 flex flex-col gap-2 rounded-[20px] border border-white/80 bg-white/60 px-4 py-3 shadow-[0_8px_25px_rgba(40,45,90,0.05)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eee9ff] text-[#6338ef] dark:bg-[#30264b] dark:text-[#a995ff]">
                <Sparkles size={12} />
              </div>

              <p className="text-[8px] font-semibold text-[#7d879e] dark:text-[#777d91]">
                Keep your contacts updated so BirthdayBuddy can help you remember every special day.
              </p>

            </div>

            <div className="flex items-center gap-1.5 text-[7px] font-black text-[#08a96f] dark:text-[#4cdda1]">
              <CheckCircle2 size={11} />
              Everything is synced
            </div>

          </div>

        )}

      </div>


      {/* ======================================================
          DELETE MODAL
      ====================================================== */}

      {deleteTarget && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101020]/45 px-4 backdrop-blur-sm">

          <div className="w-full max-w-sm rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_30px_90px_rgba(30,20,80,0.25)] dark:border-white/10 dark:bg-[#171620]">

            <div className="mb-5 flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffe9ed] text-[#ef405b] shadow-[0_8px_20px_rgba(239,64,91,0.15)] dark:bg-[#ef405b]/10 dark:text-[#ff7189]">
                <AlertTriangle size={22} />
              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7e879c] hover:bg-[#f3f4f8] dark:hover:bg-white/10"
              >
                <X size={16} />
              </button>

            </div>


            <h3 className="text-[16px] font-black text-[#20263f] dark:text-white">
              Delete contact?
            </h3>

            <p className="mt-2 text-[10px] leading-5 text-[#7b849a] dark:text-[#8b91a3]">
              Are you sure you want to delete{" "}
              <span className="font-black text-[#313850] dark:text-white">
                {deleteTarget.fullName}
              </span>
              ? This action cannot be undone.
            </p>


            <div className="mt-6 grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="h-11 rounded-xl border border-[#e0e3eb] bg-white text-[9px] font-black text-[#667088] transition hover:bg-[#f7f8fc] dark:border-white/10 dark:bg-white/[0.03] dark:text-[#aeb3c4] dark:hover:bg-white/[0.06]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={Boolean(deletingId)}
                onClick={() =>
                  handleDelete(
                    deleteTarget._id
                  )
                }
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#ef405b] to-[#e72f4e] text-[9px] font-black text-white shadow-[0_10px_22px_rgba(239,64,91,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {deletingId ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={13} />
                    Delete
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          ERROR TOAST
      ====================================================== */}

      {errorMessage && (

        <div className="fixed bottom-5 left-1/2 z-[110] flex w-[calc(100%-30px)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-red-200 bg-white px-4 py-3 shadow-[0_20px_50px_rgba(239,68,68,0.18)] dark:border-red-500/20 dark:bg-[#19141a]">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10">
            <AlertTriangle size={16} />
          </div>

          <div className="min-w-0 flex-1">

            <p className="text-[10px] font-black text-red-600 dark:text-red-400">
              {errorMessage}
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setErrorMessage("")
            }
            className="text-[#9098aa] hover:text-red-500"
          >
            <X size={14} />
          </button>

        </div>

      )}

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
  iconBg,
  iconColor,
}) {
  return (
    <div className="group relative overflow-hidden rounded-[23px] border border-white/90 bg-white/90 p-3.5 shadow-[0_12px_35px_rgba(40,45,90,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(55,45,120,0.14)] dark:border-white/10 dark:bg-[#12121b]/90">

      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#eee9ff] blur-2xl dark:bg-[#7148ef]/10" />

      <div className="relative flex items-center gap-3">

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] ${iconBg} shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_8px_18px_rgba(40,30,100,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-[-4deg] group-hover:shadow-[0_12px_24px_rgba(40,30,100,0.13)]`}
        >

          <Icon
            size={20}
            strokeWidth={2.4}
            className={iconColor}
          />

        </div>

        <div className="min-w-0">

          <h3 className="text-[23px] font-black leading-none tracking-[-0.8px] text-[#171c38] dark:text-white">
            {value}
          </h3>

          <p className="mt-1.5 text-[8px] font-bold leading-3 text-[#727d98] dark:text-[#7f8699]">
            {label}
          </p>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   DESKTOP CONTACT ROW
============================================================ */

function DesktopContactRow({
  contact,
  onEdit,
  onDelete,
  deleting,
}) {
  const daysLeft = getDaysLeft(
    contact.dateOfBirth
  );

  const isToday = daysLeft === 0;

  return (
    <tr className="group border-b border-[#edf0f5] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#faf8ff] hover:to-white dark:border-white/10 dark:hover:from-[#1b1827] dark:hover:to-[#15151f]">

      <td className="px-4 py-4">

        <input
          type="checkbox"
          className="h-3.5 w-3.5 rounded accent-[#6337ef]"
        />

      </td>


      {/* NAME */}

      <td className="px-4 py-4">

        <div className="flex items-center gap-3">

          <ContactAvatar
            contact={contact}
            size="normal"
          />

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <span className="max-w-[180px] truncate text-[11px] font-black text-[#20263d] dark:text-white">
                {contact.fullName}
              </span>

              {isToday && (
                <span className="rounded-full bg-[#ffe9ee] px-2 py-0.5 text-[6px] font-black uppercase text-[#ef405b] dark:bg-[#ef405b]/10 dark:text-[#ff7189]">
                  Today
                </span>
              )}

            </div>

            <span className="mt-1 block max-w-[180px] truncate text-[8px] text-[#8c95aa] dark:text-[#777d91]">
              {contact.notes ||
                "No notes added"}
            </span>

          </div>

        </div>

      </td>


      {/* DOB */}

      <td className="px-4 py-4">

        <div className="flex items-center gap-2 text-[9px] font-semibold text-[#59637d] dark:text-[#9da3b4]">

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f1edff] text-[#7045e8] dark:bg-[#30264b] dark:text-[#a995ff]">
            <CalendarDays size={12} />
          </div>

          {formatDate(
            contact.dateOfBirth
          )}

        </div>

      </td>


      {/* DAYS LEFT */}

      <td className="px-4 py-4">

        <span
          className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[7px] font-black ${
            isToday
              ? "bg-[#ffe9ee] text-[#ef405b] dark:bg-[#ef405b]/10 dark:text-[#ff7189]"
              : daysLeft <= 7
              ? "bg-[#fff0d9] text-[#df8b16] dark:bg-[#df8b16]/10 dark:text-[#f1ac42]"
              : "bg-[#eee9ff] text-[#7045e8] dark:bg-[#30264b] dark:text-[#aa96ff]"
          }`}
        >

          <Clock3 size={10} />

          {getBirthdayLabel(daysLeft)}

        </span>

      </td>


      {/* PHONE */}

      <td className="px-4 py-4">

        {contact.phone ? (

          <div className="flex items-center gap-2 text-[9px] font-semibold text-[#59637d] dark:text-[#9da3b4]">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e4faf2] text-[#08ad73] dark:bg-[#103b2c] dark:text-[#4cdda1]">
              <Phone size={11} />
            </div>

            {contact.phone}

          </div>

        ) : (

          <span className="text-[9px] text-[#a2a9b8]">
            Not added
          </span>

        )}

      </td>


      {/* ACTIONS */}

      <td className="px-4 py-4">

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={onEdit}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-[#eee9ff] px-3 text-[8px] font-black text-[#6338ef] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e3dbff] hover:shadow-[0_8px_18px_rgba(99,56,239,0.15)] dark:bg-[#30264b] dark:text-[#aa96ff] dark:hover:bg-[#3a2f58]"
          >
            <Pencil size={12} />
            Edit
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={onDelete}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-[#ffe9ed] px-3 text-[8px] font-black text-[#ef405b] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffdde3] hover:shadow-[0_8px_18px_rgba(239,64,91,0.15)] disabled:opacity-50 dark:bg-[#351d26] dark:text-[#ff7189] dark:hover:bg-[#41212c]"
          >
            <Trash2 size={12} />
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
}


/* ============================================================
   MOBILE CONTACT CARD
============================================================ */

function MobileContactCard({
  contact,
  onEdit,
  onDelete,
  deleting,
}) {
  const daysLeft = getDaysLeft(
    contact.dateOfBirth
  );

  const isToday = daysLeft === 0;

  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-white/90 bg-white/95 p-3.5 shadow-[0_12px_30px_rgba(40,45,90,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(55,45,120,0.13)] dark:border-white/10 dark:bg-[#181720]">

      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#eee9ff] blur-2xl dark:bg-[#7045e8]/10" />

      <div className="relative">

        <div className="flex items-start gap-3">

          <ContactAvatar
            contact={contact}
            size="large"
          />

          <div className="min-w-0 flex-1">

            <div className="flex items-start justify-between gap-2">

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-1.5">

                  <h3 className="truncate text-[12px] font-black text-[#20263d] dark:text-white">
                    {contact.fullName}
                  </h3>

                  {isToday && (

                    <span className="rounded-full bg-[#ffe9ee] px-2 py-0.5 text-[6px] font-black uppercase text-[#ef405b] dark:bg-[#ef405b]/10 dark:text-[#ff7189]">
                      Today
                    </span>

                  )}

                </div>

                <p className="mt-1 text-[8px] text-[#8b94a9] dark:text-[#777d91]">
                  {contact.notes ||
                    "No notes added"}
                </p>

              </div>

            </div>


            <div className="mt-3 grid grid-cols-2 gap-2">

              <div className="rounded-xl bg-[#f8f7fc] px-2.5 py-2 dark:bg-white/[0.04]">

                <div className="mb-1 flex items-center gap-1.5 text-[#7c86a0]">

                  <CalendarDays size={10} />

                  <span className="text-[6px] font-black uppercase tracking-wide">
                    Birthday
                  </span>

                </div>

                <p className="text-[8px] font-bold text-[#404962] dark:text-[#b3b8c8]">
                  {formatDate(
                    contact.dateOfBirth
                  )}
                </p>

              </div>


              <div className="rounded-xl bg-[#f8f7fc] px-2.5 py-2 dark:bg-white/[0.04]">

                <div className="mb-1 flex items-center gap-1.5 text-[#7c86a0]">

                  <Clock3 size={10} />

                  <span className="text-[6px] font-black uppercase tracking-wide">
                    Countdown
                  </span>

                </div>

                <p
                  className={`text-[8px] font-black ${
                    isToday
                      ? "text-[#ef405b]"
                      : daysLeft <= 7
                      ? "text-[#df8b16]"
                      : "text-[#7045e8] dark:text-[#aa96ff]"
                  }`}
                >
                  {getBirthdayLabel(
                    daysLeft
                  )}
                </p>

              </div>

            </div>


            {contact.phone && (

              <div className="mt-2 flex items-center gap-1.5 text-[8px] font-semibold text-[#737d95] dark:text-[#8e94a6]">

                <Phone size={10} />

                {contact.phone}

              </div>

            )}


            <div className="mt-3 flex gap-2">

              <button
                type="button"
                onClick={onEdit}
                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-[#eee9ff] to-[#e4ddff] text-[8px] font-black text-[#6338ef] shadow-sm transition active:scale-95 dark:from-[#30264b] dark:to-[#28213d] dark:text-[#aa96ff]"
              >
                <Pencil size={11} />
                Edit
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={onDelete}
                className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-[#ffe9ed] to-[#ffe0e5] text-[8px] font-black text-[#ef405b] shadow-sm transition active:scale-95 disabled:opacity-50 dark:from-[#351d26] dark:to-[#2c1921] dark:text-[#ff7189]"
              >
                <Trash2 size={11} />
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   CONTACT AVATAR
============================================================ */

function ContactAvatar({
  contact,
  size = "normal",
}) {
  const large =
    size === "large";

  return (
    <div
      className={`relative shrink-0 ${
        large
          ? "h-14 w-14"
          : "h-11 w-11"
      }`}
    >

      <div className="absolute inset-0 rounded-[17px] bg-[#8c67ef]/20 blur-md" />

      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-[17px] border-2 border-white bg-gradient-to-br from-[#eee9ff] to-[#ddd3ff] text-[#6338ef] shadow-[0_9px_20px_rgba(70,45,140,0.17)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_25px_rgba(70,45,140,0.22)] dark:border-[#302a40] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#aa96ff]`}
      >

        {contact.profilePhoto ? (

          <img
            src={contact.profilePhoto}
            alt={contact.fullName}
            className="h-full w-full object-cover"
          />

        ) : (

          <span
            className={
              large
                ? "text-[16px] font-black"
                : "text-[12px] font-black"
            }
          >
            {getInitials(
              contact.fullName
            )}
          </span>

        )}

      </div>

      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#7a48f3] to-[#6338ef] text-white shadow-md dark:border-[#12121b]">

        <Heart
          size={8}
          fill="currentColor"
        />

      </div>

    </div>
  );
}


/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  hasFilters,
  resetFilters,
}) {
  return (
    <div className="flex min-h-[280px] items-center justify-center px-5">

      <div className="text-center">

        <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#eee9ff] to-[#ddd3ff] text-[#6338ef] shadow-[0_12px_25px_rgba(99,56,239,0.15)] dark:from-[#352a50] dark:to-[#28213d] dark:text-[#a995ff]">

          {hasFilters ? (
            <Search size={26} />
          ) : (
            <Users size={26} />
          )}

          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#6338ef] text-white shadow-md">
            <Sparkles size={10} />
          </span>

        </div>

        <h3 className="text-[13px] font-black text-[#252b45] dark:text-white">
          {hasFilters
            ? "No contacts found"
            : "No contacts yet"}
        </h3>

        <p className="mx-auto mt-1 max-w-[280px] text-[9px] leading-4 text-[#8c95aa] dark:text-[#777d91]">

          {hasFilters
            ? "Try changing your search or filters to find what you're looking for."
            : "Add your first contact and start remembering the special people in your life."}

        </p>


        {hasFilters ? (

          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-xl bg-[#6338ef] px-4 py-2.5 text-[8px] font-black text-white shadow-[0_8px_20px_rgba(99,56,239,0.25)] transition hover:-translate-y-0.5"
          >
            Clear Filters
          </button>

        ) : (

          <NavLink
            to="/dashboard/add-person"
            className="mx-auto mt-4 flex w-fit items-center gap-1.5 rounded-xl bg-gradient-to-br from-[#6338ef] to-[#8b55ff] px-4 py-2.5 text-[8px] font-black text-white shadow-[0_8px_20px_rgba(99,56,239,0.25)] transition hover:-translate-y-0.5"
          >
            <Plus size={11} />
            Add First Contact
          </NavLink>

        )}

      </div>

    </div>
  );
}


/* ============================================================
   TABLE HEADER
============================================================ */

function TableHeader({ text }) {
  return (
    <th className="px-4 py-3 text-left">

      <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-wide text-[#68728c] dark:text-[#8b91a3]">

        {text}

      </div>

    </th>
  );
}


export default AllContacts;