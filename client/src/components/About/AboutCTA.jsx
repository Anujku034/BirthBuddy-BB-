import React from "react";
import { ArrowRight } from "lucide-react";

import aboutCTA from "../../assets/about/aboutCTAGift.png";
import {NavLink} from "react-router-dom"
function AboutCTA() {
  return (
    <section className="px-6 py-8 sm:px-8 lg:px-10">

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-gradient-to-r from-[#F4EEFF] via-[#FAF7FF] to-[#F3E8FF] px-8 py-7 shadow-[0_15px_40px_rgba(88,32,199,0.10)]">

        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#C084FC]/20 blur-2xl" />

        <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-[#F472B6]/20 blur-2xl" />

        <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">

          <div className="flex justify-center md:justify-start">

            <img
              src={aboutCTA}
              alt="Birthday gifts"
              className="h-28 w-full max-w-[250px] object-contain drop-shadow-[0_15px_20px_rgba(88,32,199,0.12)]"
            />

          </div>

          <div className="text-center">

            <h2 className="text-2xl font-black text-[#10194A]">
              Let's Make Every Birthday Special
            </h2>

            <p className="mt-1 text-sm text-[#526078]">
              Join thousands of users who never miss a special day.
            </p>

            <NavLink to="/signup" className="group mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#5820C7] to-[#6938EF] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(88,32,199,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(88,32,199,0.35)]">

              Get Started Free

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />

            </NavLink>

          </div>

          <div className="hidden justify-end md:flex">

            <img
              src={aboutCTA}
              alt=""
              className="h-28 w-full max-w-[250px] scale-x-[-1] object-contain opacity-90"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutCTA;