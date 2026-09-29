import React from "react";
import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";

import heroImage from "../../assets/how-it-works/howItWorksHero.png";
import {NavLink} from "react-router-dom";
function HowItWorksHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF8FF] via-white to-[#F4F0FF]">

      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl" />

      <div className="mx-auto grid min-h-[570px] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-10">

        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 shadow-sm">

            <Sparkles
              size={15}
              className="text-[#5820C7]"
              fill="currentColor"
            />

            <span className="text-xs font-bold text-[#5820C7]">
              Simple & Powerful
            </span>

          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-[#10194A] sm:text-5xl lg:text-[54px]">

            Birthdays Made

            <br />

            <span className="bg-gradient-to-r from-[#5820C7] via-[#6938EF] to-[#A855F7] bg-clip-text text-transparent">
              Simple & Stress-Free
            </span>

          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#64748B] sm:text-base">
            Add your loved ones, let BirthBuddy remember their special days,
            and send beautiful wishes with just a few clicks.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <NavLink to="/signup" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5820C7] to-[#6938EF] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(88,32,199,0.35)]">

              Get Started Free

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />

            </NavLink>

            <button className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#7044ED] bg-white px-6 py-3.5 text-sm font-bold text-[#5820C7] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F5FF]">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5820C7] text-white">
                <Play size={12} fill="white" />
              </span>

              Watch How It Works

            </button>

          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">

            {[
              "Add contacts",
              "Get reminders",
              "Send wishes",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2"
              >
                <CheckCircle2
                  size={17}
                  className="text-[#5820C7]"
                  fill="#5820C7"
                  stroke="white"
                />

                <span className="text-xs font-medium text-[#526078]">
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div className="relative flex items-center justify-center">

          <div className="absolute h-[390px] w-[390px] rounded-full bg-purple-200/30 blur-3xl" />

          <div className="absolute h-[350px] w-[350px] rounded-full border border-white bg-white/30 shadow-[0_20px_70px_rgba(88,32,199,0.08)] backdrop-blur-sm" />

          <div className="relative z-10 [transform:perspective(1100px)_rotateY(-4deg)_rotateX(2deg)] transition-all duration-500 hover:[transform:perspective(1100px)_rotateY(0deg)_rotateX(0deg)]">

            <img
              src={heroImage}
              alt="How BirthBuddy works"
              className="w-full max-w-[570px] object-contain drop-shadow-[0_30px_35px_rgba(60,30,120,0.18)]"
            />

          </div>

          <div className="absolute left-0 top-16 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-[0_15px_35px_rgba(40,25,90,0.12)] backdrop-blur-xl">

            <p className="text-[10px] font-semibold text-slate-400">
              Step 01
            </p>

            <p className="text-xs font-bold text-[#10194A]">
              Add your contacts
            </p>

          </div>

          <div className="absolute bottom-16 right-0 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-[0_15px_35px_rgba(40,25,90,0.12)] backdrop-blur-xl">

            <p className="text-[10px] font-semibold text-slate-400">
              Step 03
            </p>

            <p className="text-xs font-bold text-[#10194A]">
              Send birthday wishes 🎉
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HowItWorksHero;