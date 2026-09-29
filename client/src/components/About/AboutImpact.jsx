
import React from "react";
import {
  Users,
  CalendarDays,
  Heart,
  Star,
  Sparkles,
} from "lucide-react";

import aboutImpact from "../../assets/about/aboutImpact.png";

function AboutImpact() {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Happy Users",
      color: "#7C3AED",
      bg: "from-[#F3EEFF] to-[#E9D5FF]",
    },
    {
      icon: CalendarDays,
      value: "50K+",
      label: "Birthdays Tracked",
      color: "#F59E0B",
      bg: "from-[#FFF8E7] to-[#FEF3C7]",
    },
    {
      icon: Heart,
      value: "4.9/5",
      label: "User Rating",
      color: "#EC4899",
      bg: "from-[#FFF1F8] to-[#FCE7F3]",
    },
    {
      icon: Star,
      value: "100%",
      label: "Data Secure",
      color: "#F59E0B",
      bg: "from-[#FFF8E7] to-[#FEF3C7]",
    },
  ];

  return (
    <section className="px-6 py-10 sm:px-8 lg:px-10">

      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">

        <div className="relative flex justify-center">

          <div className="absolute h-64 w-64 rounded-full bg-[#DDD6FE]/30 blur-3xl" />

          <img
            src={aboutImpact}
            alt="BirthBuddy impact"
            className="relative z-10 max-h-[330px] w-full object-contain drop-shadow-[0_25px_35px_rgba(88,32,199,0.15)]"
          />

        </div>

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EEFF] px-3 py-1.5 text-xs font-semibold text-[#6938EF]">
            <Sparkles size={13} fill="#F59E0B" />
            Our Impact
          </div>

          <h2 className="mt-3 text-3xl font-black leading-tight">
            Making Birthdays Brighter, Together
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#526078]">
            Join thousands of users who are already creating happier
            moments with BirthBuddy.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.value}
                  className="group rounded-xl border border-[#E9E5F1] bg-white p-3 shadow-[0_8px_20px_rgba(35,20,80,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${item.bg}`}
                  >

                    <Icon
                      size={18}
                      style={{ color: item.color }}
                      fill={item.color}
                    />

                  </div>

                  <p className="mt-2 text-lg font-black text-[#5820C7]">
                    {item.value}
                  </p>

                  <p className="text-[9px] text-[#64748B]">
                    {item.label}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutImpact;