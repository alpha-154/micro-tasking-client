import React from "react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/shared/Footer";

const DashboardLayout = ({ role }) => (
  <div className="flex justify-start gap-16">
    <div className="min-h-screen max-w-[16rem]">
      <Sidebar role={role} />
    </div>
    <div className="flex flex-col gap-5 w-full flex-1 mt-8">
      <Header />
      <main>
        <Outlet />
      </main>
      {/* add footer */}
    </div>
  </div>
);

export default DashboardLayout;
