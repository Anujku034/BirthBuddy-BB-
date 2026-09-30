import React,{useContext} from "react";
import {
  Search,
  Bell,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import{Dropdown,DropdownItem} from 'flowbite-react';
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
function DashboardNavbar() {
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async() => {
    try{
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {withCredentials: true}
      );
      setAccessToken(null);
      navigate("/");

    }
    catch(error){
      console.log(error);
    }
  }
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
        <div className="flex items-center gap-2">
          {/*icon*/}
          <div className="flex justify-center items-center h-8 w-8 bg-black text-white rounded-full pb-0.5" >
            <p>A</p>
          </div>
          <Dropdown label="Anuj kumar" dismissOnClick={false} className="rounded-xl border border-[#e5e7eb] bg-white shadow-xl shadow-purple-100 text-[#3c455e] focus:outline-none focus:ring-0 focus:border-transparent">
            <DropdownItem
              icon={LogOut}
              className="group rounded-lg px-4 py-3 text-sm font-semibold text-[#ef405b] transition-all duration-200 hover:bg-red-50 hover:text-[#dc2649]"
              onClick={handleLogout}
            >
              <span className="flex items-center gap-2">
                Sign out
              </span>
            </DropdownItem>
          </Dropdown>
        </div>


          

      </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;