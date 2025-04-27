'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { get } from '@/lib/helper'
import SejarahHero from '@/assets/sejarah-hero.png'

// Types for API response
interface MediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

interface Media {
  id: number
  documentId: string
  name: string
  alternativeText: null
  caption: null
  width: number
  height: number
  formats: {
    large?: MediaFormat
    small: MediaFormat
    medium: MediaFormat
    thumbnail: MediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface CommonSection {
  __component: string
  id: number
  title: string | null
  body: string | null
  media: Media[]
}

interface SejarahPageData {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  content_page: CommonSection[]
}

export default function SejarahPage() {
  const [
    sejarahPageData,
    setSejarahPageData,
  ] = useState<SejarahPageData | null>(null)

  // Function to fetch sejarah page data
  const fetchSejarahPageData = async () => {
    try {
      const res = await get('/sejarah-page?populate[content_page][populate]=*')
      if (res?.data) {
        setSejarahPageData(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch sejarah page:', error)
      return null
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchSejarahPageData()
  }, [])

  // Get timeline events from API response
  const timelineEvents = [
    {
      year: '1800',
      description:
        'Desa Manud Jaya pertama kali terbentuk pada abad ke-18 di mana penduduk asli mulai menetap dan mengembangkan kehidupan pertanian di wilayah yang subur. Pada masa ini, kehidupan desa sangat bergantung pada hasil bumi dan kerajinan tangan.',
    },
    {
      year: '1945',
      description:
        'Pada tahun 1945-an, Desa Manud Jaya resmi menjadi bagian dari Kecamatan Mandolawangi, Kabupaten Bandung Barat. Status administratif ini memberi peluang pada peningkatan pembangunan dan pengelolaan sumber daya alam di desa.',
    },
    {
      year: '2000',
      description:
        'Pada awal 2000-an, Desa Manud Jaya mulai menerima perhatian pemerintah untuk mengembangkan objek wisata seperti jalan desa yang lebih baik, serta akses transportasi umum. Ini membuka peluang bagi masyarakat untuk memiliki desa yang lebih modern namun tetap mempertahankan kearifan lokal.',
    },
    {
      year: '2010',
      description:
        'Pada tahun 2010-an, desa ini mulai fokus pada pengembangan potensi wisata berbasis alam dan budaya. Masyarakat mengembangkan kapasitas kerajinan tradisional dan kuliner khas, yang kemudian menarik perhatian banyak wisatawan dari dalam dan luar negeri.',
    },
    {
      year: '2020',
      description:
        'Pada tahun 2020, Desa Wisata Manud Jaya mulai dikenal luas, dengan telah banyak wisatawan yang datang setiap bulannya. Pembukaan ini memberikan tambahan ekonomi bagi masyarakat setempat dan mengembangkan desa ini sebagai tujuan wisata budaya yang diminati.',
    },
  ]

  // Get historical events from API response
  const historicalEvents =
    sejarahPageData?.content_page
      .filter(
        (section) =>
          section.__component === 'shared.common-section' && section.id >= 4,
      )
      .map((section) => ({
        title:
          section.body?.match(/<h1><strong>(.*?)<\/strong><\/h1>/)?.[1] || '',
        description:
          section.body?.replace(/<h1><strong>.*?<\/strong><\/h1>/, '').trim() ||
          '',
        image: section.media[0]?.url || '',
        year: section.body?.match(/\((\d{4})\)/)?.[1] || '',
      })) || []

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src={SejarahHero}
          alt="Sejarah Desa Hero"
          fill
          className="object-cover brightness-50 sepia"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Sejarah Desa</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Deskripsi Desa */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            {sejarahPageData?.content_page[0].title ||
              'Sejarah Desa Manud Jaya'}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Image
                src={
                  sejarahPageData?.content_page[0].media[0].url ||
                  'https://picsum.photos/id/164/1200/800'
                }
                alt="Desa Manud Jaya"
                width={1200}
                height={800}
                className="rounded-lg grayscale"
              />
            </div>
            <div className="space-y-6 text-gray-600 text-lg text-justify">
              <div
                className="text-[#64748B] text-lg leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                dangerouslySetInnerHTML={{
                  __html: sejarahPageData?.content_page[0].body || '',
                }}
              />
            </div>
          </div>
        </div>

        {/* Asal Usul Nama */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            <div className="lg:w-[400px] flex-shrink-0 relative">
              <div className="relative h-[300px] lg:h-full">
                <Image
                  src={
                    sejarahPageData?.content_page[1].media[0].url ||
                    'https://picsum.photos/id/110/800/800'
                  }
                  alt="Ilustrasi Asal Usul"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-8">
                {sejarahPageData?.content_page[1].title}
              </h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <div
                  className="text-[#64748B] text-lg leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                  dangerouslySetInnerHTML={{
                    __html: sejarahPageData?.content_page[1].body || '',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-16">
            {sejarahPageData?.content_page[2]?.title ||
              'Timeline Perkembangan Desa'}
            <br />
            Manud Jaya
          </h2>
          <div className="max-w-4xl mx-auto space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-8">
                <div className="w-24 flex-shrink-0">
                  <div className="text-xl font-bold text-gray-800 bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center">
                    {event.year}
                  </div>
                </div>
                <div className="flex-1 pb-12 border-l-2 border-gray-200 pl-8 relative">
                  <p className="text-gray-600 text-lg">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peristiwa Bersejarah */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16">
            {sejarahPageData?.content_page[3].title}
          </h2>
          <div className="space-y-24">
            {historicalEvents.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center max-w-6xl mx-auto`}
              >
                <div className="w-full h-[300px] lg:h-[400px] lg:w-1/2 relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <h3 className="text-3xl font-bold">{event.title}</h3>
                  <div
                    className="text-[#64748B] text-lg leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                    dangerouslySetInnerHTML={{
                      __html: event.description,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
