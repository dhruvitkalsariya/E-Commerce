"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import CarouselArrow from "./carousel-arrow"
import { CarouselSlide, CarouselProps } from "./types"

// Default carousel data - this would typically come from Medusa.js backend
const defaultSlides: CarouselSlide[] = [
  {
    id: 1,
    image: "/assets/Shopvora/carrousel_background.png",
    alt: "Big Sale Special Offer Banner",
    link: "/products/sale"
  },
  {
    id: 2,
    image: "/assets/Shopvora/carrousel_background.png",
    alt: "Top Selling Products Banner",
    link: "/products/top-selling"
  },
  {
    id: 3,
    image: "/assets/Shopvora/carrousel_background.png",
    alt: "Laptop Products Banner",
    link: "/products/laptops"
  },
  {
    id: 4,
    image: "/assets/Shopvora/carrousel_background.png",
    alt: "Footwear Products Banner",
    link: "/products/footwear"
  },
  {
    id: 5,
    image: "/assets/Shopvora/carrousel_background.png",
    alt: "Smartphone Products Banner",
    link: "/products/smartphones"
  }
]

const AdvancedCarousel = ({
  slides = defaultSlides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showPagination = true
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const router = useRouter()

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !autoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlay, autoPlayInterval, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleImageClick = (link: string) => {
    router.push(link)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!slides.length) {
    return (
      <section className="relative w-full h-[280px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No slides available</p>
      </section>
    )
  }

  // Responsive indicator sizes
  const getIndicatorSize = () => {
    // You can adjust these values as needed for your design
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        // Mobile
        return { width: 24, height: 6, gap: 6 }
      } else if (window.innerWidth < 1024) {
        // Tablet
        return { width: 40, height: 8, gap: 8 }
      } else {
        // Desktop
        return { width: 86, height: 8, gap: 10 }
      }
    }
    // Default (SSR)
    return { width: 86, height: 8, gap: 10 }
  }

  // State to force re-render on resize for responsive indicators
  const [indicatorSize, setIndicatorSize] = useState(getIndicatorSize())

  useEffect(() => {
    const handleResize = () => {
      setIndicatorSize(getIndicatorSize())
    }
    window.addEventListener("resize", handleResize)
    // Initial set
    setIndicatorSize(getIndicatorSize())
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <section
        className="relative w-full h-[280px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden rounded-lg"
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.8 },
                scale: { duration: 1.2 }
              }}
              className="relative w-full h-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${currentSlide + 1} of ${slides.length}`}
            >
              {/* Background Image with proper animation */}
              <div className="absolute inset-0">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  fill
                  className="object-cover rounded-lg cursor-pointer transition-all duration-700 hover:scale-110"
                  priority={currentSlide === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1408px"
                  onClick={() => handleImageClick(slides[currentSlide].link)}
                  quality={90}
                />
                {/* Overlay clickable area */}
                <button
                  className="absolute inset-0 w-full h-full cursor-pointer z-10"
                  aria-label={slides[currentSlide].alt}
                  onClick={() => handleImageClick(slides[currentSlide].link)}
                  style={{ background: "transparent", border: "none", padding: 0 }}
                  tabIndex={-1}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {showArrows && slides.length > 1 && (
            <>
              <CarouselArrow direction="left" onClick={goToPrevious} />
              <CarouselArrow direction="right" onClick={goToNext} />
            </>
          )}
        </div>
      </section>

      {/* Responsive Pagination Indicator */}
      {showPagination && slides.length > 1 && (
        <div
          className="flex justify-center mt-4"
          style={{
            // Responsive gap between indicators
            gap: `${indicatorSize.gap}px`,
          }}
        >
          <div className="flex"
            style={{
              gap: `${indicatorSize.gap}px`,
            }}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                  index === currentSlide
                    ? 'bg-[#2A1454] shadow-inner shadow-black/20 scale-110'
                    : 'bg-white shadow-inner shadow-[#DBD0FD] opacity-80'
                }`}
                style={{
                  width: `${indicatorSize.width}px`,
                  height: `${indicatorSize.height}px`,
                  minWidth: `${indicatorSize.width}px`,
                  minHeight: `${indicatorSize.height}px`,
                  maxWidth: `${indicatorSize.width}px`,
                  maxHeight: `${indicatorSize.height}px`,
                  borderRadius: indicatorSize.height > 8 ? "8px" : "9999px",
                  transition: "all 0.3s",
                }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedCarousel 