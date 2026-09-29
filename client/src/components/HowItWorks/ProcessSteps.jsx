import React from "react";

import {
  UserPlus,
  BellRing,
  MessageCircle,
  ArrowDown,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Add Your Contacts",
    description:
      "Add your friends, family and loved ones with their name, phone number and birthday.",
    color: "#7C3AED",
    bg: "bg-violet-100",
  },
  {
    number: "02",
    icon: BellRing,
    title: "Get Timely Reminders",
    description:
      "BirthBuddy automatically keeps track of upcoming birthdays and reminds you at the right time.",
    color: "#0284C7",
    bg: "bg-sky-100",
  },
  {
    number: "03",
    icon:  FaWhatsapp,
    title: "Send Beautiful Wishes",
    description:
      "Choose a personalized message and send your birthday wish through WhatsApp with one click.",
    color: "#16A34A",
    bg: "bg-green-100",
  },
];

function ProcessSteps() {
  return (
    <section className="relative overflow-hidden bg-white py-20">

      <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-100/40 blur-3xl" />

      <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-pink-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2">

            <span className="text-sm">✨</span>

            <span className="text-xs font-bold text-[#5820C7]">
              Three Simple Steps
            </span>

          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-[#10194A] sm:text-4xl">
            How BirthBuddy Works
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
            From adding a birthday to sending a wish, BirthBuddy handles the
            remembering for you.
          </p>

        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">

          <div className="absolute left-[18%] right-[18%] top-10 hidden h-[2px] bg-gradient-to-r from-violet-200 via-sky-200 to-green-200 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative z-10"
              >

                <div className="mx-auto flex max-w-[330px] flex-col items-center text-center">

                  <div
                    className={`relative flex h-20 w-20 items-center justify-center rounded-[26px] ${step.bg} shadow-[0_15px_35px_rgba(40,25,90,0.10)] ring-8 ring-white transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-3`}
                  >

                    <Icon
                      size={31}
                      style={{ color: step.color }}
                    />

                    <span
                      className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-black shadow-md"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>

                  </div>

                  <h3 className="mt-7 text-xl font-extrabold text-[#10194A]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#64748B]">
                    {step.description}
                  </p>

                  {index !== steps.length - 1 && (
                    <ArrowDown
                      size={20}
                      className="mt-6 text-violet-300 md:hidden"
                    />
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default ProcessSteps;