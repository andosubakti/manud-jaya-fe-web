'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import PaketImg1 from '@/assets/paket-1.png'
import PaketImg2 from '@/assets/paket-2.png'
import PaketImg3 from '@/assets/paket-3.png'
import PaketImg4 from '@/assets/paket-4.png'
import PaketImg5 from '@/assets/paket-5.png'
import { FC } from 'react'
import { PaketWisataSectionType } from '@/lib/type'

const paket = [
  {
    id: 1,
    title: 'Paket Wisata Alam (Trekking, Bersepeda, dan Air Terjun)',
    description:
      'Menjelajahi perbukitan dan persawahan desa dengan trekking atau bersepeda, Menikmati pemandangan matahari terbit dan udara segar pedesaan, Mengunjungi Air Terjun Sumber Sejahtera, air terjun tersembunyi dengan pemandangan yang memukau dan air yang jernih.',
    image: PaketImg1,
    location: '2 km dari pusat desa',
  },
  {
    id: 2,
    title: 'Paket Budaya dan Adat',
    description:
      'Mengikuti workshop seni tari dan musik tradisional, Belajar membatik dan membuat kerajinan tangan khas desa, Berpartisipasi dalam acara adat yang sedang berlangsung.',
    image: PaketImg2,
    location: '5 km dari pusat desa',
  },
  {
    id: 3,
    title: 'Paket Kuliner Tradisional',
    description:
      'Memasak dan mencicipi hidangan khas desa seperti nasi liwet, pecel desa, dan wedang jahe, Mengunjungi kebun organik dan belajar tentang pertanian lokal, Mencoba proses pembuatan gula aren dan kopi tradisional.',
    image: PaketImg3,
    location: 'Pusat desa',
  },
  {
    id: 4,
    title: 'Paket Homestay dan Hidup Sehari di Desa',
    description:
      'Menginap di rumah warga desa dan merasakan kehidupan pedesaan, Ikut serta dalam aktivitas pertanian seperti menanam padi atau memanen hasil kebun, Berinteraksi langsung dengan masyarakat lokal dan menikmati suasana desa yang damai.',
    image: PaketImg4,
    location: '3 km dari pusat desa',
  },
  {
    id: 5,
    title: 'Paket Petualangan (Outbound dan Arung Jeram)',
    description:
      'Menjelajahi sungai desa dengan arung jeram yang seru, Mengikuti kegiatan outbound dan team building di alam terbuka, Berkemah di area khusus dengan fasilitas lengkap.',
    image: PaketImg5,
    location: '7 km dari pusat desa',
  },
]

const PaketWisataCarousel: FC<PaketWisataSectionType> = (props) => {
  const { title, description } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const colors = [
    'bg-pink-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-purple-400',
    'bg-orange-400',
    'bg-red-400',
    'bg-teal-400',
    'bg-cyan-400',
    'bg-amber-400',
    'bg-lime-400',
    'bg-rose-400',
    'bg-fuchsia-400',
    'bg-indigo-400',
    'bg-violet-400',
    'bg-emerald-400',
    'bg-sky-400',
    'bg-lightBlue-400',
    'bg-yellow-300',
    'bg-pink-300',
  ]

  const [randomColors, setRandomColors] = useState<string[]>([])

  useEffect(() => {
    // Pilih warna secara acak untuk setiap item setelah komponen mount
    setRandomColors(
      paket.map(() => colors[Math.floor(Math.random() * colors.length)]),
    )
  }, [paket])

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

  const totalSlides = paket.length - visibleItems + 1

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
    <section id="paket-wisata" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="w-full flex flex-row items-center justify-between max-w-[75vw]">
          <div className="text-left mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {title}
            </h2>
            <p
              className="text-muted-foreground max-w-2xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div className="hidden gap-4 md:flex md:flex-row">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
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
              className="carousel-inner md:flex md:flex-row md:gap-8"
              style={{
                width: '100vw',
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              {paket.map((paket, index) => {
                return (
                  <Card key={paket.id} className="w-full">
                    <div className="relative h-[100vw] w-[100vw] md:h-[256px] md:w-[336px] rounded-xl">
                      <Image
                        src={paket.image || '/placeholder.svg'}
                        alt={paket.title}
                        fill
                        className="object-cover rounded-xl"
                      />
                      <div
                        className={`absolute left-4 top-4 py-2 px-4 rounded-full ${randomColors[index]} text-white text-xs`}
                      >
                        {`0${index + 1} TOURS`}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{paket.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: paket.description }}
                      />
                    </CardContent>
                    <CardFooter className="flex flex-row gap-2 items-center">
                      <label className="text-gray-600">
                        Harga mulai{' '}
                        <span className="font-semibold">IDR 200K</span>
                      </label>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
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
        <div className="flex flex-row justify-center mt-8 gap-4 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PaketWisataCarousel
