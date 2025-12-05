"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { FaBolt, FaChartLine, FaShieldAlt } from "react-icons/fa";

const CoinLogo = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    width={40}
    height={40}
    className="object-contain rounded-full"
  />
);

export const Oracles = () => {
  return (
    <section className="relative min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 flex items-center justify-center gap-4">
              Powered by
              <Image
                src="/assets/logo/pyth-logo.png"
                alt="Pyth Network"
                width={60}
                height={60}
                className="object-contain"
              />
              <span className="font-bold">Pyth Oracles</span>
            </h2>
            <div className="relative w-full">
              <div className="absolute right-0 w-45 h-0.5 bg-gray-900 rounded-full"></div>
              <div className="absolute left-0 w-45 h-0.5 bg-gray-900 rounded-full"></div>
              <div className="w-full h-px bg-gray-200"></div>
            </div>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto px-4 leading-relaxed font-light mt-5">
            Real-time data feeds from the most trusted oracle networks in Web3.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div
            className="flex-1 lg:max-w-lg text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black mb-8">
              Real-time Oracle Integration
            </h3>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
              Predictly leverages cutting-edge oracle technology to deliver
              institutional-grade price feeds and market data directly to our
              prediction markets platform.
            </p>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
              Our seamless integration ensures accurate, real-time data
              streaming for all prediction markets, enabling users to make
              informed decisions with the most up-to-date information available.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <FaBolt className="text-xl text-black" />
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  Price Feeds
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Real-time Updates
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <FaChartLine className="text-xl text-black" />
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  Market Data
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Accurate Predictions
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <FaShieldAlt className="text-xl text-black" />
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  Data Reliability
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Institutional Grade
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative flex h-[500px] w-full lg:w-[500px] flex-col items-center justify-center overflow-hidden rounded-full border-pink-200/10 bg-white/50 backdrop-blur-md"
            style={{
              backgroundImage: "url(/assets/landing/cards/background-card.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="p-1 mb-4">
                <Image
                  src="/assets/logo/pyth-logo.png"
                  alt="Pyth Network"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">
                  Pyth Network
                </div>
                <div className="text-xs text-gray-600 font-light">
                  Real-time Oracles
                </div>
              </div>
            </div>

            <OrbitingCircles iconSize={40} radius={160}>
              <CoinLogo
                src="/assets/logo/logo-coin/btc-logo.png"
                alt="Bitcoin"
              />
              <CoinLogo
                src="/assets/logo/logo-coin/eth-logo.png"
                alt="Ethereum"
              />
              <CoinLogo src="/assets/logo/logo-coin/sui-logo.png" alt="Sui" />
              <CoinLogo src="/assets/logo/logo-coin/aave-logo.png" alt="Aave" />
              <CoinLogo src="/assets/logo/logo-coin/pepe-logo.png" alt="Pepe" />
            </OrbitingCircles>

            <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
              <CoinLogo
                src="/assets/logo/logo-coin/move-logo.jpeg"
                alt="Movement"
              />
              <CoinLogo src="/assets/logo/logo-coin/hype-logo.png" alt="Hype" />
              <CoinLogo
                src="/assets/logo/logo-coin/aptos-logo.png"
                alt="Aptos"
              />
              <CoinLogo
                src="/assets/logo/logo-coin/uni-logo.png"
                alt="Uniswap"
              />
            </OrbitingCircles>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
