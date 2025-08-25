"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import SectionTitle from "@modules/common/components/section-title"
import CategoryCard from "@modules/common/components/category-card"

interface Category {
  id: string
  name: string
  href: string
  imageSrc: string
  imageAlt: string
  textLeft: string
}

const CategoriesScroller = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const categories: Category[] = [
    {
      id: "skincare",
      name: "Skincare",
      href: "/categories/skincare",
      imageSrc: "/assets/shopvora/Skincare-Categories.png",
      imageAlt: "Skincare products and cosmetics",
      textLeft: "62.5px" // From Figma CSS
    },
    {
      id: "electronic",
      name: "Electronic",
      href: "/categories/electronics",
      imageSrc: "/assets/shopvora/Electroinc-Categories.png",
      imageAlt: "Electronic devices and appliances",
      textLeft: "56px" // From Figma CSS
    },
    {
      id: "footwear",
      name: "Footwear",
      href: "/categories/footwear",
      imageSrc: "/assets/shopvora/Footwear-Categories.png",
      imageAlt: "Shoes and footwear",
      textLeft: "59px" // From Figma CSS
    },
    {
      id: "laptop-pc",
      name: "Laptop & PC",
      href: "/categories/laptop-pc",
      imageSrc: "/assets/shopvora/Laptop&pc-Categories.png",
      imageAlt: "Laptops and computers",
      textLeft: "45px" // From Figma CSS
    },
    {
      id: "smartphone",
      name: "Smartphone",
      href: "/categories/smartphones",
      imageSrc: "/assets/shopvora/Smartphone-Categories.png",
      imageAlt: "Smartphones and mobile devices",
      textLeft: "45px" // From Figma CSS
    },
    {
      id: "fashion",
      name: "Fashion",
      href: "/categories/fashion",
      imageSrc: "/assets/shopvora/Fashion-Categories.png",
      imageAlt: "Fashion and clothing",
      textLeft: "66.5px" // From Figma CSS
    }
  ]

  // Smooth scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let isDown = false
    let startX: number
    let scrollLeft: number

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      scrollContainer.style.cursor = 'grabbing'
      startX = e.pageX - scrollContainer.offsetLeft
      scrollLeft = scrollContainer.scrollLeft
    }

    const handleMouseLeave = () => {
      isDown = false
      scrollContainer.style.cursor = 'grab'
    }

    const handleMouseUp = () => {
      isDown = false
      scrollContainer.style.cursor = 'grab'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - scrollContainer.offsetLeft
      const walk = (x - startX) * 2
      scrollContainer.scrollLeft = scrollLeft - walk
    }

    scrollContainer.addEventListener('mousedown', handleMouseDown)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)
    scrollContainer.addEventListener('mouseup', handleMouseUp)
    scrollContainer.addEventListener('mousemove', handleMouseMove)

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
      scrollContainer.removeEventListener('mouseup', handleMouseUp)
      scrollContainer.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.section 
      className="py-12 bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionTitle 
            title="Explore Top Categories"
            linkText="See All"
            linkHref="/categories"
          />
        </motion.div>

        {/* Categories Scroller */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Horizontal Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ 
              scrollBehavior: 'smooth',
              gap: '30px' // Exact spacing from Figma (238px - 208px = 30px)
            }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  href={category.href}
                  imageSrc={category.imageSrc}
                  imageAlt={category.imageAlt}
                  textLeft={category.textLeft}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.section>
  )
}

export default CategoriesScroller 