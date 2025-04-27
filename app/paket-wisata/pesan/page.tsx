'use client'
import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb } from '@/components/breadcrumb'
import { post } from '@/lib/helper'

// Komponen tampilan sukses
function BookingSuccess({
  data,
  bookingNumber,
}: {
  data: any
  bookingNumber: string
}) {
  return (
    <>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Terima Kasih!</h2>
        <p className="text-center text-lg font-semibold mb-4 text-gray-600">
          Berikut adalah data pesanan anda
        </p>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4 justify-center">
          <span className="font-semibold">Nomor Booking:</span>
          <input
            className="bg-gray-100 rounded px-3 py-1 font-mono text-sm border w-full md:w-auto mt-2 md:mt-0"
            value={bookingNumber}
            readOnly
          />
        </div>
        <p className="text-center text-gray-700 mb-2">
          Kami akan menghubungi kamu paling lambat{' '}
          <span className="font-bold text-blue-700">2x24 Jam</span> dari waktu
          pemesanan.
          <br />
          Apabila tidak ada info dari kami, silahkan hubungi Nomor berikut :
          <br />
          <span className="font-bold text-blue-800 text-lg block mt-1">
            081234567890
          </span>
        </p>
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-3">Ringkasan Pemesan</h3>
          <div className="mb-2">
            <span className="font-semibold">Nama:</span>
            <div className="bg-gray-100 rounded px-3 py-1 mt-1">
              {data.nama}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Alamat:</span>
            <div className="bg-gray-100 rounded px-3 py-1 mt-1 whitespace-pre-line">
              {data.alamat}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Email:</span>
            <div className="bg-gray-100 rounded px-3 py-1 mt-1">
              {data.email}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">No. HP:</span>
            <div className="bg-gray-100 rounded px-3 py-1 mt-1">
              {data.noHp}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Paket Wisata:</span>
            <div className="bg-gray-100 rounded px-3 py-1 mt-1">
              {data.paketWisata}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Jumlah Peserta:</span>
            <div className="bg-gray-100 rounded px-3 py-1 mt-1">
              {data.jumlahPeserta}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function BookingForm() {
  const searchParams = useSearchParams()
  const selectedPaket = searchParams.get('paket')
  const selectedPaketId = searchParams.get('id')
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    email: '',
    noHp: '',
    paketWisata: selectedPaket || '',
    jumlahPeserta: '',
  })
  const [success, setSuccess] = useState(false)
  const [bookingNumber, setBookingNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Format the date to ISO string (current date + 1 day)
      const today = new Date()
      today.setDate(today.getDate())
      today.setHours(today.getHours())

      // Generate a booking ID
      const bookingId = `#MJ${Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, '0')}`

      // Prepare the request body according to the required format
      const requestBody = {
        data: {
          booking_id: bookingId,
          customer_name: formData.nama,
          customer_phone: formData.noHp,
          customer_email: formData.email,
          customer_amount: parseInt(formData.jumlahPeserta),
          customer_address: formData.alamat,
          date: today.toISOString(),
          tour: parseInt(selectedPaketId || '0'),
        },
      }

      // Send the request to the API
      await post('/bookings', requestBody)

      setBookingNumber(bookingId)
      setSuccess(true)
    } catch (err) {
      console.error('Error submitting booking:', err)
      setError('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
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

  if (success) {
    return <BookingSuccess data={formData} bookingNumber={bookingNumber} />
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Pesan Sekarang
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Ayo mulai petualangan di desa Manud Jaya!
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

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
          className="w-full bg-[#82C341] text-white py-3 rounded-full hover:bg-[#82C341]/90 transition-colors text-lg font-medium mt-8 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Pesan'}
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
