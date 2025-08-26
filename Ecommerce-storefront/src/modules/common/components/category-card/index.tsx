"use client"

import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  id: string
  name: string
  href: string
  imageSrc: string
  imageAlt: string
  className?: string
}

const CategoryCard = ({ 
  id, 
  name, 
  href, 
  imageSrc, 
  imageAlt, 
  className = ""
}: CategoryCardProps) => {
  return (
    <div className={`w-full aspect-square ${className}`}>
      <Link href={href} className="block group">
        <div className="relative w-full h-full bg-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Category Image */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="208px"
              priority
              style={{
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              }}
            />
          </div>
          
          {/* Category Name - Bottom white section */}
          <div className="absolute bottom-0 left-0 right-0 h-[53px] bg-white">
            <h3 className="absolute font-['Inter'] font-medium text-[20px] leading-[38px] text-[#2A1454] text-center w-full top-[7.52px]">
              {name}
            </h3>
          </div>
          
          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A1454]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </div>
  )
}

export default CategoryCard 