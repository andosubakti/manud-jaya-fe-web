'use client'
import { useEffect, useState } from 'react'
import HeroSection from '@/components/hero-section'
import AttractionCarousel from '@/components/attraction-carousel'
import AboutSection from '@/components/about-section'
import TestimonialSection from '@/components/testimonial-section'
import PaketWisataCarousel from '@/components/paket-wisata-carousel'
import { get } from '@/lib/helper'
import { ContentPageItem, TourType, TestimonialType } from '@/lib/type'

export default function Home() {
  const [contentPage, setContentPage] = useState<ContentPageItem[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [tours, setTours] = useState<TourType[]>([])
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([])

  const fetchHomepageData = async () => {
    try {
      const res = await get('/homepage?populate[content_page][populate]=*')
      if (res?.data) {
        setContentPage(res?.data?.content_page)
      }
    } catch (error) {
      console.error('Failed to fetch homepage:', error)
      return null
    }
  }

  const fetchEventsData = async (page: number = 1, pageSize: number = 100) => {
    try {
      const res = await get(
        `/events?populate[picture][populate]=*&sort=updatedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      )
      if (res?.data) {
        setEvents(res?.data)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
      return null
    }
  }

  const fetchToursData = async (page: number = 1, pageSize: number = 100) => {
    try {
      const res = await get(
        `/tours?populate[pictures][populate]=*&sort=updatedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      )
      if (res?.data) {
        setTours(res?.data)
      }
    } catch (error) {
      console.error('Failed to fetch tours:', error)
      return null
    }
  }

  const fetchTestimonialsData = async (
    page: number = 1,
    pageSize: number = 100,
  ) => {
    try {
      const res = await get(
        `/testimonis?populate[photo_profile][populate]=*&sort=updatedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      )
      if (res?.data) {
        setTestimonials(res?.data)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
      return null
    }
  }

  useEffect(() => {
    fetchHomepageData()
    fetchEventsData()
    fetchToursData()
    fetchTestimonialsData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen" id="content-homepage">
      {contentPage.map((section, index) => {
        switch (section.__component) {
          case 'homepage.section-1':
            return <HeroSection key={index} {...section} />
          case 'homepage.homepage-section-2':
            return <AboutSection key={index} {...section} />
          case 'homepage.homepage-section-3':
            return (
              <AttractionCarousel key={index} {...section} events={events} />
            )
          case 'homepage.homepage-section-4':
            return (
              <PaketWisataCarousel key={index} {...section} tours={tours} />
            )
          case 'homepage.homepage-section-5':
            return (
              <TestimonialSection
                key={index}
                {...section}
                testimonials={testimonials}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
