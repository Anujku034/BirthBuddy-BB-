import React from "react";
import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 h-[64px] border-b border-[#eceef5] bg-white/95 backdrop-blur-md">

      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SEARCH BAR
        ===================================================== */}

        <div className="relative w-full max-w-[300px]">

          <Search
            size={15}
            strokeWidth={2}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7e879d]"
          />

          <input
            type="text"
            placeholder="Search people, birthdays..."
            className="h-[36px] w-full rounded-[7px] border border-[#e1e4ec] bg-white pl-9 pr-3 text-[10px] font-medium text-[#3c455e] outline-none transition-all placeholder:text-[#8b94a8] focus:border-[#8060ef] focus:ring-2 focus:ring-[#8060ef]/10"
          />

        </div>


        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-3">

          {/* Notification */}

          <button
            type="button"
            className="relative flex h-[35px] w-[35px] items-center justify-center rounded-full text-[#525d76] transition hover:bg-[#f4f1ff] hover:text-[#6338ef]"
          >

            <Bell
              size={18}
              strokeWidth={2}
            />

            {/* Notification dot */}

            <span className="absolute right-[8px] top-[6px] h-[6px] w-[6px] rounded-full border-[1.5px] border-white bg-[#ef405b]" />

          </button>


          {/* Divider */}

          <div className="h-[30px] w-px bg-[#e7e9f0]" />


          {/* =================================================
              PROFILE
          ================================================= */}

          <button
            type="button"
            className="group flex items-center gap-2 rounded-[9px] px-2 py-1 transition hover:bg-[#f7f5ff]"
          >

            {/* Avatar */}

            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br from-[#77839b] to-[#526078] text-[12px] font-bold text-white shadow-sm">
              A
            </div>


            {/* Name */}

            <span className="hidden text-[11px] font-bold text-[#252c45] sm:block">
              Anuj Kumar
            </span>


            {/* Arrow */}

            <ChevronDown
              size={14}
              strokeWidth={2}
              className="text-[#6f7890] transition-transform duration-200 group-hover:text-[#6338ef]"
            />

          </button>

        </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;