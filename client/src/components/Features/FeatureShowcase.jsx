import React from "react";

import {
  Bell,
  Users,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import reminderImage from "../../assets/features/reminder.png";
import whatsappImage from "../../assets/features/whatsapp.png";
import contactsImage from "../../assets/features/contacts.png";
import calendarImage from "../../assets/features/calendar.png";
import messagesImage from "../../assets/features/messages.png";
import securityImage from "../../assets/features/security.png";

const showcaseData = [
  {
    badge: "Never Miss a Date",
    title: "Automatic Birthday Reminders",
    description:
      "Get timely notifications and reminders so you're always prepared to wish your loved ones on their special day.",
    icon: Bell,
    image: reminderImage,
    reverse: false,
    points: [
      "Customizable reminder timing (1, 3, 7 days before)",
      "Email and in-app notifications",
      "Never miss an important birthday again",
    ],
  },

  {
    badge: "Send Wishes Instantly",
    title: "WhatsApp Integration",
    description:
      "Send personalized birthday messages directly through WhatsApp with just one click. Save time and make your wishes more special.",
    icon: FaWhatsapp,
    image: whatsappImage,
    reverse: true,
    points: [
      "One-click WhatsApp sharing",
      "Pre-written message templates",
      "Works on mobile and desktop",
    ],
  },

  {
    badge: "Keep Everyone Organized",
    title: "Contact Management",
    description:
      "Easily add, edit and organize all your important contacts and their birthdays in one place.",
    icon: Users,
    image: contactsImage,
    reverse: false,
    points: [
      "Add name, phone number and date of birth",
      "Edit or delete contacts anytime",
      "Import contacts easily",
    ],
  },

  {
    badge: "See Upcoming Birthdays",
    title: "Smart Birthday Calendar",
    description:
      "Stay organized with a clear and beautiful calendar view. See all upcoming birthdays at a glance.",
    icon: CalendarDays,
    image: calendarImage,
    reverse: true,
    points: [
      "Monthly and list view",
      "Color-coded upcoming birthdays",
      "Never miss a special date",
    ],
  },

  {
    badge: "Make It Special",
    title: "Personalized Birthday Messages",
    description:
      "Choose from a variety of message templates or create your own personalized wishes to make their day even more special.",
    icon: Sparkles,
    image: messagesImage,
    reverse: false,
    points: [
      "Ready-to-use message templates",
      "Create and save your own messages",
      "Share meaningful and thoughtful wishes",
    ],
  },

  {
    badge: "Your Data Stays Safe",
    title: "Privacy & Security",
    description:
      "Your personal information is important. We ensure your contact details and birthday data stay safe and secure.",
    icon: ShieldCheck,
    image: securityImage,
    reverse: true,
    points: [
      "Secure data storage",
      "Your data is never shared",
      "You stay in control of your information",
    ],
  },
];

function FeatureShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#FCFBFF] py-12 sm:py-20">

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="space-y-16 sm:space-y-24">

          {showcaseData.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  feature.reverse ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >

                <div className="relative">

                  <div className="absolute inset-10 rounded-full bg-violet-200/30 blur-3xl" />

                  <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#F1EBFF] via-[#F8F5FF] to-[#EEF4FF] p-4 shadow-[0_20px_50px_rgba(65,35,130,0.10)] sm:p-6">

                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="relative z-10 w-full object-contain drop-shadow-[0_20px_25px_rgba(50,30,100,0.12)] transition-transform duration-500 hover:scale-[1.03]"
                    />

                  </div>

                </div>

                <div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5">

                    <Icon
                      size={14}
                      className="text-[#5820C7]"
                    />

                    <span className="text-[11px] font-bold text-[#5820C7]">
                      {feature.badge}
                    </span>

                  </div>

                  <h2 className="mt-4 text-3xl font-black tracking-tight text-[#10194A] sm:text-4xl">
                    {feature.title}
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-[#64748B] sm:text-base">
                    {feature.description}
                  </p>

                  <div className="mt-5 space-y-3">

                    {feature.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-[#5820C7]"
                          fill="#5820C7"
                          stroke="white"
                        />

                        <span className="text-sm text-[#526078]">
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

export default FeatureShowcase;