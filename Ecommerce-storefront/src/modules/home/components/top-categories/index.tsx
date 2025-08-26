"use client"

import CategoryCard from "./category-card"
import { SectionContainer, SectionHeader, ResponsiveGrid } from "@modules/common/components/ui-components"

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
    <SectionContainer background="white" padding="lg">
      <SectionHeader
        title="Explore Top Categories"
        actionText="See All"
        onActionClick={() => console.log("See All Categories")}
      />
      
      <ResponsiveGrid
        cols={{ mobile: 2, sm: 3, md: 4, lg: 6 }}
        gap="md"
      >
        {categories.map((cat, index) => (
          <CategoryCard
            key={index}
            name={cat.name}
            image={cat.image}
            index={index}
          />
        ))}
      </ResponsiveGrid>
    </SectionContainer>
  )
} 