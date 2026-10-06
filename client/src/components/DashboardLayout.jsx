import React, { useContext } from "react";
import Sidebar from "./Dashboard/Sidebar.jsx";
import Navbar from "./Dashboard/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function DashboardLayout() {
  const { authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8ff]">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[278px] lg:block">
        <Sidebar />
      </aside>

      {/* ================= NAVBAR ================= */}
      <header className="fixed left-0 right-0 top-0 z-40 lg:left-[278px]">
        <Navbar />
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="min-h-screen pt-[64px] lg:ml-[278px]">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;