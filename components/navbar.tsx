'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering theme components after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '#about' },
    { name: 'Wisata', href: '#attractions' },
    { name: 'Akomodasi', href: '#accommodation' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Kontak', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-md'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center z-50">
            <span className="text-xl md:text-2xl font-bold text-primary">
              Desa Wisata
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {mounted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                suppressHydrationWarning
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}
            <Button>Pesan Sekarang</Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden z-50">
            {mounted && (
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                suppressHydrationWarning
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="relative z-50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Full Screen Overlay */}
        <div
          className={`fixed inset-0 bg-secondary h-screen z-40 transition-all duration-300 md:hidden ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ paddingTop: '4rem' }}
        >
          <div className="flex flex-col p-6 space-y-6 bg-secondary">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xl font-medium hover:text-primary transition-colors mobile-menu-item"
                style={{ '--index': index } as React.CSSProperties}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <div
              className="pt-8 mobile-menu-item"
              style={{ '--index': navLinks.length } as React.CSSProperties}
            >
              <Button className="w-full h-12 text-base" onClick={closeMenu}>
                Pesan Sekarang
              </Button>
            </div>
          </div>

          {/* Explicit Close Button at the bottom */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <Button
              variant="outline"
              className="rounded-full mobile-menu-item"
              style={{ '--index': navLinks.length + 1 } as React.CSSProperties}
              onClick={closeMenu}
            >
              <X className="h-5 w-5 mr-2" />
              Tutup Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
