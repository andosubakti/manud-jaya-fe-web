import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export default function PaketWisataPage() {
  const paketWisata = [
    {
      id: 1,
      title: 'Paket Wisata Budaya',
      description:
        'Jelajahi kekayaan budaya Desa Manud Jaya dengan mengunjungi berbagai situs budaya, menyaksikan pertunjukan tradisional, dan belajar kerajinan tangan dari para pengrajin lokal.',
      duration: '1 Hari',
      price: 'Rp 150.000',
      image: '/images/paket-budaya.jpg',
      features: [
        'Kunjungan ke situs budaya',
        'Pertunjukan tari tradisional',
        'Workshop kerajinan tangan',
        'Makan siang dengan kuliner lokal',
      ],
    },
    {
      id: 2,
      title: 'Paket Wisata Alam',
      description:
        'Nikmati keindahan alam Desa Manud Jaya dengan berbagai aktivitas outdoor seperti trekking, berkemah, dan menikmati pemandangan alam yang menakjubkan.',
      duration: '2 Hari 1 Malam',
      price: 'Rp 350.000',
      image: '/images/paket-alam.jpg',
      features: [
        'Trekking ke destinasi alam',
        'Berkemah di alam terbuka',
        'Makan pagi, siang, dan malam',
        'Pemandu wisata profesional',
      ],
    },
    {
      id: 3,
      title: 'Paket Wisata Kuliner',
      description:
        'Rasakan cita rasa autentik kuliner Desa Manud Jaya dengan mengunjungi berbagai warung makan tradisional, belajar memasak masakan lokal, dan menikmati berbagai hidangan khas.',
      duration: '1 Hari',
      price: 'Rp 200.000',
      image: '/images/paket-kuliner.jpg',
      features: [
        'Kunjungan ke warung makan tradisional',
        'Kelas memasak masakan lokal',
        'Makan siang dan malam',
        'Oleh-oleh kuliner lokal',
      ],
    },
    {
      id: 4,
      title: 'Paket Wisata Lengkap',
      description:
        'Nikmati pengalaman lengkap di Desa Manud Jaya dengan menggabungkan wisata budaya, alam, dan kuliner dalam satu paket wisata yang komprehensif.',
      duration: '3 Hari 2 Malam',
      price: 'Rp 750.000',
      image: '/images/paket-lengkap.jpg',
      features: [
        'Semua aktivitas dari paket budaya',
        'Semua aktivitas dari paket alam',
        'Semua aktivitas dari paket kuliner',
        'Akomodasi selama 2 malam',
      ],
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4 pt-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Paket Wisata Desa Manud Jaya
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paketWisata.map((paket) => (
          <Card key={paket.id}>
            <div className="relative h-64 w-full">
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">
                  Gambar {paket.title}
                </span>
              </div>
            </div>

            <CardHeader>
              <CardTitle>{paket.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p
                className="text-muted-foreground mb-4"
                dangerouslySetInnerHTML={{ __html: paket.description }}
              />

              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Durasi: {paket.duration}
                </span>
                <span className="text-lg font-bold text-primary">
                  {paket.price}
                </span>
              </div>

              <h3 className="font-semibold mb-2">Fitur Paket:</h3>
              <ul className="list-disc list-inside mb-4 text-muted-foreground">
                {paket.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Link
                href={`/paket-wisata/${paket.id}`}
                className="text-primary hover:underline"
              >
                Detail Paket
              </Link>
              <Link
                href="/kontak"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Pesan Sekarang
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
            Semua paket wisata dapat disesuaikan dengan kebutuhan dan preferensi
            Anda. Silakan hubungi kami untuk informasi lebih lanjut atau untuk
            membuat paket wisata yang disesuaikan.
          </p>
          <p className="text-muted-foreground">
            Harga yang tercantum adalah harga per orang untuk minimal 2 orang.
            Harga dapat berubah tanpa pemberitahuan sebelumnya.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
