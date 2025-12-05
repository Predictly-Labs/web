import { Hero } from './Hero'
import { About } from './About'
import { Features } from './Features'
import { Navbar } from './Navbar'

export default function LandingIndex() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  )
}