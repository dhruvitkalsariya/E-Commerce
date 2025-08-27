"use client"

import CategoryCard from "./category-card"
import { SectionHeader, SectionContainer } from "@modules/common/components/ui-components"

const categories = [
  {
    name: "Skincare",
    image: "/assets/Shopvora/Categories-section-images/Skincare-Categories.png",
  },
  {
    name: "Electronic",
    image: "/assets/Shopvora/Categories-section-images/Electroinc-Categories.png",
  },
  {
    name: "Footwear",
    image: "/assets/Shopvora/Categories-section-images/Footwear-Categories.png",
  },
  {
    name: "Laptop & PC",
    image: "/assets/Shopvora/Categories-section-images/Laptop&pc-Categories.png",
  },
  {
    name: "Smartphone",
    image: "/assets/Shopvora/Categories-section-images/Smartphone-Categories.png",
  },
  {
    name: "Fashion",
    image: "/assets/Shopvora/Categories-section-images/Fashion-Categories.png",
  },
]

export default function TopCategories() {
  return (
    <SectionContainer>
      <SectionHeader
        title="Explore Top Categories"
        actionText="See All"
        actionLink="/categories"
        onActionClick={() => console.log("See All Categories")}
      />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 xl:gap-3 mt-8">
        {categories.map((cat, index) => (
          <CategoryCard
            key={index}
            name={cat.name}
            image={cat.image}
            index={index}
          />
        ))}
      </div>
    </SectionContainer>
  )
} 