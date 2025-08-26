"use client"

import { useState } from "react"
import ProductCard from "@modules/common/components/product-card"
import { SectionContainer, SectionHeader } from "@modules/common/components/ui-components"

// Sample data for development - will be replaced with Medusa.js API calls
const sampleProducts = [
  {
    id: "1",
    title: "Laptop intel core",
    category: "Laptop & PC",
    description: "Here's a short description card of the product categories on this website....",
    price: 49999,
    originalPrice: 51999,
    image: "/assets/shopvora/Laptop-Popular-Products.png",
    rating: 4.5,
    reviewCount: 300
  },
  {
    id: "2", 
    title: "Samsung Galaxy Z Series",
    category: "Smartphone",
    description: "Here's a short description card of the product categories on this website....",
    price: 49999,
    originalPrice: 51999,
    image: "/assets/shopvora/Samsung-Popular-Products.png",
    rating: 4.5,
    reviewCount: 300
  },
  {
    id: "3",
    title: "LAPTOP ASUS AMDA RYZEN", 
    category: "Laptop & PC",
    description: "Here's a short description card of the product categories on this website....",
    price: 49999,
    originalPrice: 51999,
    image: "/assets/shopvora/Laptop-2-Popular-Products.png",
    rating: 4.5,
    reviewCount: 300
  },
  {
    id: "4",
    title: "Boots Cream",
    category: "Category",
    description: "Here's a short description card of the product categories on this website....",
    price: 49999,
    originalPrice: 51999,
    image: "/assets/shopvora/Boots-Popular-Products.png",
    rating: 4.5,
    reviewCount: 300
  },
  {
    id: "5",
    title: "Laptop intel core",
    category: "Laptop & PC",
    description: "Here's a short description card of the product categories on this website....",
    price: 49999,
    originalPrice: 51999,
    image: "/assets/shopvora/Laptop-3-Popular-Products.png",
    rating: 4.5,
    reviewCount: 300
  }
]

// TODO: Replace with actual Medusa.js data fetching
// This will be replaced with real API calls to get popular products
const usePopularProducts = () => {
  // Placeholder for actual data fetching
  // const { data: products, isLoading, error } = useQuery(['popular-products'], fetchPopularProducts)
  
  // For now, return sample data for development
  return {
    products: sampleProducts,
    isLoading: false,
    error: null
  }
}

export default function PopularProducts() {
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set())
  const { products, isLoading, error } = usePopularProducts()

  const handleWishlistToggle = (productId: string) => {
    setWishlistedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleProductClick = (productId: string) => {
    // Navigate to product detail page
    console.log("Navigate to product:", productId)
  }

  if (isLoading) {
    return (
      <div className="w-full xl:max-w-8xl mx-auto bg-white py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Popular Products"
            actionText="See All"
            actionLink="/products"
            onActionClick={() => console.log("See All Products")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
            {/* Loading skeletons will be added here */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-[261px] h-[397px] bg-gray-200 animate-pulse rounded-[4px]"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full xl:max-w-8xl mx-auto bg-white py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Popular Products"
            actionText="See All"
            actionLink="/products"
            onActionClick={() => console.log("See All Products")}
          />
          <div className="text-center py-8 text-gray-500">
            Failed to load popular products
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full xl:max-w-8xl mx-auto bg-white py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
        <SectionHeader
          title="Popular Products"
          actionText="See All"
          actionLink="/products"
          onActionClick={() => console.log("See All Products")}
        />
        
        {/* Products Grid - Will be populated with real data */}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistedProducts.has(product.id)}
              onWishlistToggle={handleWishlistToggle}
              onClick={handleProductClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 