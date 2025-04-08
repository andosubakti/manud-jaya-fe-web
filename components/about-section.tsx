import Image from 'next/image'
import AboutImg from '@/assets/about.png'
import { AboutSectionType } from '@/lib/type'
import { FC } from 'react'

const AboutSection: FC<AboutSectionType> = (props) => {
  const { title, description } = props
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
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
              {/* <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">10+</p>
                <p className="text-sm">Tahun Pengalaman</p>
              </div> */}
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
            <p className="text-muted-foreground mb-6 text-justify">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
