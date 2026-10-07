import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight, Clock, Mail } from "lucide-react";

import BirthdayBuddyIcon from "../../assets/home/BirthdayBuddyIcon.png";
import { useLocation,useNavigate,NavLink } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
const VerifyOTP = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [inputError, setInputError] = useState("");
  const [serverError, setServerError] = useState("");
  
  const[timeLeft,setTimeLeft] = useState(10 * 60);
  // verifyOtp
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState([
      "",
      "",
      "",
      "",
      "",
      "",
  ]);
  // for timer
  useEffect(() => {
    if(timeLeft <= 0) return;
    const  timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    },1000);
    return () => clearInterval(timer);
  },[timeLeft]);
  const formatTime = () => {
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setInputError("");
    setServerError("");

    const enteredOtp = otp.join("");

    // Check OTP length
    if (enteredOtp.length !== 6) {
      setInputError("Please enter complete OTP");
      return;
    }

    const data = {
      email: email,
      otp: enteredOtp,
    };

    try {
      const response = await axiosInstance.post(
        "/auth/verify-otp",
        data
      );

      console.log(response.data);
       // Clear OTP
       setOtp(["", "", "", "", "", ""]);
      navigate("/reset-password",{
        state:{
          email: email,
        },
      });

    } catch (error) {
      setServerError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };
  // handleResendOTP
  const handleResendOtp = async() => {
    if(timeLeft > 0) return;
    setInputError("");
    setServerError("");
    try{
      const response = await axiosInstance.post(
        "/auth/forgot-password",
        {
          email: email,
        }
      );
      console.log(response.data);
      // start a new 10 minutes timer
      setTimeLeft(10*60);
      setOtp(["", "", "", "", "", ""])
    }catch(error){
      setServerError(
        error.response?.data?.message ||
        "something went wrong. Please try again."
      );
    }
  };

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
        <div className="w-full max-w-[440px] rounded-3xl border border-white/70 bg-white/95 p-8 shadow-2xl backdrop-blur-md sm:p-10">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-8 w-8 text-green-600" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#111957]">
              Verify Your Email
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#667085]">
              We've sent a 6-digit code to
              <br />

              <span className="font-semibold text-[#182052]">
                {email}
              </span>
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleVerify} className="mt-8">

            <p className="mb-3 text-center text-sm font-semibold text-[#182052]">
              Enter verification code
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => (inputRefs.current[index] = element)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers
                    if (!/^\d?$/.test(value)) {
                      return;
                    }
                    const newOtp = [...otp];
                    newOtp[index] = e.target.value;
                    setOtp(newOtp);
                    // Move to the next input after entering a digit
                    if (value && index < 5) {
                      inputRefs.current[index + 1]?.focus();
                    }
                    setInputError("");
                    setServerError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      inputRefs.current[index - 1]?.focus();
                    }
                  }}
                  

                  className="h-12 w-11 rounded-xl border border-[#cfd2e3] bg-white text-center text-lg font-bold text-[#182052] outline-none transition focus:border-[#7045ed] focus:ring-2 focus:ring-purple-100 sm:h-14 sm:w-12"
                />
              ))}
            </div>
            {/* Input Error */}
            {inputError && (
              <div className="mt-3 flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-2.5">
                <p className="text-sm font-medium text-red-600">
                  {inputError}
                </p>
              </div>
            )}

            {/* Server Error */}
            {serverError && (
              <div className="mt-3 flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-2.5">
                <p className="text-sm font-medium text-red-600">
                  {serverError}
                </p>
              </div>
            )}

            {/* Timer */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#667085]">
              <Clock className="h-4 w-4" />

              Code expires in

              <span className="font-bold text-[#7045ed]">
                {formatTime()}
              </span>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7045ed] to-[#8549e8] py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5"
            >
              Verify OTP

              <ArrowRight className="h-4 w-4" />
            </button>

          </form>

          {/* Resend */}
          <div className="mt-6 text-center text-sm text-[#667085]">
            Didn't receive the code?

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={timeLeft > 0}
              className={`ml-1 font-semibold ${
                timeLeft > 0
                  ? "cursor-not-allowed text-gray-400"
                  : "text-[#7045ed] hover:text-[#5932d1]"
              }`}
            >
              Resend OTP
            </button>
          </div>

          {/* Back */}
          <NavLink to ="/forgot-password"
            type="button"
            className="mx-auto mt-5 flex items-center justify-center gap-2 text-sm font-medium text-[#7045ed] transition hover:text-[#5932d1] "
          >
            <ArrowLeft className="h-4 w-4" />

            Back to change email
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;