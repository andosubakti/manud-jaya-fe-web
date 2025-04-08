'use client'
import { useEffect, useState } from 'react'
import HeroSection from '@/components/hero-section'
import AttractionCarousel from '@/components/attraction-carousel'
import AboutSection from '@/components/about-section'
import TestimonialSection from '@/components/testimonial-section'
import PaketWisataCarousel from '@/components/paket-wisata-carousel'
import { get } from '@/lib/helper'
import { ContentPageItem } from '@/lib/type'

export default function Home() {
  const [contentPage, setContentPage] = useState<ContentPageItem[]>([])
  const fetchHomepageData = async () => {
    try {
      const res = await get('/homepage?populate=*')
      if (res?.data) {
        setContentPage(res?.data?.content_page)
      }
    } catch (error) {
      console.error('Failed to fetch homepage:', error)
      return null
    }
  }
  useEffect(() => {
    fetchHomepageData()
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
            return <AttractionCarousel key={index} {...section} />
          case 'homepage.homepage-section-4':
            return <PaketWisataCarousel key={index} {...section} />
          case 'homepage.homepage-section-5':
            return <TestimonialSection key={index} {...section} />
          default:
            return null
        }
      })}
    </div>
  )
}
