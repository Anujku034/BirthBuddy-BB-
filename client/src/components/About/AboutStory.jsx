import React from "react";
import { Gift } from "lucide-react";

import aboutStory1 from "../../assets/about/aboutStory1.png";
import aboutStory2 from "../../assets/about/aboutStory2.png";
import aboutStory3 from "../../assets/about/aboutStory3.png";

function AboutStory() {
  return (
    <section className="relative px-6 py-10 sm:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4EEFF] px-3 py-1.5 text-xs font-semibold text-[#6938EF]">
            <Gift size={13} fill="#EC4899" />
            Our Story
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#10194A]">
            From a Simple Idea to BirthBuddy
          </h2>

          <p className="mt-2 text-sm text-[#526078]">
            A journey driven by the belief that small gestures can create
            meaningful moments.
          </p>

        </div>

        <div className="relative mt-10">

          <div className="absolute left-[16%] right-[16%] top-1/2 hidden h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#C4B5FD] via-[#6938EF] to-[#C4B5FD] lg:block" />

          <div className="grid items-center gap-8 lg:grid-cols-3">

            {/* 01 */}
            <div className="relative flex items-center gap-4">

              <img
                src={aboutStory1}
                alt="The Problem"
                className="h-40 w-40 object-contain drop-shadow-[0_15px_25px_rgba(88,32,199,0.15)]"
              />

              <div className="relative z-10 rounded-2xl border border-[#E9D5FF] bg-gradient-to-br from-white to-[#FAF7FF] p-5 shadow-[0_15px_35px_rgba(88,32,199,0.08)]">

                <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6938EF] text-xs font-bold text-white shadow-lg">
                  01
                </span>

                <h3 className="mt-2 text-base font-black">
                  The Problem
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#526078]">
                  Important birthdays are easy to forget. Life gets busy,
                  and it's hard to keep track of everyone's special day.
                </p>

              </div>

            </div>

            {/* 02 */}
            <div className="relative flex items-center gap-4">

              <div className="relative z-10 rounded-2xl border border-[#FBCFE8] bg-gradient-to-br from-white to-[#FFF7FC] p-5 shadow-[0_15px_35px_rgba(236,72,153,0.08)]">

                <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#EC4899] to-[#F472B6] text-xs font-bold text-white shadow-lg">
                  02
                </span>

                <h3 className="mt-2 text-base font-black">
                  The Idea
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#526078]">
                  What if remembering birthdays could be effortless?
                  We wanted to create a simple and reliable solution.
                </p>

              </div>

              <img
                src={aboutStory2}
                alt="The Idea"
                className="h-40 w-40 object-contain drop-shadow-[0_15px_25px_rgba(236,72,153,0.15)]"
              />

            </div>

            {/* 03 */}
            <div className="relative flex items-center gap-4">

              <img
                src={aboutStory3}
                alt="BirthBuddy"
                className="h-40 w-40 object-contain drop-shadow-[0_15px_25px_rgba(88,32,199,0.15)]"
              />

              <div className="relative z-10 rounded-2xl border border-[#DDD6FE] bg-gradient-to-br from-white to-[#F8F5FF] p-5 shadow-[0_15px_35px_rgba(88,32,199,0.08)]">

                <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#6938EF] to-[#8B5CF6] text-xs font-bold text-white shadow-lg">
                  03
                </span>

                <h3 className="mt-2 text-base font-black">
                  BirthBuddy
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#526078]">
                  A simple platform that helps people remember and celebrate
                  the birthdays that matter most.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutStory;