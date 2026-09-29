import React, { useEffect, useState } from "react";
import birthdayImg from "../../assets/home/BirthdayBuddyIcon.png";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu manually
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkStyle = ({ isActive }) =>
    `relative py-2 text-[15px] font-medium transition-all duration-200 ${
      isActive
        ? "text-[#5820C7] font-semibold"
        : "text-slate-600 hover:text-[#5820C7]"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">

      {/* ================= NAVBAR HEADER ================= */}
      <div className="max-w-7xl mx-auto min-h-[72px] px-5 md:px-6 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 shrink-0"
        >
          <img
            src={birthdayImg}
            alt="BirthBuddy Logo"
            className="w-11 h-11 object-contain"
          />

          <p className="text-[23px] font-bold tracking-tight text-slate-900">
            Birth<span className="text-[#5820C7]">Buddy</span>
          </p>
        </NavLink>


        {/* ================= DESKTOP NAVIGATION ================= */}
        <ul className="hidden md:flex items-center gap-8 list-none">

          {/* HOME */}
          <li>
            <NavLink
              to="/"
              end
              className={navLinkStyle}
            >
              {({ isActive }) => (
                <>
                  Home

                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#5820C7]" />
                  )}
                </>
              )}
            </NavLink>
          </li>


          {/* FEATURES */}
          <li>
            <NavLink
              to="/features"
              className={navLinkStyle}
            >
              {({ isActive }) => (
                <>
                  Features

                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#5820C7]" />
                  )}
                </>
              )}
            </NavLink>
          </li>


          {/* HOW IT WORKS */}
          <li>
            <NavLink
              to="/how-it-works"
              className={navLinkStyle}
            >
              {({ isActive }) => (
                <>
                  How It Works

                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#5820C7]" />
                  )}
                </>
              )}
            </NavLink>
          </li>


          {/* PRICING */}
          <li>
            <NavLink
              to="/pricing"
              className={navLinkStyle}
            >
              {({ isActive }) => (
                <>
                  Pricing

                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#5820C7]" />
                  )}
                </>
              )}
            </NavLink>
          </li>


          {/* ABOUT */}
          <li>
            <NavLink
              to="/about"
              className={navLinkStyle}
            >
              {({ isActive }) => (
                <>
                  About

                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#5820C7]" />
                  )}
                </>
              )}
            </NavLink>
          </li>

        </ul>


        {/* ================= DESKTOP AUTH BUTTONS ================= */}
        <div className="hidden md:flex items-center gap-3">

          {/* LOGIN */}
          <NavLink
            to="/login"
            className="
              h-10
              px-5
              flex
              items-center
              justify-center
              rounded-lg
              border
              border-[#D8CCFF]
              bg-white
              text-[#5820C7]
              text-sm
              font-semibold
              transition-all
              duration-200
              hover:bg-[#F7F3FF]
              hover:border-[#5820C7]
            "
          >
            Log In
          </NavLink>


          {/* SIGN UP */}
          <NavLink
            to="/signup"
            className="
              h-10
              px-5
              flex
              items-center
              justify-center
              rounded-lg
              bg-[#5820C7]
              text-white
              text-sm
              font-semibold
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#4B1BAE]
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            Sign Up
          </NavLink>

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            md:hidden
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-lg
            text-[#5820C7]
            border
            border-[#D8CCFF]
            hover:bg-[#F7F3FF]
            transition-all
          "
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">

          <div className="px-5 py-4 flex flex-col gap-2">

            {/* HOME */}
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full py-3 px-4 rounded-lg text-left transition-all ${
                  isActive
                    ? "bg-[#F3EEFF] text-[#5820C7] font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              Home
            </NavLink>


            {/* FEATURES */}
            <NavLink
              to="/features"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full py-3 px-4 rounded-lg text-left transition-all ${
                  isActive
                    ? "bg-[#F3EEFF] text-[#5820C7] font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              Features
            </NavLink>


            {/* HOW IT WORKS */}
            <NavLink
              to="/how-it-works"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full py-3 px-4 rounded-lg text-left transition-all ${
                  isActive
                    ? "bg-[#F3EEFF] text-[#5820C7] font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              How It Works
            </NavLink>


            {/* PRICING */}
            <NavLink
              to="/pricing"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full py-3 px-4 rounded-lg text-left transition-all ${
                  isActive
                    ? "bg-[#F3EEFF] text-[#5820C7] font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              Pricing
            </NavLink>


            {/* ABOUT */}
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full py-3 px-4 rounded-lg text-left transition-all ${
                  isActive
                    ? "bg-[#F3EEFF] text-[#5820C7] font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              About
            </NavLink>


            {/* DIVIDER */}
            <div className="border-t border-slate-100 my-2" />


            {/* LOGIN */}
            <NavLink
              to="/login"
              onClick={closeMenu}
              className="
                w-full
                py-3
                px-4
                text-center
                rounded-lg
                border
                border-[#D8CCFF]
                text-[#5820C7]
                font-semibold
                hover:bg-[#F7F3FF]
                transition-all
              "
            >
              Log In
            </NavLink>


            {/* SIGN UP */}
            <NavLink
              to="/signup"
              onClick={closeMenu}
              className="
                w-full
                py-3
                px-4
                text-center
                rounded-lg
                bg-[#5820C7]
                text-white
                font-semibold
                hover:bg-[#4B1BAE]
                transition-all
              "
            >
              Sign Up
            </NavLink>

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;