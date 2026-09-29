import React from "react";

import backgroundImg from "../../assets/home/HomebgImg.png";
import foregroundImg from "../../assets/home/HomeforegroundImg.png";
import birthdaybuddyicon from "../../assets/home/BirthdayBuddyIcon.png";
import homeWhatsappImg from "../../assets/home/HomeWhatsappImg.png";
import homegiftImg from "../../assets/home/HomegiftImg.png";
import homeBirthdayImg from "../../assets/home/HomeBirthdayImg.png";
import {NavLink} from "react-router-dom";
import {
  Play,
  Bell,
  Users,
  Sparkles,
  Shield,
  UserPlus,
  BellRing,
  ArrowRight,
  CalendarDays,
  Heart,
  Gift,
  Cake,
  Star,
} from "lucide-react";

import {
  FaWhatsapp,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function HeroSection() {
  const features = [
    {
      icon: Bell,
      color: "#F43F5E",
      bg: "bg-rose-50",
      title: "Smart Reminders",
      description:
        "Get perfectly timed birthday reminders before every special day.",
    },
    {
      icon: Users,
      color: "#1597E5",
      bg: "bg-sky-50",
      title: "Easy Contacts",
      description:
        "Keep friends, family and loved ones organized in one beautiful place.",
    },
    {
      icon: Sparkles,
      color: "#FFAA00",
      bg: "bg-amber-50",
      title: "Personal Wishes",
      description:
        "Create thoughtful birthday messages that feel truly personal.",
    },
    {
      icon: Shield,
      color: "#7C4DFF",
      bg: "bg-violet-50",
      title: "Private & Secure",
      description:
        "Your personal birthday information stays protected and private.",
    },
  ];

  const steps = [
    {
      icon: UserPlus,
      number: "01",
      color: "#7C3AED",
      bg: "bg-violet-100",
      title: "Add Your People",
      description:
        "Save birthdays of your friends, family and the people who matter.",
    },
    {
      icon: BellRing,
      number: "02",
      color: "#0284C7",
      bg: "bg-sky-100",
      title: "Get Reminded",
      description:
        "BirthBuddy keeps track of every important birthday for you.",
    },
    {
      icon: FaWhatsapp,
      number: "03",
      color: "#16A34A",
      bg: "bg-green-100",
      title: "Send a Wish",
      description:
        "Send a personalized birthday message through WhatsApp instantly.",
    },
  ];

  const stats = [
    ["10K+", "Happy Users"],
    ["50K+", "Birthdays Remembered"],
    ["100K+", "Wishes Sent"],
    ["99%", "Happy Connections"],
  ];

  return (
    <main className="w-full overflow-hidden bg-[#FCFBFF] text-[#10194A]">

      <section
        className="relative min-h-[680px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-300/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10 lg:py-0">

          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">

            <div className="relative z-20">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-[0_10px_30px_rgba(88,32,199,0.10)] backdrop-blur-xl">
                <span className="text-lg">🎉</span>
                <span className="text-sm font-semibold text-[#5820C7]">
                  Never miss a special day
                </span>
              </div>

              <h1 className="mt-7 max-w-[650px] text-[45px] font-black leading-[0.98] tracking-[-0.045em] text-[#111827] sm:text-[58px] lg:text-[64px]">
                Never Miss
                <br />
                <span className="bg-gradient-to-r from-[#5820C7] via-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">
                  A Birthday Again
                </span>
              </h1>

              <p className="mt-6 max-w-[570px] text-base leading-7 text-[#526078] sm:text-lg">
                BirthBuddy helps you remember the birthdays that matter most,
                stay connected with loved ones and send beautiful wishes
                without the stress.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                <NavLink to="/signup" className="group relative inline-flex h-13 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#5820C7] to-[#7C3AED] px-7 py-3.5 text-sm font-bold text-white shadow-[0_15px_35px_rgba(88,32,199,0.30)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(88,32,199,0.38)]">
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                  <span className="relative">Get Started</span>
                  <ArrowRight
                    size={18}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </NavLink>

                <button className="inline-flex h-13 items-center justify-center gap-3 rounded-2xl border border-[#DCD2FF] bg-white/80 px-5 py-3.5 text-sm font-bold text-[#37147F] shadow-[0_10px_30px_rgba(50,30,100,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#B9A6FF] hover:bg-white">

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5820C7] to-[#8B5CF6] shadow-md">
                    <Play
                      size={13}
                      fill="white"
                      className="ml-0.5 text-white"
                    />
                  </span>

                  See How It Works
                </button>

              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

                {["Simple", "Personal", "Always On Time"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5820C7] text-[10px] font-black text-white shadow-md">
                      ✓
                    </span>

                    <span className="text-sm font-medium text-[#596579]">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            <div className="relative flex min-h-[480px] items-center justify-center">

              <div className="absolute h-[360px] w-[360px] rounded-full bg-gradient-to-br from-purple-300/30 via-pink-200/20 to-blue-300/20 blur-2xl" />

              <div className="absolute h-[380px] w-[380px] rounded-full border border-white/60 bg-white/10 shadow-[inset_0_0_80px_rgba(255,255,255,0.5)] backdrop-blur-[2px]" />

              <div className="absolute left-[5%] top-[12%] flex h-14 w-14 rotate-[-12deg] items-center justify-center rounded-2xl border border-white/70 bg-white/75 text-[#5820C7] shadow-[0_15px_35px_rgba(88,32,199,0.16)] backdrop-blur-xl">
                <Cake size={25} />
              </div>

              <div className="absolute right-[7%] top-[18%] flex h-14 w-14 rotate-[12deg] items-center justify-center rounded-2xl border border-white/70 bg-white/75 text-[#F43F5E] shadow-[0_15px_35px_rgba(244,63,94,0.15)] backdrop-blur-xl">
                <Heart size={24} fill="currentColor" />
              </div>

              <div className="absolute bottom-[12%] left-[8%] flex h-14 w-14 rotate-[8deg] items-center justify-center rounded-2xl border border-white/70 bg-white/75 text-[#FFAA00] shadow-[0_15px_35px_rgba(255,170,0,0.15)] backdrop-blur-xl">
                <Gift size={24} />
              </div>

              <div className="absolute bottom-[14%] right-[8%] flex h-14 w-14 rotate-[-8deg] items-center justify-center rounded-2xl border border-white/70 bg-white/75 text-[#1597E5] shadow-[0_15px_35px_rgba(21,151,229,0.15)] backdrop-blur-xl">
                <CalendarDays size={24} />
              </div>

              <div className="absolute right-[3%] top-[43%] flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_15px_40px_rgba(30,20,80,0.12)] backdrop-blur-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-[#25D366]">
                  <FaWhatsapp size={17} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400">
                    Birthday wish
                  </p>
                  <p className="text-xs font-bold text-[#10194A]">
                    Sent successfully
                  </p>
                </div>
              </div>

              <div className="absolute left-[2%] top-[43%] flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_15px_40px_rgba(30,20,80,0.12)] backdrop-blur-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-[#7C3AED]">
                  <Bell size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400">
                    Reminder
                  </p>
                  <p className="text-xs font-bold text-[#10194A]">
                    Tomorrow · 10 AM
                  </p>
                </div>
              </div>

              <div className="relative z-10 w-full max-w-[610px] [transform:perspective(1200px)_rotateY(-3deg)_rotateX(2deg)] transition-transform duration-500 hover:[transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]">

                <div className="absolute inset-x-[12%] bottom-3 h-10 rounded-full bg-[#5820C7]/25 blur-2xl" />

                <img
                  src={foregroundImg}
                  alt="BirthBuddy birthday celebration"
                  className="relative w-full object-contain drop-shadow-[0_30px_35px_rgba(58,35,120,0.22)]"
                />

              </div>

            </div>

          </div>

        </div>
      </section>


      <section className="relative bg-white py-20">

        <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 shadow-sm">
              <Sparkles
                size={15}
                className="text-amber-500"
                fill="currentColor"
              />

              <span className="text-xs font-bold text-[#5820C7]">
                Why Choose BirthBuddy
              </span>
            </div>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight text-[#10194A] sm:text-4xl">
              Everything You Need to Remember Every Birthday
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
              Powerful features designed to make every special moment easier,
              warmer and more memorable.
            </p>

          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-[26px] border border-white bg-white p-7 shadow-[0_15px_45px_rgba(39,26,91,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(88,32,199,0.16)]"
                >

                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-100/50 blur-2xl transition-all duration-500 group-hover:scale-150" />

                  <div className="relative">

                    <div
                      className={`flex h-[70px] w-[70px] items-center justify-center rounded-[22px] ${feature.bg} shadow-inner transition-all duration-500 group-hover:rotate-3 group-hover:scale-110`}
                    >
                      <Icon
                        size={31}
                        style={{ color: feature.color }}
                        fill={
                          feature.icon === Sparkles || feature.icon === Shield
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </div>

                    <h3 className="mt-7 text-xl font-extrabold text-[#10194A]">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#64748B]">
                      {feature.description}
                    </p>

                    <div className="mt-6 h-1 w-10 rounded-full bg-gradient-to-r from-[#5820C7] to-[#A855F7] transition-all duration-500 group-hover:w-20" />

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      <section className="relative overflow-hidden bg-[#FAF9FF] py-20">

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="text-center">

            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2">
              <Sparkles size={15} className="text-[#5820C7]" />

              <span className="text-xs font-bold text-[#5820C7]">
                How It Works
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-black text-[#10194A] sm:text-4xl">
              Celebrate Without the Stress
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#64748B] sm:text-base">
              Three simple steps between you and stress-free birthday
              celebrations.
            </p>

          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">

            <div className="absolute left-[16%] right-[16%] top-8 hidden h-[2px] bg-gradient-to-r from-violet-200 via-purple-300 to-green-200 md:block" />

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative z-10 text-center"
                >

                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${step.bg} shadow-[0_10px_25px_rgba(50,30,100,0.10)] ring-8 ring-[#FAF9FF]`}
                  >
                    <Icon
                      size={27}
                      style={{ color: step.color }}
                    />
                  </div>

                  <div
                    className="mt-6 text-xs font-black tracking-[0.2em]"
                    style={{ color: step.color }}
                  >
                    STEP {step.number}
                  </div>

                  <h3 className="mt-2 text-xl font-extrabold text-[#10194A]">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-[#64748B]">
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      <section className="bg-white py-12 sm:py-16">

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="relative min-h-[380px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F4F0FF] via-[#F8F5FF] to-[#EEF5FF] shadow-[0_20px_60px_rgba(88,32,199,0.10)] md:min-h-[330px]">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-300/30 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />

            <div className="relative grid min-h-[380px] grid-cols-1 items-center md:min-h-[330px] md:grid-cols-2">

              <div className="p-8 sm:p-10 lg:p-14">

                <div className="inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">

                  <FaWhatsapp
                    size={19}
                    className="text-[#25D366]"
                  />

                  <span className="text-xs font-bold text-[#5820C7]">
                    WhatsApp Integration
                  </span>

                </div>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#10194A] sm:text-4xl">
                  Send Wishes With
                  <br />
                  <span className="text-[#5820C7]">
                    Just One Click
                  </span>
                </h2>

                <p className="mt-4 max-w-[450px] text-sm leading-6 text-[#64748B] sm:text-base">
                  Connect with WhatsApp and send beautiful personalized
                  birthday messages instantly.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5820C7] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4B1BAE]">
                  Explore Integration
                  <ArrowRight size={16} />
                </button>

              </div>

              <div className="flex h-full items-center justify-center px-5">

                <div className="relative">

                  <div className="absolute inset-10 rounded-full bg-green-300/20 blur-3xl" />

                  <img
                    src={homeWhatsappImg}
                    alt="BirthBuddy WhatsApp integration"
                    className="relative w-full max-w-[500px] object-contain drop-shadow-[0_25px_35px_rgba(50,30,100,0.15)]"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      <section className="relative overflow-hidden bg-[#FCFBFF] py-16">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-10 sm:grid-cols-4">

          {stats.map(([number, label]) => (
            <div
              key={label}
              className="group text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-[#5820C7] shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <Star size={20} fill="currentColor" />
              </div>

              <h3 className="text-3xl font-black tracking-tight text-[#5820C7] sm:text-4xl">
                {number}
              </h3>

              <p className="mt-2 text-xs font-semibold text-[#64748B] sm:text-sm">
                {label}
              </p>
            </div>
          ))}

        </div>

      </section>


      <section className="bg-white py-12">

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F3EEFF] via-[#F8F5FF] to-[#EEF5FF] shadow-[0_20px_60px_rgba(88,32,199,0.10)]">

            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-purple-300/30 blur-3xl" />

            <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-pink-300/20 blur-3xl" />

            <div className="relative flex flex-col items-center justify-between md:flex-row">

              <div className="flex w-full justify-center md:w-[28%]">
                <img
                  src={homegiftImg}
                  alt="Birthday gifts"
                  className="w-[190px] object-contain transition-transform duration-500 hover:-translate-y-2 hover:rotate-2 sm:w-[220px]"
                />
              </div>

              <div className="w-full px-6 py-8 text-center md:w-[44%] md:py-12">

                <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-[#5820C7] shadow-sm backdrop-blur-xl">
                  <Gift size={14} />
                  Make memories matter
                </div>

                <h2 className="mt-4 text-2xl font-black text-[#10194A] sm:text-3xl">
                  Make Every Birthday Special
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  Start remembering the people who matter today.
                </p>

                <NavLink to='/signup' className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#5820C7] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4B1BAE]">
                  Get Started Free
                  <ArrowRight size={16} />
                </NavLink>

              </div>

              <div className="flex w-full justify-center md:w-[28%]">
                <img
                  src={homeBirthdayImg}
                  alt="Birthday celebration"
                  className="w-[210px] object-contain transition-transform duration-500 hover:-translate-y-2 hover:-rotate-2 sm:w-[245px]"
                />
              </div>

            </div>

          </div>

        </div>
      </section>


      <footer className="border-t border-[#ECEAF4] bg-white">

        <div className="mx-auto max-w-7xl px-6 pb-6 pt-14 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

            <div>

              <div className="flex items-center gap-2.5">

                <img
                  src={birthdaybuddyicon}
                  alt="BirthBuddy"
                  className="h-11 w-11 object-contain"
                />

                <h2 className="text-xl font-black text-[#111827]">
                  Birth<span className="text-[#5820C7]">Buddy</span>
                </h2>

              </div>

              <p className="mt-4 max-w-[240px] text-sm leading-6 text-[#64748B]">
                Making birthdays brighter, one reminder at a time.
              </p>

            </div>


            <div>

              <h3 className="text-sm font-bold text-[#10194A]">
                Product
              </h3>

              <ul className="mt-5 space-y-3 text-sm text-[#64748B]">
                <li className="cursor-pointer transition-colors hover:text-[#5820C7]">
                  Features
                </li>
                <li className="cursor-pointer transition-colors hover:text-[#5820C7]">
                  How It Works
                </li>
                <li className="cursor-pointer transition-colors hover:text-[#5820C7]">
                  Pricing
                </li>
              </ul>

            </div>


            <div>

              <h3 className="text-sm font-bold text-[#10194A]">
                Company
              </h3>

              <ul className="mt-5 space-y-3 text-sm text-[#64748B]">
                <li className="cursor-pointer transition-colors hover:text-[#5820C7]">
                  About Us
                </li>
                <li className="cursor-pointer transition-colors hover:text-[#5820C7]">
                  Contact
                </li>
                <li className="cursor-pointer transition-colors hover:text-[#5820C7]">
                  Privacy Policy
                </li>
              </ul>

            </div>


            <div>

              <h3 className="text-sm font-bold text-[#10194A]">
                Follow Us
              </h3>

              <div className="mt-5 flex items-center gap-3">

                {[FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map(
                  (Icon, index) => (
                    <button
                      key={index}
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E6E3EF] bg-white text-[#475569] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D5C8FF] hover:bg-[#F4F0FF] hover:text-[#5820C7] hover:shadow-md"
                    >
                      <Icon size={15} />
                    </button>
                  )
                )}

              </div>

            </div>

          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-[#E7E9F0] pt-6 text-xs text-[#64748B] sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 BirthBuddy. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              <span className="cursor-pointer transition-colors hover:text-[#5820C7]">
                Privacy
              </span>

              <span className="cursor-pointer transition-colors hover:text-[#5820C7]">
                Terms
              </span>

              <span className="cursor-pointer transition-colors hover:text-[#5820C7]">
                Security
              </span>
            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}

export default HeroSection;