'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useCallback, useEffect } from 'react'
import { useVideoLoaded, useSectionVisibility } from '@/hooks/useLandingState'

interface HeroContentProps {
  title: string
  subtitle: string
  description: string
  buttonText: string
  onButtonClick: () => void
}

interface MarketInfoProps {
  title: string
  description: string
  linkText: string
  onLinkClick: () => void
}

export const Hero = () => {
  const { videoLoaded, setVideoLoaded } = useVideoLoaded()
  const { setSectionVisibility } = useSectionVisibility()
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const handleStartNow = () => {
  }

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true)
  }, [setVideoLoaded])

  const handleVideoError = useCallback(() => {
    setVideoLoaded(true)
  }, [setVideoLoaded])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!videoLoaded) {
        setVideoLoaded(true)
      }
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [videoLoaded, setVideoLoaded])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisibility({
          section: 'hero',
          visible: entry.isIntersecting
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [setSectionVisibility])

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen bg-gray-50 overflow-hidden py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-start justify-between mb-10">
            <div className="flex-1">
              
              <motion.h1 
                className="font-open-runde text-5xl font-light text-gray-900 leading-tight max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <br />
                <span className="flex items-center gap-3 mt-5">
                  Where Prediction Market
                </span>
                Meets Group Friends.
              </motion.h1>
            </div>

            <div className="hidden lg:flex flex-col items-end text-right space-y-2 mt-22">
              <motion.p 
                className="text-gray-600 max-w-xs text-sm text-right"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our prediction system offers social competitions, infinite possibilities, and autonomous operations, setting a new standard in group predictions.
              </motion.p>
              
              
              <motion.div
                className="bg-white text-black px-6 py-3 rounded-2xl font-medium text-sm transition-colors mt-4 flex items-center gap-2 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartNow}
              >
                Build with $MOVE
                <Image
                  src="/assets/logo/logo-coin/move-logo.jpeg"
                  alt="Movement Labs"
                  className="w-6 h-6 object-contain rounded-full"
                  width={24}
                  height={24}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            className="relative bg-white rounded-3xl overflow-visible mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-3xl">
              
              <div className="absolute inset-0">
                {!videoLoaded && (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">Loading...</div>
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={handleVideoLoad}
                  onCanPlay={handleVideoLoad}
                  onLoadStart={handleVideoLoad}
                  onError={handleVideoError}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <source src="/assets/landing/animation/landing-animation.mp4" type="video/mp4" />
                </video>
              </div>

            </div>
            
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-50 backdrop-blur-md rounded-2xl p-2 flex items-center justify-center gap-2 0 w-50 ">
              <span className="text-gray-900 font-medium text-md">Build on</span>
              <Image
                src="/assets/logo/movement-logo.png"
                alt="Movement Labs"
                width={80}
                height={32}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}