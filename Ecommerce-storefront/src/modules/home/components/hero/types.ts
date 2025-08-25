export interface CarouselSlide {
  id: number
  image: string
  alt: string
  link: string
}

export interface CarouselProps {
  slides?: CarouselSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showPagination?: boolean
} 