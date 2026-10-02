import React,{useState,useContext} from "react";
import { Mail, Lock, Eye, ArrowRight, Gift, CalendarDays, Heart, Users } from "lucide-react";
import axios from 'axios';
import {NavLink,useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext.jsx";
import axiosInstance from "../api/axiosInstance";
const Login = () => {
const navigate = useNavigate();
const { setAccessToken,setUser } = useContext(AuthContext);
  // for field can't be empty error
 const[emailerror,setEmailError] = useState("");
 const[passworderror,setPasswordError] = useState("");
 const[isclicked,setIsClicked] = useState(false);
 // managing state
 const[email,setEmail] = useState("");
 const[password,setPassword] = useState("");
 const[isticked,setIsTicked] = useState(false);
 // for serverError state
 const[servererror, setServerError] = useState("");
 // for successResponse
 const[successresponse, setSucessResponse] = useState("");
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
 async function handlelogin(){
  // if email/password is not correct format.
  // if email/password field is empty.
  
  let hasError = false;
  if(email.trim() === ""){
    setEmailError("Email is required");
    hasError = true;
  }
  else{
    setEmailError("");
  }
  if(password === ""){
    setPasswordError("Password is required");
    hasError = true;
  }
  else{
    setPasswordError("");
  }
  if(!isticked){
    hasError = true;
  }
  if(hasError){
    return;
  }
  // is all input field is entered/ ticked by the user.
  try{
    const response = await axiosInstance.post("auth/login",
      {
        email: email.trim(),
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    // access token
    const accessToken = response.data.accessToken;
    setAccessToken(accessToken);
    // SUCCESS RESPONSE
    setSucessResponse(
      response.data.message || "Login successful"
    );
    
    setUser(response.data.user.fullName)
    setTimeout(() => {
      
      navigate("/dashboard",{
        state:{
          user: response.data.user.fullName,
        }
      });
    }, 1500);
  }
  catch(error){
    // SERVER ERROR RESPONSE
    console.log(error);
    setServerError(
      error.response?.data?.message ||
      "Something went wrong. Please try again later."
    );

  }
  // now we can send the request to the backed
  // after request we wait for the response and then behave accordingly


 }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7fb] via-white to-[#f1f5ff] flex items-center justify-center p-4 sm:p-6">

      {/* Main Container */}
      <div className="w-full max-w-7xl min-h-[700px] grid lg:grid-cols-2 overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-xl shadow-[0_25px_80px_rgba(30,41,59,0.12)] border border-white">

        {/* ================= LEFT SECTION ================= */}
        <section className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 xl:p-16 bg-gradient-to-br from-[#fff7fb] via-[#f8f5ff] to-[#eef7ff]">

          {/* Decorative circles */}
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl" />
          <div className="absolute -bottom-40 left-1/4 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl" />

          {/* Decorative dots */}
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
              Small reminders. Brighter relationships.
            </p>

            <h2 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight text-slate-900">
              Stay Close
              <br />
              to the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                People
              </span>
              <br />
              Who Matter
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-500">
              Remember birthdays, get timely reminders, and never miss
              a special moment with the people you love.
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
                    Smart Reminders
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Get timely notifications before important days.
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
                    Organize Easily
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Keep all birthdays in one beautiful place.
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
                    Strengthen Bonds
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Make your loved ones feel special.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10 text-sm text-slate-400">
            © 2026 BirthBuddy. Celebrate every special moment.
          </div>

          {/* Bottom decorative waves */}
          <div className="absolute -bottom-32 -left-20 w-[650px] h-56 bg-gradient-to-r from-purple-300/40 to-pink-300/40 rounded-[50%] rotate-[-5deg]" />

        </section>

        {/* ================= RIGHT SECTION ================= */}
        <section className="relative flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-white">

          {/* Soft background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />

          {/* Login Card */}
          <div className="relative z-10 w-full max-w-md">

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">
                Welcome Back 👋
              </h2>

              <p className="mt-3 text-slate-500 leading-6">
                Login to your BirthBuddy account and continue
                celebrating together.
              </p>
            </div>
            {/*for sucess response*/}
            {successresponse && (
              <p className="text-sm font-semibold text-green-600 bg-green-50 border border-green-200 px-4 py-3 rounded-xl text-center shadow-sm">
                {successresponse}
              </p>
            )}
            {/*for server error*/} 
            {servererror && (
              <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-2xl text-center shadow-md">
                {servererror}
              </p>
            )}
            {/* Form */}
            <div className="space-y-5">

              {/* Email */}
              <div>
                <label className="block mb-2 mt-2 text-sm font-semibold text-slate-800">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input 
                    type="email" 
                    value={email} 
                    placeholder="Enter your email address" 
                    className={`w-full h-14 pl-12 pr-4 rounded-2xl bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all ${
                      emailerror && isclicked
                        ? "border-2 border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border border-slate-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                    }`}
                    onChange={(e) => { 
                      setEmail(e.target.value); 
                      setEmailError(""); 
                      setServerError("");
                    }} 
                  />
                </div>
                 
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-800">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                 <input 
                    type="password" 
                    value={password} 
                    placeholder="Enter your password" 
                    className={`w-full h-14 pl-12 pr-4 rounded-2xl bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all ${
                      passworderror && isclicked
                        ? "border-2 border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border border-slate-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                    }`}
                    onChange={(e) => { 
                      setPassword(e.target.value); 
                      setPasswordError(""); 
                      setServerError("");
                    }} 
                  />

                  <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition" />
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isticked}
                    className="w-4 h-4 accent-pink-500 cursor-pointer"
                    onChange={(e) => {
                      setIsTicked(e.target.checked);
                    }}
                  />

                  <span className="text-sm text-slate-600">
                    Keep me signed in
                  </span>
                </label>
                <NavLink to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-pink-500 transition">
                  Forgot password?
                </NavLink>

              </div>
              {!isticked && isclicked && (
                  <>
                    <p className="text-sm text-red-500">
                      Please select "Keep me signed in".
                    </p>
                  </>
                )}

              {/* Login Button */}
              <button className="group w-full h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
              onClick={() => {
                setIsClicked(true);
                handlelogin();
              }}
              >

                Login

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

              </button>

            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Or continue with
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">

              <button className="h-13 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition">
                <span className="text-lg font-bold text-blue-500">G</span>
                Google
              </button>

              <button className="h-13 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition">
                <span className="text-lg">●</span>
                GitHub
              </button>

            </div>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
             <NavLink
                to="/signup"
                className="
                    inline-flex items-center justify-center
                    px-6 py-2.5
                    rounded-xl
                    font-semibold
                    text-white
                    bg-gradient-to-r from-pink-500 to-rose-500
                    border border-transparent
                    shadow-[0_6px_20px_rgba(236,72,153,0.20)]
                    hover:from-pink-600
                    hover:to-rose-600
                    hover:shadow-[0_10px_28px_rgba(236,72,153,0.30)]
                    hover:-translate-y-0.5
                    active:scale-95
                    transition-all duration-300
                "
                >
                Sign Up
           </NavLink>
            </p>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Login;