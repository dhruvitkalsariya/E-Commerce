"use client"

import TopDealsCard from "./top-deals-card"
import { SectionHeader, SectionContainer } from "@modules/common/components/ui-components"

// Custom CSS for responsive grid at 425px and below
const responsiveGridStyles = `
  @media (max-width: 425px) {
    .top-deals-grid {
      gap: 8px !important;
    }
  }
`

const topDeals = [
  {
    title: "Apple iPads",
    discount: "10-40% OFF",
    image: "/assets/Shopvora/Top-Deals-section/Tablet-Topdeals.png",
  },
  {
    title: "Puma, Adidas ...",
    discount: "20-40% OFF",
    image: "/assets/Shopvora/Top-Deals-section/Shoes-Topdeals.png",
  },
  {
    title: "Apple iPad's",
    discount: "30-50% OFF",
    image: "/assets/Shopvora/Top-Deals-section/Sandles-Topdeals.png",
  },
  {
    title: "Kurta Sets",
    discount: "Up To 70% OFF",
    image: "/assets/Shopvora/Top-Deals-section/kurta-Topdeals.png",
  },
  {
    title: "Tops, Jeans...",
    discount: "20-80% OFF",
    image: "/assets/Shopvora/Top-Deals-section/top-Topdeals.png",
  },
]

export default function TopDeals() {
  const handleCardClick = (index: number) => {
    console.log(`Top Deal ${index + 1} clicked`)
    // Add navigation logic here
  }

  const handleSeeAllClick = () => {
    console.log("See All Top Deals clicked")
    // Add navigation logic here
  }

  return (
    <>
      <style jsx>{responsiveGridStyles}</style>
      <SectionContainer>
        <SectionHeader
          title="Top Deals"
          actionText="See All"
          onActionClick={handleSeeAllClick}
        />
        
        <div className="top-deals-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {topDeals.map((deal, index) => (
          <TopDealsCard
            key={index}
            title={deal.title}
            discount={deal.discount}
            image={deal.image}
            index={index}
            onClick={() => handleCardClick(index)}
          />
        ))}
        </div>
      </SectionContainer>
    </>
  )
} 