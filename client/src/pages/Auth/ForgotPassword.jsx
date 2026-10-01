import React,{useState} from "react";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import axios from 'axios';
import {useNavigation} from 'react-router-dom';
import BirthdayBuddyIcon from "../../assets/home/BirthdayBuddyIcon.png";
import {NavLink,useNavigate} from "react-router-dom";
const ForgotPassword = () => {
  const[email,setEmail] = useState("");
  const[emailError,setEmailError] = useState("");
  const[serverError,setServerError] = useState("");
  const navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();
      if(!email.trim()){
        setEmailError("Email is required");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        setEmailError("Please enter a valid email address");
        return;
      }
      setEmailError("");
      setServerError("");
      try{
        const response = await axios.post(
          "http://localhost:3000/api/auth/forgot-password",
          {email}
        );

        console.log(response.data);
        navigate("/verify-otp", {
            state: {
              email: email,
            },
        });
      }catch(error){
        setServerError(error.response?.data?.message || error.message||"Something went wrong");
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
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <Mail className="h-8 w-8 text-[#7045ed]" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#111957]">
              Forgot Password?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#667085]">
              No worries! Enter your registered email and we'll
              send you a verification code to reset your password.
            </p>
          </div>
          {serverError && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 shadow-sm">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                <span className="text-sm font-bold text-red-500">!</span>
              </div>

              <p className="text-sm font-medium text-red-600">
                {serverError}
              </p>
            </div>
          )}

          {/* Form */}
          <form  onSubmit={handleSubmit} className="mt-8">

            {/* Email Label */}
            <label className="mb-2 block text-sm font-semibold text-[#182052]">
              Email Address
            </label>

            {/* Email Input */}
            <div className="flex items-center rounded-xl border border-[#d8d9e8] bg-white px-4 transition focus-within:border-[#7045ed]">
              <Mail className="mr-3 h-5 w-5 text-[#8c91aa]" />

              <input
                type="email"
                placeholder="your@gmail.com"
                value={email}
                className="w-full border-none bg-transparent py-3.5 text-sm text-[#182052] outline-none placeholder:text-[#a5a8b8]"
                onChange={(e) =>{
                  setEmail(e.target.value);
                  setEmailError("");
                  setServerError("");
                  
                }}
              />
            </div>
            {emailError && (
                <p className="text-red-500 text-sm mt-1">
                  {emailError}
                </p>
            )}

            {/* Send OTP Button */}
            <button
              type = "submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7045ed] to-[#8549e8] py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"

            >
              Send OTP

              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Back to Login */}
          <NavLink to="/login"
            type="button"
            className="mx-auto mt-7 flex items-center justify-center gap-2 text-sm font-medium text-[#7045ed] transition hover:text-[#5932d1]"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;