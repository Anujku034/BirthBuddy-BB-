import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  Search,
  Bell,
  LogOut,
  Sun,
  Moon,
  MoreVertical,
  X,
  Home,
  UserPlus,
  CalendarDays,
  UsersRound,
  MessageSquareText,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  useNavigate,
  NavLink,
} from "react-router-dom";

import {
  Dropdown,
  DropdownItem,
} from "flowbite-react";

import { AuthContext } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

import axios from "axios";


// =========================================================
// MOBILE MENU ITEMS
// =========================================================

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


function DashboardNavbar() {

  const {
    accessToken,
    setAccessToken,
    user,
    notificationCount,
    getNotificationCount,
  } = useContext(AuthContext);


  const {
    isDarkMode,
    setIsDarkMode,
  } = useTheme();


  const navigate = useNavigate();


  // =========================================================
  // MOBILE MENU
  // =========================================================

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);


  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {

    try {

      await axiosInstance.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setAccessToken(null);

      navigate("/");

    } catch (error) {

      console.log(error);

    }

  };


  // =========================================================
  // USER INITIALS
  // =========================================================

  const getInitials = (user) => {

    if (!user) return "";

    const words =
      user.trim().split(/\s+/);

    if (words.length === 1) {

      return words[0]
        .charAt(0)
        .toUpperCase();

    }

    return words[0]
      .charAt(0)
      .toUpperCase();

  };


  // =========================================================
  // NOTIFICATION COUNT
  // =========================================================

  useEffect(() => {

    if (!accessToken) return;

    getNotificationCount();

  }, [accessToken]);


  // =========================================================
  // CLOSE MOBILE MENU ON ESC
  // =========================================================

  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === "Escape") {

        setMobileMenuOpen(false);

      }

    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, []);


  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          h-[70px]
          border-b
          border-[#eceef5]
          bg-white/95
          backdrop-blur-md
          transition-colors
          duration-300

          dark:border-white/[0.08]
          dark:bg-[#0f0d1c]/95
        "
      >

        <div
          className="
            flex
            h-full
            items-center
            justify-between
            gap-2
            px-3
            sm:gap-3
            sm:px-5
            lg:px-7
          "
        >

          {/* =================================================
              SEARCH
          ================================================= */}

          <div
            className="
              relative
              min-w-0
              flex-1
              lg:max-w-[380px]
            "
          >

            {/* Desktop Search */}

            <div className="hidden sm:block">

              <Search
                size={17}
                strokeWidth={2}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-[#7e879d]

                  dark:text-[#9992ad]
                "
              />

              <input
                type="text"
                placeholder="Search people, birthdays..."
                className="
                  h-[40px]
                  w-full
                  rounded-[14px]
                  border
                  border-[#e1e4ec]
                  bg-white
                  pl-10
                  pr-16
                  text-[11px]
                  font-medium
                  text-[#3c455e]
                  outline-none
                  transition-all

                  placeholder:text-[#8b94a8]

                  focus:border-[#8060ef]
                  focus:ring-2
                  focus:ring-[#8060ef]/10

                  dark:border-white/[0.10]
                  dark:bg-[#171426]
                  dark:text-[#eeeaff]
                  dark:placeholder:text-[#858096]

                  dark:focus:border-[#8c63ff]
                  dark:focus:ring-[#8c63ff]/10
                "
              />

              {/* Ctrl K */}

              <div
                className="
                  absolute
                  right-2.5
                  top-1/2
                  flex
                  -translate-y-1/2
                  items-center
                  gap-1
                "
              >

                <span
                  className="
                    rounded-md
                    border
                    border-[#e3e5ed]
                    bg-[#fafaff]
                    px-1.5
                    py-1
                    text-[8px]
                    font-semibold
                    text-[#858da1]

                    dark:border-white/[0.10]
                    dark:bg-white/[0.05]
                    dark:text-[#9992ad]
                  "
                >
                  Ctrl
                </span>

                <span
                  className="
                    rounded-md
                    border
                    border-[#e3e5ed]
                    bg-[#fafaff]
                    px-1.5
                    py-1
                    text-[8px]
                    font-semibold
                    text-[#858da1]

                    dark:border-white/[0.10]
                    dark:bg-white/[0.05]
                    dark:text-[#9992ad]
                  "
                >
                  K
                </span>

              </div>

            </div>


            {/* Mobile Search */}

            <button
              type="button"
              className="
                flex
                h-[40px]
                w-[40px]
                items-center
                justify-center
                rounded-full
                border
                border-[#e4e6ef]
                bg-white
                text-[#525d76]
                shadow-[0_5px_15px_rgba(50,40,100,0.06)]
                transition

                hover:bg-[#f4f1ff]
                hover:text-[#6338ef]

                sm:hidden

                dark:border-white/[0.10]
                dark:bg-[#171426]
                dark:text-[#aaa3ba]
                dark:hover:bg-white/[0.06]
                dark:hover:text-[#a889ff]
              "
            >

              <Search
                size={18}
                strokeWidth={2}
              />

            </button>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5

              sm:gap-3
            "
          >

            {/* =================================================
                NOTIFICATION
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/dashboard/notifications"
                )
              }
              className="
                relative
                flex
                h-[38px]
                w-[38px]
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[#525d76]
                transition-all

                hover:bg-[#f4f1ff]
                hover:text-[#6338ef]

                sm:h-[40px]
                sm:w-[40px]

                dark:text-[#aaa3ba]
                dark:hover:bg-white/[0.06]
                dark:hover:text-[#a889ff]
              "
            >

              <Bell
                size={19}
                strokeWidth={2}
              />

              {notificationCount > 0 && (

                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-[#ef405b]
                    px-1
                    text-[8px]
                    font-bold
                    text-white
                  "
                >
                  {notificationCount > 99
                    ? "99+"
                    : notificationCount}
                </span>

              )}

            </button>


            {/* =================================================
                DESKTOP DIVIDER
            ================================================= */}

            <div
              className="
                hidden
                h-[30px]
                w-px
                bg-[#e7e9f0]

                sm:block

                dark:bg-white/[0.10]
              "
            />


            {/* =================================================
                DARK / LIGHT TOGGLE
            ================================================= */}

            <div
              className="
                relative
                flex
                h-[38px]
                w-[72px]
                shrink-0
                items-center
                rounded-full
                border
                border-[#e2dcff]
                bg-[#f3efff]
                p-1
                shadow-[0_4px_12px_rgba(99,56,239,0.08)]
                transition-colors
                duration-300

                sm:h-[40px]
                sm:w-[82px]

                dark:border-[#5b438b]
                dark:bg-[#211a35]
              "
            >

              {/* Active background */}

              <div
                className={`
                  absolute
                  top-1
                  h-[30px]
                  w-[32px]
                  rounded-full
                  bg-white
                  shadow-[0_3px_10px_rgba(99,56,239,0.15)]
                  transition-all
                  duration-300

                  sm:h-[32px]
                  sm:w-[37px]

                  dark:bg-[#743cff]

                  ${
                    isDarkMode
                      ? "translate-x-[34px] sm:translate-x-[37px]"
                      : "translate-x-0"
                  }
                `}
              />


              {/* Sun */}

              <button
                type="button"
                onClick={() =>
                  setIsDarkMode(false)
                }
                aria-label="Light mode"
                className={`
                  relative
                  z-10
                  flex
                  h-[30px]
                  w-[32px]
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-300

                  sm:h-[32px]
                  sm:w-[37px]

                  ${
                    !isDarkMode
                      ? "text-[#f5a400]"
                      : "text-[#8f87a3]"
                  }
                `}
              >

                <Sun
                  size={17}
                  strokeWidth={2.2}
                  fill={
                    !isDarkMode
                      ? "currentColor"
                      : "none"
                  }
                />

              </button>


              {/* Moon */}

              <button
                type="button"
                onClick={() =>
                  setIsDarkMode(true)
                }
                aria-label="Dark mode"
                className={`
                  relative
                  z-10
                  flex
                  h-[30px]
                  w-[32px]
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-300

                  sm:h-[32px]
                  sm:w-[37px]

                  ${
                    isDarkMode
                      ? "text-white"
                      : "text-[#8f87a3]"
                  }
                `}
              >

                <Moon
                  size={17}
                  strokeWidth={2.2}
                  fill={
                    isDarkMode
                      ? "currentColor"
                      : "none"
                  }
                />

              </button>

            </div>


            {/* =================================================
                DESKTOP DIVIDER
            ================================================= */}

            <div
              className="
                hidden
                h-[30px]
                w-px
                bg-[#e7e9f0]

                sm:block

                dark:bg-white/[0.10]
              "
            />


            {/* =================================================
                USER PROFILE
            ================================================= */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >

              {/* Avatar */}

              <div
                className="
                  flex
                  h-[38px]
                  w-[38px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-white
                  shadow-sm

                  sm:h-10
                  sm:w-10

                  dark:bg-white
                  dark:text-black
                "
              >

                <p className="text-[13px] font-semibold">
                  {getInitials(user)}
                </p>

              </div>


              {/* User Dropdown - desktop only */}

              <div className="hidden sm:block">

                <Dropdown
                  label={user}
                  dismissOnClick={false}
                  className="
                    max-w-[180px]
                    rounded-xl
                    border
                    border-[#e5e7eb]
                    bg-white
                    text-[#3c455e]
                    shadow-xl
                    shadow-purple-100

                    focus:outline-none
                    focus:ring-0
                    focus:border-transparent

                    dark:border-white/[0.10]
                    dark:bg-[#171426]
                    dark:text-[#eeeaff]
                    dark:shadow-black/30
                  "
                >

                  <DropdownItem
                    icon={LogOut}
                    className="
                      group
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-[#ef405b]
                      transition-all
                      duration-200

                      hover:bg-red-50
                      hover:text-[#dc2649]

                      dark:hover:bg-red-500/10
                      dark:hover:text-[#ff6078]
                    "
                    onClick={handleLogout}
                  >

                    <span className="flex items-center gap-2">
                      Sign out
                    </span>

                  </DropdownItem>

                </Dropdown>

              </div>


              {/* =================================================
                  MOBILE THREE DOT BUTTON
              ================================================= */}

              <button
                type="button"
                aria-label="Open navigation"
                aria-expanded={mobileMenuOpen}
                onClick={() =>
                  setMobileMenuOpen(
                    (prev) => !prev
                  )
                }
                className={`
                  flex
                  h-[40px]
                  w-[40px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[13px]
                  border
                  transition-all
                  duration-200

                  sm:hidden

                  ${
                    mobileMenuOpen
                      ? `
                        border-[#7040ed]
                        bg-gradient-to-br
                        from-[#874cf6]
                        to-[#6534e8]
                        text-white
                        shadow-[0_8px_20px_rgba(101,52,232,0.30)]
                      `
                      : `
                        border-[#e2e4ed]
                        bg-white
                        text-[#4e5770]
                        shadow-[0_5px_15px_rgba(50,40,100,0.07)]

                        dark:border-white/[0.10]
                        dark:bg-[#171426]
                        dark:text-[#bdb6cc]
                      `
                  }
                `}
              >

                {mobileMenuOpen ? (
                  <X
                    size={20}
                    strokeWidth={2.4}
                  />
                ) : (
                  <MoreVertical
                    size={21}
                    strokeWidth={2.2}
                  />
                )}

              </button>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          MOBILE MENU BACKDROP
      ===================================================== */}

      {mobileMenuOpen && (

        <div
          className="
            fixed
            inset-0
            z-[55]
            bg-black/20
            backdrop-blur-[2px]
            sm:hidden
          "
          onClick={() =>
            setMobileMenuOpen(false)
          }
        />

      )}


      {/* =====================================================
          MOBILE NAVIGATION MENU
      ===================================================== */}

      <div
        className={`
          fixed
          right-3
          top-[76px]
          z-[60]
          w-[calc(100%-24px)]
          max-w-[360px]
          overflow-hidden
          rounded-[22px]
          border
          border-white/80
          bg-white/95
          p-2
          shadow-[0_25px_70px_rgba(40,30,80,0.25)]
          backdrop-blur-2xl
          transition-all
          duration-300

          dark:border-white/[0.10]
          dark:bg-[#171421]/98
          dark:shadow-[0_25px_70px_rgba(0,0,0,0.45)]

          sm:hidden

          ${
            mobileMenuOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-3 scale-95 opacity-0"
          }
        `}
      >

        {/* Menu Header */}

        <div
          className="
            flex
            items-center
            justify-between
            px-3
            py-2.5
          "
        >

          <div>

            <p
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[1.5px]
                text-[#81788f]

                dark:text-[#958da3]
              "
            >
              Navigation
            </p>

            <p
              className="
                mt-0.5
                text-[8px]
                font-medium
                text-[#a0a4b2]

                dark:text-[#746e80]
              "
            >
              BirthdayBuddy menu
            </p>

          </div>


          <Sparkles
            size={16}
            className="text-[#7540ee]"
          />

        </div>


        {/* Navigation Items */}

        <nav
          className="
            max-h-[calc(100vh-155px)]
            overflow-y-auto
            scrollbar-thin
          "
        >

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
                  `
                    mb-1
                    flex
                    min-h-[50px]
                    items-center
                    gap-3
                    rounded-[15px]
                    px-3
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          bg-gradient-to-r
                          from-[#874cf6]
                          to-[#6734e9]
                          text-white
                          shadow-[0_8px_22px_rgba(103,52,233,0.25)]
                        `
                        : `
                          text-[#252b45]
                          hover:bg-[#f3efff]

                          dark:text-[#d0cbd9]
                          dark:hover:bg-white/[0.06]
                        `
                    }
                  `
                }
              >

                {({ isActive }) => (

                  <>

                    {/* Icon Box */}

                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-[11px]

                        ${
                          isActive
                            ? "bg-white/20"
                            : `
                              bg-[#f2effb]
                              dark:bg-white/[0.06]
                            `
                        }
                      `}
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


                    {/* Text */}

                    <span
                      className="
                        flex-1
                        text-[10px]
                        font-black
                      "
                    >
                      {item.name}
                    </span>


                    {/* Arrow */}

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


        {/* Mobile Sign Out */}

        <button
          type="button"
          onClick={() => {

            setMobileMenuOpen(false);

            handleLogout();

          }}
          className="
            mt-1
            flex
            min-h-[48px]
            w-full
            items-center
            gap-3
            rounded-[15px]
            px-3
            text-[#ef405b]
            transition-all

            hover:bg-red-50

            dark:hover:bg-red-500/10
          "
        >

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-[11px]
              bg-red-50

              dark:bg-red-500/10
            "
          >

            <LogOut
              size={18}
            />

          </div>

          <span
            className="
              text-[10px]
              font-black
            "
          >
            Sign out
          </span>

        </button>

      </div>

    </>
  );
}


export default DashboardNavbar;