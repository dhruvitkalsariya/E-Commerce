import Image from "next/image"
import { clx } from "@medusajs/ui"
import WishlistIcon from "./icons/wishlist-icon"

interface ProductCardProps {
  product: {
    id: string
    title: string
    category: string
    description: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviewCount: number
  }
  isWishlisted?: boolean
  onWishlistToggle?: (productId: string) => void
  onClick?: (productId: string) => void
  className?: string
}

export default function ProductCard({
  product,
  isWishlisted = false,
  onWishlistToggle,
  onClick,
  className
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString()}`
  }

  const handleWishlistClick = (e?: React.MouseEvent<Element, MouseEvent>) => {
    e?.stopPropagation()
    onWishlistToggle?.(product.id)
  }

  const handleCardClick = () => {
    onClick?.(product.id)
  }

  return (
    <div
      className={clx(
        "relative bg-white shadow-[0px_10px_20px_rgba(159,159,159,0.15)] rounded-[4px] mx-auto",
        "cursor-pointer transition-all duration-300 hover:shadow-[0px_15px_30px_rgba(159,159,159,0.25)]",
        "w-full max-w-xs h-auto",
        className
      )}
      onClick={handleCardClick}
    >
      {/* Wishlist Icon - Top Right - No Border */}
      <div className="absolute top-2 right-3 z-10">
        <WishlistIcon
          isAdded={isWishlisted}
          onClick={handleWishlistClick}
          size="sm"
        />
      </div>

      {/* Product Image */}
      <div className="w-full h-[250px] relative overflow-hidden rounded-t-[4px] mt-5">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="w-full h-auto object-cover transition-transform duration-300 scale-95 hover:scale-105"
          sizes="(max-width: 400px) 100vw, 241px"
        />
      </div>

      {/* Product Content Frame */}
      <div className="flex flex-col gap-2 p-4">
        {/* Rating Section */}
        <div className="flex items-center gap-2">
          {/* Rating Badge */}
          <div className="relative flex items-center bg-white shadow-sm rounded px-2 py-1">
            <span className="font-poppins font-medium text-xs text-black">
              {product.rating}
            </span>
            <span
              className={clx(
                "ml-1.5 w-4 h-4 rounded-full flex items-center justify-center",
                product.rating >= 4
                  ? "bg-[#117B34]"
                  : product.rating >= 2.5
                  ? "bg-[#FFD600]"
                  : "bg-[#FF3B30]"
              )}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </div>
          {/* Review Count */}
          <span className="font-poppins font-light text-xs text-[#A1A1A1]">
            ({product.reviewCount})
          </span>
        </div>

        {/* Product Info */}
        <div>
          {/* Category */}
          <span className="block font-poppins font-light text-xs text-[#A1A1A1] mb-1">
            {product.category}
          </span>
          {/* Title */}
          <h3 className="font-poppins font-medium text-base text-black leading-6 truncate">
            {product.title}
          </h3>
          {/* Description */}
          <p className="font-poppins font-light text-xs text-black mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-2">
          {/* Current Price */}
          <span className="font-inter font-medium text-sm text-black">
            {formatPrice(product.price)}
          </span>
          {/* Original Price (if exists) */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="font-inter font-light text-xs text-[#9A9999] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}