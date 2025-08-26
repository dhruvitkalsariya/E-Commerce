import Image from "next/image"
import { clx } from "@medusajs/ui"

interface CategoryCardProps {
  name: string
  image: string
  index: number
}

export default function CategoryCard({ name, image, index }: CategoryCardProps) {
  return (
    <div
      className={clx(
        "bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-3 sm:p-4",
        "relative cursor-pointer group overflow-hidden",
        "border border-gray-100 hover:border-purple-200"
      )}
    >
      {/* Image Container - 100% width with overflow hidden */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
           
        />
      </div>

      {/* Category label positioned at bottom center */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-20 flex items-center justify-center py-3">
        <span className="font-medium text-sm sm:text-base text-purple-900 text-center">
          {name}
        </span>
      </div>
    </div>
  )
} 