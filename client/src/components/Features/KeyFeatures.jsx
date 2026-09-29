import React from "react";

import {
  Bell,
  Users,
  Sparkles,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const features = [
  {
    icon: Bell,
    title: "Automatic Birthday Reminders",
    description:
      "Receive timely reminders before someone's birthday so you never forget an important date.",
    color: "#F43F5E",
    bg: "bg-rose-50",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp Integration",
    description:
      "Quickly send birthday wishes through WhatsApp with one simple action.",
    color: "#16A34A",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Keep birthdays, names, phone numbers and important details organized in one place.",
    color: "#0284C7",
    bg: "bg-sky-50",
  },
  {
    icon: Sparkles,
    title: "Personalized Messages",
    description:
      "Create unique and thoughtful birthday messages instead of sending the same generic wish.",
    color: "#F59E0B",
    bg: "bg-amber-50",
  },
  {
    icon: CalendarDays,
    title: "Smart Birthday Calendar",
    description:
      "View upcoming birthdays in an easy-to-understand calendar and list view.",
    color: "#7C3AED",
    bg: "bg-violet-50",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    description:
      "Your personal contact and birthday information stays protected and private.",
    color: "#EC4899",
    bg: "bg-pink-50",
  },
];

function KeyFeatures() {
  return (
    <section className="relative bg-white py-16 sm:py-20">

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2">
            <Sparkles
              size={14}
              className="text-[#5820C7]"
              fill="currentColor"
            />

            <span className="text-xs font-bold text-[#5820C7]">
              Our Key Features
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#10194A] sm:text-4xl">
            Powerful Features for a More Connected You
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
            Everything you need to remember, celebrate and stay connected
            with the people who matter most.
          </p>

        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-[#ECEAF4] bg-white p-5 shadow-[0_8px_25px_rgba(40,25,90,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-100 hover:shadow-[0_18px_40px_rgba(88,32,199,0.12)]"
              >

                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${feature.bg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon
                    size={28}
                    style={{ color: feature.color }}
                  />
                </div>

                <div>

                  <h3 className="text-sm font-extrabold leading-5 text-[#10194A] sm:text-base">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-[#64748B]">
                    {feature.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default KeyFeatures;