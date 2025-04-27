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
import { FC } from 'react'
import { PaketWisataSectionType } from '@/lib/type'

const PaketWisataCarousel: FC<PaketWisataSectionType> = (props) => {
  const { title, description, tours = [] } = props
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

  const totalSlides = tours.length - visibleItems + 1

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
                width: tours.length < visibleItems ? 'auto' : '100vw',
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              {tours.map((tour) => {
                return (
                  <Card
                    key={tour.id}
                    className="w-full md:w-[336px] flex-shrink-0"
                  >
                    <div className="relative aspect-[4/3] md:h-[256px] md:w-[280px] rounded-xl">
                      <Image
                        src={
                          tour.pictures?.[0]?.files?.[0]?.formats?.small?.url ||
                          tour.pictures?.[0]?.files?.[0]?.formats?.thumbnail
                            ?.url ||
                          tour.pictures?.[0]?.files?.[0]?.url ||
                          '/placeholder.svg'
                        }
                        alt={tour.title}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{tour.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: tour.short_description,
                        }}
                      />
                    </CardContent>
                    <CardFooter className="flex flex-row gap-2 items-center">
                      <label className="text-gray-600">
                        Harga mulai{' '}
                        <span className="font-semibold">
                          IDR {tour.price.toLocaleString()}
                        </span>
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
