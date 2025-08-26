"use client"

import SectionTitle from "@modules/common/components/section-title"
import CategoryCard from "@modules/common/components/category-card"

interface Category {
  id: string
  name: string
  href: string
  imageSrc: string
  imageAlt: string
}

const CategoriesScroller = () => {
  // All 6 categories
  const categories: Category[] = [
    {
      id: "skincare",
      name: "Skincare",
      href: "/categories/skincare",
      imageSrc: "/assets/shopvora/Skincare-Categories.png",
      imageAlt: "Skincare products and cosmetics"
    },
    {
      id: "electronic",
      name: "Electronic",
      href: "/categories/electronics",
      imageSrc: "/assets/shopvora/Electroinc-Categories.png",
      imageAlt: "Electronic devices and appliances"
    },
    {
      id: "footwear",
      name: "Footwear",
      href: "/categories/footwear",
      imageSrc: "/assets/shopvora/Footwear-Categories.png",
      imageAlt: "Shoes and footwear"
    },
    {
      id: "laptop-pc",
      name: "Laptop & PC",
      href: "/categories/laptop-pc",
      imageSrc: "/assets/shopvora/Laptop&pc-Categories.png",
      imageAlt: "Laptops and computers"
    },
    {
      id: "smartphone",
      name: "Smartphone",
      href: "/categories/smartphones",
      imageSrc: "/assets/shopvora/Smartphone-Categories.png",
      imageAlt: "Smartphones and mobile devices"
    },
    {
      id: "fashion",
      name: "Fashion",
      href: "/categories/fashion",
      imageSrc: "/assets/shopvora/Fashion-Categories.png",
      imageAlt: "Fashion and clothing"
    }
  ]

  return (
    <section className="py-12 bg-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <SectionTitle 
            title="Explore Top Categories"
            linkText="See All"
            linkHref="/categories"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="w-full">
              <CategoryCard
                id={category.id}
                name={category.name}
                href={category.href}
                imageSrc={category.imageSrc}
                imageAlt={category.imageAlt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesScroller 