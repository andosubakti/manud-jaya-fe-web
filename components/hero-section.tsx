import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-0 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1542897644-e04428948020?q=80&w=2070"
          alt="Desa Wisata Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Jelajahi Keindahan <span className="text-primary">Desa Wisata</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-100">
          Nikmati pengalaman wisata autentik dengan pemandangan alam yang
          menakjubkan dan tradisi budaya yang kaya
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="text-base">
            Jelajahi Sekarang
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base bg-transparent text-white border-white hover:bg-white/10"
          >
            Lihat Video
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 text-center z-10">
        <Link href="#about" className="animate-bounce inline-block text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
