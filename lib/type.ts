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

export interface ImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface ImageFormats {
  large: ImageFormat
  small: ImageFormat
  medium: ImageFormat
  thumbnail: ImageFormat
}

export interface BannerType {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: ImageFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface HeroSectionType extends BaseSection {
  __component: 'homepage.section-1'
  banner: BannerType
  button: any | null
}

export interface AboutSectionType extends BaseSection {
  __component: 'homepage.homepage-section-2'
  image: BannerType
  button: any | null
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

export interface TestimonialType {
  id: number
  documentId: string
  title: string
  testimoni: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  photo_profile: BannerType | null
}

export interface TestimonialSectionType extends BaseSection {
  __component: 'homepage.homepage-section-5'
  testimonials?: TestimonialType[]
}

export type ContentPageItem =
  | HeroSectionType
  | AboutSectionType
  | AttractionSectionType
  | PaketWisataSectionType
  | TestimonialSectionType
