import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1542897731-42aca67344f4?q=80&w=800"
                alt="Desa Wisata Manud Jaya"
                width={800}
                height={600}
                className="rounded-lg shadow-lg object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">10+</p>
                <p className="text-sm">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tentang{' '}
              <span className="text-primary">Desa Wisata Manud Jaya</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Desa Wisata Manud Jaya adalah destinasi wisata yang menawarkan
              pengalaman autentik kehidupan pedesaan Indonesia. Terletak di kaki
              gunung dengan pemandangan alam yang menakjubkan, desa ini
              menawarkan berbagai atraksi wisata yang menggabungkan keindahan
              alam dan kekayaan budaya lokal.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Lokasi Strategis</h3>
                  <p className="text-muted-foreground text-sm">
                    Mudah diakses dari kota besar
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M3 7V5c0-1.1.9-2 2-2h2" />
                    <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
                    <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
                    <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
                    <rect width="7" height="5" x="7" y="7" rx="1" />
                    <rect width="7" height="5" x="10" y="12" rx="1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Atraksi Beragam</h3>
                  <p className="text-muted-foreground text-sm">
                    Wisata alam dan budaya
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Ramah Lingkungan</h3>
                  <p className="text-muted-foreground text-sm">
                    Konsep ekowisata berkelanjutan
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M17 6.1H3" />
                    <path d="M21 12.1H3" />
                    <path d="M15.1 18H3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Kuliner Lokal</h3>
                  <p className="text-muted-foreground text-sm">
                    Cita rasa autentik desa
                  </p>
                </div>
              </div>
            </div>
            <Button>Pelajari Lebih Lanjut</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
