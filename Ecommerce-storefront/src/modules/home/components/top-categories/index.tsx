"use client"

import CategoryCard from "./category-card"
import { SectionHeader } from "@modules/common/components/ui-components"

const categories = [
  {
    name: "Skincare",
    image: "/assets/shopvora/Skincare-Categories.png",
  },
  {
    name: "Electronic",
    image: "/assets/shopvora/Electroinc-Categories.png",
  },
  {
    name: "Footwear",
    image: "/assets/shopvora/Footwear-Categories.png",
  },
  {
    name: "Laptop & PC",
    image: "/assets/shopvora/Laptop&pc-Categories.png",
  },
  {
    name: "Smartphone",
    image: "/assets/shopvora/Smartphone-Categories.png",
  },
  {
    name: "Fashion",
    image: "/assets/shopvora/Fashion-Categories.png",
  },
]

export default function TopCategories() {
  return (
    <div className="w-full xl:max-w-8xl mx-auto bg-white py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </div>
  )
} 