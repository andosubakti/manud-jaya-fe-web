import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Logo from '@/assets/logo.png'

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={Logo}
                alt="Desa Manud Jaya Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <h3 className="text-xl font-bold">Desa Manud Jaya</h3>
            </div>
            <p className="mt-4">
              There are many variations of passages of available but it is the
              majority of suffered that a alteration in that some dummy text.
            </p>
          </div>

          {/* Budaya Links */}
          <div className="space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/informasi"
                className="hover:text-green-600 transition-colors"
              >
                Informasi
              </Link>
              <Link
                href="/budaya"
                className="hover:text-green-600 transition-colors"
              >
                Budaya
              </Link>
              <Link
                href="/sejarah"
                className="hover:text-green-600 transition-colors"
              >
                Sejarah
              </Link>
            </nav>
          </div>

          {/* Paket Wisata Links */}
          <div className="space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/paket-wisata"
                className="hover:text-green-600 transition-colors"
              >
                Paket Wisata
              </Link>
              <Link
                href="/atraksi-acara"
                className="hover:text-green-600 transition-colors"
              >
                Atraksi/Acara
              </Link>
            </nav>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">GABUNG BERSAMA KAMI 🔥</h4>
            <div className="flex items-center mt-2">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Masukan email anda"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  className="absolute right-1 top-1 bg-green-500 text-white p-1.5 rounded-full hover:bg-green-600 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p>Copyright © Desa Manud Jaya. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
