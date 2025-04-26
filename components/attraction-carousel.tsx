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
import lovedIcon from '@/assets/loved.svg'
import unlovedIcon from '@/assets/unloved.svg'
import CalendarIcon from '@/assets/Calender.svg'
import { FC } from 'react'
import { AttractionSectionType } from '@/lib/type'

interface File {
  id: number
  url: string
  name: string
  ext: string
}

interface Picture {
  id: number
  files: File[]
}

interface Event {
  id: number
  documentId: string
  title: string
  startdate: string
  enddate: string
  subtitle: string
  description: string
  location: string
  price: number
  picture: Picture[]
}

interface AttractionCarouselProps extends AttractionSectionType {
  events: Event[]
}

const AttractionCarousel: FC<AttractionCarouselProps> = (props) => {
  const { title, description, events } = props
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

  const totalSlides = events.length - visibleItems + 1

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
                width: '100%',
                transition: 'transform 0.5s ease-in-out',
                display: 'flex',
                flexWrap: 'nowrap',
              }}
            >
              {events.map((event) => {
                const isLoved = lovedAttractions[event.id] || false
                const eventImage =
                  event.picture?.[0]?.files?.[0]?.url || '/placeholder.svg'
                const formattedDate = new Date(
                  event.startdate,
                ).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })

                return (
                  <Card
                    key={event.id}
                    className="w-full flex-shrink-0"
                    style={{ width: '100%', maxWidth: '382px' }}
                  >
                    <div className="relative h-[100vw] w-full md:h-[328px] rounded-xl">
                      <Image
                        src={eventImage}
                        alt={event.title}
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
                        onClick={() => toggleLove(event.id)}
                        alt="love-icon"
                        className="absolute top-5 right-8 md:right-3 cursor-pointer"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: event.description,
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
                      <label className="text-gray-600">{formattedDate}</label>
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
