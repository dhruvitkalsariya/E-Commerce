"use client"

import { motion } from "framer-motion"
import SectionHeader from "@modules/common/components/ui-components/section-header"
import NewCollectionCard from "./new-collection-card"
import { getNewCollectionItems, type NewCollectionItem } from "./data"

const ExploreNewCollection = () => {
  // Get new collection items from data service
  const newCollectionItems: NewCollectionItem[] = getNewCollectionItems()

  return (
    <section className="py-12 bg-[rgba(219,208,253,0.4)]">
      {/* Container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <SectionHeader 
            title="Explore new Collection"
            actionText="See All"
            actionLink="/collections"
            titleSize="lg"
            align="left"
          />
        </div>

        {/* New Collection Cards Grid - Responsive */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {newCollectionItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
            >
              <NewCollectionCard
                id={item.id}
                title={item.title}
                discount={item.discount}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                href={item.href}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ExploreNewCollection 