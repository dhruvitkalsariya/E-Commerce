"use client"

import Image from "next/image"
import Link from "next/link"

interface TopSellingBannerTemplateProps {
  product?: {
    id: string
    title: string
    description: string
    originalPrice: number
    discountedPrice: number
    image: string
  }
  className?: string
}

const TopSellingBannerTemplate = ({ product, className = "" }: TopSellingBannerTemplateProps) => {
  // Default product data if none provided
  const defaultProduct = {
    id: "1",
    title: "Product Name Will Be Here",
    description: "Lorem ipsum dolor sit amet consectetur. Ultrices nunc vitae rhoncus nisl. Orci vitae habitasse amet integer.",
    originalPrice: 2999,
    discountedPrice: 1999,
    image: "/assets/shopvora/Top-selling-banner.png"
  }

  const displayProduct = product || defaultProduct

  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString()}`
  }

  return (
    <section className={`w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ${className}`}>
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]  overflow-hidden rounded-lg shadow-lg">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={displayProduct.image}
            alt={displayProduct.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1402px"
            priority
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0"></div>
        </div>

        {/* Responsive Text Section */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="w-full max-w-full  xl:max-w-[48%]">
            {/* Top Selling Label */}
            <div className="mb-2 sm:mb-4">
              <span className="font-inter font-medium text-sm sm:text-base md:text-lg lg:text-xl text-[#2A1454]">
                Top Selling
              </span>
            </div>

            {/* Product Title */}
            <h2
              className={`
                font-semibold text-[#2A1454] 
                text-[22px] sm:text-[36px] md:text-[48px] lg:text-[56px] xl:text-[65px] 
                leading-[1.1] xl:leading-[79px] mb-3 sm:mb-4 md:mb-6
                max-w-full drop-shadow-sm break-words
                ${className ? className : ""}
              `}>
              {displayProduct.title}
            </h2>

            {/* Product Description */}
            <p className="font-inter font-medium text-sm sm:break-normal sm:text-base md:text-lg lg:text-xl text-[#2A1454] mb-2 sm:mb-6 md:mb-8 max-w-full leading-relaxed drop-shadow-sm">
              {displayProduct.description}
            </p>

            {/* Price and CTA Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
              {/* Price Section */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Original Price */}
                <span className="font-inter font-medium text-sm sm:text-base md:text-lg lg:text-xl text-[#565656] line-through">
                  {formatPrice(displayProduct.originalPrice)}
                </span>
                {/* Discounted Price */}
                <span className="font-inter font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[50px] text-black drop-shadow-sm">
                  {formatPrice(displayProduct.discountedPrice)}
                </span>
              </div>

              {/* Shop Now Button with different hover animation */}
              <Link
                href={`/products/${displayProduct.id}`}
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-[#2A1454] text-white font-inter font-semibold text-sm sm:text-base md:text-lg lg:text-xl rounded-md shadow-lg transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10">Shop now</span>
                {/* Animated background slide on hover */}
                <span className="absolute inset-0 bg-[#4B2AAD] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                {/* Animate text color on hover */}
                <span className="absolute inset-0 group-hover:bg-transparent transition duration-300"></span>
                <style jsx>{`
                  .group:hover span.relative {
                    color: #fff !important;
                  }
                `}</style>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopSellingBannerTemplate