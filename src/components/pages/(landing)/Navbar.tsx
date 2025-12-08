"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
  const handleNavClick = (section: string) => {
    console.log(`Navigate to ${section}`);
  };

  const handleLaunchApp = () => {
    console.log("Launch App clicked");
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 bg-white rounded-2xl px-6 my-4">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo/logo.png"
              alt="Predictly Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-xl font-medium text-gray-900">Predictly</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick("features")}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("faq")}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              FAQ
            </button>
            <Link href="/app/dashboard">
              <button
                onClick={handleLaunchApp}
                className="bg-black text-white px-6 py-2 rounded-2xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Launch App
              </button>
            </Link>
          </div>

          <button className="md:hidden flex items-center justify-center w-8 h-8">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
