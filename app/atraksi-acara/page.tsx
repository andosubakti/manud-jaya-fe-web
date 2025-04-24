'use client'
import React from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

interface Event {
  date: Date
  title: string
}

interface CalendarTileProperties {
  date: Date
  view: string
}

export default function AtraksiAcaraPage() {
  const mainAttractions = [
    {
      title: 'Bukit Purnama',
      description:
        'Terletak di sisi timur desa. Bukit dengan panorama pegunungan yang indah, menjadi spot favorit untuk menyaksikan matahari terbit. Pengunjung dapat menikmati udara segar pegunungan dan keindahan alam sekitar.',
      openHours: 'Setiap hari pukul 05.00 - 18.00',
      price: 'Rp10.000/orang',
      image: 'https://picsum.photos/id/110/800/600',
    },
    {
      title: 'Air Terjun Manud',
      description:
        'Air terjun alami yang bersumber di pegunungan Manud. Selain untuk wisata, air terjun ini juga dimanfaatkan untuk irigasi sawah di sekitar desa. Pengunjung dapat menikmati gemercik air dan kesejukan alam.',
      openHours: 'Setiap hari pukul 08.00 - 17.00',
      price: 'Rp15.000/orang',
      image: 'https://picsum.photos/id/145/800/600',
    },
    {
      title: 'Galeri Batik Lereng Manud',
      description:
        'Berlokasi di pusat Desa Manud. Galeri ini menampilkan hasil karya batik khas Manud dengan motif yang terinspirasi dari alam sekitar. Pengunjung dapat melihat proses pembuatan dan mencoba membatik.',
      openHours: 'Senin-Sabtu pukul 09.00 - 16.30',
      price: 'Rp25.000/orang (termasuk workshop)',
      image: 'https://picsum.photos/id/175/800/600',
    },
    {
      title: 'Sentra Anyaman Tunas Lestari',
      description:
        'Terletak di bagian Selatan desa. Sentra kerajinan anyaman bambu yang masih aktif memproduksi berbagai produk kerajinan. Pengunjung dapat melihat proses pembuatan dan membeli produk langsung.',
      openHours: 'Senin-Sabtu pukul 08.00 - 16.00',
      price: 'Gratis (harga sesuai produk yang dibeli)',
      image: 'https://picsum.photos/id/180/800/600',
    },
  ]

  const eventsList = [
    {
      title: 'Festival Seribu Lampion',
      description:
        'Acara tahunan untuk menyemarakkan malam tahun baru dengan melepaskan ribuan lampion ke langit malam. Menjadi simbol harapan dan doa dari masyarakat.',
      date: 'Tanggal & Waktu:',
      time: 'Sabtu, 31 Desember 2024 | 19.00 - 21.00 WIB',
      location: 'Lapangan Utama Desa Manud Jaya',
      image: 'https://picsum.photos/id/219/800/600',
    },
    {
      title: 'Parade Budaya Manud',
      description:
        'Parade budaya tahunan yang menampilkan kesenian tradisional, pertunjukan tarian, dan pawai pengantin dengan busana adat. Mengangkat tema "Budaya Hidup".',
      date: 'Tanggal & Waktu:',
      time: 'Sabtu, 25 Mei 2024 | 08.00 - 17.00 WIB',
      location: 'Sepanjang Jalan Pusat Desa Manud Jaya',
      image: 'https://picsum.photos/id/237/800/600',
    },
    {
      title: 'Workshop Membatik Lereng',
      description:
        'Workshop membatik khas motif lereng yang dipandu langsung oleh pengrajin senior. Peserta akan belajar teknik dasar membatik dan dapat membawa pulang hasil karyanya.',
      date: 'Tanggal & Waktu:',
      time: 'Minggu, 19 Mei 2024 | 09.00 - 16.00 WIB',
      location: 'Galeri Batik Lereng Manud',
      image: 'https://picsum.photos/id/145/800/600',
    },
    {
      title: 'Pasar Budaya Malam Minggu',
      description:
        'Pasar malam mingguan yang menampilkan berbagai kerajinan tradisional, kuliner khas, dan pertunjukan seni budaya oleh masyarakat.',
      date: 'Tanggal & Waktu:',
      time: 'Setiap Sabtu | 17.00 - 22.00 WIB',
      location: 'Alun-Alun Desa Manud Jaya',
      image: 'https://picsum.photos/id/292/800/600',
    },
    {
      title: 'Ritual Sedekah Bumi',
      description:
        'Ritual adat tahunan sebagai wujud syukur kepada alam. Dipimpin oleh tetua desa dan diikuti seluruh warga dengan doa bersama, genduri, dan pertunjukan wayang semalam suntuk.',
      date: 'Tanggal & Waktu:',
      time: 'Minggu, 1 September 2024 | 07.00 - 20.00 WIB',
      location: 'Pendopo Desa Manud Jaya',
      image: 'https://picsum.photos/id/171/800/600',
    },
    {
      title: 'Panggung Seni Remaja Desa',
      description:
        'Panggung pertunjukan seni oleh remaja desa yang menampilkan kreasi modern dengan unsur tradisional. Musik, teater, tarian dan kreasi seni akan ditampilkan.',
      date: 'Tanggal & Waktu:',
      time: 'Jumat, 14 Juni 2024 | 15.00 - 21.00 WIB',
      location: 'Balai Budaya Manud Jaya',
      image: 'https://picsum.photos/id/225/800/600',
    },
  ]

  const calendarEvents: Event[] = [
    {
      date: new Date(2024, 4, 20), // May 20, 2024
      title: 'Acara Syukuran Desa',
    },
    {
      date: new Date(2024, 4, 25), // May 25, 2024
      title: 'Festival Tari Adat',
    },
  ]

  // Array of selected dates
  const selectedDates = calendarEvents.map((event) => event.date)

  const tileClassName = ({
    date,
    view,
  }: CalendarTileProperties): string | null => {
    if (view === 'month') {
      return selectedDates.some(
        (selectedDate) =>
          selectedDate.getDate() === date.getDate() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getFullYear() === date.getFullYear(),
      )
        ? 'event-date'
        : null
    }
    return null
  }

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

        {/* Main Attractions */}
        <section className="mt-8">
          <h2 className="text-[28px] font-bold mb-6">
            Atraksi Utama di Desa Wisata
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainAttractions.map((attraction, index) => (
              <div key={index}>
                <div className="relative aspect-square rounded-t-xl overflow-hidden mb-3">
                  <Image
                    src={attraction.image}
                    alt={attraction.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[16px] font-semibold mb-2">
                  {attraction.title}
                </h3>
                <p className="text-[#64748B] text-[14px] mb-4 leading-relaxed">
                  {attraction.description}
                </p>
                <div className="text-[14px]">
                  <div className="font-medium">Jam Operasional:</div>
                  <div className="text-[#64748B]">{attraction.openHours}</div>
                  <div className="text-[#64748B]">
                    Harga: {attraction.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events */}
        <section className="mt-16">
          <h2 className="text-[28px] font-bold mb-6">
            Acara & Event di Desa Wisata
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsList.map((event, index) => (
              <div key={index} className="rounded-xl p-6">
                <div className="relative aspect-[4/3] rounded-t-xl overflow-hidden mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[16px] font-semibold mb-2">
                  {event.title}
                </h3>
                <p className="text-[#64748B] text-[14px] mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="text-[14px]">
                  <div className="font-medium">{event.date}</div>
                  <div className="text-[#64748B]">{event.time}</div>
                  <div className="text-[#64748B] mt-1">{event.location}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Calendar */}
        <section className="mt-16 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-[28px] font-bold">
              Kalender Event Desa Manud Jaya
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-[280px]">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-[20px] font-medium">May 2024</span>
                </div>
                <Calendar
                  value={new Date(2024, 4, 1)}
                  tileClassName={tileClassName}
                  showNavigation={false}
                  formatShortWeekday={(locale, date) =>
                    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]
                  }
                />
              </div>
              <div className="lg:flex-1 lg:pl-8 lg:border-l border-gray-100">
                <div className="text-[#64748B] space-y-2 text-[15px]">
                  {calendarEvents.map((event, index) => (
                    <div key={index} className="text-[#6B7280]">
                      {event.date.getDate()} May 2024:{' '}
                      <span className="text-[#374151]">{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
