'use client'
import React, { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { get } from '@/lib/helper'
import { TourType } from '@/lib/type'
import Pakethero from '@/assets/paket-hero.png'

interface ToursResponse {
  data: TourType[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export default function PaketWisataPage() {
  const router = useRouter()
  const [sortBy, setSortBy] = useState('title')
  const [selectedPaket, setSelectedPaket] = useState<TourType | null>(null)
  const [tours, setTours] = useState<TourType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchToursData = async () => {
      try {
        setIsLoading(true)
        const response = await get<ToursResponse>(
          '/tours?populate[pictures][populate]=*&pagination[page]=1&pagination[pageSize]=100&sort=title:asc',
        )
        console.log('Tours data:', response.data)
        console.log('First tour pictures:', response.data[0]?.pictures)
        setTours(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching tours data:', err)
        setError('Gagal memuat data paket wisata. Silakan coba lagi nanti.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchToursData()
  }, [])

  const sortedTours = useMemo(() => {
    return [...tours].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        default:
          return 0
      }
    })
  }, [tours, sortBy])

  const handlePesan = (paketTitle: string, paketId: number) => {
    router.push(
      `/paket-wisata/pesan?paket=${encodeURIComponent(
        paketTitle,
      )}&id=${paketId}`,
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center">
        <Image
          src={Pakethero}
          alt="Hero Paket Wisata"
          fill
          className="object-cover brightness-50"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white relative z-10">
          Paket Wisata
        </h1>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 flex flex-row justify-center">
        <Breadcrumb
          items={[
            { label: 'Beranda', href: '/' },
            { label: 'Paket Wisata', href: '/paket-wisata' },
          ]}
        />
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 md:px-16 mb-8">
        <select
          className="px-4 py-2 border rounded-md bg-background"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Urut Berdasarkan Nama</option>
          <option value="price-asc">Termurah - Termahal</option>
          <option value="price-desc">Termahal - Termurah</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="container mx-auto px-4 md:px-16 pb-16 text-center">
          <p className="text-lg text-gray-600">Memuat data paket wisata...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="container mx-auto px-4 md:px-16 pb-16 text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      )}

      {/* Packages Grid */}
      {!isLoading && !error && (
        <div className="container mx-auto px-4 md:px-16 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((paket) => (
              <div
                key={paket.id}
                className="bg-white overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedPaket(paket)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={
                      paket.pictures &&
                      paket.pictures[0].files[0].url &&
                      paket.pictures[0].files[0].url !== ''
                        ? paket.pictures[0].files[0].url
                        : 'https://picsum.photos/id/110/800/600'
                    }
                    alt={paket.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                    {paket.title}
                  </h3>
                  <p className="text-lg font-medium text-[#0F172A] mb-4">
                    Rp{paket.price.toLocaleString('id-ID')}
                  </p>
                  <p
                    className="text-[#64748B] mb-4 min-h-[60px]"
                    dangerouslySetInnerHTML={{
                      __html: paket.short_description || paket.description,
                    }}
                  ></p>
                  <button
                    className="w-full bg-[#82C341] text-white py-3 rounded-full hover:bg-[#82C341]/90 transition-colors text-lg font-medium"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePesan(paket.title, paket.id)
                    }}
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedPaket}
        onOpenChange={() => setSelectedPaket(null)}
      >
        <DialogContent className="max-w-[1200px] md:p-12 overflow-hidden md:rounded-[40px] bg-white">
          {selectedPaket && (
            <div className="flex flex-col md:flex-row md:gap-12">
              {/* Mobile Layout */}
              <div className="block md:hidden w-full">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={
                      selectedPaket.pictures &&
                      selectedPaket.pictures[0].files[0].url &&
                      selectedPaket.pictures[0].files[0].url !== ''
                        ? selectedPaket.pictures[0].files[0].url
                        : 'https://picsum.photos/id/110/800/600'
                    }
                    alt={selectedPaket.title}
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>
                <div className="p-6">
                  <div className="text-[#94A3B8] text-base mb-1">
                    Paket Wisata
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                    {selectedPaket.title}
                  </h2>
                  <p
                    className="text-[#64748B] text-base mb-4"
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedPaket.description ||
                        selectedPaket.short_description,
                    }}
                  ></p>
                  <div className="text-[#64748B] text-base mb-1">
                    <span className="font-medium">
                      {selectedPaket.duration_days > 0 &&
                        `${selectedPaket.duration_days} Hari `}
                      {selectedPaket.duration_hours > 0 &&
                        `${selectedPaket.duration_hours} Jam`}
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="text-[#94A3B8] text-base mb-1">Harga</div>
                    <div className="text-2xl font-bold text-[#0F172A] mb-6">
                      Rp{selectedPaket.price.toLocaleString('id-ID')}
                    </div>
                    <button
                      className="w-full bg-[#82C341] text-white py-3 rounded-full text-base font-medium hover:bg-[#82C341]/90 transition-colors"
                      onClick={() =>
                        handlePesan(selectedPaket.title, selectedPaket.id)
                      }
                    >
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block md:w-[55%]">
                <DialogTitle className="sr-only">
                  Detail Paket Wisata {selectedPaket.title}
                </DialogTitle>
                <div className="text-[#94A3B8] text-lg">Paket Wisata</div>
                <h2 className="text-[40px] leading-[1.2] font-bold text-[#0F172A] mt-2 mb-8">
                  {selectedPaket.title}
                </h2>

                <div className="bg-[#F8FAFC] rounded-3xl p-8">
                  <p
                    className="text-[#64748B] text-lg leading-[1.8]"
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedPaket.description ||
                        selectedPaket.short_description,
                    }}
                  ></p>
                  <div className="mt-4 text-[#64748B] text-lg">
                    <span className="font-medium">
                      {selectedPaket.duration_days > 0 &&
                        `${selectedPaket.duration_days} Hari `}
                      {selectedPaket.duration_hours > 0 &&
                        `${selectedPaket.duration_hours} Jam`}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-[#94A3B8] text-lg">Harga</div>
                  <div className="text-[40px] leading-[1.2] font-bold text-[#0F172A] mt-2 mb-8">
                    Rp{selectedPaket.price.toLocaleString('id-ID')}
                  </div>

                  <button
                    className="w-full bg-[#82C341] text-white py-4 rounded-full text-lg font-medium hover:bg-[#82C341]/90 transition-colors"
                    onClick={() =>
                      handlePesan(selectedPaket.title, selectedPaket.id)
                    }
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>

              <div className="hidden md:block md:w-[45%] relative aspect-[4/3]">
                <Image
                  src={
                    selectedPaket.pictures &&
                    selectedPaket.pictures[0].files[0].url &&
                    selectedPaket.pictures[0].files[0].url !== ''
                      ? selectedPaket.pictures[0].files[0].url
                      : 'https://picsum.photos/id/110/800/600'
                  }
                  alt={selectedPaket.title}
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
