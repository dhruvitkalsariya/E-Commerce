"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion } from "framer-motion"

interface CategoryCardProps {
  id: string
  name: string
  href: string
  imageSrc: string
  imageAlt: string
  className?: string
  textLeft?: string // For exact text positioning
}

const CategoryCard = ({ 
  id, 
  name, 
  href, 
  imageSrc, 
  imageAlt, 
  className = "",
  textLeft = "59px" // Default position
}: CategoryCardProps) => {
  return (
    <motion.div
      className={`flex-shrink-0 w-52 h-52 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <LocalizedClientLink href={href} className="block group">
        <motion.div 
          className="relative w-52 h-52 bg-white overflow-hidden"
          style={{
            boxShadow: "0px 5px 25px rgba(159, 159, 159, 0.1)"
          }}
        >
          {/* Category Image - Full card background */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="208px"
              priority
            />
          </motion.div>
          
          {/* Text Frame - Bottom white section (Frame 15) */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[53px] bg-white"
            style={{
              top: "154.96px"
            }}
          >
            {/* Category Name with exact positioning */}
            <h3 
              className="absolute font-['Inter'] font-normal font-medium text-[20px] leading-[38px] text-[#2A1454]"
              style={{
                left: textLeft,
                top: "7.52px",
                width: "auto",
                height: "38px"
              }}
            >
              {name}
            </h3>
          </div>
          
          {/* Hover Effect Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#2A1454]/10 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </LocalizedClientLink>
    </motion.div>
  )
}

export default CategoryCard 