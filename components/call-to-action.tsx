import { Button } from '@/components/ui/button'

export default function CallToAction() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Siap Untuk Petualangan Berikutnya?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
          Jangan lewatkan kesempatan untuk mengalami keindahan alam dan kekayaan
          budaya di Desa Wisata Manud Jaya. Pesan paket wisata Anda sekarang!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Pesan Sekarang
          </Button>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Hubungi Kami
          </Button>
        </div>
      </div>
    </section>
  )
}
