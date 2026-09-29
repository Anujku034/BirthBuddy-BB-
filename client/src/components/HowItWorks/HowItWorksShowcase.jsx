import React from "react";

import {
  UserPlus,
  CalendarDays,
  Bell,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import addContactImage from "../../assets/how-it-works/addcontact.png";
import reminderImage from "../../assets/how-it-works/reminder.png";
import wishImage from "../../assets/how-it-works/sendWish.png";
import { FaWhatsapp } from "react-icons/fa";
const sections = [
  {
    badge: "Step 01",
    title: "Add Everyone Who Matters",
    description:
      "Start by adding the people whose birthdays you never want to forget. Save their name, phone number and birthday in a few seconds.",
    icon: UserPlus,
    image: addContactImage,
    reverse: false,
    points: [
      "Add name and date of birth",
      "Save phone number",
      "Edit contacts anytime",
    ],
  },
  {
    badge: "Step 02",
    title: "Let BirthBuddy Remember",
    description:
      "Once your contacts are saved, BirthBuddy keeps track of their birthdays and sends reminders before the special day arrives.",
    icon: Bell,
    image: reminderImage,
    reverse: true,
    points: [
      "Automatic birthday tracking",
      "Custom reminder timing",
      "Never miss an important date",
    ],
  },
  {
    badge: "Step 03",
    title: "Send a Meaningful Wish",
    description:
      "When the birthday arrives, choose a message or create your own and send it directly through WhatsApp.",
    icon: FaWhatsapp,
    image: wishImage,
    reverse: false,
    points: [
      "Ready-to-use templates",
      "Personalized messages",
      "One-click WhatsApp sharing",
    ],
  },
];

function HowItWorksShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9FF] py-20">

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="space-y-24">

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  section.reverse
                    ? "lg:[&>div:first-child]:order-2"
                    : ""
                }`}
              >

                <div className="relative">

                  <div className="absolute inset-10 rounded-full bg-violet-200/30 blur-3xl" />

                  <div className="relative overflow-hidden rounded-[32px] border border-white bg-gradient-to-br from-[#F0EAFF] via-[#F8F5FF] to-[#EDF5FF] p-5 shadow-[0_25px_60px_rgba(55,30,120,0.10)] sm:p-7">

                    <img
                      src={section.image}
                      alt={section.title}
                      className="relative z-10 w-full object-contain drop-shadow-[0_20px_30px_rgba(50,30,100,0.12)] transition-transform duration-500 hover:scale-[1.03]"
                    />

                  </div>

                </div>

                <div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5">

                    <Icon
                      size={14}
                      className="text-[#5820C7]"
                    />

                    <span className="text-[11px] font-bold text-[#5820C7]">
                      {section.badge}
                    </span>

                  </div>

                  <h2 className="mt-5 text-3xl font-black tracking-tight text-[#10194A] sm:text-4xl">
                    {section.title}
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#64748B] sm:text-base">
                    {section.description}
                  </p>

                  <div className="mt-6 space-y-3">

                    {section.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2.5"
                      >

                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-[#5820C7]"
                          fill="#5820C7"
                          stroke="white"
                        />

                        <span className="text-sm font-medium text-[#526078]">
                          {point}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default HowItWorksShowcase;