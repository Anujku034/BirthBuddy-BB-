import React, { useContext, useState, useEffect } from "react";

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
} from "lucide-react";

import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// ================= DATE FORMAT =================

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ================= DAYS LEFT =================

const getDaysLeft = (dateOfBirth) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const birthDate = new Date(dateOfBirth);

  const birthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  birthday.setHours(0, 0, 0, 0);

  // If birthday has already passed this year,
  // calculate next year's birthday
  if (birthday < today) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const difference = birthday - today;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
};

// ================= MAIN COMPONENT =================

function AllContacts() {
  // ================= STATES =================

  const [contacts, setContacts] = useState([]);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Birthday filter
  const [birthdayFilter, setBirthdayFilter] =
    useState("All Birthdays");

  // Sorting
  const [sortBy, setSortBy] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Authentication
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  // ================= GET ALL PERSONS =================

  const getAllPersons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/persons",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setContacts(response.data.persons);

      console.log("Persons:", response.data.persons);
    } catch (error) {
      console.log("GET PERSONS ERROR:", error);

      // ================= ACCESS TOKEN EXPIRED =================

      if (error.response?.status === 401) {
        try {
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

          // ================= RETRY REQUEST =================

          const retryResponse = await axios.get(
            "http://localhost:3000/api/persons",
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          setContacts(retryResponse.data.persons);
        } catch (refreshError) {
          if (refreshError.response?.status === 401) {
            alert("Session expired. Please login again.");

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      }
    }
  };

  // ================= EDIT PERSON =================

  const handleEdit = (id) => {
    navigate(`/dashboard/add-person/${id}`);
  };

  // ================= DELETE PERSON =================

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/persons/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);

      // Remove deleted contact from UI
      setContacts((prevContacts) => {
        return prevContacts.filter(
          (contact) => contact._id !== id
        );
      });
    } catch (error) {
      console.log("DELETE PERSON ERROR:", error);

      // ================= ACCESS TOKEN EXPIRED =================

      if (error.response?.status === 401) {
        try {
          // Get new access token
          const refreshResponse = await axios.post(
            "http://localhost:3000/api/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          const newAccessToken =
            refreshResponse.data.accessToken;

          // Save new token in AuthContext
          setAccessToken(newAccessToken);

          // Retry delete request
          const retryResponse = await axios.delete(
            `http://localhost:3000/api/persons/${id}`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          console.log(retryResponse.data);

          // Remove from UI
          setContacts((prevContacts) => {
            return prevContacts.filter(
              (contact) => contact._id !== id
            );
          });
        } catch (refreshError) {
          if (refreshError.response?.status === 401) {
            alert("Session expired. Please login again.");

            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      } else {
        console.log("DELETE PERSON ERROR:", error);
      }
    }
  };

  // ================= FETCH DATA =================

  useEffect(() => {
    if (accessToken) {
      getAllPersons();
    }
  }, [accessToken]);

  // =====================================================
  // DYNAMIC STATISTICS
  // =====================================================

  // Birthdays this week
  const birthdaysThisWeek = contacts.filter((contact) => {
    const days = getDaysLeft(contact.dateOfBirth);

    return days >= 0 && days <= 7;
  });

  // Birthdays this month
  const birthdaysThisMonth = contacts.filter((contact) => {
    const today = new Date();

    const birthDate = new Date(contact.dateOfBirth);

    return birthDate.getMonth() === today.getMonth();
  });

  // =====================================================
  // SEARCH + FILTER + SORT
  // =====================================================

  const filteredContacts = contacts
    // ================= SEARCH =================
    .filter((contact) => {
      const search = searchTerm.toLowerCase().trim();

      if (!search) {
        return true;
      }

      return (
        contact.fullName?.toLowerCase().includes(search) ||
        contact.phone?.toLowerCase().includes(search) ||
        contact.email?.toLowerCase().includes(search)
      );
    })

    // ================= BIRTHDAY FILTER =================
    .filter((contact) => {
      const daysLeft = getDaysLeft(contact.dateOfBirth);

      // All birthdays
      if (birthdayFilter === "All Birthdays") {
        return true;
      }

      // Today
      if (birthdayFilter === "Today") {
        return daysLeft === 0;
      }

      // This week
      if (birthdayFilter === "This Week") {
        return daysLeft >= 0 && daysLeft <= 7;
      }

      // This month
      if (birthdayFilter === "This Month") {
        const today = new Date();

        const birthDate = new Date(contact.dateOfBirth);

        return birthDate.getMonth() === today.getMonth();
      }

      return true;
    })

    // ================= SORT =================
    .sort((a, b) => {
      let valueA;
      let valueB;

      // Sort by Name
      if (sortBy === "Name") {
        valueA = a.fullName?.toLowerCase() || "";
        valueB = b.fullName?.toLowerCase() || "";
      }

      // Sort by Date of Birth
      if (sortBy === "Date of Birth") {
        valueA = new Date(a.dateOfBirth).getTime();
        valueB = new Date(b.dateOfBirth).getTime();
      }

      // Sort by Days Left
      if (sortBy === "Days Left") {
        valueA = getDaysLeft(a.dateOfBirth);
        valueB = getDaysLeft(b.dateOfBirth);
      }

      // Sort by Phone
      if (sortBy === "Phone") {
        valueA = a.phone || "";
        valueB = b.phone || "";
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });

  // ================= UI =================

  return (
    <div className="min-h-screen bg-[#f7f8ff] px-3 py-4 sm:px-5 lg:px-7">
      <div className="mx-auto max-w-[1500px]">

        {/* ================= HERO HEADER ================= */}

        <section className="relative mb-4 h-[150px] overflow-hidden rounded-[18px] border border-white bg-gradient-to-r from-[#faf8ff] via-[#f7efff] to-[#eee8ff] shadow-[0_8px_30px_rgba(73,45,150,0.07)]">

          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#dfccff]/40 blur-3xl" />

          <div className="absolute right-[30%] -top-20 h-48 w-48 rounded-full bg-[#f6d4ff]/40 blur-3xl" />

          <div className="relative z-10 px-5 pt-5 sm:px-7">

            <div className="flex items-center gap-2">

              <h1 className="text-[27px] font-extrabold tracking-[-0.8px] text-[#101631] sm:text-[32px]">
                All Contacts
              </h1>

              <Users
                size={29}
                strokeWidth={2.5}
                className="text-[#6738ef]"
              />

            </div>

            <p className="mt-0.5 text-[11px] font-medium text-[#78829c] sm:text-[13px]">
              Manage your contacts and keep track of their special days.
            </p>

          </div>

          {/* Decorative Illustration */}

          <div className="absolute right-[8%] top-[-15px] hidden md:block">

            <div className="relative h-[145px] w-[300px]">

              <div className="absolute left-[85px] top-[5px] h-[125px] w-[82px] rotate-[5deg] rounded-[10px] bg-gradient-to-br from-[#7d43f4] to-[#5422d7] shadow-[0_15px_25px_rgba(78,35,190,0.25)]">

                <div className="absolute left-1/2 top-[30px] flex h-[35px] w-[35px] -translate-x-1/2 items-center justify-center rounded-full bg-white/90">

                  <Users
                    size={21}
                    className="text-[#7540eb]"
                    fill="#7540eb"
                  />

                </div>

              </div>

              <span className="absolute left-[50px] top-[30px] text-xl">
                ✦
              </span>

              <span className="absolute left-[40px] top-[70px] text-xl">
                💗
              </span>

              <span className="absolute right-[70px] top-[5px] text-lg">
                💜
              </span>

              <span className="absolute right-[25px] top-[55px] text-xl">
                ⭐
              </span>

              <div className="absolute right-[-10px] top-[35px] w-[105px] rotate-[7deg] rounded-sm bg-[#fff4c9] px-3 py-2 text-center shadow-md">

                <p className="text-[9px] font-bold leading-3 text-[#35333b]">
                  People
                  <br />
                  make life
                  <br />
                  more special!
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ================= STAT CARDS ================= */}

        <section className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-4">

          <StatCard
            icon={Users}
            value={contacts.length}
            label="Total Contacts"
            iconBg="bg-[#eee9ff]"
            iconColor="text-[#6338ef]"
          />

          <StatCard
            icon={Cake}
            value={birthdaysThisWeek.length}
            label="Birthdays This Week"
            iconBg="bg-[#fff0f3]"
            iconColor="text-[#f0445f]"
          />

          <StatCard
            icon={Gift}
            value={birthdaysThisMonth.length}
            label="Birthdays This Month"
            iconBg="bg-[#fff5df]"
            iconColor="text-[#f3a300]"
          />

          <StatCard
            icon={UserPlus}
            value="+"
            label="Add New Contact"
            iconBg="bg-[#e5faf2]"
            iconColor="text-[#0bb77c]"
          />

        </section>

        {/* ================= FILTER BAR ================= */}

        <section className="mb-2 rounded-[9px] border border-[#e7e9f1] bg-white p-2 shadow-[0_4px_18px_rgba(35,45,90,0.04)]">

          <div className="flex flex-col gap-2 lg:flex-row">

            {/* ================= SEARCH ================= */}

            <div className="relative flex-1">

              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7c86a0]"
              />

              <input
                type="text"
                placeholder="Search by name, phone or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-[35px] w-full rounded-[6px] border border-[#dfe2eb] bg-white pl-9 pr-3 text-[10px] text-[#313850] outline-none placeholder:text-[#98a1b5] focus:border-[#7650ee] focus:ring-2 focus:ring-[#7650ee]/10"
              />

            </div>

            {/* ================= BIRTHDAY FILTER ================= */}

            <div className="relative ">

              <select
                value={birthdayFilter}
                onChange={(e) =>
                  setBirthdayFilter(e.target.value)
                }
                className="h-[35px] min-w-[125px] appearance-none rounded-[6px] border border-[#dfe2eb] bg-white pl-9 pr-8 text-[10px] font-semibold text-[#59637d] outline-none transition hover:border-[#9b84ee] focus:border-[#7650ee]"
              >

                <option value="All Birthdays">
                  All Birthdays
                </option>

                <option value="Today">
                  Today
                </option>

                <option value="This Week">
                  This Week
                </option>

                <option value="This Month">
                  This Month
                </option>

              </select>

              <CalendarDays
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#68738f]"
              />

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#68738f]"
              />

            </div>

            {/* ================= SORT FILTER ================= */}

            <div className="relative">

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] =
                    e.target.value.split("-");

                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="h-[35px] min-w-[145px] appearance-none rounded-[6px] border border-[#dfe2eb] bg-white pl-9 pr-8 text-[10px] font-semibold text-[#59637d] outline-none transition hover:border-[#9b84ee] focus:border-[#7650ee]"
              >

                <option value="Name-asc">
                  Name A → Z
                </option>

                <option value="Name-desc">
                  Name Z → A
                </option>

                <option value="Date of Birth-asc">
                  Date of Birth ↑
                </option>

                <option value="Date of Birth-desc">
                  Date of Birth ↓
                </option>

                <option value="Days Left-asc">
                  Days Left ↑
                </option>

                <option value="Days Left-desc">
                  Days Left ↓
                </option>

                <option value="Phone-asc">
                  Phone ↑
                </option>

                <option value="Phone-desc">
                  Phone ↓
                </option>

              </select>

              <ArrowUpDown
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#68738f]"
              />

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#68738f]"
              />

            </div>

            {/* ================= ADD PERSON ================= */}

            <NavLink
              to="/dashboard/add-person"
              type="button"
              className="flex h-[35px] items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-[#6331ed] to-[#793dff] px-5 text-[11px] font-bold text-white shadow-[0_5px_14px_rgba(99,49,237,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(99,49,237,0.3)]"
            >

              <Plus
                size={14}
                strokeWidth={2.5}
              />

              Add Person

            </NavLink>

          </div>

        </section>

        {/* ================= CONTACT TABLE ================= */}

        <section className="overflow-hidden rounded-[10px] border border-[#e5e7ef] bg-white shadow-[0_5px_22px_rgba(35,45,90,0.05)]">

          <div className="max-h-[400px] overflow-y-auto overflow-x-auto">

            <table className="relative w-full min-w-[850px] border-collapse">

              <thead className="sticky top-0 z-10">

                <tr className="border-b border-[#e7e9f0] bg-[#fafbff]">

                  <th className="w-[40px] px-3 py-2 text-left">

                    <input
                      type="checkbox"
                      className="h-[13px] w-[13px] accent-[#6337ef]"
                    />

                  </th>

                  <TableHeader
                    text="Name"
                    sort
                    onClick={() => {
                      setSortBy("Name");
                      setSortOrder(
                        sortBy === "Name" &&
                          sortOrder === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  />

                  <TableHeader
                    text="Date of Birth"
                    sort
                    onClick={() => {
                      setSortBy("Date of Birth");
                      setSortOrder(
                        sortBy === "Date of Birth" &&
                          sortOrder === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  />

                  <TableHeader
                    text="Days Left"
                    sort
                    onClick={() => {
                      setSortBy("Days Left");
                      setSortOrder(
                        sortBy === "Days Left" &&
                          sortOrder === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  />

                  <TableHeader
                    text="Phone Number"
                    sort
                    onClick={() => {
                      setSortBy("Phone");
                      setSortOrder(
                        sortBy === "Phone" &&
                          sortOrder === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  />

                  <th className="px-3 py-2 text-left text-[9px] font-extrabold uppercase tracking-wide text-[#68728c]">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (

                    <tr
                      key={contact._id}
                      className="border-b border-[#eef0f5]"
                    >

                      {/* ================= CHECKBOX ================= */}

                      <td className="px-3 py-3">

                        <input
                          type="checkbox"
                          className="h-[13px] w-[13px] accent-[#6337ef]"
                        />

                      </td>

                      {/* ================= NAME ================= */}

                      <td className="px-3 py-3">

                        <div className="flex items-center gap-2">

                          {contact.profilePhoto ? (

                            <img
                              src={contact.profilePhoto}
                              alt={contact.fullName}
                              className="h-8 w-8 rounded-full object-cover"
                            />

                          ) : (

                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eee9ff] text-[11px] font-bold text-[#6337ef]">

                              {contact.fullName?.charAt(0)}

                            </div>

                          )}

                          <div className="flex min-w-0 flex-col">

                            <span className="text-[11px] font-bold text-[#20263d]">
                              {contact.fullName}
                            </span>

                            <span className="max-w-[150px] truncate text-[9px] text-[#8c95aa]">
                              {contact.notes || "No notes"}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* ================= DATE OF BIRTH ================= */}

                      <td className="px-3 py-3 text-[10px] text-[#59637d]">

                        {formatDate(contact.dateOfBirth)}

                      </td>

                      {/* ================= DAYS LEFT ================= */}

                      <td className="px-3 py-3 text-[10px] text-[#59637d]">

                        {getDaysLeft(contact.dateOfBirth)} days

                      </td>

                      {/* ================= PHONE ================= */}

                      <td className="px-3 py-3 text-[10px] text-[#59637d]">

                        {contact.phone || "-"}

                      </td>

                      {/* ================= ACTIONS ================= */}

                      <td className="px-3 py-3">

                        <div className="flex items-center gap-2">

                          {/* EDIT */}

                          <button
                            type="button"
                            className="rounded-md p-1.5 text-[#6337ef] hover:bg-[#f1edff]"
                            title="Edit"
                            onClick={() =>
                              handleEdit(contact._id)
                            }
                          >

                            <Pencil size={14} />

                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() => {
                              handleDelete(contact._id);
                            }}
                            className="rounded-md p-1.5 text-red-500 hover:bg-red-50"
                            title="Delete"
                          >

                            <Trash2 size={14} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="px-3 py-12 text-center"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#eee9ff]">

                          <Users
                            size={19}
                            className="text-[#6337ef]"
                          />

                        </div>

                        <p className="text-[11px] font-bold text-[#252b45]">
                          No contacts found
                        </p>

                        <p className="mt-1 text-[9px] text-[#8c95aa]">
                          Try changing your search or filter.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </div>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon: Icon,
  value,
  label,
  iconBg,
  iconColor,
}) {
  return (
    <div className="relative flex h-[57px] items-center gap-3 overflow-hidden rounded-[10px] border border-[#e8eaf2] bg-white px-3 shadow-[0_4px_15px_rgba(35,45,90,0.04)] transition-all duration-200">

      <div
        className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[9px] ${iconBg}`}
      >

        <Icon
          size={19}
          strokeWidth={2.4}
          className={iconColor}
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

// =====================================================
// TABLE HEADER
// =====================================================

function TableHeader({
  text,
  sort,
  onClick,
}) {
  return (
    <th
      className="cursor-pointer px-3 py-2 text-left"
      onClick={onClick}
    >

      <div className="flex items-center gap-1 text-[9px] font-extrabold text-[#68728c]">

        {text}

        {sort && (
          <ArrowUpDown
            size={10}
            className="text-[#8a93aa]"
          />
        )}

      </div>

    </th>
  );
}

export default AllContacts;