export type BaseSection = {
  id: number
  title: string
  description: string
}

export type SectionComponentType =
  | 'homepage.section-1'
  | 'homepage.homepage-section-2'
  | 'homepage.homepage-section-3'
  | 'homepage.homepage-section-4'
  | 'homepage.homepage-section-5'

export interface HeroSectionType extends BaseSection {
  __component: 'homepage.section-1'
}

export interface AboutSectionType extends BaseSection {
  __component: 'homepage.homepage-section-2'
}

export interface AttractionSectionType extends BaseSection {
  __component: 'homepage.homepage-section-3'
}

export interface TourType {
  id: number
  documentId: string
  title: string
  subtitle: string | null
  price: number
  duration_days: number
  duration_hours: number
  description: string
  short_description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  pictures: any[]
}

export interface PaketWisataSectionType extends BaseSection {
  __component: 'homepage.homepage-section-4'
  tours?: TourType[]
}

export interface TestimonialSectionType extends BaseSection {
  __component: 'homepage.homepage-section-5'
}

export type ContentPageItem =
  | HeroSectionType
  | AboutSectionType
  | AttractionSectionType
  | PaketWisataSectionType
  | TestimonialSectionType
