import React from "react";
import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";

import heroImage from "../../assets/features/featuresHero.png";
import {NavLink} from 'react-router-dom';
function FeaturesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF8FF] via-white to-[#F5F1FF]">

      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl" />

      <div className="mx-auto grid min-h-[560px] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-10">

        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 shadow-sm">
            <Sparkles
              size={15}
              className="text-[#5820C7]"
              fill="currentColor"
            />

            <span className="text-xs font-bold text-[#5820C7]">
              Powerful Features
            </span>
          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-[#10194A] sm:text-5xl lg:text-[52px]">

            Everything You Need

            <br />

            <span className="bg-gradient-to-r from-[#5820C7] via-[#6938EF] to-[#A855F7] bg-clip-text text-transparent">
              to Never Miss a Birthday
            </span>

          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-[#64748B] sm:text-base">
            BirthBuddy takes care of the remembering, so you can focus on
            making people feel special.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            <NavLink to="/signup" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5820C7] to-[#6938EF] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(88,32,199,0.35)]">

              Get Started Free

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />

            </NavLink>

            <button className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#7044ED] bg-white px-6 py-3 text-sm font-bold text-[#5820C7] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F5FF]">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5820C7] text-white">
                <Play size={12} fill="white" />
              </span>

              Explore Features

            </button>

          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">

            {[
              "Simple to use",
              "Personalized",
              "Always on time",
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

          <div className="absolute h-[380px] w-[380px] rounded-full bg-purple-200/30 blur-3xl" />

          <div className="relative z-10 [transform:perspective(1000px)_rotateY(-3deg)] transition-all duration-500 hover:[transform:perspective(1000px)_rotateY(0deg)]">

            <img
              src={heroImage}
              alt="BirthBuddy features"
              className="w-full max-w-[570px] object-contain drop-shadow-[0_30px_35px_rgba(60,30,120,0.18)]"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default FeaturesHero;