import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import {NavLink} from "react-router-dom";
function HowItWorksCTA() {
  return (
    <section className="bg-white px-6 py-14 sm:px-8 lg:px-10">

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F0E9FF] via-[#F8F5FF] to-[#EEF5FF] px-8 py-12 text-center shadow-[0_20px_60px_rgba(88,32,199,0.10)] sm:px-12">

        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">

            <Sparkles
              size={15}
              className="text-[#5820C7]"
              fill="currentColor"
            />

            <span className="text-xs font-bold text-[#5820C7]">
              Start Today
            </span>

          </div>

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black tracking-tight text-[#10194A] sm:text-4xl">
            Ready to Never Forget a Birthday Again?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
            Let BirthBuddy handle the remembering while you focus on making
            people feel special.
          </p>

          <NavLink to="/signup" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#5820C7] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4B1BAE] hover:shadow-[0_18px_35px_rgba(88,32,199,0.35)]">

            Create Your Free Account

            <ArrowRight size={17} />

          </NavLink>

        </div>

      </div>

    </section>
  );
}

export default HowItWorksCTA;