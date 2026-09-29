import React from "react";

import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import birthdayBuddyIcon from "../../assets/home/BirthdayBuddyIcon.png";

function FeaturesFooter() {
  return (
    <footer className="border-t border-[#ECEAF4] bg-white">

      <div className="mx-auto max-w-7xl px-6 pb-6 pt-12 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          <div>

            <div className="flex items-center gap-2">

              <img
                src={birthdayBuddyIcon}
                alt="BirthBuddy"
                className="h-10 w-10 object-contain"
              />

              <h2 className="text-xl font-black text-[#10194A]">
                Birth<span className="text-[#5820C7]">Buddy</span>
              </h2>

            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-[#64748B]">
              Making birthdays brighter, one reminder at a time.
            </p>

          </div>

          <div>

            <h3 className="text-sm font-bold text-[#10194A]">
              Product
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-[#64748B]">
              <li className="cursor-pointer hover:text-[#5820C7]">
                Features
              </li>

              <li className="cursor-pointer hover:text-[#5820C7]">
                How It Works
              </li>

              <li className="cursor-pointer hover:text-[#5820C7]">
                Pricing
              </li>
            </ul>

          </div>

          <div>

            <h3 className="text-sm font-bold text-[#10194A]">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-[#64748B]">
              <li className="cursor-pointer hover:text-[#5820C7]">
                About
              </li>

              <li className="cursor-pointer hover:text-[#5820C7]">
                Contact
              </li>

              <li className="cursor-pointer hover:text-[#5820C7]">
                Privacy Policy
              </li>
            </ul>

          </div>

          <div>

            <h3 className="text-sm font-bold text-[#10194A]">
              Connect
            </h3>

            <div className="mt-4 flex gap-3">

              {[FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E7E3F0] text-[#64748B] transition-all duration-300 hover:-translate-y-1 hover:border-[#D6C8FF] hover:bg-[#F5F1FF] hover:text-[#5820C7]"
                  >
                    <Icon size={14} />
                  </button>
                )
              )}

            </div>

          </div>

        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#ECEAF4] pt-5 text-xs text-[#64748B] sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 BirthBuddy. All rights reserved.
          </p>

          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-[#5820C7]">
              Privacy
            </span>

            <span className="cursor-pointer hover:text-[#5820C7]">
              Terms
            </span>

            <span className="cursor-pointer hover:text-[#5820C7]">
              Security
            </span>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default FeaturesFooter;