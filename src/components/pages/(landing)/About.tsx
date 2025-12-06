"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const highlightRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(wordsRef.current.filter(Boolean), 
        { opacity: 0, y: 50, rotationX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: {
            amount: 2.5,
            from: "start"
          }
        }, "-=0.3"
      )
      .fromTo(highlightRefs.current.filter(Boolean),
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.3
        }, "-=1.5"
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.5"
      );

      const handleMouseMove = (e: MouseEvent) => {
        const words = wordsRef.current.filter(Boolean);
        words.forEach((word) => {
          if (word) {
            const rect = word.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 100) {
              const intensity = (100 - distance) / 100;
              gsap.to(word, {
                x: deltaX * intensity * 0.1,
                y: deltaY * intensity * 0.1,
                scale: 1 + intensity * 0.05,
                duration: 0.3,
                ease: "power2.out"
              });
            } else {
              gsap.to(word, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          }
        });
      };

      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addWordRef = (el: HTMLSpanElement | null, index: number) => {
    wordsRef.current[index] = el;
  };

  const addHighlightRef = (el: HTMLSpanElement | null, index: number) => {
    highlightRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div>
          <div
            ref={titleRef}
            className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-8"
          >
            About Predictly
          </div>

          <h2
            ref={mainTextRef}
            className="text-4xl lg:text-7xl font-light text-gray-900 leading-tight max-w-4xl mx-auto"
          >
            <span ref={(el) => addWordRef(el, 0)} className="inline-block">Predictly</span>{" "}
            <span className="relative inline-block">
              <span ref={(el) => addWordRef(el, 1)} className="text-blue-600 font-semibold inline-block">
                redefines
              </span>
              <span ref={(el) => addHighlightRef(el, 0)} className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full opacity-80"></span>
            </span>{" "}
            <span ref={(el) => addWordRef(el, 2)} className="inline-block">prediction</span>{" "}
            <span ref={(el) => addWordRef(el, 3)} className="inline-block">market</span>
            <br />
            <span ref={(el) => addWordRef(el, 4)} className="inline-block">that</span>{" "}
            <span ref={(el) => addWordRef(el, 5)} className="inline-block">empowers</span>{" "}
            <span className="relative inline-block">
              <span ref={(el) => addWordRef(el, 6)} className="text-emerald-600 font-semibold inline-block">
                Fun, Profitable, and Zero Risk
              </span>
              <span ref={(el) => addHighlightRef(el, 1)} className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600 rounded-full opacity-80"></span>
            </span>
            <br />
            <span ref={(el) => addWordRef(el, 7)} className="inline-block">to</span>{" "}
            <span ref={(el) => addWordRef(el, 8)} className="inline-block">embrace</span>{" "}
            <span ref={(el) => addWordRef(el, 9)} className="inline-block">the</span>{" "}
            <span className="relative inline-block">
              <span ref={(el) => addWordRef(el, 10)} className="text-pink-600 font-semibold inline-block">
                future of predictions market
              </span>
              <span ref={(el) => addHighlightRef(el, 2)} className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-600 rounded-full opacity-80"></span>
            </span>
          </h2>

          <div
            ref={subtitleRef}
            className="text-right max-w-xs ml-auto mt-12"
          >
            <div className="h-px bg-gray-300 mb-3"></div>
            <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
              Enjoy the ease experience with us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
