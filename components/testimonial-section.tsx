import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Traveler',
    image: 'https://picsum.photos/400',
    content:
      'Pengalaman yang luar biasa! Desa Wisata Manud Jaya menawarkan pemandangan alam yang menakjubkan dan penduduk yang sangat ramah. Saya pasti akan kembali lagi.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    role: 'Food Blogger',
    image: 'https://picsum.photos/400',
    content:
      'Kuliner lokal di sini sangat autentik dan lezat. Saya sangat menikmati workshop memasak bersama penduduk lokal dan belajar resep tradisional.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Andi Wijaya',
    role: 'Fotografer',
    image: 'https://picsum.photos/400',
    content:
      'Sebagai fotografer, saya menemukan banyak spot indah untuk difoto di desa ini. Sunrise di kebun teh adalah momen yang tidak akan pernah saya lupakan.',
    rating: 4,
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apa Kata <span className="text-primary">Pengunjung</span> Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pengalaman autentik dari para pengunjung yang telah menikmati
            keindahan Desa Wisata Manud Jaya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-6">
                  &quot;{testimonial.content}&quot;
                </p>
              </CardContent>
              <CardFooter className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || '/placeholder.svg'}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
