'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { TestimonialSectionType } from '@/lib/type'

const TestimonialSection: FC<TestimonialSectionType> = (props) => {
  const { title, description, testimonials = [] } = props

  const [activeTestimonial, setActiveTestimonial] = useState<number>(0)

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
              {title}
            </h3>
            <h2
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-secondary px-6 py-3 text-base font-medium shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Hubungi kami
            </Link>
          </div>

          <div className="p-8 rounded-lg shadow-sm border-gray-300 border-4">
            <div className="flex items-center mb-6">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={
                    testimonials[activeTestimonial]?.photo_profile?.url ||
                    '/placeholder.svg'
                  }
                  alt={testimonials[activeTestimonial]?.title || 'Testimonial'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">
                  {testimonials[activeTestimonial]?.title}
                </h4>
              </div>
            </div>

            <p
              className="mb-6"
              dangerouslySetInnerHTML={{
                __html: testimonials[activeTestimonial]?.testimoni || '',
              }}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-row justify-between overflow-x-auto p-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveTestimonial(index)}
              className={`flex flex-row gap-4 focus:outline-none ${
                index === activeTestimonial
                  ? 'relative'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.photo_profile?.url || '/placeholder.svg'}
                  alt={testimonial.title}
                  fill
                  className="object-cover"
                />
              </div>
              {index === activeTestimonial && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"></div>
              )}
              <div
                className={`mt-2 text-xs text-left ${
                  index === activeTestimonial ? 'font-medium' : 'text-gray-500'
                }`}
              >
                <p className="font-medium">{testimonial.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
