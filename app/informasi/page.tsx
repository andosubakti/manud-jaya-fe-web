'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb } from '../../components/breadcrumb'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { get } from '@/lib/helper'
import { useEffect, useState } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

// Types for API response
interface BannerImage {
  id: number
  url: string
  formats?: {
    thumbnail?: {
      url: string
    }
    large?: {
      url: string
    }
    medium?: {
      url: string
    }
    small?: {
      url: string
    }
  }
}

interface InfoBanner {
  __component: string
  id: number
  banner: BannerImage[]
}

interface InfoInformasiDasarDesa {
  __component: string
  id: number
  title: string | null
  description: string
}

interface InfoDemografiPenduduk {
  __component: string
  id: number
  title: string
  jumlah_penduduk: string
  luas: number
  partisipasi: number
}

interface InfoLokasiDesa {
  __component: string
  id: number
  longitude: string
  latitude: string
  accomodation: string
  title: string | null
}

interface AgeDemography {
  id: number
  documentId: string
  amount: number
  gender: 'male' | 'female'
  age_category: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Update interface for occupation demographics to match exact API response
interface OccupationDemography {
  id: number
  documentId: string
  occupation: string
  amount: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Update interface for education demographics to match exact API response
interface EducationDemography {
  id: number
  documentId: string
  amount: number
  education: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface InfoPageData {
  id: number
  title: string
  content_page: (
    | InfoBanner
    | InfoInformasiDasarDesa
    | InfoDemografiPenduduk
    | InfoLokasiDesa
  )[]
}

export default function InformasiPage() {
  // Info page data state
  const [infoPageData, setInfoPageData] = useState<InfoPageData | null>(null)
  // Age demography state
  const [ageDemographyData, setAgeDemographyData] = useState<AgeDemography[]>(
    [],
  )
  // Add occupation demography state
  const [occupationDemographyData, setOccupationDemographyData] = useState<
    OccupationDemography[]
  >([])
  // Add education demography state
  const [educationDemographyData, setEducationDemographyData] = useState<
    EducationDemography[]
  >([])

  // Function to fetch info page data
  const fetchInfoPageData = async () => {
    try {
      const res = await get('/info-page?populate[content_page][populate]=*')
      if (res?.data) {
        setInfoPageData(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch info page:', error)
      return null
    }
  }

  // Function to fetch age demography data
  const fetchAgeDemographyData = async () => {
    try {
      const res = await get('/age-demographies?populate[populate]=*')
      if (res?.data) {
        setAgeDemographyData(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch age demography:', error)
      return null
    }
  }

  // Function to fetch occupation demography data
  const fetchOccupationDemographyData = async () => {
    try {
      const res = await get('/occupation-demographies?populate[populate]=*')
      if (res?.data) {
        setOccupationDemographyData(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch occupation demography:', error)
      return null
    }
  }

  // Add function to fetch education demography data
  const fetchEducationDemographyData = async () => {
    try {
      const res = await get('/education-demographies?populate[populate]=*')
      if (res?.data) {
        setEducationDemographyData(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch education demography:', error)
      return null
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchInfoPageData()
    fetchAgeDemographyData()
    fetchOccupationDemographyData()
    fetchEducationDemographyData()
  }, [])

  const bannerImages =
    (infoPageData?.content_page.find(
      (item) => item.__component === 'informasi-desa.info-banner',
    ) as InfoBanner)?.banner || []

  const infoDasarDesa = infoPageData?.content_page.find(
    (item) => item.__component === 'informasi-desa.info-informasi-dasar-desa',
  ) as InfoInformasiDasarDesa

  const infoLokasiDesa = infoPageData?.content_page.find(
    (item) => item.__component === 'informasi-desa.info-lokasi-desa',
  ) as InfoLokasiDesa

  // Update demographicData to use exact education data
  const demographicData = {
    totalPenduduk:
      (infoPageData?.content_page.find(
        (item) => item.__component === 'informasi-desa.info-demografi-penduduk',
      ) as InfoDemografiPenduduk)?.jumlah_penduduk || '2.800 jiwa',
    luasDesa:
      (infoPageData?.content_page.find(
        (item) => item.__component === 'informasi-desa.info-demografi-penduduk',
      ) as InfoDemografiPenduduk)?.luas || '1.200 hektare',
    tingkatPartisipasi:
      (infoPageData?.content_page.find(
        (item) => item.__component === 'informasi-desa.info-demografi-penduduk',
      ) as InfoDemografiPenduduk)?.partisipasi || '77%',
    distribusiUsia:
      ageDemographyData.length > 0
        ? Object.values(
            ageDemographyData.reduce((acc, curr) => {
              const category = curr.age_category
              if (!acc[category]) {
                acc[category] = {
                  kategori: category,
                  laki: 0,
                  perempuan: 0,
                }
              }
              if (curr.gender === 'male') {
                acc[category].laki = curr.amount
              } else {
                acc[category].perempuan = curr.amount
              }
              return acc
            }, {} as Record<string, { kategori: string; laki: number; perempuan: number }>),
          )
        : [
            { kategori: 'Balita (0-4)', laki: 225, perempuan: 256 },
            { kategori: 'Anak-anak (5-15)', laki: 176, perempuan: 189 },
            { kategori: 'Remaja (16-17)', laki: 43, perempuan: 400 },
            { kategori: 'Dewasa Muda (18-25)', laki: 35, perempuan: 37 },
            { kategori: 'Dewasa (26-35)', laki: 35, perempuan: 37 },
            { kategori: 'Paruh Baya (36-50)', laki: 5, perempuan: 10 },
            { kategori: 'Lansia Awal (51-64)', laki: 5, perempuan: 10 },
            { kategori: 'Lansia (>65)', laki: 1, perempuan: 1 },
          ],
    persentaseGender:
      ageDemographyData.length > 0
        ? (() => {
            const totalMale = ageDemographyData
              .filter((item) => item.gender === 'male')
              .reduce((sum, item) => sum + item.amount, 0)
            const totalFemale = ageDemographyData
              .filter((item) => item.gender === 'female')
              .reduce((sum, item) => sum + item.amount, 0)
            const total = totalMale + totalFemale
            return {
              lakiLaki: Math.round((totalMale / total) * 100),
              perempuan: Math.round((totalFemale / total) * 100),
            }
          })()
        : { lakiLaki: 40, perempuan: 60 },
    mataPencaharian:
      occupationDemographyData.length > 0
        ? occupationDemographyData.map((item) => ({
            pekerjaan: item.occupation,
            jumlah: item.amount,
          }))
        : [
            { pekerjaan: 'Petani', jumlah: 52 },
            { pekerjaan: 'Peternak', jumlah: 74 },
            { pekerjaan: 'Nelayan', jumlah: 64 },
            { pekerjaan: 'Pengrajin', jumlah: 116 },
            { pekerjaan: 'Pedagang', jumlah: 96 },
            { pekerjaan: 'Pemandu Wisata', jumlah: 83 },
            { pekerjaan: 'Perangkat Desa', jumlah: 71 },
          ],
    tingkatPendidikan:
      educationDemographyData.length > 0
        ? (() => {
            const total = educationDemographyData.reduce(
              (sum, item) => sum + item.amount,
              0,
            )
            return educationDemographyData.map((item) => ({
              tingkat: item.education,
              jumlah: item.amount,
              persentase: Math.round((item.amount / total) * 100),
            }))
          })()
        : [
            { tingkat: 'S2/S3', jumlah: 46, persentase: 43 },
            { tingkat: 'S1', jumlah: 24, persentase: 22 },
            { tingkat: 'SMA', jumlah: 15, persentase: 14 },
            { tingkat: 'SMP', jumlah: 8, persentase: 7 },
            { tingkat: 'SD', jumlah: 7, persentase: 7 },
            { tingkat: 'Tidak Sekolah', jumlah: 7, persentase: 7 },
          ],
    totalPendidikan:
      educationDemographyData.length > 0
        ? educationDemographyData.reduce((sum, item) => sum + item.amount, 0)
        : 107,
    bahasa: ['Bahasa Indonesia', 'Bahasa Sunda'],
  }

  // Chart options and data
  const ageDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  }

  const ageDistributionData = {
    labels: demographicData.distribusiUsia.map((item) => item.kategori),
    datasets: [
      {
        label: 'Laki-laki',
        data: demographicData.distribusiUsia.map((item) => item.laki),
        backgroundColor: 'rgb(59, 130, 246)',
        borderRadius: 6,
      },
      {
        label: 'Perempuan',
        data: demographicData.distribusiUsia.map((item) => item.perempuan),
        backgroundColor: 'rgb(236, 72, 153)',
        borderRadius: 6,
      },
    ],
  }

  const genderDistributionData = {
    labels: ['Laki-laki', 'Perempuan'],
    datasets: [
      {
        data: [
          demographicData.persentaseGender.lakiLaki,
          demographicData.persentaseGender.perempuan,
        ],
        backgroundColor: ['rgb(59, 130, 246)', 'rgb(236, 72, 153)'],
        borderWidth: 0,
      },
    ],
  }

  const genderDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: '70%',
  }

  // Mata Pencaharian Chart Options
  const mataPencaharianOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  }

  const mataPencaharianData = {
    labels: demographicData.mataPencaharian.map((item) => item.pekerjaan),
    datasets: [
      {
        data: demographicData.mataPencaharian.map((item) => item.jumlah),
        backgroundColor: 'rgb(234, 179, 108)',
        borderRadius: 6,
      },
    ],
  }

  // Tingkat Pendidikan Chart Options
  const pendidikanOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: '70%',
  }

  const pendidikanData = {
    labels: demographicData.tingkatPendidikan.map((item) => item.tingkat),
    datasets: [
      {
        data: demographicData.tingkatPendidikan.map((item) => item.persentase),
        backgroundColor: [
          'rgb(124, 58, 237)',
          'rgb(139, 92, 246)',
          'rgb(167, 139, 250)',
          'rgb(196, 181, 253)',
          'rgb(221, 214, 254)',
          'rgb(237, 233, 254)',
        ],
        borderWidth: 0,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background px-2 md:px-12">
      {/* Hero Section with Title and Breadcrumb */}
      <section className="pt-20 pb-8 bg-background">
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            {infoPageData?.title || 'Halaman Informasi Umum Desa'}
          </h1>
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Informasi', href: '/informasi' },
            ]}
          />
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-8 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Mobile Gallery */}
          <div className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4">
            {bannerImages.map((image: BannerImage, index: number) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] w-[85vw] shrink-0 snap-center ml-4"
              >
                <Image
                  src={image.url}
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300 rounded-lg"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Desktop Gallery */}
          <div className="hidden md:grid grid-cols-4 gap-4">
            {/* Left Column */}
            <div className="col-span-1 space-y-4">
              {bannerImages
                .slice(0, 2)
                .map((image: BannerImage, index: number) => (
                  <div
                    key={image.id}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt={`Gallery Left ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
            </div>

            {/* Center Column - Main Image */}
            <div className="col-span-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                {bannerImages[4]?.url ? (
                  <Image
                    src={bannerImages[4].url}
                    alt="Main Gallery"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    priority
                  />
                ) : null}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 space-y-4">
              {bannerImages
                .slice(2, 4)
                .map((image: BannerImage, index: number) => (
                  <div
                    key={image.id}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt={`Gallery Right ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <div
              className="prose max-w-none space-y-6"
              dangerouslySetInnerHTML={{
                __html: infoDasarDesa?.description || '',
              }}
            />
          </div>
        </div>
      </section>

      {/* Demografi Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Demografi Desa Wisata Manud Jaya
            </h2>

            {/* Stats Grid */}
            <div className="flex flex-col items-center gap-6 mb-12">
              {/* Total Penduduk & Luas Desa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                <div className="bg-background rounded-xl p-8 shadow-md text-center">
                  <p className="text-muted-foreground/80 text-lg mb-2">
                    Total Jumlah Penduduk
                  </p>
                  <p className="text-3xl font-bold">
                    {demographicData.totalPenduduk}
                  </p>
                </div>
                <div className="bg-background rounded-xl p-8 shadow-md text-center">
                  <p className="text-muted-foreground/80 text-lg mb-2">
                    Luas Desa
                  </p>
                  <p className="text-3xl font-bold">
                    {demographicData.luasDesa}
                  </p>
                </div>
              </div>

              {/* Participation Rate */}
              <div className="bg-background rounded-xl p-8 shadow-md text-center w-full max-w-xl">
                <p className="text-muted-foreground/80 text-lg mb-2">
                  Tingkat Partisipasi Penduduk untuk Pariwisata
                </p>
                <p className="text-3xl font-bold">
                  {demographicData.tingkatPartisipasi}
                </p>
              </div>
            </div>

            {/* Age Distribution Chart */}
            <div className="bg-background rounded-xl p-8 shadow-md mb-12">
              <h3 className="text-xl font-semibold mb-6">
                Distribusi Usia Penduduk
              </h3>
              <div className="h-[400px] w-full">
                <Bar
                  options={ageDistributionOptions}
                  data={ageDistributionData}
                />
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="bg-background rounded-xl p-8 shadow-md mb-12">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Persentase Gender
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-[200px] h-[200px] relative">
                  <Doughnut
                    data={genderDistributionData}
                    options={genderDistributionOptions}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-2 bg-[rgb(59,130,246)]" />
                    <span className="text-lg font-medium text-muted-foreground">
                      {demographicData.persentaseGender.lakiLaki}%
                    </span>
                    <span className="text-lg text-muted-foreground/60">
                      Laki-laki
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-2 bg-[rgb(236,72,153)]" />
                    <span className="text-lg font-medium text-muted-foreground">
                      {demographicData.persentaseGender.perempuan}%
                    </span>
                    <span className="text-lg text-muted-foreground/60">
                      Perempuan
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mata Pencaharian */}
            <div className="bg-background rounded-xl p-8 shadow-md mb-12">
              <h3 className="text-xl font-semibold mb-6">Mata Pencaharian</h3>
              <div className="h-[300px] w-full">
                <Bar
                  options={mataPencaharianOptions}
                  data={mataPencaharianData}
                />
              </div>
            </div>

            {/* Tingkat Pendidikan */}
            <div className="bg-background rounded-xl p-8 shadow-md mb-12">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Tingkat Pendidikan
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-[200px] h-[200px] relative">
                  <Doughnut data={pendidikanData} options={pendidikanOptions} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-2xl font-bold">
                      {demographicData.totalPendidikan}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 w-full max-w-sm">
                  {demographicData.tingkatPendidikan.map((item, index) => (
                    <div key={item.tingkat} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            pendidikanData.datasets[0].backgroundColor[index],
                        }}
                      />
                      <span className="text-muted-foreground min-w-[80px]">
                        {item.tingkat}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        {item.persentase}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bahasa */}
            <div className="bg-background rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Bahasa yang sering digunakan
              </h3>
              <div className="flex justify-center gap-4">
                {demographicData.bahasa.map((bahasa) => (
                  <div
                    key={bahasa}
                    className="bg-[rgb(99,102,241)] text-white px-8 py-4 rounded-lg text-center font-medium"
                  >
                    {bahasa}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Peta Lokasi & Akomodasi Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Peta Lokasi */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Peta Lokasi</h2>
                <div className="relative">
                  <div className="aspect-square w-full rounded-xl overflow-hidden shadow-md">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6277587518323!2d${infoLokasiDesa?.longitude}!3d${infoLokasiDesa?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e3f0b4b04a1d%3A0x4b4b4b4b4b4b4b4b!2sMandalawangi%2C%20Bandung%20Barat%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <Link
                    href={`https://www.google.com/maps?q=${infoLokasiDesa?.latitude},${infoLokasiDesa?.longitude}`}
                    target="_blank"
                    className="absolute left-1/2 -translate-x-1/2 bottom-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Akomodasi */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Akomodasi</h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: infoLokasiDesa?.accomodation || '',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
