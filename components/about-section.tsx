import Image from 'next/image'
import AboutImg from '@/assets/about.png'
import { AboutSectionType } from '@/lib/type'
import { FC, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const demografiText = `
<p>Desa Wisata Manud Jaya terletak di Kecamatan Mandalawangi, Kabupaten Bandung Barat, Provinsi Jawa Barat. Jaraknya sekitar 2 jam perjalanan dari Kota Bandung melalui akses jalan raya yang relatif mudah dijangkau. Berada di kaki pegunungan dengan ketinggian sekitar 800 mdpl, desa ini menawarkan suasana sejuk serta pemandangan alam perbukitan yang indah.</p>
<p>Secara administratif, Desa Manud Jaya memiliki luas wilayah kurang lebih 1.200 hektare. Sebagian besar lahan dimanfaatkan untuk persawahan dan perkebunan kopi, cengkeh, serta hutan lindung yang potensial dikembangkan sebagai destinasi ekowisata. Wilayah perbukitan yang mengelilingi desa juga memberikan peluang untuk aktivitas trekking dan fotografi alam.</p>
<p>Berdasarkan data terakhir, jumlah penduduk di Desa Manud Jaya mencapai sekitar 2.800 jiwa, yang tersebar di empat dusun. Mayoritas penduduk bekerja di sektor pertanian dan perkebunan, sementara sebagian lainnya terlibat dalam pengembangan usaha pariwisata serta kerajinan tangan lokal untuk mendukung ekonomi desa.</p>
`

const AboutSection: FC<AboutSectionType> = (props) => {
  const { title, description } = props
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    // Slide 1: About (default)
    <div className="flex flex-col-reverse md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <div className="relative">
          <Image
            src={AboutImg}
            alt="Desa Wisata Manud Jaya"
            width={800}
            height={600}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p
          className="text-muted-foreground mb-6 text-justify"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>,
    // Slide 2: Demografi
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2 w-full mb-6 md:mb-0">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={AboutImg}
            alt="Demografi Desa Manud Jaya"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full text-[#222] text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#222]">
          Demografi Desa Wisata Manud Jaya
        </h2>
        <p
          className="text-muted-foreground mb-6 text-justify"
          dangerouslySetInnerHTML={{ __html: demografiText }}
        />
      </div>
    </div>,
  ]

  const handlePrev = () =>
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  const handleNext = () =>
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

  return (
    <section id="about" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-4 min-h-[500px] flex flex-col items-center justify-center relative">
        {/* Arrow Controls at top right */}
        <div className="w-full flex justify-end md:justify-center md:ml-36 items-center mb-4">
          <div className="flex gap-2 bg-white/80 rounded-full p-1 shadow-md">
            <button
              aria-label="Sebelumnya"
              onClick={handlePrev}
              className="text-primary rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Selanjutnya"
              onClick={handleNext}
              className="text-primary rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="w-full h-full relative flex items-center justify-center transition-all duration-500">
          {slides[activeSlide]}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
