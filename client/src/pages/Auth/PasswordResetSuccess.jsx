import React from "react";
import { ArrowRight, Check } from "lucide-react";

import BirthdayBuddyIcon from "../../assets/home/BirthdayBuddyIcon.png";
import {NavLink} from "react-router-dom";
const PasswordResetSuccess = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{
        backgroundImage: "url('/forgotPasswordBgImg.png')",
      }}
    >
      {/* Logo */}
      <div className="mx-auto flex max-w-7xl items-center gap-2">
        <div className="h-10 w-10 overflow-hidden rounded-xl">
          <img
            src={BirthdayBuddyIcon}
            alt="BirthBuddy"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-[#111957]">
          Birth<span className="text-[#7546ed]">Buddy</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center justify-center">
        <div className="w-full max-w-[440px] rounded-3xl border border-white/70 bg-white/95 p-8 text-center shadow-2xl backdrop-blur-md sm:p-10">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check className="h-10 w-10 text-green-600" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-[#111957]">
            Password Reset Successful!
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm leading-6 text-[#667085]">
            Your password has been successfully updated.
          </p>

          <p className="mt-5 text-sm leading-6 text-[#667085]">
            You can now log in to your BirthBuddy account
            with your new password.
          </p>

          {/* Login Button */}
          <NavLink to="/login"
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7045ed] to-[#8549e8] py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Go to Login

            <ArrowRight className="h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;