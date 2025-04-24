import React from 'react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'

export default function BudayaPage() {
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

        {/* Hero Section */}
        <div className="mt-12">
          <h2 className="text-[40px] font-bold leading-tight mb-8">
            Menjaga Warisan Leluhur, Menghidupkan Tradisi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-justify">
            <div className="space-y-6">
              <p className="text-[#64748B] text-lg leading-relaxed">
                Selamat datang di Desa Manud Jaya, permata budaya di tengah
                pedesaan Indonesia. Tak hanya indah secara alam, desa ini juga
                kaya akan tradisi dan warisan budaya yang masih lestari. Lewat
                halaman ini, Anda diajak menjelajahi seni tari, musik
                tradisional, kerajinan khas, hingga upacara adat yang sarat
                makna—semua menjadi cerminan kearifan lokal yang dijunjung
                tinggi masyarakat.
              </p>
              <p className="text-[#64748B] text-lg leading-relaxed">
                Desa Manud Jaya mencerminkan keharmonisan antara kehidupan
                masyarakat dan budaya turun-temurun. Meski zaman terus
                berkembang, warganya tetap teguh melestarikan tradisi dan nilai
                luhur sebagai identitas dan kebanggaan bersama.
              </p>
            </div>
            <div className="relative h-[300px] md:h-full rounded-2xl overflow-hidden">
              <Image
                src="https://picsum.photos/id/225/800/600"
                alt="Tari Tradisional"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Adat Istiadat dan Tradisi */}
        <section className="mt-16">
          <h2 className="text-[28px] font-bold mb-6">
            Adat Istiadat dan Tradisi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: 'https://picsum.photos/id/219/800/800',
                title: 'Malam Seribu Lampion',
                description:
                  'Tradisi tahunan di mana ribuan lampion diterangi bersamaan di langit malam sebagai simbol harapan dan doa dari masyarakat.',
                time: 'Malam bulan purnama pertama setiap tahun',
              },
              {
                image: 'https://picsum.photos/id/171/800/800',
                title: 'Upacara Adat Sedekah Bumi',
                description:
                  'Ritual syukuran yang dilaksanakan dan diikuti oleh seluruh penduduk desa untuk berdoa atas hasil panen yang melimpah. Acara ini diisi dengan berbagai ritual adat dan persembahan kepada leluhur.',
                time: 'Setiap awal musim panen, pada bulan Agustus',
              },
              {
                image: 'https://picsum.photos/id/146/800/800',
                title: 'Festival Tari Topeng',
                description:
                  'Pertunjukan seni tari dengan kostumasi dan penggunaan topeng adat. Setiap tari menceritakan masing-masing karakter dan cerita rakyat yang berbeda-beda.',
                time:
                  'Setiap bulan April, bertepatan dengan peringatan hari jadi desa',
              },
              {
                image: 'https://picsum.photos/id/292/800/800',
                title: 'Pasar Budaya Minggu Pagi',
                description:
                  'Pasar tradisional yang menawarkan berbagai kerajinan dan kuliner khas, serta ditambah budaya dan edukasi yang terpadu untuk pengunjung.',
                time: 'Setiap hari Minggu pagi',
              },
            ].map((item, index) => (
              <div key={index}>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[16px] font-semibold mb-2">{item.title}</h3>
                <p className="text-[#64748B] text-[14px] mb-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[14px]">
                  <div className="font-medium">Waktu Pelaksanaan:</div>
                  <div className="text-[#64748B]">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kesenian dan Kerajinan Lokal */}
        <section className="mt-16">
          <h2 className="text-[28px] font-bold mb-6">
            Kesenian dan Kerajinan Lokal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: 'https://picsum.photos/id/225/800/800',
                title: 'Tari Rengga Manud',
                description:
                  'Tari tradisional yang menggambarkan keindahan, keanggunan, dan kekuatan para penari dalam bertutur kisah melalui doa dalam bentuk gerakan di setiap penampilannya.',
                location: 'Pendopo Desa Manud Jaya',
              },
              {
                image: 'https://picsum.photos/id/164/800/800',
                title: 'Gamelan Wira Swara',
                description:
                  'Ansambel musik tradisional khas Desa Manud Jaya yang dimainkan oleh para seniman lokal dengan alat-alat gamelan seperti bonang, saron, dan gong yang telah berusia ratusan tahun.',
                location: 'Sanggar Seni Manud Jaya',
              },
              {
                image: 'https://picsum.photos/id/175/800/800',
                title: 'Anyaman Tunas Lestari',
                description:
                  'Kerajinan dengan bahan alur anyaman dan bahan ramah yang diambil dari bambu lokal. Produk ini dibuat dan dijual langsung oleh pengrajin lokal.',
                location: 'Sanggar Kerajinan Desa Manud Jaya',
              },
              {
                image: 'https://picsum.photos/id/145/800/800',
                title: 'Batik Lereng Manud',
                description:
                  'Batik khas Desa Manud Jaya dengan motif yang menggambarkan gunung, sungai, padi dan detail lainnya. Proses pembuatannya masih menggunakan teknik tradisional.',
                location: 'Galeri Batik Lereng Jaya Manud',
              },
            ].map((item, index) => (
              <div key={index}>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[16px] font-semibold mb-2">{item.title}</h3>
                <p className="text-[#64748B] text-[14px] mb-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[14px]">
                  <div className="font-medium">Lokasi/Tempat Pentas:</div>
                  <div className="text-[#64748B]">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kuliner Khas Desa */}
        <section className="mt-16 mb-16">
          <h2 className="text-[28px] font-bold mb-6">Kuliner Khas Desa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: 'https://picsum.photos/id/306/800/800',
                title: 'Nasi Gulih Lereng',
                description:
                  'Nasi putih khas desa yang disajikan dengan sambal dan sayuran sunnah. Makanan ini menjadi menu wajib saat acara adat berlangsung.',
                location: 'Warung Bu Darmi di Jalan Rawa',
              },
              {
                image: 'https://picsum.photos/id/431/800/800',
                title: 'Wedang Pandan Seruni',
                description:
                  'Minuman hangat tradisional yang terbuat dari air rebusan pandan jawa dan rempah-rempah pilihan yang menyegarkan dan menghangatkan.',
                location: 'Warung Wedang Mbak Nanung',
              },
              {
                image: 'https://picsum.photos/id/493/800/800',
                title: 'Tiwul Manud Jaya',
                description:
                  'Olahan singkong kering yang diubah dan diolah dengan teknik padi dan dibumbui dengan rempah-rempah tradisional yang menyehatkan.',
                location: 'Toko Jaya Tradisional di Jalan Pasar',
              },
              {
                image: 'https://picsum.photos/id/312/800/800',
                title: 'Keripik Daun Singkong Sari Rasa',
                description:
                  'Keripik renyah dari daun singkong yang digoreng dengan tepung khas Manud Jaya dan diberi bumbu rahasia turun-temurun dari Pak Karta.',
                location: 'Toko Oleh-Oleh Manud di Jalan Raya',
              },
            ].map((item, index) => (
              <div key={index}>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[16px] font-semibold mb-2">{item.title}</h3>
                <p className="text-[#64748B] text-[14px] mb-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[14px]">
                  <div className="font-medium">Tempat Penjual:</div>
                  <div className="text-[#64748B]">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
