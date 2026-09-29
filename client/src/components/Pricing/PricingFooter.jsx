import React from "react";

import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import birthdayBuddyIcon from "../../assets/home/BirthdayBuddyIcon.png";

function PricingFooter() {
  return (
    <footer className="border-t border-[#ECEAF4] bg-white">

      <div className="mx-auto max-w-7xl px-6 pb-5 pt-8 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-2">

              <img
                src={birthdayBuddyIcon}
                alt="BirthBuddy"
                className="h-10 w-10 object-contain"
              />

              <h2 className="text-xl font-black tracking-tight text-[#10194A]">
                Birth<span className="text-[#5820C7]">Buddy</span>
              </h2>

            </div>

            <p className="mt-2 max-w-[200px] text-xs leading-5 text-[#64748B]">
              Making birthdays brighter,
              <br />
              one reminder at a time.
            </p>

          </div>

          {/* PRODUCT */}

          <div>

            <h3 className="text-sm font-black text-[#10194A]">
              Product
            </h3>

            <div className="mt-3 space-y-2">

              <p className="cursor-pointer text-xs text-[#64748B] transition hover:text-[#5820C7]">
                Features
              </p>

              <p className="cursor-pointer text-xs text-[#64748B] transition hover:text-[#5820C7]">
                How It Works
              </p>

              <p className="cursor-pointer text-xs text-[#64748B] transition hover:text-[#5820C7]">
                Pricing
              </p>

            </div>

          </div>

          {/* COMPANY */}

          <div>

            <h3 className="text-sm font-black text-[#10194A]">
              Company
            </h3>

            <div className="mt-3 space-y-2">

              <p className="cursor-pointer text-xs text-[#64748B] transition hover:text-[#5820C7]">
                About
              </p>

              <p className="cursor-pointer text-xs text-[#64748B] transition hover:text-[#5820C7]">
                Privacy Policy
              </p>

              <p className="cursor-pointer text-xs text-[#64748B] transition hover:text-[#5820C7]">
                Terms of Service
              </p>

            </div>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="text-sm font-black text-[#10194A]">
              Connect
            </h3>

            <div className="mt-3 flex gap-2">

              {[FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map(
                (Icon, index) => (

                  <button
                    key={index}
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#10194A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F1ECFF] hover:text-[#5820C7] hover:shadow-sm"
                  >
                    <Icon size={13} />
                  </button>

                )
              )}

            </div>

          </div>

        </div>

        {/* COPYRIGHT */}

        <div className="mt-7 flex flex-col justify-between gap-3 border-t border-[#ECEAF4] pt-4 text-[11px] text-[#64748B] sm:flex-row">

          <p>
            © 2026 BirthBuddy. All rights reserved.
          </p>

          <div className="flex gap-6">

            <span className="cursor-pointer hover:text-[#5820C7]">
              Privacy
            </span>

            <span className="cursor-pointer hover:text-[#5820C7]">
              Terms
            </span>

            <span className="cursor-pointer hover:text-[#5820C7]">
              Contact
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default PricingFooter;