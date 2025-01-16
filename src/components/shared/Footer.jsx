import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { SlSocialLinkedin } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";

export default function Footer() {
  return (
    <footer className="bg-navBg dark:bg-background dark:text-primary text-muted-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">
              MicroTask - Empowering Your Gig Economy Journey
            </h2>
            <p className="text-sm">
              MicroTask connects buyers with skilled workers worldwide. Whether
              you're outsourcing small tasks or earning extra income, MicroTask
              makes the process seamless and efficient.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:underline">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Submit Work
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Earn Rewards
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:info@microtask.com" className="hover:underline">
                  info@microtask.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+11234567890" className="hover:underline">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
            <div className="flex justify-start items-center gap-2">
              <SlSocialLinkedin className="w-5 h-5 text-neutral-950 dark:text-white" />
              <TiSocialFacebook className="w-7 h-7 text-neutral-950 dark:text-white" />
            </div>
          </div>
        </div>
        <div className="border-t border-muted-foreground/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} MicroTask Solutions. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
