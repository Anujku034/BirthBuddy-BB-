import React from "react";
import { ArrowRight, Play } from "lucide-react";

import aboutHero from "../../assets/about/aboutHero.png";
import {NavLink} from 'react-router-dom'
function AboutHero() {
  return (
    <section className="relative min-h-[430px] overflow-hidden bg-gradient-to-br from-white via-[#FCFAFF] to-[#F7F1FF] px-6 sm:px-8 lg:px-10">

      <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-[#DDD6FE]/30 blur-2xl" />

      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#F0ABFC]/20 blur-3xl" />

      <div className="absolute left-1/2 top-20 h-40 w-40 -translate-x-1/2 rounded-full bg-[#C4B5FD]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 py-10 md:grid-cols-2">

        <div className="relative z-10">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E9D5FF] bg-[#F5F0FF] px-3.5 py-1.5 text-xs font-semibold text-[#5820C7] shadow-sm">
            <span>🎉</span>
            <span>Our Story</span>
          </div>

          <h1 className="max-w-xl text-4xl font-black leading-[1.04] tracking-tight text-[#10194A] sm:text-5xl">

            We Believe Small
            <br />

            Messages Create

            <br />

            <span className="bg-gradient-to-r from-[#5820C7] via-[#6938EF] to-[#A855F7] bg-clip-text text-transparent">
              Big Happiness
            </span>

          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-6 text-[#526078]">
            BirthBuddy was created with one simple idea:
            remembering someone's birthday is a small gesture
            that can make a big difference.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <NavLink to="/signup" className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#5820C7] to-[#6938EF] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(88,32,199,0.35)]">

              Get Started

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />

            </NavLink>

            <button className="flex items-center gap-2 rounded-lg border border-[#6938EF] bg-white px-6 py-3 text-sm font-bold text-[#5820C7] shadow-sm transition-all duration-300 hover:bg-[#F7F3FF] hover:shadow-md">

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6938EF] text-white">
                <Play size={10} fill="white" />
              </span>

              Explore Features

            </button>

          </div>

        </div>

        <div className="relative flex min-h-[330px] items-end justify-center">

          <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-[#C084FC]/20 blur-3xl" />

          <div className="absolute bottom-5 left-1/2 h-20 w-72 -translate-x-1/2 rounded-full bg-[#6938EF]/15 blur-2xl" />

          <img
            src={aboutHero}
            alt="BirthBuddy"
            className="relative z-10 max-h-[350px] w-full object-contain drop-shadow-[0_25px_35px_rgba(88,32,199,0.18)] transition-transform duration-500 hover:-translate-y-2"
          />

        </div>

      </div>
    </section>
  );
}

export default AboutHero;