import dynamic from 'next/dynamic';
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

const About = dynamic(() => import('./About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
});

const Features = dynamic(() => import('./Features').then(mod => ({ default: mod.Features })), {
  loading: () => <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
});

const CTASection = dynamic(() => import('./CTA'), {
  loading: () => <div className="min-h-[200px] bg-gray-50 flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
});

const Footer = dynamic(() => import('./Footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-32 bg-gray-50"></div>
});

export default function LandingIndex() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <CTASection />
      <Footer />
    </main>
  );
}
