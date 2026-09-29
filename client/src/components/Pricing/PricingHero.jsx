import React from "react";
import { Gift, Sparkles, Check, ArrowRight } from "lucide-react";

import pricingHero from "../../assets/pricing/pricingHero.png";

function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF8FF] via-white to-[#F3EEFF]">

      {/* Background glow */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#C4B5FD]/25 blur-3xl" />

      <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full bg-[#F9A8D4]/20 blur-3xl" />

      <div className="absolute left-[42%] top-28 h-3 w-3 rounded-full bg-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.8)]" />

      <div className="absolute left-[47%] top-44 h-2 w-2 rounded-full bg-yellow-400" />

      <div className="mx-auto grid min-h-[430px] max-w-7xl grid-cols-1 items-center gap-8 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:px-10">

        {/* LEFT */}
        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5DDFB] bg-[#F3EEFF] px-4 py-2 shadow-[0_5px_18px_rgba(88,32,199,0.08)]">

            <Gift
              size={15}
              className="text-[#5820C7]"
              fill="#5820C7"
            />

            <span className="text-xs font-bold text-[#5820C7]">
              Simple Pricing
            </span>

          </div>

          <h1 className="mt-5 max-w-xl text-[42px] font-black leading-[1.04] tracking-[-1.8px] text-[#10194A] sm:text-5xl lg:text-[50px]">

            Choose the Way

            <br />

            <span className="bg-gradient-to-r from-[#5820C7] via-[#6938EF] to-[#A855F7] bg-clip-text text-transparent">
              You Want to Celebrate
            </span>

          </h1>

          <p className="mt-4 max-w-lg text-[14px] leading-6 text-[#64748B] sm:text-[15px]">
            Start free and upgrade whenever you need more.
            BirthBuddy helps you remember the people who matter
            with plans designed for everyone.
          </p>

          {/* Static billing selector */}
          <div className="mt-6 inline-flex items-center rounded-xl border border-[#E7E1F4] bg-white p-1 shadow-[0_8px_25px_rgba(50,30,100,0.10)]">

            <button className="rounded-lg bg-gradient-to-r from-[#5820C7] to-[#6938EF] px-8 py-2.5 text-sm font-bold text-white shadow-[0_5px_15px_rgba(88,32,199,0.30)]">
              Monthly
            </button>

            <button className="px-7 py-2.5 text-sm font-bold text-[#475569]">
              Yearly
            </button>

            <span className="mr-1 rounded-md bg-[#16B364] px-2 py-1 text-[10px] font-black text-white shadow-sm">
              Save 20%
            </span>

          </div>

          {/* Small benefits */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">

            <div className="flex items-center gap-1.5">
              <Check
                size={15}
                className="rounded-full bg-[#16B364] p-[2px] text-white"
                strokeWidth={4}
              />

              <span className="text-xs text-[#64748B]">
                No hidden charges
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Check
                size={15}
                className="rounded-full bg-[#16B364] p-[2px] text-white"
                strokeWidth={4}
              />

              <span className="text-xs text-[#64748B]">
                Cancel anytime
              </span>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex items-center justify-center">

          {/* Glow */}
          <div className="absolute h-[360px] w-[360px] rounded-full bg-[#C4B5FD]/25 blur-3xl" />

          {/* 3D platform */}
          <div className="absolute bottom-4 h-10 w-[330px] rounded-[50%] bg-[#DDD3FF]/40 blur-xl" />

          <div className="relative z-10 [transform:perspective(1000px)_rotateY(-4deg)_rotateX(2deg)] transition-all duration-500 hover:[transform:perspective(1000px)_rotateY(0deg)_rotateX(0deg)]">

            <img
              src={pricingHero}
              alt="BirthBuddy Pricing"
              className="w-full max-w-[560px] object-contain drop-shadow-[0_30px_35px_rgba(65,35,130,0.22)]"
            />

          </div>

          {/* Floating badge */}
          <div className="absolute left-2 top-16 z-20 hidden rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-[0_15px_35px_rgba(50,30,100,0.14)] backdrop-blur-xl sm:block">

            <div className="flex items-center gap-2">

              <Sparkles
                size={16}
                className="text-[#F59E0B]"
                fill="#F59E0B"
              />

              <div>
                <p className="text-[9px] font-semibold text-slate-400">
                  Plans for everyone
                </p>

                <p className="text-xs font-bold text-[#10194A]">
                  Start for ₹0
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default PricingHero;