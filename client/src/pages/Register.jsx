import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Gift,
  CalendarDays,
  Heart,
  Users,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  // =========================
  // FORM STATES
  // =========================

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [ticked, setIsticked] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // =========================
  // ERROR STATES
  // =========================

  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =========================
  // REGEX
  // =========================

  const fullNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  // =========================
  // HANDLE SIGNUP
  // =========================

  const handleSubmit = async () => {
    // Clear previous backend messages
    setServerError("");
    setSuccessMessage("");

    let hasError = false;

    // =========================
    // FULL NAME VALIDATION
    // =========================

    const trimmedFullName = fullname.trim();

    if (trimmedFullName === "") {
      setFullnameError("Full Name is required");
      hasError = true;
    } else if (!fullNameRegex.test(trimmedFullName)) {
      setFullnameError("Please enter a valid full name");
      hasError = true;
    } else {
      setFullnameError("");
    }

    // =========================
    // EMAIL VALIDATION
    // =========================

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail === "") {
      setEmailError("Email field can't be empty");
      hasError = true;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError("");
    }

    // =========================
    // PASSWORD VALIDATION
    // =========================

    if (password === "") {
      setPasswordError("Please enter the password");
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain 8+ characters, uppercase, lowercase, number and special character"
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    // =========================
    // CONFIRM PASSWORD VALIDATION
    // =========================

    if (confirmpassword === "") {
      setConfirmPasswordError("Please enter the confirm password");
      hasError = true;
    } else if (password !== confirmpassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    // =========================
    // TERMS VALIDATION
    // =========================

    if (!ticked) {
      setTermsError(
        "Please agree to the Privacy Policy and Terms of Service to continue."
      );
      hasError = true;
    } else {
      setTermsError("");
    }

    // =========================
    // STOP IF VALIDATION FAILS
    // =========================

    if (hasError) {
      return;
    }

    // =========================
    // SEND DATA TO BACKEND
    // =========================

    try {
      const response = await axiosInstance.post(
        "/auth/register",
        {
          fullName: trimmedFullName,
          email: trimmedEmail,
          password: password,
          confirmPassword: confirmpassword,
        }
      );

      console.log(response.data);

      if (response.data.message) {
        setSuccessMessage(
          response.data.message || "Registration successful!"
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

      // Clear form after successful registration
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsticked(false);
    } catch (error) {
      const message = error.response?.data?.message;

      if (message === "Email already registered") {
        setServerError(
          "Email already registered. Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);

        return;
      }

      setServerError(
        message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7fb] via-white to-[#f1f5ff] flex items-center justify-center p-4 sm:p-6">

      {/* Main Container */}
      <div className="w-full max-w-7xl min-h-[700px] grid lg:grid-cols-2 overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-xl shadow-[0_25px_80px_rgba(30,41,59,0.12)] border border-white">

        {/* ================= LEFT SECTION ================= */}

        <section className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 xl:p-16 bg-gradient-to-br from-[#fff7fb] via-[#f8f5ff] to-[#eef7ff]">

          {/* Decorative Blurs */}

          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />

          <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl" />

          <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl" />

          {/* Decorative Dots */}

          <div className="absolute top-32 right-24 w-3 h-3 rounded-full bg-pink-400" />

          <div className="absolute top-52 right-40 w-2 h-2 rounded-full bg-blue-400" />

          <div className="absolute bottom-32 left-20 w-3 h-3 rounded-full bg-purple-400" />

          {/* Logo */}

          <div className="relative z-10 flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-200">
              <Gift className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Birth<span className="text-pink-500">Buddy</span>
            </h1>

          </div>

          {/* Main Content */}

          <div className="relative z-10 max-w-xl">

            <p className="mb-5 text-sm font-semibold tracking-widest uppercase text-pink-500">
              More than reminders
            </p>

            <h2 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight text-slate-900">

              Celebrate

              <br />

              Every{" "}

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                Special
              </span>

              <br />

              Moment

            </h2>

            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-500">
              Join BirthBuddy and keep your loved ones close with timely
              birthday reminders, thoughtful wishes, and more.
            </p>

            {/* Features */}

            <div className="mt-10 space-y-5">

              {/* Feature 1 */}

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 shrink-0 rounded-2xl bg-pink-100 flex items-center justify-center">
                  <CalendarDays className="w-6 h-6 text-pink-500" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Never Miss a Birthday
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Get timely reminders for all important dates.
                  </p>
                </div>

              </div>

              {/* Feature 2 */}

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-500" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Stay Connected
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Celebrate and make your loved ones feel special.
                  </p>
                </div>

              </div>

              {/* Feature 3 */}

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-500" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    All in One Place
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage and organize birthdays easily.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Quote */}

          <div className="relative z-10">
            <p className="text-lg italic font-semibold text-slate-500">
              “Small reminders,
              <br />
              stronger relationships.”
            </p>
          </div>

          {/* Bottom Decoration */}

          <div className="absolute -bottom-32 -left-20 w-[650px] h-56 bg-gradient-to-r from-purple-300/40 to-pink-300/40 rounded-[50%] rotate-[-5deg]" />

        </section>

        {/* ================= RIGHT SECTION ================= */}

        <section className="relative flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-white">

          {/* Background Decoration */}

          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/40 rounded-full blur-3xl" />

          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />

          {/* Register Form */}

          <div className="relative z-10 w-full max-w-md">

            {/* Heading */}

            <div className="mb-7">

              <h2 className="text-4xl font-black tracking-tight text-slate-900">
                Create Your Account 🎉
              </h2>

              <p className="mt-3 text-slate-500 leading-6">
                Join BirthBuddy and start celebrating the people who matter.
              </p>

            </div>

            {/* ================= SUCCESS MESSAGE ================= */}

            {successMessage && (
              <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
                <p className="text-sm font-semibold text-green-600">
                  {successMessage}🎉
                </p>
              </div>
            )}

            {/* ================= SERVER ERROR ================= */}

            {serverError && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm font-semibold text-red-600">
                  {serverError}
                </p>
              </div>
            )}

            {/* Form */}

            <div className="space-y-4">

              {/* ================= FULL NAME ================= */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-slate-800">
                  Full Name
                </label>

                <div className="relative">

                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullname}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setFullnameError("");
                      setServerError("");
                    }}
                    className={`w-full h-13 pl-12 pr-4 rounded-2xl border ${
                      fullnameError
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-pink-400 focus:ring-pink-100"
                    } bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-4`}
                  />

                </div>

                {fullnameError && (
                  <p className="mt-1 text-sm text-red-600 font-semibold">
                    {fullnameError}
                  </p>
                )}

              </div>

              {/* ================= EMAIL ================= */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-slate-800">
                  Email Address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setServerError("");
                    }}
                    className={`w-full h-13 pl-12 pr-4 rounded-2xl border ${
                      emailError
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-pink-400 focus:ring-pink-100"
                    } bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-4`}
                  />

                </div>

                {emailError && (
                  <p className="mt-1 text-sm text-red-600 font-semibold">
                    {emailError}
                  </p>
                )}

              </div>

              {/* ================= PASSWORD ================= */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-slate-800">
                  Password
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                      setServerError("");
                    }}
                    className={`w-full h-13 pl-12 pr-12 rounded-2xl border ${
                      passwordError
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-pink-400 focus:ring-pink-100"
                    } bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-4`}
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                </div>

                {passwordError && (
                  <p className="mt-1 text-sm text-red-600 font-semibold">
                    {passwordError}
                  </p>
                )}

              </div>

              {/* ================= CONFIRM PASSWORD ================= */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-slate-800">
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmpassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError("");
                      setServerError("");
                    }}
                    className={`w-full h-13 pl-12 pr-12 rounded-2xl border ${
                      confirmPasswordError
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-pink-400 focus:ring-pink-100"
                    } bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-4`}
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                </div>

                {confirmPasswordError && (
                  <p className="mt-1 text-sm text-red-600 font-semibold">
                    {confirmPasswordError}
                  </p>
                )}

              </div>

              {/* ================= TERMS ================= */}

              <label className="flex items-start gap-3 cursor-pointer pt-1">

                <input
                  type="checkbox"
                  checked={ticked}
                  className="mt-1 w-4 h-4 accent-pink-500 cursor-pointer"
                  onChange={(e) => {
                    setIsticked(e.target.checked);
                    setTermsError("");
                    setServerError("");
                  }}
                />

                <span className="text-sm text-slate-500 leading-5">
                  I agree to the{" "}
                  <span className="text-blue-600 font-semibold">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 font-semibold">
                    Privacy Policy
                  </span>
                </span>

              </label>

              {termsError && (
                <p className="text-sm text-red-600 font-semibold">
                  {termsError}
                </p>
              )}

              {/* ================= CREATE ACCOUNT ================= */}

              <button
                type="button"
                className="group w-full h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
                onClick={handleSubmit}
              >
                Create Account

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

            {/* ================= DIVIDER ================= */}

            <div className="flex items-center gap-4 my-7">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Or sign up with
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            {/* ================= SOCIAL LOGIN ================= */}

            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                className="h-13 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
              >
                <span className="text-lg font-bold text-blue-500">
                  G
                </span>

                Google
              </button>

              <button
                type="button"
                className="h-13 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
              >
                <span className="text-lg">
                  ●
                </span>

                GitHub
              </button>

            </div>

            {/* ================= LOGIN LINK ================= */}

            <p className="mt-7 text-center text-sm text-slate-500">

              Already have an account?{" "}

              <NavLink
                to="/login"
                className="
                  inline-flex items-center justify-center
                  px-6 py-2.5
                  rounded-xl
                  font-semibold
                  text-pink-500
                  bg-pink-50/70
                  border border-pink-200
                  shadow-sm
                  hover:bg-pink-500
                  hover:text-white
                  hover:border-pink-500
                  hover:shadow-lg
                  hover:shadow-pink-200
                  hover:-translate-y-0.5
                  active:translate-y-0
                  transition-all duration-300
                "
              >
                Login
              </NavLink>

            </p>

          </div>

        </section>

      </div>

    </div>
  );
};

export default Register;