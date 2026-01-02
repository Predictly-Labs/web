"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useSectionVisibility } from '@/hooks/useLandingState';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  delay: number;
  className?: string;
  dark?: boolean;
}

const FeatureCard = ({
  title,
  description,
  image,
  delay,
  className,
  dark = false,
}: FeatureCardProps) => {
  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden p-8 ${
        dark ? "text-black" : ""
      } ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -2 }}
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/landing/cards/background-card.png"
          alt="Background"
          fill
          className="object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>

      <div className="relative z-10 h-full">
        {!dark && (
          <div className="absolute top-[-60] right-[-50]">
            <Image
              src={image}
              alt={title}
              width={200}
              height={200}
              className="object-contain"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        )}
        
        <div className={dark ? "flex flex-col justify-center h-full" : "pt-22"}>
          <h3
            className={`text-xl font-medium mb-3 ${
              dark ? "text-black" : "text-black"
            }`}
          >
            {title}
          </h3>
          <p
            className={`font-light leading-relaxed ${
              dark ? "text-gray-600 text-sm" : "text-gray-600 text-lg"
            }`}
          >
            {description}
          </p>
          
          {dark && (
            <div className="mt-8 flex justify-center">
              <Image
                src={image}
                alt={title}
                width={200}
                height={150}
                className="object-contain"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { setSectionVisibility } = useSectionVisibility();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisibility({
          section: 'features',
          visible: entry.isIntersecting
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setSectionVisibility]);

  const features = [
    {
      title: "Social Prediction Markets",
      description:
        "Create and participate in prediction markets with your friends. Build communities around shared interests and compete in real-time forecasting.",
      image: "/assets/landing/cards/prediction-with-friends.png",
    },
    {
      title: "Yield Generation",
      description: "Earn passive income through smart prediction strategies.",
      image: "/assets/landing/cards/earn-yield.png",
    },
    {
      title: "Zero Risk Predictions",
      description:
        "Advanced no-loss prediction system with guaranteed capital protection.",
      image: "/assets/landing/cards/no-loss.png",
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="relative min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="text-5xl lg:text-5xl font-medium text-black mb-4">
              The Future of Prediction Market
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
              Predictly is a social prediction platform that puts your community and your experience first.
            </p>
          </div>
          
          <div className="relative w-full">
            <div className="absolute left-0 w-16 h-0.5 bg-gray-900 rounded-full"></div>
            <div className="w-full h-px bg-gray-200"></div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
            <FeatureCard
              title={features[0].title}
              description={features[0].description}
              image={features[0].image}
              delay={0}
              className="md:row-span-2 h-full"
              dark={true}
            />

            <FeatureCard
              title={features[1].title}
              description={features[1].description}
              image={features[1].image}
              delay={0.2}
              className="md:col-span-2 h-60"
            />

            <FeatureCard
              title={features[2].title}
              description={features[2].description}
              image={features[2].image}
              delay={0.4}
              className="md:col-span-2 h-60"
            />
          </div>
        </div>
      </div>
    </section>
  );
};