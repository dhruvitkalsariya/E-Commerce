import Image from "next/image"
import { clx } from "@medusajs/ui"
import Card from "./card"
import Button from "./button"

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: number
    originalPrice?: number
    image: string
    rating?: number
    reviewCount?: number
    isNew?: boolean
    isOnSale?: boolean
    discountPercentage?: number
  }
  onAddToCart?: (productId: string) => void
  onQuickView?: (productId: string) => void
  className?: string
  variant?: "default" | "compact" | "detailed"
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  className,
  variant = "default",
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const renderRating = (rating: number, reviewCount: number) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={clx(
                "w-4 h-4",
                i < rating ? "text-yellow-400" : "text-gray-300"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-600">({reviewCount})</span>
      </div>
    )
  }

  return (
    <Card
      className={clx("group cursor-pointer overflow-hidden", className)}
      hover={true}
      variant="default"
      padding="sm"
    >
      {/* Image Container */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.isOnSale && product.discountPercentage && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onQuickView?.(product.id)
            }}
            className="bg-white shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base">
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating && product.reviewCount && (
          <div className="flex items-center">
            {renderRating(product.rating, product.reviewCount)}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {variant !== "compact" && onAddToCart && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(product.id)
            }}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  )
} 