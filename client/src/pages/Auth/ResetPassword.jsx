import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  Lock,
} from "lucide-react";
import axios from "axios";
import BirthdayBuddyIcon from "../../assets/home/BirthdayBuddyIcon.png";
import { useLocation,useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  console.log("Reset password email:", email);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Password requirements
  const requirements = [
    {
      text: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      text: "Include uppercase & lowercase letters",
      valid:
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password),
    },
    {
      text: "Include a number",
      valid: /\d/.test(password),
    },
    {
      text: "Include a special character (e.g. @, #, $, etc.)",
      valid: /[@$!%*?&]/.test(password),
    },
  ];

  const handleResetButton = async () => {
    setPasswordError("");
    setConfirmPasswordError("");

    // Password required
    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    // Confirm password required
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(
        "Please confirm your password"
      );
      return;
    }

    // Check password requirements
    const allRequirementsMet = requirements.every(
      (item) => item.valid
    );

    if (!allRequirementsMet) {
      setPasswordError(
        "Please meet all password requirements."
      );
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError(
        "Confirm password do not match."
      );
      return;
    }
    // now i have to call the backend server
    try{
      const response = await axiosInstance.post(
        "/auth/reset-password",
        {
          email:email,
          password:password,
        }
      );
      console.log(response.data);
      navigate("/password-success");

    }catch(error){
      console.log("Reset password error:",error);
      console.log(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }

    console.log("Password validation successful");
    console.log("Email:", email);
    console.log("New Password:", password);

    // Backend functionality will be added here
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{
        backgroundImage:
          "url('/forgotPasswordBgImg.png')",
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
          Birth
          <span className="text-[#7546ed]">
            Buddy
          </span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center justify-center">
        <div className="w-full max-w-[440px] rounded-3xl border border-white/70 bg-white/95 p-8 shadow-2xl backdrop-blur-md sm:p-10">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <Lock className="h-8 w-8 text-[#7045ed]" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#111957]">
              Reset Password
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#667085]">
              Create a new password for your BirthBuddy
              account.
            </p>
          </div>

          {/* Form */}
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleResetButton();
            }}
          >
            {/* New Password */}
            <label className="mb-2 block text-sm font-semibold text-[#182052]">
              New Password
            </label>

            <div
              className={`flex items-center rounded-xl border bg-white px-4 transition ${
                passwordError
                  ? "border-red-400 focus-within:border-red-500"
                  : "border-[#d8d9e8] focus-within:border-[#7045ed]"
              }`}
            >
              <Lock
                className={`mr-3 h-5 w-5 ${
                  passwordError
                    ? "text-red-400"
                    : "text-[#8c91aa]"
                }`}
              />

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="w-full border-none bg-transparent py-3.5 text-sm text-[#182052] outline-none"
              />

              <button
                type="button"
                className="text-[#8c91aa] hover:text-[#7045ed]"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>

            {/* Password Error */}
            {passwordError && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {passwordError}
              </p>
            )}

            {/* Confirm Password */}
            <label className="mb-2 mt-5 block text-sm font-semibold text-[#182052]">
              Confirm New Password
            </label>

            <div
              className={`flex items-center rounded-xl border bg-white px-4 transition ${
                confirmPasswordError
                  ? "border-red-400 focus-within:border-red-500"
                  : "border-[#d8d9e8] focus-within:border-[#7045ed]"
              }`}
            >
              <Lock
                className={`mr-3 h-5 w-5 ${
                  confirmPasswordError
                    ? "text-red-400"
                    : "text-[#8c91aa]"
                }`}
              />

              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                className="w-full border-none bg-transparent py-3.5 text-sm text-[#182052] outline-none"
              />

              <button
                type="button"
                className="text-[#8c91aa] hover:text-[#7045ed]"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>

            {/* Confirm Password Error */}
            {confirmPasswordError && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {confirmPasswordError}
              </p>
            )}

            {/* Password Requirements */}
            <div className="mt-5 space-y-2">
              {requirements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xs"
                >
                  <Check
                    className={`h-4 w-4 ${
                      item.valid
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />

                  <span
                    className={
                      item.valid
                        ? "text-green-600"
                        : "text-[#667085]"
                    }
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7045ed] to-[#8549e8] py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Reset Password

              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;