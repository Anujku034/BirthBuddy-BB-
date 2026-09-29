import React from "react";
import birthdayImg from "../../assets/home/BirthdayBuddyIcon.png";

function AboutFooter() {
  return (
    <footer className="px-6 pb-6 pt-5 sm:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        <div className="grid gap-8 border-b border-[#E9E5F1] pb-6 md:grid-cols-4">

          <div>

            <div className="flex items-center gap-2">

              <img
                src={birthdayImg}
                alt="BirthBuddy"
                className="h-9 w-9 object-contain"
              />

              <span className="text-xl font-black">
                Birth<span className="text-[#5820C7]">Buddy</span>
              </span>

            </div>

            <p className="mt-2 max-w-[190px] text-xs leading-5 text-[#64748B]">
              Making birthdays brighter,
              <br />
              one reminder at a time.
            </p>

          </div>

          <div>

            <h4 className="text-sm font-black">
              Product
            </h4>

            <div className="mt-3 space-y-2 text-xs text-[#64748B]">

              <p className="cursor-pointer hover:text-[#5820C7]">
                Features
              </p>

              <p className="cursor-pointer hover:text-[#5820C7]">
                How It Works
              </p>

              <p className="cursor-pointer hover:text-[#5820C7]">
                Pricing
              </p>

            </div>

          </div>

          <div>

            <h4 className="text-sm font-black">
              Company
            </h4>

            <div className="mt-3 space-y-2 text-xs text-[#64748B]">

              <p className="cursor-pointer hover:text-[#5820C7]">
                About
              </p>

              <p className="cursor-pointer hover:text-[#5820C7]">
                Privacy Policy
              </p>

              <p className="cursor-pointer hover:text-[#5820C7]">
                Terms of Service
              </p>

            </div>

          </div>

          <div>

            <h4 className="text-sm font-black">
              Connect
            </h4>

            <div className="mt-4 flex items-center gap-4 text-sm font-bold text-[#10194A]">

              <span className="cursor-pointer transition hover:-translate-y-1 hover:text-[#5820C7]">
                𝕏
              </span>

              <span className="cursor-pointer transition hover:-translate-y-1 hover:text-[#5820C7]">
                f
              </span>

              <span className="cursor-pointer transition hover:-translate-y-1 hover:text-[#5820C7]">
                ◎
              </span>

              <span className="cursor-pointer transition hover:-translate-y-1 hover:text-[#5820C7]">
                in
              </span>

              <span className="cursor-pointer transition hover:-translate-y-1 hover:text-[#5820C7]">
                ▶
              </span>

            </div>

          </div>

        </div>

        <div className="flex flex-col justify-between gap-3 pt-4 text-[11px] text-[#64748B] sm:flex-row">

          <p>
            © 2026 BirthBuddy. All rights reserved.
          </p>

          <div className="flex gap-5">

            <span className="cursor-pointer hover:text-[#5820C7]">
              Privacy
            </span>

            <span>|</span>

            <span className="cursor-pointer hover:text-[#5820C7]">
              Terms
            </span>

            <span>|</span>

            <span className="cursor-pointer hover:text-[#5820C7]">
              Contact
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default AboutFooter;