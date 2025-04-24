import React from 'react'
import Image from 'next/image'

export default function SejarahPage() {
  const timelineEvents = [
    {
      year: '1800',
      description:
        'Desa Manud Jaya pertama kali terbentuk pada abad ke-18 di mana penduduk asli mulai menetap dan mengembangkan kehidupan pertanian di wilayah yang subur. Pada masa ini, kehidupan desa sangat bergantung pada hasil bumi dan kerajinan tangan.',
    },
    {
      year: '1945',
      description:
        'Pada tahun 1945-an, Desa Manud Jaya resmi menjadi bagian dari Kecamatan Mandolawangi, Kabupaten Bandung Barat. Status administratif ini memberi peluang pada peningkatan pembangunan dan pengelolaan sumber daya alam di desa.',
    },
    {
      year: '2000',
      description:
        'Pada awal 2000-an, Desa Manud Jaya mulai menerima perhatian pemerintah untuk mengembangkan objek wisata seperti jalan desa yang lebih baik, serta akses transportasi umum. Ini membuka peluang bagi masyarakat untuk memiliki desa yang lebih modern namun tetap mempertahankan kearifan lokal.',
    },
    {
      year: '2010',
      description:
        'Pada tahun 2010-an, desa ini mulai fokus pada pengembangan potensi wisata berbasis alam dan budaya. Masyarakat mengembangkan kapasitas kerajinan tradisional dan kuliner khas, yang kemudian menarik perhatian banyak wisatawan dari dalam dan luar negeri.',
    },
    {
      year: '2020',
      description:
        'Pada tahun 2020, Desa Wisata Manud Jaya mulai dikenal luas, dengan telah banyak wisatawan yang datang setiap bulannya. Pembukaan ini memberikan tambahan ekonomi bagi masyarakat setempat dan mengembangkan desa ini sebagai tujuan wisata budaya yang diminati.',
    },
  ]

  const historicalEvents = [
    {
      title: 'Kebangkitan Manud Jaya Pasca Bencana Alam (1952)',
      description:
        'Pada tahun 1952, Desa Manud Jaya mengalami bencana alam besar berupa tanah longsor yang menghancurkan sebagian besar lahan pertanian utama. Peristiwa ini menjadi momen penting karena seluruh warga desa bersatu untuk membangun kembali kehidupan mereka dari nol. Semangat gotong-royong inilah yang memperkuat karakter masyarakat Manud Jaya sebagai komunitas yang tangguh dan harmonis.',
      image: 'https://picsum.photos/id/164/800/600',
      year: '1952',
    },
    {
      title: 'Legenda Burung Merpati dan Filosofi Desa (Awal Abad ke-19)',
      description:
        'Berdasarkan cerita turun-temurun, Desa Manud Jaya mengambil inspirasi namanya dari kisah tentang burung merpati yang dianggap membawa harapan dan kedamaian di masa sulit. Cerita ini mengakar kuat dalam identitas desa dan menjadi simbol filosofi hidup warga: kemakmuran yang lahir dari kedamaian.',
      image: 'https://picsum.photos/id/110/800/600',
      year: 'Awal Abad ke-19',
    },
    {
      title: 'Kehadiran Tokoh Inspiratif: Ki Arya Manud (1955)',
      description:
        'Ki Arya Manud adalah sosok pemimpin lokal yang dihormati karena usahanya membangkitkan desa dari keterpurukan pasca bencana dan memperkenalkan sistem pertanian berkelanjutan. Ia juga mendorong masyarakat untuk mulai mengenalkan hasil pertanian dan kerajinan tangan desa ke kota-kota besar di Jawa Barat.',
      image: 'https://picsum.photos/id/219/800/600',
      year: '1955',
    },
    {
      title: 'Awal Transformasi Desa Menjadi Desa Wisata (2010)',
      description:
        'Pada tahun 2010, generasi muda Desa Manud Jaya menginisiasi program &quot;Manud Jaya Bangkit&quot; yang mengubah desa dari desa pertanian biasa menjadi desa wisata berbasis alam dan budaya. Inisiatif ini memanfaatkan keindahan alam, tradisi lokal, dan kerajinan tangan untuk memperkenalkan desa ke wisatawan lokal dan mancanegara.',
      image: 'https://picsum.photos/id/278/800/600',
      year: '2010',
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="https://picsum.photos/id/513/1920/1080"
          alt="Sejarah Desa Hero"
          fill
          className="object-cover brightness-50 sepia"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Sejarah Desa</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Deskripsi Desa */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            Desa Wisata Manud Jaya
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Image
                src="https://picsum.photos/id/164/1200/800"
                alt="Desa Manud Jaya"
                width={1200}
                height={800}
                className="rounded-lg grayscale"
              />
            </div>
            <div className="space-y-6 text-gray-600 text-lg text-justify">
              <p>
                Desa Wisata Manud Jaya terletak di Kecamatan Mandolawangi,
                Kabupaten Bandung Barat, dan memiliki sejarah yang erat dengan
                kehidupan masyarakat agraris. Sejak masa kolonial, desa ini
                mengandalkan pertanian dan perkebunan kopi serta cengkeh sebagai
                sumber kehidupan utama. Tradisi masyarakat yang ramah dengan
                alam dan kerajinan tangan menjadi dasar bagi pengembangan wisata
                desa.
              </p>
              <p>
                Pada awal 2000-an, Desa Manud Jaya mulai mengembangkan potensi
                alam dan budaya sebagai daya tarik wisata. Melalui wisata
                berbasis alam dan budaya, desa ini menarik perhatian wisatawan
                dengan pengalaman langsung di bidang alam, kegiatan pertanian,
                serta kerajinan lokal. Kini, Desa Manud Jaya dikenal sebagai
                destinasi wisata yang ramah lingkungan, memberikan pengalaman
                yang mendalam tentang kehidupan desa dan kekayaan alamnya.
              </p>
            </div>
          </div>
        </div>

        {/* Asal Usul Nama */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            <div className="lg:w-[400px] flex-shrink-0 relative">
              <div className="relative h-[300px] lg:h-full">
                <Image
                  src="https://picsum.photos/id/110/800/800"
                  alt="Ilustrasi Asal Usul"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-8">Asal Usul Nama Desa</h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  Desa Manud Jaya, dengan segala keindahan alam dan budaya yang
                  dimilikinya, memiliki cerita menarik di balik asal-usul
                  namanya. Nama &quot;Manud Jaya&quot; konon berasal dari dua
                  kata dalam bahasa Sunda: &quot;Manud&quot; yang berarti
                  &quot;merpati&quot; dan &quot;Jaya&quot; yang berarti
                  &quot;kemakmuran&quot; atau &quot;kemenangan&quot;. Dalam
                  sejarah desa ini, merpati sering dianggap sebagai simbol
                  kedamaian dan harapan. Masyarakat desa percaya bahwa merpati
                  yang terbang bebas di udara, melambangkan kehidupan yang
                  harmonis dan penuh kedamaian. Oleh karena itu, nama
                  &quot;Manud Jaya&quot; diartikan sebagai &quot;kemakmuran yang
                  datang dari kedamaian&quot;, sebuah filosofi hidup yang
                  diterapkan oleh penduduk desa dalam menjalani kehidupan
                  mereka.
                </p>
                <p>
                  Cerita rakyat yang berkembang di desa ini mengisahkan tentang
                  seorang pemimpin desa yang sangat dihormati karena
                  kebijaksanaannya. Dikisahkan bahwa pada suatu masa, desa ini
                  menghadapi masa-masa sulit, diikuti bencana alam yang
                  menghancurkan hasil pertanian. Namun pemimpin desa tersebut
                  selalu mengajarkan pentingnya bekerja bersama dan menjaga
                  kedamaian antar sesama. Seiring berjalannya waktu, desa ini
                  berhasil bangkit dan berkembang dengan pesat, berkat kedamaian
                  dan kerjasama yang terjalin erat di antara warganya. Sejak
                  saat itu, nama &quot;Manud Jaya&quot; digunakan sebagai
                  pengingat bahwa kedamaian dan kebersamaan adalah kunci menuju
                  kemakmuran.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-16">
            Timeline Perkembangan Desa
            <br />
            Manud Jaya
          </h2>
          <div className="max-w-4xl mx-auto space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-8">
                <div className="w-24 flex-shrink-0">
                  <div className="text-xl font-bold text-gray-800 bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center">
                    {event.year}
                  </div>
                </div>
                <div className="flex-1 pb-12 border-l-2 border-gray-200 pl-8 relative">
                  <p className="text-gray-600 text-lg">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peristiwa Bersejarah */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16">
            Peristiwa Bersejarah di Desa
            <br />
            Manud Jaya
          </h2>
          <div className="space-y-24">
            {historicalEvents.map((event, index) => (
              <div
                key={index}
                className={`flex flex-col gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center max-w-6xl mx-auto`}
              >
                <div className="w-full h-[300px] lg:h-[400px] lg:w-1/2 relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <h3 className="text-3xl font-bold">{event.title}</h3>
                  <p className="text-lg text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
