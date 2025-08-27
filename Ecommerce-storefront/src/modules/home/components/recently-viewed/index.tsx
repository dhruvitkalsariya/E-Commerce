"use client"

import { useState, useEffect } from "react"
import ProductCard from "@modules/common/components/product-card"
import { SectionHeader, SectionContainer } from "@modules/common/components/ui-components"
import { clientRetrieveCustomer } from "@lib/client-utils"

// Sample data for development - will be replaced with actual recently viewed products
const sampleRecentlyViewedProducts = [
  {
    id: "1",
    title: "Laptop intel core",
    category: "Laptop & PC",
    description: "Here's a short description card of the product categories on this website....",
    price: 49999,
    originalPrice: 51999,
    image: "/assets/Shopvora/Popular-Products-section-images/Laptop-Popular-Products.png",
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
    image: "/assets/Shopvora/Popular-Products-section-images/Samsung-Popular-Products.png",
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
    image: "/assets/Shopvora/Popular-Products-section-images/Laptop-2-Popular-Products.png",
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
    image: "/assets/Shopvora/Popular-Products-section-images/Boots-Popular-Products.png",
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
    image: "/assets/Shopvora/Popular-Products-section-images/Laptop-3-Popular-Products.png",
    rating: 4.5,
    reviewCount: 300
  }
]

// TODO: Replace with actual recently viewed products data fetching
const useRecentlyViewedProducts = () => {
  // Placeholder for actual data fetching
  // const { data: products, isLoading, error } = useQuery(['recently-viewed'], fetchRecentlyViewedProducts)
  
  // For now, return sample data for development
  return {
    products: sampleRecentlyViewedProducts,
    isLoading: false,
    error: null
  }
}

export default function RecentlyViewed() {
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set())
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const { products, isLoading, error } = useRecentlyViewedProducts()

  // Check if user is logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const customer = await clientRetrieveCustomer()
        setIsLoggedIn(!!customer)
      } catch (error) {
        console.error('Error checking auth status:', error)
        setIsLoggedIn(false)
      }
    }

    checkAuthStatus()
  }, [])

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

  // Don't render if user is not logged in
  if (isLoggedIn === false) {
    return null
  }

  // Show loading state while checking auth
  if (isLoggedIn === null) {
    return null
  }

  if (isLoading) {
    return (
      <SectionContainer background="gray">
        <SectionHeader
          title="Recently Viewed"
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
      </SectionContainer>
    )
  }

  if (error) {
    return (
      <SectionContainer background="gray">
        <SectionHeader
          title="Recently Viewed"
          actionText="See All"
          actionLink="/products"
          onActionClick={() => console.log("See All Products")}
        />
        <div className="text-center py-8 text-gray-500">
          Failed to load recently viewed products
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer background="gray">
      <SectionHeader
        title="Recently Viewed"
        actionText="See All"
        actionLink="/products"
        onActionClick={() => console.log("See All Products")}
      />
      
      {/* Products Grid - Will be populated with real data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
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
    </SectionContainer>
  )
} 