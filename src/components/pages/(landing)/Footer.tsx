"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative bg-white py-6">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl lg:text-8xl xl:text-[20rem] font-medium text-gray-900 tracking-tight">
            Predictly
          </h2>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Predictly. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};