import React from "react";
import { ArrowRight, Gift, Sparkles } from "lucide-react";

import pricingCTA from "../../assets/pricing/pricingCTA.png";
import {NavLink} from 'react-router-dom'
function PricingCTA() {
  return (
    <section className="bg-white px-6 py-8 sm:px-8 lg:px-10">

      <div className="relative mx-auto flex min-h-[145px] max-w-7xl items-center justify-between overflow-hidden rounded-[28px] bg-gradient-to-r from-[#F1E9FF] via-[#F8F4FF] to-[#EEE8FF] px-6 shadow-[0_15px_35px_rgba(88,32,199,0.08)] sm:px-10">

        {/* Glow */}
        <div className="absolute left-1/3 top-0 h-full w-64 rounded-full bg-white/40 blur-3xl" />

        {/* LEFT IMAGE */}
        <div className="relative z-10 hidden w-[220px] md:block">

          <img
            src={pricingCTA}
            alt="Birthday celebration"
            className="w-full object-contain drop-shadow-[0_18px_25px_rgba(50,30,100,0.15)]"
          />

        </div>

        {/* CENTER */}
        <div className="relative z-10 flex-1 text-center">

          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 shadow-sm">

            <Sparkles
              size={12}
              className="text-[#F59E0B]"
              fill="#F59E0B"
            />

            <span className="text-[9px] font-bold text-[#5820C7]">
              Make every birthday special
            </span>

          </div>

          <h2 className="text-2xl font-black text-[#10194A] sm:text-3xl">
            Start Making Birthdays Special
          </h2>

          <p className="mt-1 text-xs text-[#64748B]">
            Join thousands of users who never miss a special day.
          </p>

          <NavLink to="/signup" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5820C7] to-[#6938EF] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(88,32,199,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(88,32,199,0.38)]">

            Get Started Free

            <ArrowRight size={16} />

          </NavLink>

        </div>

      </div>

    </section>
  );
}

export default PricingCTA;