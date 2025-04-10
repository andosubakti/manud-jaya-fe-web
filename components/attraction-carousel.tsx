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
import AttractionImg1 from '@/assets/atraksi-1.png'
import AttractionImg2 from '@/assets/atraksi-2.png'
import AttractionImg3 from '@/assets/atraksi-3.png'
import lovedIcon from '@/assets/loved.svg'
import unlovedIcon from '@/assets/unloved.svg'
import CalendarIcon from '@/assets/Calender.svg'
import { FC } from 'react'
import { AttractionSectionType } from '@/lib/type'

const attractions = [
  {
    id: 1,
    title: 'Air Terjun Sejahtera',
    description:
      'Sebuah tradisi tahunan yang dilakukan sebagai ungkapan rasa syukur atas hasil panen yang melimpah. Acara ini biasanya diisi dengan doa bersama, pertunjukan kesenian, dan makan bersama warga desa.',
    image: AttractionImg1,
    location: '2 km dari pusat desa',
  },
  {
    id: 2,
    title: 'Festival Budaya Manud Jaya',
    description:
      'Acara ini menghadirkan berbagai pertunjukan seni tradisional seperti tari-tarian khas desa, wayang kulit, dan musik gamelan yang dilaksanakan malam sembari bercengkrama dengan seluruh warga',
    image: AttractionImg2,
    location: '5 km dari pusat desa',
  },
  {
    id: 3,
    title: 'Ritual Bersih Desa & Pelestarian Air Terjun',
    description:
      'Bentuk penghormatan terhadap alam dan sumber daya air, masyarakat desa menggelar ritual tahunan yang mencakup pembersihan lingkungan desa, sungai, dan Air Terjun Sumber Sejahtera, yang menjadi ikon desa. Acara ini juga meliputi sesajen sebagai simbol rasa syukur, doa bersama, serta pertunjukan seni tradisional di sekitar air terjun.',
    image: AttractionImg3,
    location: 'Pusat desa',
  },
  {
    id: 4,
    title: 'Pesta Panen Raya',
    description:
      'Perayaan besar yang menampilkan lomba memasak makanan tradisional, pameran kerajinan tangan, dan kirab budaya.',
    image: AttractionImg1,
    location: '3 km dari pusat desa',
  },
  {
    id: 5,
    title: 'Tradisi Malam Seribu Lampion',
    description:
      'Sebuah acara yang diadakan setiap akhir tahun di mana seluruh warga desa menyalakan lampion dan menerbangkannya sebagai simbol harapan dan doa untuk tahun yang akan datang.',
    image: AttractionImg2,
    location: '7 km dari pusat desa',
  },
  {
    id: 6,
    title: 'Tracking Hutan Pinus',
    description:
      'Jalur tracking melalui hutan pinus yang sejuk dengan berbagai flora dan fauna.',
    image: AttractionImg3,
    location: '4 km dari pusat desa',
  },
]

const AttractionCarousel: FC<AttractionSectionType> = (props) => {
  const { title, description } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [lovedAttractions, setLovedAttractions] = useState<{
    [key: number]: boolean
  }>({})

  const toggleLove = (id: number) => {
    setLovedAttractions((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle status loved berdasarkan id
    }))
  }

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
              {attractions.map((attraction) => {
                const isLoved = lovedAttractions[attraction.id] || false
                return (
                  <Card key={attraction.id} className="w-full">
                    <div className="relative h-[100vw] w-[100vw] md:h-[328px] md:w-[382px] rounded-xl">
                      <Image
                        src={attraction.image || '/placeholder.svg'}
                        alt={attraction.title}
                        fill
                        className="object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="text-base rounded-xl font-bold bg-secondary text-primary hover:text-secondary"
                        >
                          Read More
                        </Button>
                      </div>
                      <Image
                        src={isLoved ? lovedIcon : unlovedIcon}
                        height={48}
                        width={48}
                        onClick={() => toggleLove(attraction.id)}
                        alt="love-icon"
                        className="absolute top-5 right-8 md:right-3 cursor-pointer"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{attraction.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: attraction.description,
                        }}
                      />
                    </CardContent>
                    <CardFooter className="flex flex-row gap-2 items-center">
                      <Image
                        src={CalendarIcon}
                        height={24}
                        width={24}
                        alt="calendar-icon"
                      />
                      <label className="text-gray-600">22 April 2025</label>
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

export default AttractionCarousel
