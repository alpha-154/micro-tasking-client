import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-serif py-2 md:py-3 w-full">
      <Navbar />
      <main className="container-style overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
