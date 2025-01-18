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
    <div className="w-full mt-10">
      <div className="w-full flex justify-start">
        <Header 
        username="Sarah Wilson"
        role="Premium Member"
        coins={750}
        avatarUrl="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800"
        />
      </div>
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  </div>
);

export default DashboardLayout;
