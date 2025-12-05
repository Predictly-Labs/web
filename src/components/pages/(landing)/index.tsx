import { Hero } from './Hero'
import { About } from './About'
import { Features } from './Features'
import { Oracles } from './Oracles'
import { Navbar } from './Navbar'
import CTASection from './CTA'

export default function LandingIndex() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Oracles />
      <CTASection />
    </main>
  )
}