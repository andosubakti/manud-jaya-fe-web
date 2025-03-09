'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import Image from 'next/image'

const attractions = [
  {
    id: 1,
    title: 'Air Terjun Sejahtera',
    description:
      'Air terjun alami dengan ketinggian 30 meter yang dikelilingi hutan tropis yang asri.',
    image: 'https://picsum.photos/400',
    location: '2 km dari pusat desa',
  },
  {
    id: 2,
    title: 'Kebun Teh Panorama',
    description:
      'Hamparan kebun teh hijau dengan pemandangan pegunungan yang memukau.',
    image: 'https://picsum.photos/400',
    location: '5 km dari pusat desa',
  },
  {
    id: 3,
    title: 'Desa Budaya',
    description:
      'Pusat kegiatan budaya dengan pertunjukan tari tradisional dan kerajinan lokal.',
    image: 'https://picsum.photos/400',
    location: 'Pusat desa',
  },
  {
    id: 4,
    title: 'Agrowisata Buah',
    description:
      'Kebun buah-buahan lokal dimana pengunjung dapat memetik buah langsung dari pohonnya.',
    image: 'https://picsum.photos/400',
    location: '3 km dari pusat desa',
  },
  {
    id: 5,
    title: 'Danau Biru',
    description:
      'Danau alami dengan air biru jernih, sempurna untuk berenang dan piknik keluarga.',
    image: 'https://picsum.photos/400',
    location: '7 km dari pusat desa',
  },
  {
    id: 6,
    title: 'Tracking Hutan Pinus',
    description:
      'Jalur tracking melalui hutan pinus yang sejuk dengan berbagai flora dan fauna.',
    image: 'https://picsum.photos/400',
    location: '4 km dari pusat desa',
  },
]

export default function AttractionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = attractions.length - visibleItems + 1

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  useEffect(() => {
    if (carouselRef.current) {
      const translateValue = currentIndex * (100 / visibleItems)
      carouselRef.current.style.transform = `translateX(-${translateValue}%)`
    }
  }, [currentIndex, visibleItems])

  // Touch events for swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }

  return (
    <section id="attractions" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Jelajahi <span className="text-primary">Destinasi Wisata</span> Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan berbagai destinasi wisata menarik yang dapat Anda kunjungi
            di Desa Wisata Manud Jaya
          </p>
        </div>

        <div className="relative">
          <div
            className="carousel overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={carouselRef}
              className="carousel-inner"
              style={{
                width: `${100 * (attractions.length / visibleItems)}%`,
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              {attractions.map((attraction) => (
                <div
                  key={attraction.id}
                  className="carousel-item"
                  style={{ width: `${100 / attractions.length}%` }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 sm:h-56 md:h-64">
                      <Image
                        src={attraction.image || '/placeholder.svg'}
                        alt={attraction.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{attraction.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {attraction.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {attraction.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Lihat Detail
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background shadow-lg rounded-full z-10 hidden sm:flex"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background shadow-lg rounded-full z-10 hidden sm:flex"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>
        </div>

        <div className="flex justify-center mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
