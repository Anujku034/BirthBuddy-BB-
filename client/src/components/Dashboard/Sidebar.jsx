import React from "react";
import { NavLink } from "react-router-dom";
import BirthdayBuddyIcon from "../../assets/home/BirthdayBuddyIcon.png"
import {
  Home,
  UserPlus,
  CalendarDays,
  UsersRound,
  MessageSquareText,
  Settings,
  Heart,
} from "lucide-react";

import dashboardGift from "../../assets/dashboard/dashboardGift.png";


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
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[278px] bg-[#f8f9ff] px-4 py-4 lg:block">

      <div className="flex h-full flex-col overflow-hidden rounded-[22px] border border-white/80 bg-white/70 px-3 py-4 shadow-[0_8px_35px_rgba(54,43,110,0.08)] backdrop-blur-xl">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <div className="flex items-center gap-2 px-3 pb-5">

          {/* Birthday Icon */}

          <div className="relative flex h-[40px] w-[40px] items-center justify-center">
            <img src={BirthdayBuddyIcon} alt="" />

          </div>


          {/* Logo Text */}

          <div className="flex items-center">

            <span className="text-[18px] font-extrabold tracking-[-0.7px] text-[#27304c]">
              Birth
            </span>

            <span className="text-[18px] font-extrabold tracking-[-0.7px] text-[#6338ef]">
              Buddy
            </span>

          </div>

        </div>


        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="flex-1">

          <div className="space-y-1.5">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `group flex h-[43px] items-center gap-3 rounded-[11px] px-3.5 text-[13px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#e9ddff] to-[#d9c8ff] text-[#6338ef] shadow-[0_5px_15px_rgba(99,56,239,0.10)]"
                        : "text-[#303951] hover:bg-[#f2efff] hover:text-[#6338ef]"
                    }`
                  }
                >

                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.5 : 2}
                        className={`shrink-0 transition-transform duration-200 ${
                          isActive
                            ? "text-[#6338ef]"
                            : "text-[#39425b] group-hover:text-[#6338ef]"
                        }`}
                      />

                      <span>
                        {item.name}
                      </span>

                    </>
                  )}

                </NavLink>
              );
            })}

          </div>

        </nav>


        {/* =====================================================
            BOTTOM PROMO CARD
        ===================================================== */}

        <div className="relative mt-auto overflow-hidden rounded-[17px] border border-[#eee8ff] bg-gradient-to-br from-[#f9f5ff] via-[#f4edff] to-[#eee6ff] px-3 pb-3 pt-2 shadow-[0_8px_25px_rgba(86,51,170,0.06)]">

          {/* Decorative glow */}

          <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#d7c2ff]/40 blur-2xl" />

          <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-[#ffd8e5]/40 blur-2xl" />


          {/* Gift */}

          <div className="relative flex h-[105px] items-center justify-center">

            <img
              src={dashboardGift}
              alt="Birthday gift"
              className="h-[105px] w-auto object-contain drop-shadow-[0_10px_12px_rgba(80,40,150,0.15)]"
            />

          </div>


          {/* Text */}

          <div className="relative text-center">

            <h3 className="text-[15px] font-extrabold leading-[18px] tracking-[-0.3px] text-[#171d37]">
              Make every
              <br />
              birthday special!
            </h3>

            <p className="mx-auto mt-1.5 max-w-[185px] text-[10px] font-medium leading-[15px] text-[#7b849d]">
              Save important people
              <br />
              and never miss
              <br />
              a birthday.
              <span className="ml-1">❤️</span>
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;