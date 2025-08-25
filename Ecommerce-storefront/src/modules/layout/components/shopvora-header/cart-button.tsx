"use client"

import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ShopvoraCartButton = () => {
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching cart data from backend
    const fetchCartData = async () => {
      try {
        // In a real implementation, this would be an API call to Medusa.js
        // For now, we'll simulate dynamic data
        const response = await fetch('/api/cart/count')
        if (response.ok) {
          const data = await response.json()
          setCartCount(data.count || 0)
        } else {
          // Fallback to static data if API fails
          setCartCount(10) // This will show "10" in the badge
        }
      } catch (error) {
        // Fallback to static data if API fails
        setCartCount(10) // This will show "10" in the badge
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartData()
  }, [])

  // Format cart count for display
  const formatCartCount = (count: number) => {
    if (count >= 99) {
      return "99+"
    }
    return count.toString()
  }

  return (
    <LocalizedClientLink
      className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
      href="/cart"
      data-testid="nav-cart-link"
    >
      {/* Shop icon without notification */}
      <svg
        className="w-5 h-5 md:w-6 md:h-6"
        viewBox="0 0 33 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.7344 28.6719C12.9425 28.6719 13.9219 27.6925 13.9219 26.4844C13.9219 25.2763 12.9425 24.2969 11.7344 24.2969C10.5263 24.2969 9.54688 25.2763 9.54688 26.4844C9.54688 27.6925 10.5263 28.6719 11.7344 28.6719Z" fill="#2A1454"/>
        <path d="M25.9531 28.6719C27.1612 28.6719 28.1406 27.6925 28.1406 26.4844C28.1406 25.2763 27.1612 24.2969 25.9531 24.2969C24.745 24.2969 23.7656 25.2763 23.7656 26.4844C23.7656 27.6925 24.745 28.6719 25.9531 28.6719Z" fill="#2A1454"/>
        <path d="M6.58008 6.79688H31.1074L27.498 19.4297C27.3693 19.8882 27.0935 20.2917 26.7131 20.5782C26.3327 20.8647 25.8688 21.0184 25.3926 21.0156H12.2949C11.8187 21.0184 11.3548 20.8647 10.9744 20.5782C10.594 20.2917 10.3182 19.8882 10.1895 19.4297L5.24023 2.12109C5.17483 1.89244 5.03668 1.69133 4.84672 1.54824C4.65675 1.40515 4.42533 1.32787 4.1875 1.32813H1.89062" stroke="#2A1454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      
      {/* Notification badge - only show if there are items */}
      {cartCount > 0 && (
        <span className="absolute -top-[-3px] -right-[-4px] bg-[#2A1454] text-white text-[7px] rounded-full w-3 h-3 md:w-4 md:h-4 flex items-center justify-center font-bold">
          <span>{isLoading ? "..." : formatCartCount(cartCount)}</span>
        </span>
      )}
    </LocalizedClientLink>
  )
}

export default ShopvoraCartButton 