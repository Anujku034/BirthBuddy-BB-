import React from "react";
import {
  Users,
  Cake,
  Gift,
  UserPlus,
  Search,
  CalendarDays,
  ArrowUpDown,
  Pencil,
  Trash2,
  MoreVertical,
  Plus,
  ChevronDown,
  Check,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

// Import later when image is generated
// import allContactsHero from "../../assets/dashboard/allContactsHero.png";

const contacts = [
  {
    id: 1,
    name: "Rahul Sharma",
    relation: "College Friend",
    dob: "12 September 2025",
    days: "Today",
    phone: "+91 9876543210",
    avatar: "",
  },
  {
    id: 2,
    name: "Priya Singh",
    relation: "School Friend",
    dob: "15 September 2025",
    days: "3 days left",
    phone: "+91 8765432109",
    avatar: "",
  },
  {
    id: 3,
    name: "Amit Verma",
    relation: "Colleague",
    dob: "20 September 2025",
    days: "8 days left",
    phone: "+91 9123456780",
    avatar: "",
  },
  {
    id: 4,
    name: "Sneha Patel",
    relation: "Family",
    dob: "25 September 2025",
    days: "13 days left",
    phone: "+91 9988776655",
    avatar: "",
  },
  {
    id: 5,
    name: "Vikram Gupta",
    relation: "Gym Buddy",
    dob: "02 October 2025",
    days: "20 days left",
    phone: "+91 7654321098",
    avatar: "",
  },
  {
    id: 6,
    name: "Neha Sharma",
    relation: "Cousin",
    dob: "10 October 2025",
    days: "28 days left",
    phone: "+91 8877665544",
    avatar: "",
  },
  {
    id: 7,
    name: "Saurav Mehta",
    relation: "Office Friend",
    dob: "18 October 2025",
    days: "36 days left",
    phone: "+91 9123004455",
    avatar: "",
  },
  {
    id: 8,
    name: "Kavya Reddy",
    relation: "Best Friend",
    dob: "25 October 2025",
    days: "43 days left",
    phone: "+91 9988112233",
    avatar: "",
  },
];

function AllContacts() {
  return (
    <div className="min-h-screen bg-[#f7f8ff] px-3 py-4 sm:px-5 lg:px-7">
      <div className="mx-auto max-w-[1500px]">

        {/* ================================================= */}
        {/* HERO HEADER */}
        {/* ================================================= */}

        <section className="relative mb-4 h-[150px] overflow-hidden rounded-[18px] border border-white bg-gradient-to-r from-[#faf8ff] via-[#f7efff] to-[#eee8ff] shadow-[0_8px_30px_rgba(73,45,150,0.07)]">

          {/* Decorative circles */}

          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#dfccff]/40 blur-3xl" />

          <div className="absolute right-[30%] -top-20 h-48 w-48 rounded-full bg-[#f6d4ff]/40 blur-3xl" />

          {/* Heading */}

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

          {/* ================================================= */}
          {/* HERO IMAGE */}
          {/* ================================================= */}

          {/*
          <img
            src={allContactsHero}
            alt="All contacts"
            className="absolute bottom-[-15px] right-[3%] h-[155px] w-auto object-contain"
          />
          */}

          {/* Temporary decorative illustration */}

          <div className="absolute right-[8%] top-[-15px] hidden md:block">
            <div className="relative h-[145px] w-[300px]">

              {/* Book */}

              <div className="absolute left-[85px] top-[5px] h-[125px] w-[82px] rotate-[5deg] rounded-[10px] bg-gradient-to-br from-[#7d43f4] to-[#5422d7] shadow-[0_15px_25px_rgba(78,35,190,0.25)]">

                <div className="absolute left-1/2 top-[30px] flex h-[35px] w-[35px] -translate-x-1/2 items-center justify-center rounded-full bg-white/90">
                  <Users
                    size={21}
                    className="text-[#7540eb]"
                    fill="#7540eb"
                  />
                </div>

              </div>

              {/* Confetti */}

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

              {/* Note */}

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

        {/* ================================================= */}
        {/* STAT CARDS */}
        {/* ================================================= */}

        <section className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-4">

          <StatCard
            icon={Users}
            value="12"
            label="Total Contacts"
            iconBg="bg-[#eee9ff]"
            iconColor="text-[#6338ef]"
          />

          <StatCard
            icon={Cake}
            value="2"
            label="Birthdays This Week"
            iconBg="bg-[#fff0f3]"
            iconColor="text-[#f0445f]"
          />

          <StatCard
            icon={Gift}
            value="5"
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
            isAdd
          />

        </section>

        {/* ================================================= */}
        {/* FILTER BAR */}
        {/* ================================================= */}

        <section className="mb-2 rounded-[9px] border border-[#e7e9f1] bg-white p-2 shadow-[0_4px_18px_rgba(35,45,90,0.04)]">

          <div className="flex flex-col gap-2 lg:flex-row">

            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7c86a0]"
              />

              <input
                type="text"
                placeholder="Search by name, phone or email..."
                className="h-[35px] w-full rounded-[6px] border border-[#dfe2eb] bg-white pl-9 pr-3 text-[10px] text-[#313850] outline-none placeholder:text-[#98a1b5] focus:border-[#7650ee] focus:ring-2 focus:ring-[#7650ee]/10"
              />
            </div>

            {/* Birthday Filter */}

            <FilterButton
              icon={CalendarDays}
              text="All Birthdays"
            />

            {/* Sort */}

            <FilterButton
              icon={ArrowUpDown}
              text="Sort by Name"
            />

            {/* Add Person */}

            <button
              type="button"
              className="flex h-[35px] items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-[#6331ed] to-[#793dff] px-5 text-[11px] font-bold text-white shadow-[0_5px_14px_rgba(99,49,237,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(99,49,237,0.3)]"
            >
              <Plus size={14} strokeWidth={2.5} />
              Add Person
            </button>

          </div>
        </section>

        {/* ================================================= */}
        {/* CONTACT TABLE */}
        {/* ================================================= */}

        <section className="overflow-hidden rounded-[10px] border border-[#e5e7ef] bg-white shadow-[0_5px_22px_rgba(35,45,90,0.05)]">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] border-collapse">

              {/* ================= TABLE HEAD ================= */}

              <thead>
                <tr className="border-b border-[#e7e9f0] bg-[#fafbff]">

                  <th className="w-[40px] px-3 py-2 text-left">
                    <input
                      type="checkbox"
                      className="h-[13px] w-[13px] accent-[#6337ef]"
                    />
                  </th>

                  <TableHeader text="Name" sort />

                  <TableHeader text="Date of Birth" sort />

                  <TableHeader text="Days Left" sort />

                  <TableHeader text="Phone Number" sort />

                  <th className="px-3 py-2 text-left text-[9px] font-extrabold uppercase tracking-wide text-[#68728c]">
                    Actions
                  </th>

                </tr>
              </thead>

              {/* ================= TABLE BODY ================= */}

              <tbody>
                {contacts.map((contact) => (
                  <ContactRow
                    key={contact.id}
                    contact={contact}
                  />
                ))}
              </tbody>

            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ========================================================= */
/* STAT CARD */
/* ========================================================= */

function StatCard({
  icon: Icon,
  value,
  label,
  iconBg,
  iconColor,
  isAdd,
}) {
  return (
    <div
      className={`relative flex h-[57px] items-center gap-3 overflow-hidden rounded-[10px] border border-[#e8eaf2] bg-white px-3 shadow-[0_4px_15px_rgba(35,45,90,0.04)] ${
        isAdd ? "cursor-pointer hover:-translate-y-0.5" : ""
      } transition-all duration-200`}
    >
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

/* ========================================================= */
/* FILTER BUTTON */
/* ========================================================= */

function FilterButton({
  icon: Icon,
  text,
}) {
  return (
    <button
      type="button"
      className="flex h-[35px] min-w-[125px] items-center justify-between gap-3 rounded-[6px] border border-[#dfe2eb] bg-white px-3 text-[10px] font-semibold text-[#59637d] transition hover:border-[#9b84ee]"
    >
      <span className="flex items-center gap-2">
        <Icon
          size={14}
          className="text-[#68738f]"
        />

        {text}
      </span>

      <ChevronDown size={13} />
    </button>
  );
}

/* ========================================================= */
/* TABLE HEADER */
/* ========================================================= */

function TableHeader({
  text,
  sort,
}) {
  return (
    <th className="px-3 py-2 text-left">
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

/* ========================================================= */
/* CONTACT ROW */
/* ========================================================= */

function ContactRow({
  contact,
}) {
  return (
    <tr className="border-b border-[#edf0f5] transition hover:bg-[#faf9ff]">

      {/* Checkbox */}

      <td className="px-3 py-2">
        <input
          type="checkbox"
          className="h-[13px] w-[13px] accent-[#6337ef]"
        />
      </td>

      {/* Name */}

      <td className="px-3 py-2">
        <div className="flex items-center gap-2">

          {/* Profile Placeholder */}

          <div className="h-[29px] w-[29px] shrink-0 overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-[#dce3ef] to-[#bfc9dc] shadow-sm">
            {contact.avatar && (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[10px] font-extrabold text-[#1b213b]">
              {contact.name}
            </p>

            <p className="truncate text-[8px] font-medium text-[#7c86a0]">
              {contact.relation}
            </p>
          </div>

        </div>
      </td>

      {/* DOB */}

      <td className="px-3 py-2">
        <div className="flex items-center gap-2">

          <Cake
            size={13}
            className="shrink-0 text-[#f0445f]"
            fill="#f0445f"
          />

          <span className="whitespace-nowrap text-[9px] font-medium text-[#69748e]">
            {contact.dob}
          </span>

        </div>
      </td>

      {/* Days Left */}

      <td className="px-3 py-2">
        <DaysBadge
          value={contact.days}
        />
      </td>

      {/* Phone */}

      <td className="px-3 py-2">
        <div className="flex items-center gap-2">

          <div className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#d8f9ec]">
            <FaWhatsapp
              size={11}
              className="text-[#08b878]"
            />
          </div>

          <span className="whitespace-nowrap text-[9px] font-medium text-[#69748e]">
            {contact.phone}
          </span>

        </div>
      </td>

      {/* Actions */}

      <td className="px-3 py-2">
        <div className="flex items-center gap-2">

          {/* WhatsApp */}

          <ActionButton
            type="whatsapp"
            icon={FaWhatsapp}
          />

          {/* Edit */}

          <ActionButton
            type="edit"
            icon={Pencil}
          />

          {/* Delete */}

          <ActionButton
            type="delete"
            icon={Trash2}
          />

          {/* More */}

          <button
            type="button"
            className="flex h-[28px] w-[22px] items-center justify-center text-[#59637c] transition hover:text-[#171c38]"
          >
            <MoreVertical size={15} />
          </button>

        </div>
      </td>

    </tr>
  );
}

/* ========================================================= */
/* DAYS BADGE */
/* ========================================================= */

function DaysBadge({
  value,
}) {
  const isToday = value === "Today";

  return (
    <span
      className={`inline-flex min-w-[62px] items-center justify-center rounded-[6px] px-2 py-1 text-[8px] font-extrabold ${
        isToday
          ? "bg-[#ffe6ed] text-[#ef3155]"
          : "bg-[#edf3ff] text-[#526da6]"
      }`}
    >
      {value}
    </span>
  );
}

/* ========================================================= */
/* ACTION BUTTON */
/* ========================================================= */

function ActionButton({
  type,
  icon: Icon,
}) {
  const styles = {
    whatsapp:
      "bg-[#ddfaef] text-[#09b879] hover:bg-[#c9f7e3]",
    edit:
      "bg-[#edf0f7] text-[#64708d] hover:bg-[#e3e6ef]",
    delete:
      "bg-[#ffe8ed] text-[#f0445f] hover:bg-[#ffd9e1]",
  };

  return (
    <button
      type="button"
      className={`flex h-[28px] w-[28px] items-center justify-center rounded-[7px] transition hover:-translate-y-0.5 ${styles[type]}`}
    >
      <Icon
        size={15}
        className="shrink-0"
      />
    </button>
  );
}

export default AllContacts;