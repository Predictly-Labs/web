"use client";

import { motion } from "framer-motion";

export const About = () => {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div>
          <motion.div
            className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Predictly
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Predictly <span className="text-blue-500">redefines</span>{" "}
            prediction market
            <br />
            that <span className="text-gray-500">empowers</span> professionals
            and enthusiasts alike
            <br />
            to embrace the{" "}
            <span className="text-blue-500">future of predictions</span>.
          </motion.h2>

          <motion.div
            className="text-right max-w-xs ml-auto mt-12"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-px bg-gray-300 mb-3"></div>
            <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
              Enjoy the ease experience with us
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
