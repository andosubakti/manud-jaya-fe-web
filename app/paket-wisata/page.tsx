'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

interface PaketWisata {
  id: number
  title: string
  description: string
  duration: string
  time?: string
  price: string
  image: string
}

export default function PaketWisataPage() {
  const router = useRouter()
  const [sortBy, setSortBy] = useState('title')
  const [selectedPaket, setSelectedPaket] = useState<PaketWisata | null>(null)

  const paketWisata: PaketWisata[] = [
    {
      id: 1,
      title: 'Jelajah Alam Manud',
      description:
        'Trekking ringan menyusuri perbukitan, hutan lindung, dan area persawahan dengan pemandu lokal.',
      duration: '1 Hari',
      time: '(08.00 - 15.00 WIB)',
      price: 'Rp150.000/orang',
      image: 'https://picsum.photos/id/110/800/600',
    },
    {
      id: 2,
      title: 'Dari Biji ke Cangkir: Wisata Kopi Lokal',
      description:
        'Belajar mengenal proses kopi dari kebun sampai cangkir sambil mencicipi kopi khas Manud Jaya.',
      duration: '3 Jam',
      price: 'Rp120.000/orang',
      image: 'https://picsum.photos/id/766/800/600',
    },
    {
      id: 3,
      title: 'Belajar Membatik di Kampung Seni',
      description:
        'Workshop membatik tradisional bersama pengrajin lokal, cocok untuk anak-anak hingga dewasa.',
      duration: '2 Jam',
      price: 'Rp100.000/orang',
      image: 'https://picsum.photos/id/603/800/600',
    },
    {
      id: 4,
      title: 'Menginap di Rumah Warga (Live-in Experience)',
      description:
        'Tinggal dan beraktivitas bersama keluarga lokal, merasakan langsung kehidupan pedesaan.',
      duration: '2 Hari 1 Malam',
      price: 'Rp250.000/orang/malam',
      image: 'https://picsum.photos/id/164/800/600',
    },
    {
      id: 5,
      title: 'Kelas Masak Tradisional Sunda',
      description:
        'Belajar memasak makanan khas Sunda menggunakan bahan dari kebun lokal.',
      duration: '2 Jam',
      price: 'Rp90.000/orang',
      image: 'https://picsum.photos/id/292/800/600',
    },
    {
      id: 6,
      title: 'Panen Sayur dan Buah Sendiri',
      description:
        'Petik sayur dan buah langsung dari kebun, bisa dibawa pulang sebagai oleh-oleh sehat.',
      duration: '1,5 Jam',
      price: 'Rp70.000/orang',
      image: 'https://picsum.photos/id/493/800/600',
    },
  ]

  const sortedPaketWisata = useMemo(() => {
    return [...paketWisata].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'price-asc':
          return (
            parseInt(a.price.replace(/\D/g, '')) -
            parseInt(b.price.replace(/\D/g, ''))
          )
        case 'price-desc':
          return (
            parseInt(b.price.replace(/\D/g, '')) -
            parseInt(a.price.replace(/\D/g, ''))
          )
        default:
          return 0
      }
    })
  }, [paketWisata, sortBy])

  const handlePesan = (paketTitle: string) => {
    router.push(`/paket-wisata/pesan?paket=${encodeURIComponent(paketTitle)}`)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center">
        <Image
          src="https://picsum.photos/id/513/1920/1080"
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

      {/* Packages Grid */}
      <div className="container mx-auto px-4 md:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPaketWisata.map((paket) => (
            <div
              key={paket.id}
              className="bg-white overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setSelectedPaket(paket)}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={paket.image}
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
                  {paket.price}
                </p>
                <p className="text-[#64748B] mb-4 min-h-[60px]">
                  {paket.description}
                </p>
                <button
                  className="w-full bg-[#82C341] text-white py-3 rounded-full hover:bg-[#82C341]/90 transition-colors text-lg font-medium"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePesan(paket.title)
                  }}
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                    src={selectedPaket.image}
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
                  <p className="text-[#64748B] text-base mb-4">
                    {selectedPaket.description}
                  </p>
                  <div className="text-[#64748B] text-base mb-1">
                    {selectedPaket.duration}
                    {selectedPaket.time && <span> {selectedPaket.time}</span>}
                  </div>
                  <div className="mt-6">
                    <div className="text-[#94A3B8] text-base mb-1">Harga</div>
                    <div className="text-2xl font-bold text-[#0F172A] mb-6">
                      {selectedPaket.price}
                    </div>
                    <button
                      className="w-full bg-[#82C341] text-white py-3 rounded-full text-base font-medium hover:bg-[#82C341]/90 transition-colors"
                      onClick={() => handlePesan(selectedPaket.title)}
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
                  <p className="text-[#64748B] text-lg leading-[1.8]">
                    {selectedPaket.description}
                  </p>
                  <div className="mt-4 text-[#64748B] text-lg">
                    <span className="font-medium">
                      {selectedPaket.duration}
                    </span>
                    {selectedPaket.time && (
                      <div className="mt-1">{selectedPaket.time}</div>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-[#94A3B8] text-lg">Harga</div>
                  <div className="text-[40px] leading-[1.2] font-bold text-[#0F172A] mt-2 mb-8">
                    {selectedPaket.price}
                  </div>

                  <button
                    className="w-full bg-[#82C341] text-white py-4 rounded-full text-lg font-medium hover:bg-[#82C341]/90 transition-colors"
                    onClick={() => handlePesan(selectedPaket.title)}
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>

              <div className="hidden md:block md:w-[45%] relative aspect-[4/3]">
                <Image
                  src={selectedPaket.image}
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
