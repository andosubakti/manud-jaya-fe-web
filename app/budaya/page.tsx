'use client'

import { useEffect, useState } from 'react'
import { get } from '@/lib/helper'
import React from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'

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
    large: MediaFormat
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
  related: Array<{
    __type: string
    id: number
    documentId: string
    title: string
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }>
}

interface Culture {
  id: number
  documentId: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  media: Media[]
}

interface Kesenian {
  id: number
  documentId: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  media: Media[]
}

interface BudayaPage {
  id: number
  documentId: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  media: Media[]
}

interface Kuliner {
  id: number
  documentId: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  media: Media[]
}

export default function BudayaPage() {
  const [cultures, setCultures] = useState<Culture[]>([])
  const [kesenians, setKesenians] = useState<Kesenian[]>([])
  const [budayaPage, setBudayaPage] = useState<BudayaPage | null>(null)
  const [kuliners, setKuliners] = useState<Kuliner[]>([])

  const fetchCulturesData = async () => {
    try {
      const res = await get(
        '/cultures?sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=100&populate[media][populate]=*',
      )
      if (res?.data) {
        setCultures(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch cultures:', error)
      return null
    }
  }

  const fetchKeseniansData = async () => {
    try {
      const res = await get(
        '/kesenians?sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=100&populate[media][populate]=*',
      )
      if (res?.data) {
        setKesenians(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch kesenians:', error)
      return null
    }
  }

  const fetchBudayaPageData = async () => {
    try {
      const res = await get('/budaya-page?populate[media][populate]=*')
      if (res?.data) {
        setBudayaPage(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch budaya page:', error)
      return null
    }
  }

  const fetchKulinersData = async () => {
    try {
      const res = await get(
        '/kuliners?sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=100&populate[media][populate]=*',
      )
      if (res?.data) {
        setKuliners(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch kuliners:', error)
      return null
    }
  }

  useEffect(() => {
    fetchCulturesData()
    fetchKeseniansData()
    fetchBudayaPageData()
    fetchKulinersData()
  }, [])

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-[32px] font-bold mt-2">Budaya Desa Manud Jaya</h1>

        {/* Breadcrumb */}
        <div className="container mx-auto px-0 py-4 flex flex-row justify-start">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Budaya', href: '/budaya' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="mt-12">
          <h2 className="text-[40px] font-bold leading-tight mb-8">
            {budayaPage?.title ||
              'Menjaga Warisan Leluhur, Menghidupkan Tradisi'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div
                className="text-[#64748B] text-lg leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                dangerouslySetInnerHTML={{ __html: budayaPage?.body || '' }}
              />
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={
                  budayaPage?.media[0]?.formats?.large?.url ||
                  budayaPage?.media[0]?.url ||
                  'https://picsum.photos/id/225/800/600'
                }
                alt={
                  budayaPage?.media[0]?.alternativeText ||
                  budayaPage?.title ||
                  'Budaya Desa Manud Jaya'
                }
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Adat Istiadat dan Tradisi */}
        <section className="mt-16">
          <h2 className="text-[28px] font-bold mb-6">
            Adat Istiadat dan Tradisi
          </h2>
          <div className="relative">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 min-w-max">
                {cultures.map((culture) => (
                  <div
                    key={culture.id}
                    className="w-[300px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                      <Image
                        src={
                          culture.media[0]?.formats?.medium?.url ||
                          'https://picsum.photos/id/225/800/600'
                        }
                        alt={culture.media[0]?.alternativeText || culture.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-[16px] font-semibold mb-2">
                        {culture.title}
                      </h3>
                      <div
                        className="text-[#64748B] text-[14px] mb-2 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: culture.body }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Kesenian dan Kerajinan Lokal */}
        <section className="mt-16">
          <h2 className="text-[28px] font-bold mb-6">
            Kesenian dan Kerajinan Lokal
          </h2>
          <div className="relative">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 min-w-max">
                {kesenians.map((kesenian) => (
                  <div
                    key={kesenian.id}
                    className="w-[300px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                      <Image
                        src={
                          kesenian.media[0]?.formats?.medium?.url ||
                          kesenian.media[0]?.url ||
                          'https://picsum.photos/id/225/800/600'
                        }
                        alt={
                          kesenian.media[0]?.alternativeText || kesenian.title
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-[16px] font-semibold mb-2">
                        {kesenian.title}
                      </h3>
                      <div
                        className="text-[#64748B] text-[14px] mb-2 leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: kesenian.body }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Kuliner Khas Desa */}
        <section className="mt-16 mb-16">
          <h2 className="text-[28px] font-bold mb-6">Kuliner Khas Desa</h2>
          <div className="relative">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 min-w-max">
                {kuliners.map((kuliner) => (
                  <div
                    key={kuliner.id}
                    className="w-[300px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                      <Image
                        src={
                          kuliner.media[0]?.formats?.large?.url ||
                          kuliner.media[0]?.url ||
                          'https://picsum.photos/id/225/800/600'
                        }
                        alt={kuliner.media[0]?.alternativeText || kuliner.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-[16px] font-semibold mb-2">
                        {kuliner.title}
                      </h3>
                      <div
                        className="text-[#64748B] text-[14px] mb-2 leading-relaxed prose prose-sm max-w-none prose-p:mb-2 prose-strong:font-semibold prose-strong:text-[#1E293B]"
                        dangerouslySetInnerHTML={{ __html: kuliner.body }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
