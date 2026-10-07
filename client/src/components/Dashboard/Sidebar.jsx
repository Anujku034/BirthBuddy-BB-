import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import BirthdayBuddyIcon from "../../assets/home/BirthdayBuddyIcon.png";
import dashboardGift from "../../assets/dashboard/dashboardGift.png";

import {
  Home,
  UserPlus,
  CalendarDays,
  UsersRound,
  MessageSquareText,
  Settings,
  ChevronRight,
  Sparkles,
  MoreVertical,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Add Person",
    path: "/dashboard/add-person",
    icon: UserPlus,
  },
  {
    name: "Upcoming Birthdays",
    path: "/dashboard/upcoming-birthdays",
    icon: CalendarDays,
  },
  {
    name: "All Contacts",
    path: "/dashboard/contacts",
    icon: UsersRound,
  },
  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: MessageSquareText,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
          Hidden below lg
      ===================================================== */}

      <aside className="hidden h-full w-full bg-[#f7f5ff] px-3 py-3 transition-colors duration-300 dark:bg-[#0e0c18] lg:block lg:px-4 lg:py-4">

        <div className="relative flex h-full flex-col overflow-hidden rounded-[25px] border border-white/80 bg-white/80 px-3 py-4 shadow-[0_15px_45px_rgba(72,48,145,0.10)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-[#151220]/90 dark:shadow-[0_15px_45px_rgba(0,0,0,0.25)]">

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="mb-8 flex items-center gap-3 px-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ffffff] to-[#eee8ff] shadow-[0_8px_20px_rgba(85,55,180,0.12)] dark:from-[#29213e] dark:to-[#1d1830]">

              <img
                src={BirthdayBuddyIcon}
                alt="BirthdayBuddy"
                className="h-9 w-9 object-contain"
              />

            </div>

            <div className="min-w-0">

              <h1 className="text-[18px] font-black tracking-[-0.7px] text-[#101631] dark:text-white">
                Birth
                <span className="text-[#6535ed]">
                  Buddy
                </span>
              </h1>

              <p className="text-[7px] font-semibold text-[#8b91a6] dark:text-[#9290a5]">
                Never miss a birthday
              </p>

            </div>

          </div>


          {/* =================================================
              DESKTOP MENU
          ================================================= */}

          <nav className="flex-1 space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={
                    item.path === "/dashboard"
                  }
                  className={({ isActive }) =>
                    `group relative flex h-[52px] items-center gap-4 rounded-[17px] px-4 text-[11px] font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#8a4df7] to-[#6835e8] text-white shadow-[0_12px_28px_rgba(105,55,235,0.25)]"
                        : "text-[#182348] hover:bg-[#eee9ff] hover:text-[#6338ef] dark:text-[#c2bdce] dark:hover:bg-white/[0.06] dark:hover:text-[#a98cff]"
                    }`
                  }
                >

                  {({ isActive }) => (
                    <>
                      <Icon
                        size={22}
                        strokeWidth={
                          isActive ? 2.4 : 2
                        }
                        className={
                          isActive
                            ? "text-white"
                            : "text-[#24396f] dark:text-[#a9a2bb]"
                        }
                      />

                      <span className="truncate">
                        {item.name}
                      </span>

                      {isActive && (
                        <ChevronRight
                          size={17}
                          className="ml-auto"
                        />
                      )}

                    </>
                  )}

                </NavLink>
              );
            })}

          </nav>


          {/* =================================================
              DESKTOP BOTTOM CARD
          ================================================= */}

          <div className="relative mt-5 overflow-hidden rounded-[22px] border border-[#ddd3ff] bg-gradient-to-br from-[#f8efff] via-[#f8edff] to-[#e9dcff] p-3 text-center shadow-[0_12px_35px_rgba(90,55,180,0.10)] dark:border-[#382852] dark:from-[#21152f] dark:via-[#1c1528] dark:to-[#171225]">

            <Sparkles
              size={15}
              className="absolute right-4 top-3 text-[#8551ed]"
            />

            <img
              src={dashboardGift}
              alt="Birthday gifts"
              className="mx-auto h-[125px] w-full object-contain"
            />

            <p className="text-[7px] font-black uppercase tracking-[1.5px] text-[#8065a8] dark:text-[#a898c5]">
              BIRTHDAY ✨
            </p>

            <h3 className="mt-1 text-[15px] font-black leading-tight text-[#161936] dark:text-white">
              Make every
              <br />
              <span className="text-[#8148ef]">
                birthday special!
              </span>
            </h3>

            <p className="mx-auto mt-2 max-w-[160px] text-[8px] font-medium leading-4 text-[#7d7791] dark:text-[#9690a5]">
              Save important people
              <br />
              and never miss
              <br />
              a birthday. ❤️
            </p>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MOBILE TOP NAVBAR
          Visible below lg
      ===================================================== */}

      <header className="sticky left-0 right-0 top-0 z-50 flex h-[72px] items-center justify-between border-b border-white/80 bg-white/90 px-4 shadow-[0_8px_30px_rgba(50,40,100,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#100e19]/95 lg:hidden">

        {/* =================================================
            MOBILE LOGO
        ================================================= */}

        <NavLink
          to="/dashboard"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="flex items-center gap-2"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-[#e1d8f8] bg-gradient-to-br from-[#f8f3ff] to-[#e8ddff] shadow-[0_8px_18px_rgba(90,50,180,0.12)] dark:border-[#39294e] dark:from-[#29203a] dark:to-[#1b1528]">

            <img
              src={BirthdayBuddyIcon}
              alt="BirthdayBuddy"
              className="h-8 w-8 object-contain"
            />

          </div>


          <div>

            <h1 className="text-[17px] font-black tracking-[-0.7px] text-[#171a36] dark:text-white">

              Birth
              <span className="text-[#7540ee]">
                Buddy
              </span>

            </h1>

            <p className="text-[6px] font-semibold text-[#8c91a4] dark:text-[#918a9e]">
              ✨ Never miss a birthday
            </p>

          </div>

        </NavLink>


        {/* =================================================
            THREE DOT BUTTON
        ================================================= */}

        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
          className={`flex h-11 w-11 items-center justify-center rounded-[14px] border transition-all duration-300 ${
            mobileMenuOpen
              ? "border-[#7440ed] bg-gradient-to-br from-[#8248f4] to-[#6332e8] text-white shadow-[0_10px_25px_rgba(99,50,232,0.3)]"
              : "border-[#e4e0ed] bg-white text-[#252d4b] shadow-[0_7px_20px_rgba(60,50,100,0.08)] dark:border-white/10 dark:bg-white/[0.05] dark:text-[#d8d2e2]"
          }`}
        >

          {mobileMenuOpen ? (
            <X size={22} />
          ) : (
            <MoreVertical size={22} />
          )}

        </button>

      </header>


      {/* =====================================================
          MOBILE MENU OVERLAY
      ===================================================== */}

      {mobileMenuOpen && (

        <div
          className="fixed inset-0 z-40 bg-[#0b0912]/35 backdrop-blur-[2px] lg:hidden"
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />

      )}


      {/* =====================================================
          MOBILE DROPDOWN MENU
      ===================================================== */}

      <div
        className={`fixed right-3 top-[78px] z-50 w-[calc(100%-24px)] max-w-[360px] transform overflow-hidden rounded-[22px] border border-white/80 bg-white/95 p-2 shadow-[0_25px_70px_rgba(40,30,80,0.22)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-[#171421]/98 dark:shadow-[0_25px_70px_rgba(0,0,0,0.45)] lg:hidden ${
          mobileMenuOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-95 opacity-0"
        }`}
      >

        {/* Menu Header */}

        <div className="mb-1 flex items-center justify-between px-3 py-2">

          <div>

            <p className="text-[9px] font-black uppercase tracking-[1.5px] text-[#8c839d] dark:text-[#8f879e]">
              Navigation
            </p>

            <p className="mt-0.5 text-[8px] font-medium text-[#a0a4b2] dark:text-[#706b7c]">
              BirthdayBuddy menu
            </p>

          </div>

          <Sparkles
            size={15}
            className="text-[#7540ee]"
          />

        </div>


        {/* Mobile Menu Items */}

        <nav className="max-h-[calc(100vh-150px)] overflow-y-auto">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={
                  item.path === "/dashboard"
                }
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className={({ isActive }) =>
                  `mb-1 flex min-h-[50px] items-center gap-3 rounded-[15px] px-3 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#8649f5] to-[#6734e9] text-white shadow-[0_8px_22px_rgba(103,52,233,0.22)]"
                      : "text-[#252b45] hover:bg-[#f3efff] dark:text-[#d0cbd9] dark:hover:bg-white/[0.06]"
                  }`
                }
              >

                {({ isActive }) => (
                  <>
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] ${
                        isActive
                          ? "bg-white/20"
                          : "bg-[#f2effb] dark:bg-white/[0.06]"
                      }`}
                    >

                      <Icon
                        size={19}
                        strokeWidth={
                          isActive
                            ? 2.4
                            : 2
                        }
                      />

                    </div>


                    <span className="flex-1 text-[10px] font-black">
                      {item.name}
                    </span>


                    <ChevronRight
                      size={16}
                      className={
                        isActive
                          ? "opacity-100"
                          : "opacity-30"
                      }
                    />

                  </>
                )}

              </NavLink>
            );

          })}

        </nav>

      </div>
    </>
  );
}

export default Sidebar;