import HeroSection from "@/components/hero-section"
import AttractionCarousel from "@/components/attraction-carousel"
import AboutSection from "@/components/about-section"
import TestimonialSection from "@/components/testimonial-section"
import CallToAction from "@/components/call-to-action"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <AttractionCarousel />
      <TestimonialSection />
      <CallToAction />
    </div>
  )
}

