import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Desa Wisata</h3>
            <p className="mb-6">
              Destinasi wisata alam dan budaya yang menawarkan pengalaman
              autentik kehidupan pedesaan Indonesia.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#about" className="transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#attractions" className="transition-colors">
                  Destinasi Wisata
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors">
                  Paket Wisata
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span className="">
                  Jl. Desa Wisata No. 123, Kecamatan Sejahtera, Kabupaten Indah,
                  Indonesia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="">+62 123 4567 890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="">info@desawisata.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Berlangganan</h3>
            <p className="mb-4 ">
              Dapatkan informasi terbaru dan penawaran spesial dari kami.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Email Anda"
                className="bg-secondary border-primary text-secondary"
              />
              <Button className="w-full">Berlangganan</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Desa Wisata Manud Jaya. Hak
              Cipta Dilindungi.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="#" className="text-sm transition-colors">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
