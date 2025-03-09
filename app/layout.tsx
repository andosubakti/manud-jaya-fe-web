import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Desa Wisata Manud Jaya - Destinasi Wisata Alam & Budaya',
  description:
    'Jelajahi keindahan alam dan kekayaan budaya di Desa Wisata Manud Jaya. Nikmati pengalaman wisata autentik dengan pemandangan alam yang menakjubkan dan tradisi budaya yang kaya.',
  keywords:
    'desa wisata, wisata alam, wisata budaya, ekowisata, desa sejahtera, wisata lokal, wisata indonesia, agrowisata',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
