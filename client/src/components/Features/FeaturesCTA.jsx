import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import giftImage from "../../assets/features/gift.png";
import {NavLink} from 'react-router-dom'
function FeaturesCTA() {
  return (
    <section className="bg-white px-6 py-12 sm:px-8 lg:px-10">

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F1EAFF] via-[#F8F5FF] to-[#EEF5FF] shadow-[0_20px_60px_rgba(88,32,199,0.10)]">

        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl" />

        <div className="relative flex flex-col items-center justify-between gap-6 px-8 py-10 md:flex-row md:px-14">

          <div className="max-w-xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow-sm">
              <Sparkles
                size={14}
                className="text-[#5820C7]"
                fill="currentColor"
              />

              <span className="text-xs font-bold text-[#5820C7]">
                Ready to make birthdays better?
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black text-[#10194A] sm:text-4xl">
              Never Miss a Special Day Again
            </h2>

            <p className="mt-3 text-sm text-[#64748B]">
              Join thousands of users who never forget an important birthday.
            </p>

            <NavLink to="/signup" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5820C7] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4B1BAE]">
              Create Your Free Account
              <ArrowRight size={17} />
            </NavLink>

          </div>

          <div className="shrink-0">

            <img
              src={giftImage}
              alt="Birthday gifts"
              className="w-[200px] object-contain drop-shadow-[0_20px_25px_rgba(80,30,150,0.15)] sm:w-[250px]"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default FeaturesCTA;