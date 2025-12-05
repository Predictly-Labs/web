"use client";
import Image from "next/image";

export default function CTASection() {
  return (
    <section className="bg-gray-50 p-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-gray-50 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/assets/landing/cta/bg-cta-2.png"
              alt="bg-cta"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="relative z-10 p-10">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                Ready for predicting the market with your friends?
              </h2>

              <p className="font-medium text-white mb-8 max-w-lg leading-relaxed drop-shadow-md">
                Join Predictly today and start making accurate predictions while
                having fun with your friends.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-3 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
                  Launch App
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
