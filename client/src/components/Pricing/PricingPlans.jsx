import React from "react";
import {
  Check,
  Crown,
  Gift,
  Users,
  Sparkles,
} from "lucide-react";

function PricingPlans() {
  return (
    <section className="relative bg-white px-6 py-8 sm:px-8 lg:px-10">

      {/* SVG Gradients */}
      <svg
        width="0"
        height="0"
        className="absolute"
        aria-hidden="true"
      >
        <defs>

          {/* Gift Gradient */}
          <linearGradient
            id="giftGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="25%" stopColor="#38BDF8" />
            <stop offset="55%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Crown Gradient */}
          <linearGradient
            id="crownGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFF7AE" />
            <stop offset="20%" stopColor="#FFE45C" />
            <stop offset="45%" stopColor="#FFC107" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Users Gradient */}
          <linearGradient
            id="usersGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="25%" stopColor="#8B5CF6" />
            <stop offset="55%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>

        </defs>
      </svg>

      {/* Background Glow */}
      <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#E9D5FF]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">

        {/* ================================================= */}
        {/* FREE */}
        {/* ================================================= */}

        <div className="group relative rounded-2xl border border-[#E9E5F1] bg-white p-6 shadow-[0_12px_35px_rgba(35,20,80,0.07)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(50,30,110,0.14)]">

          {/* Icon Area */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">

            {/* Outer Glow */}
            <div className="absolute inset-1 rounded-full bg-sky-400/25 blur-xl transition-all duration-500 group-hover:bg-sky-400/40 group-hover:blur-2xl" />

            {/* 3D Circle */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/80 bg-gradient-to-br from-[#E0F7FF] via-[#D9F1FF] to-[#BFDBFE] shadow-[inset_0_3px_8px_rgba(255,255,255,0.95),inset_0_-5px_10px_rgba(37,99,235,0.10),0_10px_25px_rgba(14,165,233,0.20)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">

              {/* Icon */}
              <Gift
                size={34}
                strokeWidth={1.8}
                className="relative z-10 text-[#0284C7] drop-shadow-[0_4px_5px_rgba(3,105,161,0.35)]"
                fill="url(#giftGradient)"
              />

              {/* Shine */}
              <span className="absolute left-4 top-3 h-2 w-2 rounded-full bg-white/90 shadow-[0_0_10px_3px_rgba(255,255,255,0.8)]" />

            </div>

            {/* Tiny Spark */}
            <Sparkles
              size={12}
              className="absolute right-0 top-1 text-sky-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125"
              fill="#7DD3FC"
            />

          </div>

          <h3 className="mt-2 text-center text-xl font-black text-[#10194A]">
            Free
          </h3>

          <p className="mt-1 text-center text-sm text-[#64748B]">
            Perfect for getting started
          </p>

          <div className="mt-3 text-center">
            <span className="text-[38px] font-black tracking-tight text-[#10194A]">
              ₹0
            </span>

            <span className="ml-1 text-sm text-[#64748B]">
              / month
            </span>
          </div>

          <div className="mt-6 space-y-3">

            {[
              "Up to 25 contacts",
              "Birthday reminders",
              "Birthday calendar",
              "Basic message templates",
              "WhatsApp sharing",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5"
              >
                <Check
                  size={15}
                  className="rounded-full bg-[#16B364] p-[2px] text-white shadow-[0_2px_6px_rgba(22,179,100,0.25)]"
                  strokeWidth={4}
                />

                <span className="text-sm text-[#526078]">
                  {item}
                </span>
              </div>
            ))}

          </div>

          <button className="mt-7 w-full rounded-lg border border-[#6938EF] bg-white py-2.5 text-sm font-bold text-[#5820C7] shadow-sm transition-all duration-300 hover:bg-[#F5F1FF] hover:shadow-md">
            Get Started
          </button>

        </div>


        {/* ================================================= */}
        {/* PREMIUM */}
        {/* ================================================= */}

        <div className="group relative rounded-2xl border-2 border-[#6938EF] bg-gradient-to-b from-[#FCFAFF] to-white p-6 shadow-[0_20px_50px_rgba(88,32,199,0.16)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_65px_rgba(88,32,199,0.22)]">

          {/* Popular Badge */}
          <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-[#5820C7] to-[#7C3AED] px-4 py-1.5 text-[11px] font-bold text-white shadow-[0_8px_20px_rgba(88,32,199,0.30)]">

            <Crown
              size={13}
              fill="#FDE68A"
              className="text-yellow-300 drop-shadow-[0_0_4px_rgba(253,230,138,0.8)]"
            />

            Most Popular

          </div>


          {/* Premium Icon */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">

            {/* Golden Glow */}
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-xl transition-all duration-500 group-hover:bg-yellow-400/50 group-hover:blur-2xl" />

            {/* Outer Glow Ring */}
            <div className="absolute h-[70px] w-[70px] rounded-full border border-yellow-300/40 shadow-[0_0_25px_rgba(245,158,11,0.30)]" />

            {/* 3D Circle */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/90 bg-gradient-to-br from-[#FFFDEB] via-[#FFF0B3] to-[#FDE68A] shadow-[inset_0_3px_10px_rgba(255,255,255,0.95),inset_0_-6px_12px_rgba(217,119,6,0.14),0_12px_30px_rgba(245,158,11,0.28)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-2">

              <Crown
                size={37}
                strokeWidth={1.7}
                className="relative z-10 text-[#D97706] drop-shadow-[0_4px_5px_rgba(146,64,14,0.40)]"
                fill="url(#crownGradient)"
              />

              {/* Crown Shine */}
              <span className="absolute left-3 top-2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.9)]" />

              <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]" />

            </div>

            {/* Sparkles */}
            <Sparkles
              size={13}
              className="absolute -right-1 top-0 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)] transition-all duration-500 group-hover:rotate-12 group-hover:scale-125"
              fill="#FACC15"
            />

            <Sparkles
              size={10}
              className="absolute -left-1 bottom-2 text-orange-300 opacity-70"
              fill="#FDBA74"
            />

          </div>


          <h3 className="mt-2 text-center text-xl font-black text-[#10194A]">
            Premium
          </h3>

          <p className="mt-1 text-center text-sm text-[#64748B]">
            For individuals who want more
          </p>

          <div className="mt-3 text-center">

            <span className="text-[38px] font-black tracking-tight text-[#10194A]">
              ₹99
            </span>

            <span className="ml-1 text-sm text-[#64748B]">
              / month
            </span>

          </div>

          <div className="mt-6 space-y-3">

            {[
              "Unlimited contacts",
              "Automatic reminders",
              "Personalized messages",
              "WhatsApp integration",
              "Custom reminder schedules",
              "Multiple message templates",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5"
              >
                <Check
                  size={15}
                  className="rounded-full bg-[#16B364] p-[2px] text-white shadow-[0_2px_6px_rgba(22,179,100,0.25)]"
                  strokeWidth={4}
                />

                <span className="text-sm text-[#526078]">
                  {item}
                </span>
              </div>
            ))}

          </div>

          <button className="mt-7 w-full rounded-lg bg-gradient-to-r from-[#5820C7] to-[#6938EF] py-2.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(88,32,199,0.35)]">
            Start Premium
          </button>

        </div>


        {/* ================================================= */}
        {/* FAMILY */}
        {/* ================================================= */}

        <div className="group relative rounded-2xl border border-[#E9E5F1] bg-white p-6 shadow-[0_12px_35px_rgba(35,20,80,0.07)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(50,30,110,0.14)]">

          {/* Family Icon */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">

            {/* Purple Glow */}
            <div className="absolute inset-1 rounded-full bg-violet-500/25 blur-xl transition-all duration-500 group-hover:bg-violet-500/40 group-hover:blur-2xl" />

            {/* Outer Ring */}
            <div className="absolute h-[70px] w-[70px] rounded-full border border-violet-300/30 shadow-[0_0_25px_rgba(124,58,237,0.18)]" />

            {/* 3D Circle */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/90 bg-gradient-to-br from-[#F3EEFF] via-[#E9DFFF] to-[#DDD6FE] shadow-[inset_0_3px_9px_rgba(255,255,255,0.95),inset_0_-6px_12px_rgba(109,40,217,0.12),0_12px_28px_rgba(124,58,237,0.20)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-2">

              <Users
                size={34}
                strokeWidth={1.7}
                className="relative z-10 text-[#6D28D9] drop-shadow-[0_4px_5px_rgba(76,29,149,0.35)]"
                fill="url(#usersGradient)"
              />

              {/* White Shine */}
              <span className="absolute left-3 top-2 h-2 w-2 rounded-full bg-white/90 shadow-[0_0_10px_3px_rgba(255,255,255,0.8)]" />

            </div>

            {/* Spark */}
            <Sparkles
              size={12}
              className="absolute right-0 top-1 text-violet-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125"
              fill="#A78BFA"
            />

          </div>


          <h3 className="mt-2 text-center text-xl font-black text-[#10194A]">
            Family
          </h3>

          <p className="mt-1 text-center text-sm text-[#64748B]">
            For families who stay connected
          </p>

          <div className="mt-3 text-center">

            <span className="text-[38px] font-black tracking-tight text-[#10194A]">
              ₹199
            </span>

            <span className="ml-1 text-sm text-[#64748B]">
              / month
            </span>

          </div>

          <div className="mt-6 space-y-3">

            {[
              "Everything in Premium",
              "Multiple family members",
              "Shared birthday list",
              "Advanced reminders",
              "Priority support",
              "Early access to new features",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5"
              >
                <Check
                  size={15}
                  className="rounded-full bg-[#16B364] p-[2px] text-white shadow-[0_2px_6px_rgba(22,179,100,0.25)]"
                  strokeWidth={4}
                />

                <span className="text-sm text-[#526078]">
                  {item}
                </span>
              </div>
            ))}

          </div>

          <button className="mt-7 w-full rounded-lg border border-[#6938EF] bg-white py-2.5 text-sm font-bold text-[#5820C7] shadow-sm transition-all duration-300 hover:bg-[#F5F1FF] hover:shadow-md">
            Choose Family
          </button>

        </div>

      </div>

    </section>
  );
}

export default PricingPlans;