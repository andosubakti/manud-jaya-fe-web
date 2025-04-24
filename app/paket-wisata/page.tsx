'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'

export default function PaketWisataPage() {
  const [sortBy, setSortBy] = useState('title')

  const paketWisata = [
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
            <div key={paket.id} className="bg-card rounded-3xl overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={paket.image}
                  alt={paket.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 space-y-6">
                <h3 className="text-2xl font-semibold">{paket.title}</h3>

                <div className="text-2xl font-semibold">{paket.price}</div>

                <p className="text-muted-foreground text-lg">
                  {paket.description} - {paket.duration}
                  {paket.time && (
                    <span className="block mt-1">{paket.time}</span>
                  )}
                </p>

                <button className="w-full bg-[#82C341] text-white py-4 rounded-full text-lg font-medium hover:bg-[#82C341]/90 transition-colors">
                  Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
