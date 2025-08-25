"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import CarouselArrow from "./carousel-arrow"

// Carousel data - this would typically come from Medusa.js backend
const carouselSlides = [
  {
    id: 1,
    title: "BIG SALE",
    subtitle: "SPECIAL OFFERS",
    cta: "SHOP NOW!",
    tagline: "NEW YEAR EDITION PROMOTION",
    backgroundImage: "/assets/shopvora/carrousel_background.png",
    alt: "Big Sale Special Offer Banner"
  },
  {
    id: 2,
    title: "TOP SELLING",
    subtitle: "POPULAR PRODUCTS",
    cta: "EXPLORE NOW!",
    tagline: "BEST SELLERS COLLECTION",
    backgroundImage: "/assets/shopvora/Top-selling-banner.png",
    alt: "Top Selling Products Banner"
  },
  {
    id: 3,
    title: "NEW ARRIVALS",
    subtitle: "FRESH COLLECTION",
    cta: "DISCOVER NOW!",
    tagline: "LATEST TRENDS 2024",
    backgroundImage: "/assets/shopvora/carrousel_background.png",
    alt: "New Arrivals Banner"
  }
]

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? carouselSlides.length - 1 : prev - 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative w-full h-[280px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={carouselSlides[currentSlide].backgroundImage}
                alt={carouselSlides[currentSlide].alt}
                fill
                className="object-cover rounded-lg"
                priority={currentSlide === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1408px"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/10 rounded-lg" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold text-sm md:text-base rounded-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                }}
              >
                {carouselSlides[currentSlide].cta}
              </motion.button>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 text-white drop-shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                }}
              >
                {carouselSlides[currentSlide].title}
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-white drop-shadow-md"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                }}
              >
                {carouselSlides[currentSlide].subtitle}
              </motion.h2>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-sm md:text-base text-white/90 font-medium"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                }}
              >
                {carouselSlides[currentSlide].tagline}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <CarouselArrow direction="left" onClick={goToPrevious} />
        <CarouselArrow direction="right" onClick={goToNext} />

        {/* Pagination Indicators - Matching Figma specifications */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-lg ${
                index === currentSlide
                  ? 'bg-[#2A1454] shadow-inner shadow-black/20'
                  : 'bg-white shadow-inner shadow-[#DBD0FD]'
              }`}
              style={{
                width: '86px',
                height: '8px',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel 