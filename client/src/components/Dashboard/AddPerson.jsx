import React from "react";
import {
  Home,
  ChevronRight,
  UserRound,
  Phone,
  CalendarDays,
  Camera,
  Plus,
  MessageCircle,
  Settings2,
  FileText,
  Bell,
  Heart,
  Gift,
  Check,
  X,
  ArrowLeft,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import addPersonHero from "../../assets/dashboard/addPersonHero.png";

function AddPerson() {
  return (
    <div className="min-h-screen bg-[#f7f8ff] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* ================= BREADCRUMB ================= */}
        <div className="mb-2 flex items-center gap-2 text-[12px] font-medium text-[#667085]">
          <Home size={14} />

          <ChevronRight size={13} />

          <span className="font-semibold text-[#171c38]">
            Add Person
          </span>
        </div>

        {/* ================= PAGE HEADING ================= */}
        <div className="mb-3">
          <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.8px] text-[#101631] sm:text-[34px]">
            Add Person
          </h1>

          <p className="mt-0.5 text-[12px] font-medium text-[#7a849f] sm:text-[13px]">
            Add a new contact and never miss their special day! 🎉
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">

          {/* ================================================= */}
          {/* LEFT IMAGE CARD */}
          {/* ================================================= */}

          <section className="relative min-h-[600px] overflow-hidden rounded-[18px] border border-white/80 bg-gradient-to-br from-[#f7edff] via-[#f8efff] to-[#eee8ff] shadow-[0_8px_30px_rgba(83,53,160,0.08)]">

            {/* Decorative Glow */}
            <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-[#e6c8ff]/50 blur-3xl" />

            <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-[#ffcce3]/40 blur-3xl" />

            {/* Main Image */}
            <div className="relative flex h-[450px] items-end justify-center px-3 pt-3">
              <img
                src={addPersonHero}
                alt="Birthday celebration"
                className="h-full w-full object-contain drop-shadow-[0_18px_25px_rgba(73,42,120,0.18)]"
              />
            </div>

            {/* Quote Card */}
            <div className="absolute bottom-3 left-3 right-3 rounded-[15px] border border-white/70 bg-white/35 px-5 py-4 backdrop-blur-md">

              <div className="flex gap-2">
                <span className="text-[34px] font-serif font-bold leading-6 text-[#6345e8]">
                  “
                </span>

                <div>
                  <p className="font-serif text-[14px] font-semibold italic leading-5 text-[#39405f]">
                    A small reminder today
                    <br />
                    can create a big smile tomorrow.”
                  </p>
                </div>

                <span className="mt-6 text-[18px]">
                  ❤️
                </span>
              </div>

            </div>
          </section>

          {/* ================================================= */}
          {/* RIGHT FORM CARD */}
          {/* ================================================= */}

          <section className="rounded-[18px] border border-[#e8e9f2] bg-white px-4 py-4 shadow-[0_8px_30px_rgba(35,45,90,0.06)] sm:px-6 sm:py-5">

            {/* ================= PERSON DETAILS ================= */}

            <div className="mb-4">

              {/* Section Heading */}
              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-[31px] w-[31px] items-center justify-center rounded-lg bg-[#eee9ff]">
                  <UserRound
                    size={17}
                    strokeWidth={2.5}
                    className="text-[#6237ef]"
                  />
                </div>

                <div>
                  <h2 className="text-[15px] font-extrabold text-[#151a35]">
                    Person Details
                  </h2>

                  <p className="text-[10px] font-medium text-[#7a849d]">
                    Fill in the details to add a new person to your birthday list.
                  </p>
                </div>

              </div>

              {/* ================= FORM GRID ================= */}

              <div className="grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">

                {/* Full Name */}
                <FormField
                  label="Full Name"
                  required
                  icon={UserRound}
                  placeholder="e.g. Rahul Sharma"
                />

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-[#252b45]">
                    Phone Number{" "}
                    <span className="font-medium text-[#8a93a8]">
                      (Optional)
                    </span>
                  </label>

                  <div className="flex h-[38px] overflow-hidden rounded-[7px] border border-[#dfe2eb] bg-white">

                    <div className="flex items-center gap-1 border-r border-[#e6e8ef] px-3 text-[11px] font-semibold text-[#4d5873]">
                      <Phone size={13} />
                      +91
                    </div>

                    <input
                      type="text"
                      placeholder="e.g. 9876543210"
                      className="min-w-0 flex-1 bg-transparent px-3 text-[11px] text-[#252b45] outline-none placeholder:text-[#a1a8ba]"
                    />

                  </div>
                </div>

                {/* Date of Birth */}
                <FormField
                  label="Date of Birth"
                  required
                  icon={CalendarDays}
                  placeholder="dd-mm-yyyy"
                  type="text"
                  rightIcon={CalendarDays}
                />

                {/* Profile Photo */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-[#252b45]">
                    Profile Photo{" "}
                    <span className="font-medium text-[#8a93a8]">
                      (Optional)
                    </span>
                  </label>

                  <div className="flex h-[82px] cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-[#d8caff] bg-[#fbf9ff] transition hover:bg-[#f6f1ff]">

                    <div className="relative mb-1 flex h-[31px] w-[31px] items-center justify-center rounded-full bg-[#e5e7f2]">
                      <UserRound
                        size={18}
                        className="text-[#68738d]"
                      />

                      <span className="absolute -bottom-1 -right-1 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#6337ef] text-white">
                        <Plus size={11} strokeWidth={3} />
                      </span>
                    </div>

                    <p className="text-[10px] font-bold text-[#252b45]">
                      Click to upload a photo
                    </p>

                    <p className="text-[8px] text-[#8c95aa]">
                      PNG, JPG up to 2MB
                    </p>

                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold text-[#252b45]">
                    Notes{" "}
                    <span className="font-medium text-[#8a93a8]">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <FileText
                      size={14}
                      className="absolute left-3 top-3 text-[#78839d]"
                    />

                    <input
                      type="text"
                      placeholder="Add a short note..."
                      className="h-[48px] w-full rounded-[7px] border border-[#dfe2eb] bg-white pl-9 pr-3 text-[11px] outline-none placeholder:text-[#a1a8ba] focus:border-[#8b68ff]"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* ================================================= */}
            {/* REMINDER & MESSAGE SETTINGS */}
            {/* ================================================= */}

            <div>

              {/* Section heading */}
              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-[27px] w-[27px] items-center justify-center rounded-lg bg-[#eee9ff]">
                  <Settings2
                    size={15}
                    strokeWidth={2.5}
                    className="text-[#6337ef]"
                  />
                </div>

                <h2 className="text-[13px] font-extrabold text-[#151a35]">
                  Reminder & Message Settings
                </h2>

              </div>

              {/* WhatsApp Reminder */}
              <div className="flex items-center justify-between rounded-[8px] bg-[#ecfaf4] px-3 py-2">

                <div className="flex items-center gap-2">

                  <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#20c978]">
                    <FaWhatsapp
                      size={16}
                      className="text-white"
                      fill="white"
                    />
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold text-[#25304a]">
                      Send WhatsApp reminder
                    </h3>

                    <p className="text-[8px] text-[#7a8497]">
                      Get automatic birthday reminders on WhatsApp.
                    </p>
                  </div>

                </div>

                {/* Toggle */}
                <div className="flex h-[18px] w-[34px] items-center rounded-full bg-[#6635ef] p-[2px]">
                  <div className="ml-auto h-[14px] w-[14px] rounded-full bg-white shadow-sm" />
                </div>

              </div>

              {/* Custom Message */}
              <div className="mt-3">

                <label className="mb-1.5 flex items-center gap-1 text-[10px] font-bold text-[#252b45]">
                  <FileText size={12} />
                  Custom Message{" "}
                  <span className="font-medium text-[#8a93a8]">
                    (Optional)
                  </span>
                </label>

                <textarea
                  rows={3}
                  defaultValue={`Happy birthday! 🎂
Wishing you a wonderful year ahead! 🎂 ❤️`}
                  className="w-full resize-none rounded-[7px] border border-[#dfe2eb] bg-white px-3 py-2 text-[10px] leading-4 text-[#59627b] outline-none focus:border-[#8b68ff]"
                />

              </div>

            </div>

            {/* ================================================= */}
            {/* BUTTONS */}
            {/* ================================================= */}

            <div className="mt-4 flex justify-end gap-3">

              <button
                type="button"
                className="flex h-[37px] min-w-[135px] items-center justify-center rounded-[7px] border border-[#8058ff] bg-white px-5 text-[11px] font-bold text-[#7040ef] transition hover:bg-[#f7f3ff]"
              >
                Cancel
              </button>

              <button
                type="button"
                className="flex h-[37px] min-w-[145px] items-center justify-center gap-2 rounded-[7px] bg-gradient-to-r from-[#6633ee] to-[#7b3cff] px-5 text-[11px] font-bold text-white shadow-[0_5px_15px_rgba(102,51,238,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(102,51,238,0.35)]"
              >
                <Plus size={14} strokeWidth={2.5} />
                Add Person
              </button>

            </div>

          </section>

        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* REUSABLE FORM FIELD */
/* ========================================================= */

function FormField({
  label,
  required,
  icon: Icon,
  placeholder,
  type = "text",
  rightIcon: RightIcon,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold text-[#252b45]">
        {label}

        {required && (
          <span className="ml-0.5 text-[#ef4444]">
            *
          </span>
        )}
      </label>

      <div className="relative">

        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68738d]"
        />

        <input
          type={type}
          placeholder={placeholder}
          className="h-[38px] w-full rounded-[7px] border border-[#dfe2eb] bg-white pl-9 pr-9 text-[11px] text-[#252b45] outline-none placeholder:text-[#a1a8ba] transition focus:border-[#8060ef] focus:ring-2 focus:ring-[#8060ef]/10"
        />

        {RightIcon && (
          <RightIcon
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68738d]"
          />
        )}

      </div>
    </div>
  );
}

export default AddPerson;