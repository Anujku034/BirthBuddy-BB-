import React from "react";
import { Check, X, Heart } from "lucide-react";

import pricingSide from "../../assets/pricing/pricingSide.png";

function ComparePlans() {
  return (
    <section className="bg-[#FCFBFF] px-6 py-10 sm:px-8 lg:px-10">

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[1fr_250px]">

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-[#E8E4F0] bg-white shadow-[0_12px_30px_rgba(40,25,90,0.06)]">

          <div className="px-5 py-4">

            <h2 className="text-xl font-black text-[#10194A]">
              Compare Plans
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Find the perfect plan for your needs.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] border-collapse">

              <thead>

                <tr className="bg-[#F4F1FF]">

                  <th className="px-4 py-3 text-left text-xs font-bold text-[#10194A]">
                    Features
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-bold text-[#10194A]">
                    Free
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-bold text-[#10194A]">
                    Premium
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-bold text-[#10194A]">
                    Family
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-t border-[#EEF0F5]">
                  <td className="px-4 py-2.5 text-xs text-[#526078]">
                    👤 Number of contacts
                  </td>

                  <td className="text-center text-xs text-[#526078]">
                    Up to 25
                  </td>

                  <td className="text-center text-xs text-[#526078]">
                    Unlimited
                  </td>

                  <td className="text-center text-xs text-[#526078]">
                    Unlimited
                  </td>
                </tr>

                {[
                  ["🔔 Birthday reminders", true, true, true],
                  ["📅 Birthday calendar", true, true, true],
                  ["💬 Personalized messages", "Basic", "Advanced", "Advanced"],
                  ["🟢 WhatsApp sharing", true, true, true],
                  ["⏰ Custom reminder schedules", false, true, true],
                  ["📄 Multiple message templates", false, true, true],
                  ["👨‍👩‍👧 Shared birthday list", false, false, true],
                  ["🛟 Priority support", false, false, true],
                  ["⭐ Early access to new features", false, false, true],
                ].map((row) => (
                  <tr
                    key={row[0]}
                    className="border-t border-[#EEF0F5] transition-colors hover:bg-[#FAF8FF]"
                  >

                    <td className="px-4 py-2.5 text-xs text-[#526078]">
                      {row[0]}
                    </td>

                    {[row[1], row[2], row[3]].map((value, index) => (
                      <td
                        key={index}
                        className="px-4 py-2.5 text-center"
                      >

                        {value === true ? (
                          <Check
                            size={17}
                            className="mx-auto text-[#16B364]"
                            strokeWidth={3.5}
                          />
                        ) : value === false ? (
                          <X
                            size={15}
                            className="mx-auto text-slate-300"
                            strokeWidth={2}
                          />
                        ) : (
                          <span className="text-xs text-[#526078]">
                            {value}
                          </span>
                        )}

                      </td>
                    ))}

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* SIDE CARD */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F1EAFF] via-[#F8F5FF] to-[#EEE7FF] p-4 shadow-[0_15px_35px_rgba(88,32,199,0.08)]">

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-200/30 blur-2xl" />

          <img
            src={pricingSide}
            alt="BirthBuddy celebration"
            className="relative mx-auto w-full max-w-[220px] object-contain drop-shadow-[0_18px_25px_rgba(60,30,120,0.15)]"
          />

          <div className="relative rounded-xl border border-white/80 bg-white/90 p-4 shadow-[0_10px_25px_rgba(40,25,90,0.08)] backdrop-blur-md">

            <div className="flex items-center gap-2">

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 shadow-sm">
                <Heart
                  size={16}
                  className="text-pink-500"
                  fill="#EC4899"
                />
              </span>

              <h3 className="text-sm font-black text-[#10194A]">
                Still not sure?
              </h3>

            </div>

            <p className="mt-2 text-xs leading-5 text-[#64748B]">
              Start with the free plan and upgrade anytime. No hidden
              charges, no long-term commitments.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ComparePlans;