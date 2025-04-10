import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export default function AtraksiAcaraPage() {
  const atraksiAcara = [
    {
      id: 1,
      title: 'Festival Budaya Tahunan',
      description:
        'Festival budaya tahunan yang menampilkan berbagai pertunjukan seni tradisional, pameran kerajinan tangan, dan berbagai aktivitas budaya lainnya.',
      date: 'Setiap bulan Agustus',
      location: 'Lapangan Desa Manud Jaya',
      image: '/images/festival-budaya.jpg',
      highlights: [
        'Pertunjukan tari tradisional',
        'Pameran kerajinan tangan',
        'Kuliner tradisional',
        'Lomba-lomba budaya',
      ],
    },
    {
      id: 2,
      title: 'Pertunjukan Wayang Kulit',
      description:
        'Pertunjukan wayang kulit yang menampilkan cerita-cerita dari epos Mahabharata dan Ramayana dengan iringan musik gamelan tradisional.',
      date: 'Setiap bulan purnama',
      location: 'Pendopo Desa',
      image: '/images/wayang-kulit.jpg',
      highlights: [
        'Dalang profesional',
        'Musik gamelan live',
        'Snack tradisional',
        'Interaksi dengan dalang',
      ],
    },
    {
      id: 3,
      title: 'Workshop Kerajinan Tangan',
      description:
        'Workshop yang mengajarkan berbagai teknik kerajinan tangan tradisional seperti membatik, membuat gerabah, dan menganyam.',
      date: 'Setiap akhir pekan',
      location: 'Sanggar Kerajinan Desa',
      image: '/images/workshop-kerajinan.jpg',
      highlights: [
        'Pembelajaran langsung dari pengrajin',
        'Materi dan alat disediakan',
        'Hasil kerajinan bisa dibawa pulang',
        'Sertifikat keikutsertaan',
      ],
    },
    {
      id: 4,
      title: 'Karnaval Budaya',
      description:
        'Karnaval budaya yang menampilkan berbagai kostum tradisional, musik, dan tarian dari berbagai daerah di Indonesia.',
      date: 'Setiap Hari Kemerdekaan (17 Agustus)',
      location: 'Jalan utama Desa',
      image: '/images/karnaval-budaya.jpg',
      highlights: [
        'Kostum tradisional',
        'Musik dan tarian',
        'Floats dekoratif',
        'Hadiah untuk peserta terbaik',
      ],
    },
    {
      id: 5,
      title: 'Pameran Seni Rupa',
      description:
        'Pameran seni rupa yang menampilkan karya-karya seniman lokal dan nasional dengan tema budaya dan kehidupan desa.',
      date: 'Setiap 3 bulan sekali',
      location: 'Galeri Seni Desa',
      image: '/images/pameran-seni.jpg',
      highlights: [
        'Karya seniman lokal dan nasional',
        'Diskusi seni',
        'Workshop melukis',
        'Auction karya seni',
      ],
    },
    {
      id: 6,
      title: 'Festival Kuliner',
      description:
        'Festival kuliner yang menampilkan berbagai hidangan tradisional dan modern dari berbagai daerah di Indonesia.',
      date: 'Setiap bulan Desember',
      location: 'Area Pasar Desa',
      image: '/images/festival-kuliner.jpg',
      highlights: [
        'Berbagai stand kuliner',
        'Demo memasak',
        'Kontes memasak',
        'Oleh-oleh kuliner',
      ],
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4 pt-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Atraksi dan Acara di Desa Manud Jaya
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {atraksiAcara.map((acara) => (
          <Card key={acara.id}>
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">
                  Gambar {acara.title}
                </span>
              </div>
            </div>

            <CardHeader>
              <CardTitle>{acara.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p
                className="text-muted-foreground mb-4"
                dangerouslySetInnerHTML={{ __html: acara.description }}
              />

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-muted-foreground mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-muted-foreground">
                    {acara.date}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-muted-foreground mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-muted-foreground">
                    {acara.location}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold mb-2">Highlights:</h3>
              <ul className="list-disc list-inside mb-4 text-muted-foreground text-sm">
                {acara.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link
                href={`/atraksi-acara/${acara.id}`}
                className="text-primary hover:underline text-sm"
              >
                Detail Acara
              </Link>
              <Link
                href="/kontak"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm"
              >
                Daftar Sekarang
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Informasi Tambahan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Semua acara dan atraksi dapat berubah jadwalnya tanpa pemberitahuan
            sebelumnya. Silakan hubungi kami untuk informasi terbaru tentang
            jadwal acara.
          </p>
          <p className="text-muted-foreground">
            Beberapa acara mungkin memerlukan pendaftaran terlebih dahulu.
            Silakan periksa detail acara untuk informasi lebih lanjut.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
