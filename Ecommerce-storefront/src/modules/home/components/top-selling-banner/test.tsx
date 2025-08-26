"use client"

import TopSellingBanner from "./index"

// Test component to demonstrate different usage scenarios
const TopSellingBannerTest = () => {
  const customProduct = {
    id: "adidas-continental-80",
    title: "Adidas Continental 80",
    description: "Classic white sneakers with iconic red and navy stripes. Perfect for everyday style and comfort.",
    originalPrice: 3499,
    discountedPrice: 2499,
    image: "/assets/shopvora/Top-selling-banner.png"
  }

  return (
    <div className="space-y-8">
      {/* Default Banner */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Banner</h3>
        <TopSellingBanner />
      </div>

      {/* Custom Product Banner */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Product Banner</h3>
        <TopSellingBanner product={customProduct} />
      </div>
    </div>
  )
}

export default TopSellingBannerTest 