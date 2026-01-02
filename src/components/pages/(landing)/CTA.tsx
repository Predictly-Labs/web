"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="bg-gray-50 p-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="relative bg-gray-50 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0">
            <Image
              src="/assets/landing/cta/bg-cta-2.png"
              alt="bg-cta"
              fill
              className="object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="relative z-10 p-10">
            <div className="flex flex-col items-center text-center">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready for predicting the market with your friends?
              </motion.h2>

              <motion.p 
                className="font-medium text-white mb-8 max-w-lg leading-relaxed drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Join Predictly today and start making accurate predictions while
                having fun with your friends.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button 
                  className="px-6 py-3 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                  animate={{ 
                    opacity: [1, 0.8, 1],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Launch App
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
