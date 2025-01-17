import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Hero from "@/components/customComponents/Hero";
import TopWorkersSection from "@/components/customComponents/TopWorkers";
import TestimonialSection from "@/components/customComponents/Testimonials";
import HowItWorks from "@/components/customComponents/HowItWorks";
import WhyChooseUs from "@/components/customComponents/WhyChooseUs";
import JobApply from "@/components/customComponents/JobApply";

const HomePage = () => {
  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "Home - MicroTask";
  }, []);

  // State initialized from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Update theme based on state
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-start p-4 mt-2 md:mb-4">
       
      </div>
      <Hero />
      <TopWorkersSection />
      <JobApply />
      <WhyChooseUs />
      <HowItWorks />

      <TestimonialSection />
    </div>
  );
};

export default HomePage;
