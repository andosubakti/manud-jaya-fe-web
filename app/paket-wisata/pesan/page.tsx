'use client'
import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb } from '@/components/breadcrumb'

// Form Component that uses useSearchParams
function BookingForm() {
  const searchParams = useSearchParams()
  const selectedPaket = searchParams.get('paket')

  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    email: '',
    noHp: '',
    paketWisata: selectedPaket || '',
    jumlahPeserta: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Pesan Sekarang
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Ayo mulai petualangan di desa Manud Jaya!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama:
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukan nama anda"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#82C341] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label
            htmlFor="alamat"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Alamat:
          </label>
          <textarea
            id="alamat"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            placeholder="Masukan alamat anda"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#82C341] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukan email anda"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#82C341] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label
            htmlFor="noHp"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            No. HP:
          </label>
          <input
            type="tel"
            id="noHp"
            name="noHp"
            value={formData.noHp}
            onChange={handleChange}
            placeholder="Masukan nomor HP anda"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#82C341] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label
            htmlFor="paketWisata"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Paket Wisata:
          </label>
          <input
            type="text"
            id="paketWisata"
            name="paketWisata"
            value={formData.paketWisata}
            onChange={handleChange}
            placeholder="Jelajah alam Manud"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#82C341] focus:border-transparent bg-gray-100"
            readOnly
            required
          />
        </div>

        <div>
          <label
            htmlFor="jumlahPeserta"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Jumlah Peserta:
          </label>
          <input
            type="number"
            id="jumlahPeserta"
            name="jumlahPeserta"
            value={formData.jumlahPeserta}
            onChange={handleChange}
            placeholder="Masukan jumlah peserta (contoh: 5)"
            min="1"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#82C341] focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#82C341] text-white py-3 rounded-full hover:bg-[#82C341]/90 transition-colors text-lg font-medium mt-8"
        >
          Pesan
        </button>
      </form>
    </div>
  )
}

// Main Page Component
export default function PesanPaketWisata() {
  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="bg-[#82C341] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Pemesanan Paket Wisata
            <br />
            Desa Manud Jaya
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: 'Beranda', href: '/' },
            { label: 'Paket Wisata', href: '/paket-wisata' },
            { label: 'Pesan', href: '/paket-wisata/pesan' },
          ]}
        />
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </main>
  )
}
