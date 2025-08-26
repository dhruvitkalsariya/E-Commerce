"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface NewCollectionCardProps {
  id: string
  title: string
  discount: string
  imageSrc: string
  imageAlt: string
  href: string
  className?: string
}

const NewCollectionCard = ({ 
  id, 
  title, 
  discount, 
  imageSrc, 
  imageAlt, 
  href, 
  className = ""
}: NewCollectionCardProps) => {
  return (
    <div className={`w-full ${className}`}>
      <Link href={href} className="block group">
        {/* Product Card Container */}
        <motion.div 
          className="relative w-full aspect-[261/331] bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          whileHover={{           
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.98 }}
          role="article"
          aria-label={`${title} - ${discount}`}
        >
          {/* Image Section */}
          <div className="relative w-full h-3/4 flex items-center justify-center p-4">
            {/* Product Image */}
            <div className="relative w-4/5 h-4/5 max-w-[186px] max-h-[186px] overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 186px"
                priority
              />
            </div>
          </div>
          
          {/* Text Section */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 flex flex-col items-center md:justify-center justify-top mb-2 gap-1 px-4 bg-white">
            {/* Product Title */}
            <h3 className="font-inter font-normal text-xs sm:text-sm md:text-base text-center text-gray-900 leading-tight max-w-full truncate">
              {title}
            </h3>
            
            {/* Discount Badge */}
            <div className="font-inter font-semibold text-sm sm:text-base text-center text-purple-800 leading-tight">
              {discount}
            </div>
          </div>                
        </motion.div>
      </Link>
    </div>
  )
}

export default NewCollectionCard 