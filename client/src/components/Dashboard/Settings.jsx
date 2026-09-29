import React, { useState } from "react";

import {
  Bell,
  Clock3,
  RotateCcw,
  Info,
  MessageSquareText,
  Upload,
  Download,
  Trash2,
  UserRound,
  LockKeyhole,
  Moon,
  Sun,
  Monitor,
  LogOut,
  Eye,
  EyeOff,
  Check,
  Settings as SettingsIcon,
  Users,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import settingsHero from "../../assets/dashboard/settingsHero.png";
// import profileImg from "../../assets/dashboard/profile.png";


function Settings() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    newPassword: false,
    confirm: false,
  });

  return (
    <div className="min-h-screen bg-[#f7f8ff] px-3 py-4 sm:px-5 lg:px-7">

      <div className="mx-auto max-w-[1500px]">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <section className="relative mb-4 h-[150px] overflow-hidden rounded-[18px] border border-white bg-gradient-to-r from-[#faf8ff] via-[#f6efff] to-[#eee7ff] shadow-[0_8px_30px_rgba(73,45,150,0.07)]">

          {/* Background glow */}

          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#dfcaff]/40 blur-3xl" />

          <div className="absolute right-[30%] -top-20 h-52 w-52 rounded-full bg-[#f6d1ff]/40 blur-3xl" />

          {/* Heading */}

          <div className="relative z-10 px-5 pt-5 sm:px-7">

            <div className="flex items-center gap-2">

              <h1 className="text-[27px] font-extrabold tracking-[-0.8px] text-[#101631] sm:text-[32px]">
                Settings
              </h1>

              <SettingsIcon
                size={29}
                strokeWidth={2.5}
                className="text-[#6338ef]"
              />

            </div>

            <p className="mt-0.5 text-[11px] font-medium text-[#78829c] sm:text-[13px]">
              Customize your experience and make BirthDayBuddy work the way you want.
            </p>

          </div>


          {/* Hero Image */}

          <img
            src={settingsHero}
            alt="Settings"
            className="absolute bottom-[-10px] right-[3%] hidden h-[155px] w-auto object-contain md:block"
          />

        </section>


        {/* ================================================= */}
        {/* TOP SETTINGS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

          {/* ================= WHATSAPP ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#dcf8eb]">

                  {/* Actual WhatsApp Icon */}
                  <FaWhatsapp
                    size={18}
                    className="text-[#09b879]"
                  />

                </div>

                <div>

                  <h2 className="text-[11px] font-extrabold text-[#1b213b]">
                    WhatsApp Notifications
                  </h2>

                  <p className="text-[8px] text-[#7d87a0]">
                    Get automatic birthday reminders on WhatsApp.
                  </p>

                </div>

              </div>


              {/* Toggle */}

              <div className="flex h-[19px] w-[35px] items-center rounded-full bg-[#6338ef] p-[2px]">

                <div className="ml-auto h-[15px] w-[15px] rounded-full bg-white shadow-sm" />

              </div>

            </div>


            {/* Connected */}

            <div className="mt-3 flex items-center justify-between rounded-[7px] bg-[#effbf6] px-3 py-2">

              <div className="flex items-center gap-2">

                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#16c784]">

                  {/* Actual WhatsApp Icon */}
                  <FaWhatsapp
                    size={16}
                    className="text-white"
                  />

                </div>

                <div>

                  <p className="text-[9px] font-bold text-[#27304a]">
                    WhatsApp is Connected
                  </p>

                  <p className="text-[7px] text-[#7b869d]">
                    You will receive birthday reminders on WhatsApp.
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="rounded-[6px] border border-[#9a7aff] bg-white px-3 py-1.5 text-[8px] font-bold text-[#6338ef] transition hover:bg-[#f5f1ff]"
              >
                Reconnect
              </button>

            </div>

          </div>


          {/* ================= REMINDER TIME ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={Clock3}
              title="Reminder Time"
              subtitle="Set the time to send daily birthday reminders."
              iconBg="bg-[#eee9ff]"
              iconColor="text-[#6338ef]"
            />


            <label className="mb-1 block text-[8px] font-bold text-[#505b76]">
              Reminder Time
            </label>

            <div className="relative">

              <Clock3
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68738f]"
              />

              <select className="h-[31px] w-full appearance-none rounded-[6px] border border-[#dfe2eb] bg-white pl-9 pr-8 text-[9px] font-semibold text-[#515c77] outline-none">
                <option>9:00 AM</option>
                <option>8:00 AM</option>
                <option>10:00 AM</option>
                <option>12:00 PM</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#65708a]">
                ▼
              </span>

            </div>


            <div className="mt-2 flex items-start gap-2 rounded-[6px] bg-[#f2f5fb] px-3 py-2">

              <Info
                size={12}
                className="mt-0.5 shrink-0 text-[#55718e]"
              />

              <p className="text-[7px] leading-3 text-[#68738e]">
                You will receive a daily reminder at 9:00 AM
                <br />
                for upcoming birthdays.
              </p>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* MIDDLE SETTINGS */}
        {/* ================================================= */}

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">

          {/* ================= MESSAGE TEMPLATE ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <div className="flex items-center justify-between">

              <SectionTitle
                icon={MessageSquareText}
                title="Default Message Template"
                subtitle="Customize your default birthday message."
                iconBg="bg-[#eee9ff]"
                iconColor="text-[#6338ef]"
              />

              <button
                type="button"
                className="flex items-center gap-1 text-[8px] font-bold text-[#6338ef]"
              >
                <RotateCcw size={11} />
                Reset
              </button>

            </div>


            <textarea
              defaultValue={`Happy birthday, (name)! 🎉
Wishing you a wonderful year ahead! 🎂
May your day be filled with happiness, love and success! ❤️`}
              rows={4}
              className="mt-2 h-[79px] w-full resize-none rounded-[6px] border border-[#dfe2eb] bg-white px-3 py-2 text-[9px] leading-[16px] text-[#59637d] outline-none focus:border-[#8060ef] focus:ring-2 focus:ring-[#8060ef]/10"
            />

            <div className="mt-1 flex items-center justify-between">

              <p className="text-[7px] text-[#8790a6]">
                Use <b>(name)</b> to automatically insert the person's name.
              </p>

              <p className="text-[7px] text-[#8790a6]">
                Characters: 124/500
              </p>

            </div>

          </div>


          {/* ================= MANAGE CONTACTS ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={Users}
              title="Manage Contacts"
              subtitle="Import, export or manage your contacts."
              iconBg="bg-[#e5f1ff]"
              iconColor="text-[#3686dc]"
            />


            <SettingsAction
              icon={Upload}
              title="Import Contacts"
              subtitle="Import contacts from a CSV file."
              iconBg="bg-[#eee9ff]"
              iconColor="text-[#6338ef]"
            />

            <SettingsAction
              icon={Download}
              title="Export Contacts"
              subtitle="Download your contacts as a CSV file."
              iconBg="bg-[#e4faf2]"
              iconColor="text-[#08b879]"
            />

            <SettingsAction
              icon={Trash2}
              title="Delete All Contacts"
              subtitle="Permanently remove all contacts."
              iconBg="bg-[#ffe9ed]"
              iconColor="text-[#ef405b]"
              danger
            />

          </div>

        </div>


        {/* ================================================= */}
        {/* BOTTOM SETTINGS */}
        {/* ================================================= */}

        <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_1fr_1fr]">


          {/* ================= ACCOUNT ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={UserRound}
              title="Account Settings"
              subtitle="Update your profile information."
              iconBg="bg-[#ffe8ef]"
              iconColor="text-[#f03f65]"
            />


            <div className="flex items-center gap-3">

              {/* Profile */}

              <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#dbe5ef] to-[#bfcbdc]">

                {/* Replace with actual image later */}

                <UserRound
                  size={27}
                  className="text-[#65728b]"
                />

                {/*
                <img
                  src={profileImg}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
                */}

              </div>


              <div className="flex-1 space-y-1.5">

                <InputRow
                  label="Full Name"
                  value="Anuj Kumar"
                />

                <InputRow
                  label="Email Address"
                  value="anujku034@example.com"
                />

              </div>

            </div>


            <button
              type="button"
              className="mt-2 h-[28px] w-full rounded-[6px] border border-[#7753f5] bg-white text-[8px] font-bold text-[#6338ef] transition hover:bg-[#f7f3ff]"
            >
              Update Profile
            </button>

          </div>


          {/* ================= CHANGE PASSWORD ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={LockKeyhole}
              title="Change Password"
              subtitle="Keep your account secure."
              iconBg="bg-[#fff0df]"
              iconColor="text-[#ef9b2f]"
            />


            <PasswordInput
              label="Current Password"
              placeholder="Enter current password"
              visible={showPassword.current}
              onToggle={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
            />

            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              visible={showPassword.newPassword}
              onToggle={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  newPassword: !prev.newPassword,
                }))
              }
            />

            <PasswordInput
              label="Confirm New Password"
              placeholder="Confirm new password"
              visible={showPassword.confirm}
              onToggle={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirm: !prev.confirm,
                }))
              }
            />


            <button
              type="button"
              className="mt-2 h-[29px] w-full rounded-[6px] bg-gradient-to-r from-[#6332ef] to-[#783cff] text-[8px] font-bold text-white shadow-[0_5px_12px_rgba(99,50,239,0.2)]"
            >
              Update Password
            </button>

          </div>


          {/* ================= APPEARANCE + LOGOUT ================= */}

          <div className="rounded-[10px] border border-[#e6e8f0] bg-white p-3 shadow-[0_5px_20px_rgba(35,45,90,0.04)]">

            <SectionTitle
              icon={Moon}
              title="Appearance"
              subtitle="Choose your preferred theme."
              iconBg="bg-[#eee9ff]"
              iconColor="text-[#6338ef]"
            />


            <div className="grid grid-cols-3 gap-2">

              <ThemeButton
                icon={Sun}
                label="Light"
                active
              />

              <ThemeButton
                icon={Moon}
                label="Dark"
              />

              <ThemeButton
                icon={Monitor}
                label="System"
              />

            </div>


            {/* Logout */}

            <div className="mt-3 border-t border-[#edf0f5] pt-2">

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-[27px] w-[27px] items-center justify-center rounded-[8px] bg-[#ffe8ed]">

                  <LogOut
                    size={15}
                    className="text-[#ef405b]"
                  />

                </div>

                <div>

                  <h3 className="text-[10px] font-extrabold text-[#20263f]">
                    Logout
                  </h3>

                  <p className="text-[7px] text-[#7c86a0]">
                    Sign out from your account.
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="flex h-[28px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#ff9dad] bg-[#fff7f8] text-[8px] font-bold text-[#ef405b] transition hover:bg-[#ffecef]"
              >
                <LogOut size={12} />
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}


/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  iconBg,
  iconColor,
}) {
  return (
    <div className="mb-2 flex items-center gap-2">

      <div
        className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] ${iconBg}`}
      >
        <Icon
          size={16}
          strokeWidth={2.5}
          className={iconColor}
        />
      </div>

      <div>

        <h2 className="text-[10px] font-extrabold text-[#1b213b]">
          {title}
        </h2>

        <p className="text-[7px] font-medium text-[#7d87a0]">
          {subtitle}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   SETTINGS ACTION
============================================================ */

function SettingsAction({
  icon: Icon,
  title,
  subtitle,
  iconBg,
  iconColor,
  danger,
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between border-b border-[#edf0f5] py-2 text-left transition hover:bg-[#fafaff]"
    >

      <div className="flex items-center gap-2">

        <div
          className={`flex h-[27px] w-[27px] items-center justify-center rounded-[7px] ${iconBg}`}
        >
          <Icon
            size={14}
            strokeWidth={2.5}
            className={iconColor}
          />
        </div>

        <div>

          <p
            className={`text-[9px] font-extrabold ${
              danger ? "text-[#ef405b]" : "text-[#28304a]"
            }`}
          >
            {title}
          </p>

          <p className="text-[7px] text-[#818ba2]">
            {subtitle}
          </p>

        </div>

      </div>

      <span className="text-[14px] text-[#77829b]">
        ›
      </span>

    </button>
  );
}


/* ============================================================
   INPUT ROW
============================================================ */

function InputRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-2">

      <label className="w-[53px] shrink-0 text-[7px] font-bold text-[#69738c]">
        {label}
      </label>

      <input
        type="text"
        defaultValue={value}
        className="h-[23px] min-w-0 flex-1 rounded-[5px] border border-[#dfe2eb] px-2 text-[8px] text-[#59637b] outline-none focus:border-[#8060ef]"
      />

    </div>
  );
}


/* ============================================================
   PASSWORD INPUT
============================================================ */

function PasswordInput({
  label,
  placeholder,
  visible,
  onToggle,
}) {
  return (
    <div className="mb-1.5">

      <label className="mb-1 block text-[7px] font-bold text-[#69738c]">
        {label}
      </label>

      <div className="relative">

        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="h-[24px] w-full rounded-[5px] border border-[#dfe2eb] bg-white px-2 pr-8 text-[8px] outline-none placeholder:text-[#a0a8b9] focus:border-[#8060ef]"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7b86a0]"
        >
          {visible ? (
            <EyeOff size={12} />
          ) : (
            <Eye size={12} />
          )}
        </button>

      </div>

    </div>
  );
}


/* ============================================================
   THEME BUTTON
============================================================ */

function ThemeButton({
  icon: Icon,
  label,
  active,
}) {
  return (
    <button
      type="button"
      className={`relative flex h-[48px] flex-col items-center justify-center gap-1 rounded-[7px] border text-[7px] font-bold transition ${
        active
          ? "border-[#8765ff] bg-[#f8f5ff] text-[#6338ef]"
          : "border-[#edf0f5] bg-white text-[#69738c] hover:border-[#b9a9f5]"
      }`}
    >

      <Icon
        size={15}
        strokeWidth={2.3}
      />

      {label}

      {active && (
        <span className="absolute right-1.5 top-1.5 flex h-[10px] w-[10px] items-center justify-center rounded-full bg-[#6338ef] text-white">
          <Check size={7} strokeWidth={3} />
        </span>
      )}

    </button>
  );
}


export default Settings;