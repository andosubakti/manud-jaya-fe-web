'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { get } from '@/lib/helper'

interface ApiEvent {
  id: number
  documentId: string
  title: string
  startdate: string
  enddate: string
  subtitle: string
  description: string
  location: string
  price: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  picture: Array<{
    id: number
    files: Array<{
      id: number
      documentId: string
      name: string
      alternativeText: string | null
      caption: string | null
      width: number
      height: number
      formats: any | null
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl: string | null
      provider: string
      provider_metadata: any | null
      createdAt: string
      updatedAt: string
      publishedAt: string
    }>
  }>
}

interface CalendarTileProperties {
  date: Date
  view: string
}

export default function AtraksiAcaraPage() {
  // const mainAttractions = [
  //   {
  //     title: 'Bukit Purnama',
  //     description:
  //       'Terletak di sisi timur desa. Bukit dengan panorama pegunungan yang indah, menjadi spot favorit untuk menyaksikan matahari terbit. Pengunjung dapat menikmati udara segar pegunungan dan keindahan alam sekitar.',
  //     openHours: 'Setiap hari pukul 05.00 - 18.00',
  //     price: 'Rp10.000/orang',
  //     image: 'https://picsum.photos/id/110/800/600',
  //   },
  //   {
  //     title: 'Air Terjun Manud',
  //     description:
  //       'Air terjun alami yang bersumber di pegunungan Manud. Selain untuk wisata, air terjun ini juga dimanfaatkan untuk irigasi sawah di sekitar desa. Pengunjung dapat menikmati gemercik air dan kesejukan alam.',
  //     openHours: 'Setiap hari pukul 08.00 - 17.00',
  //     price: 'Rp15.000/orang',
  //     image: 'https://picsum.photos/id/145/800/600',
  //   },
  //   {
  //     title: 'Galeri Batik Lereng Manud',
  //     description:
  //       'Berlokasi di pusat Desa Manud. Galeri ini menampilkan hasil karya batik khas Manud dengan motif yang terinspirasi dari alam sekitar. Pengunjung dapat melihat proses pembuatan dan mencoba membatik.',
  //     openHours: 'Senin-Sabtu pukul 09.00 - 16.30',
  //     price: 'Rp25.000/orang (termasuk workshop)',
  //     image: 'https://picsum.photos/id/175/800/600',
  //   },
  //   {
  //     title: 'Sentra Anyaman Tunas Lestari',
  //     description:
  //       'Terletak di bagian Selatan desa. Sentra kerajinan anyaman bambu yang masih aktif memproduksi berbagai produk kerajinan. Pengunjung dapat melihat proses pembuatan dan membeli produk langsung.',
  //     openHours: 'Senin-Sabtu pukul 08.00 - 16.00',
  //     price: 'Gratis (harga sesuai produk yang dibeli)',
  //     image: 'https://picsum.photos/id/180/800/600',
  //   },
  // ]

  const [apiEvents, setApiEvents] = useState<ApiEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEventsData = async () => {
    try {
      setIsLoading(true)
      const response = await get(
        '/events?populate[picture][populate]=*&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=100',
      )
      if (response?.data) {
        setApiEvents(response.data)
      }
      setError(null)
    } catch (err) {
      console.error('Error fetching events data:', err)
      setError('Gagal memuat data acara. Silakan coba lagi nanti.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEventsData()
  }, [])

  // Array of selected dates from apiEvents
  const selectedDates = apiEvents.map((event) => new Date(event.startdate))

  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setCurrentDate(value)
    }
  }

  const handleActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null
  }) => {
    if (activeStartDate) {
      setCurrentDate(activeStartDate)
    }
  }

  const tileClassName = ({
    date,
    view,
  }: CalendarTileProperties): string | null => {
    if (view === 'month') {
      const today = new Date()
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      const isEventDate = selectedDates.some(
        (selectedDate) =>
          selectedDate.getDate() === date.getDate() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getFullYear() === date.getFullYear(),
      )

      if (isToday && isEventDate) {
        return 'event-date today'
      } else if (isToday) {
        return 'today'
      } else if (isEventDate) {
        return 'event-date'
      }
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
        {/* <section className="mt-8">
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
        </section> */}

        {/* Events */}
        <section className="mt-16">
          <h2 className="text-[28px] font-bold mb-6">
            Acara & Event di Desa Wisata
          </h2>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Memuat data acara...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiEvents.map((event) => (
                <div key={event.id} className="rounded-xl p-6">
                  <div className="relative aspect-[4/3] rounded-t-xl overflow-hidden mb-4">
                    <Image
                      src={
                        event.picture?.[0]?.files?.[0]?.url
                          ? `${event.picture[0].files[0].url}`
                          : 'https://picsum.photos/id/110/800/600'
                      }
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-[16px] font-semibold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-[#64748B] text-[14px] mb-4 leading-relaxed">
                    {event.subtitle}
                  </p>
                  <div className="text-[14px]">
                    <div className="font-medium">Tanggal & Waktu:</div>
                    <div className="text-[#64748B]">
                      {new Date(event.startdate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      |{' '}
                      {new Date(event.startdate).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      -{' '}
                      {new Date(event.enddate).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      WIB
                    </div>
                    <div className="text-[#64748B] mt-1">{event.location}</div>
                    {event.price > 0 && (
                      <div className="text-[#64748B] mt-1">
                        Harga: Rp{event.price.toLocaleString('id-ID')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
                  <span className="text-[20px] font-medium">
                    {currentDate.toLocaleString('id-ID', { month: 'long' })}{' '}
                    {currentDate.getFullYear()}
                  </span>
                </div>
                <Calendar
                  value={currentDate}
                  onChange={handleDateChange}
                  onActiveStartDateChange={handleActiveStartDateChange}
                  tileClassName={tileClassName}
                  showNavigation={true}
                  calendarType="iso8601"
                  formatShortWeekday={(locale, date) =>
                    ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][
                      (date.getDay() + 6) % 7
                    ]
                  }
                />
              </div>
              <div className="lg:flex-1 lg:pl-8 lg:border-l border-gray-100">
                <div className="text-[#64748B] space-y-2 text-[15px]">
                  {apiEvents.map((event, index) => (
                    <div key={index} className="text-[#6B7280]">
                      {new Date(event.startdate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      :<span className="text-[#374151]">{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .event-date {
          background-color: #fef3c7 !important;
          color: #92400e !important;
          font-weight: 600 !important;
        }

        .today {
          background-color: #e5e7eb !important;
          color: #1f2937 !important;
          font-weight: 600 !important;
        }

        .event-date.today {
          background-color: #fef3c7 !important;
          color: #92400e !important;
          font-weight: 600 !important;
          border: 2px solid #1f2937 !important;
        }

        .react-calendar {
          width: 100% !important;
          border: none !important;
          font-family: inherit !important;
        }
      `}</style>
    </main>
  )
}
