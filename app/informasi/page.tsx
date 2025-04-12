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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

// Mock images from Picsum
const mockImages = {
  mainImage: 'https://picsum.photos/id/15/1200/800', // tent
  leftTop: 'https://picsum.photos/id/10/600/400', // hiking
  leftBottom: 'https://picsum.photos/id/29/600/400', // mountain view
  rightTop: 'https://picsum.photos/id/17/600/400', // tent by lake
  rightBottom: 'https://picsum.photos/id/65/600/400', // jeep
}

// Data demografi
const demographicData = {
  totalPenduduk: '2.800 jiwa',
  luasDesa: '1.200 hektare',
  tingkatPartisipasi: '77%',
  distribusiUsia: [
    { kategori: 'Balita (0-4)', laki: 225, perempuan: 256 },
    { kategori: 'Anak-anak (5-15)', laki: 176, perempuan: 189 },
    { kategori: 'Remaja (12-17)', laki: 43, perempuan: 400 },
    { kategori: 'Dewasa Muda (18-25)', laki: 35, perempuan: 37 },
    { kategori: 'Dewasa (26-35)', laki: 35, perempuan: 37 },
    { kategori: 'Paruh Baya (36-50)', laki: 5, perempuan: 10 },
    { kategori: 'Lansia Awal (51-64)', laki: 5, perempuan: 10 },
    { kategori: 'Lansia (>65)', laki: 1, perempuan: 1 },
  ],
  persentaseGender: {
    lakiLaki: 40,
    perempuan: 60,
  },
  mataPencaharian: [
    { pekerjaan: 'Petani', jumlah: 45 },
    { pekerjaan: 'Peternak', jumlah: 65 },
    { pekerjaan: 'Nelayan', jumlah: 60 },
    { pekerjaan: 'Pengrajin', jumlah: 120 },
    { pekerjaan: 'Pedagang', jumlah: 90 },
    { pekerjaan: 'Pemandu Wisata', jumlah: 75 },
    { pekerjaan: 'Perangkat Desa', jumlah: 55 },
  ],
  tingkatPendidikan: [
    { tingkat: 'S2/S3', persentase: 46 },
    { tingkat: 'S1', persentase: 24 },
    { tingkat: 'SMA', persentase: 15 },
    { tingkat: 'SMP', persentase: 8 },
    { tingkat: 'SD', persentase: 7 },
    { tingkat: 'Tidak Sekolah', persentase: 7 },
  ],
  totalPendidikan: 1253,
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

export default function InformasiPage() {
  return (
    <main className="min-h-screen bg-background px-12">
      {/* Hero Section with Title and Breadcrumb */}
      <section className="pt-20 pb-8 bg-background">
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Halaman Informasi Umum Desa
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
            <div className="relative aspect-[4/3] w-[85vw] shrink-0 snap-center ml-4">
              <Image
                src={mockImages.mainImage}
                alt="Main Gallery"
                fill
                className="object-cover hover:scale-110 transition-transform duration-300 rounded-lg"
                priority
              />
            </div>
            <div className="relative aspect-[4/3] w-[85vw] shrink-0 snap-center">
              <Image
                src={mockImages.leftTop}
                alt="Gallery Left Top"
                fill
                className="object-cover hover:scale-110 transition-transform duration-300 rounded-lg"
              />
            </div>
            <div className="relative aspect-[4/3] w-[85vw] shrink-0 snap-center">
              <Image
                src={mockImages.leftBottom}
                alt="Gallery Left Bottom"
                fill
                className="object-cover hover:scale-110 transition-transform duration-300 rounded-lg"
              />
            </div>
            <div className="relative aspect-[4/3] w-[85vw] shrink-0 snap-center">
              <Image
                src={mockImages.rightTop}
                alt="Gallery Right Top"
                fill
                className="object-cover hover:scale-110 transition-transform duration-300 rounded-lg"
              />
            </div>
            <div className="relative aspect-[4/3] w-[85vw] shrink-0 snap-center mr-8">
              <Image
                src={mockImages.rightBottom}
                alt="Gallery Right Bottom"
                fill
                className="object-cover hover:scale-110 transition-transform duration-300 rounded-lg"
              />
            </div>
          </div>

          {/* Desktop Gallery */}
          <div className="hidden md:grid grid-cols-4 gap-4">
            {/* Left Column */}
            <div className="col-span-1 space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={mockImages.leftTop}
                  alt="Gallery Left Top"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={mockImages.leftBottom}
                  alt="Gallery Left Bottom"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Center Column - Main Image */}
            <div className="col-span-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={mockImages.mainImage}
                  alt="Main Gallery"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={mockImages.rightTop}
                  alt="Gallery Right Top"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={mockImages.rightBottom}
                  alt="Gallery Right Bottom"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <h2 className="text-3xl font-bold mb-6">Desa Wisata Manud Jaya</h2>
            <div className="prose max-w-none space-y-6">
              <p className="text-muted-foreground">
                Desa Wisata Manud Jaya adalah desa yang terletak di Kecamatan
                Mandalawangi, Kabupaten Bandung Barat, Jawa Barat. Dikelilingi
                perbukitan hijau dan berada di ketinggian sekitar 800 meter di
                atas permukaan laut, desa ini menawarkan suasana sejuk, alami,
                dan tenang yang cocok untuk pelarian dari hiruk-pikuk kota. Luas
                wilayahnya mencapai sekitar 1.200 hektar dengan populasi sekitar
                2.800 jiwa yang sebagian besar bekerja di sektor pertanian,
                perkebunan, serta pengembangan wisata berbasis komunitas.
              </p>
              <p className="text-muted-foreground">
                Desa ini memiliki potensi alam dan budaya yang kaya, mulai dari
                hamparan sawah, kebun kopi dan cengkeh, hingga hutan lindung
                yang menjadi daya tarik ekowisata. Dengan dukungan masyarakat
                yang ramah serta akses transportasi yang mudah dijangkau dari
                Bandung dan Jakarta, Desa Wisata Manud Jaya siap menjadi
                destinasi favorit untuk wisata alam, budaya, dan edukasi.
              </p>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">
                  Lokasi Desa Wisata Desa Manud Jaya
                </h3>
                <p className="text-muted-foreground font-medium mb-2">
                  Alamat Lengkap:
                </p>
                <p className="text-muted-foreground">
                  Desa Manud Jaya, Kecamatan Mandalawangi, Kabupaten Bandung
                  Barat, Provinsi Jawa Barat, Indonesia
                </p>
                <p className="text-muted-foreground mt-2">
                  Koordinat GPS: -6.8270, 107.4591
                </p>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">
                  Kontak Desa Wisata Manud Jaya
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Telepon/WhatsApp: 0812-3456-7890</li>
                  <li>• Email: info@manudjaya.desa.id</li>
                  <li>• Instagram: @desawisatamanudjaya</li>
                  <li>• Facebook: Desa Wisata Manud Jaya</li>
                </ul>
              </div>
            </div>
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6277587518323!2d107.45691531477395!3d-6.827016995067498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e3f0b4b04a1d%3A0x4b4b4b4b4b4b4b4b!2sMandalawangi%2C%20Bandung%20Barat%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <Link
                    href="https://www.google.com/maps?q=-6.8270,107.4591"
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
                <div className="space-y-4">
                  {/* Darat */}
                  <div className="flex items-start gap-8">
                    <div className="min-w-[100px] px-6 py-3 bg-secondary/20 rounded-full text-center">
                      <span className="text-muted-foreground">Darat</span>
                    </div>
                    <p className="text-muted-foreground pt-3 text-justify">
                      Wisatawan dapat menggunakan kendaraan pribadi atau umum
                      melalui jalur darat dengan waktu tempuh sekitar 2 jam dari
                      Bandung atau 3,5 jam dari Jakarta.
                    </p>
                  </div>

                  {/* Laut */}
                  <div className="flex items-start gap-8">
                    <div className="min-w-[100px] px-6 py-3 bg-secondary/20 rounded-full text-center">
                      <span className="text-muted-foreground">Laut</span>
                    </div>
                    <p className="text-muted-foreground pt-3 text-justify">
                      Jika menggunakan jalur laut, wisatawan bisa turun di
                      Pelabuhan Tanjung Priok dan melanjutkan perjalanan darat
                      menuju lokasi desa.
                    </p>
                  </div>

                  {/* Udara */}
                  <div className="flex items-start gap-8">
                    <div className="min-w-[100px] px-6 py-3 bg-secondary/20 rounded-full text-center">
                      <span className="text-muted-foreground">Udara</span>
                    </div>
                    <p className="text-muted-foreground pt-3 text-justify">
                      Bagi yang datang dari luar pulau, tersedia jalur udara
                      melalui Bandara Husein Sastranegara (Bandung) atau Bandara
                      Kertajati (Majalengka), kemudian melanjutkan perjalanan
                      darat ke desa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
