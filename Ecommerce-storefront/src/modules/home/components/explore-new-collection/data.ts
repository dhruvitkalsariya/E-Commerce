import { HttpTypes } from "@medusajs/types"

export interface NewCollectionItem {
  id: string
  title: string
  discount: string
  imageSrc: string
  imageAlt: string
  href: string
}

// Static data for new collection items
export const getNewCollectionItems = (): NewCollectionItem[] => {
  return [
    {
      id: "us-polo",
      title: "U.S. Polo Assn., Highlande…",
      discount: "10-40% OFF",
      imageSrc: "/assets/Shopvora/new-collection/shows-new-collection.png",
      imageAlt: "U.S. Polo Assn. white sneakers",
      href: "/collections/us-polo"
    },
    {
      id: "bags-luggage",
      title: "Bags, Trolleys, Luggage...",
      discount: "10-40% OFF",
      imageSrc: "/assets/Shopvora/new-collection/bags-new-collection.png",
      imageAlt: "Collection of bags, trolleys and luggage",
      href: "/collections/bags-luggage"
    },
    {
      id: "sweatshirts",
      title: "Sweatshirts, Hoodies, Jac…",
      discount: "10-40% OFF",
      imageSrc: "/assets/Shopvora/new-collection/shirt-new-collection.png",
      imageAlt: "Man wearing red sweatshirt",
      href: "/collections/sweatshirts"
    },
    {
      id: "handbags",
      title: "Crazy Deals on Handbags",
      discount: "10-40% OFF",
      imageSrc: "/assets/Shopvora/new-collection/purse-new-collection.png",
      imageAlt: "Red handbag",
      href: "/collections/handbags"
    },
    {
      id: "kurta-sets",
      title: "Kurta Sets",
      discount: "10-40% OFF",
      imageSrc: "/assets/Shopvora/new-collection/kurti-new-collection.png",
      imageAlt: "Woman wearing maroon Kurta set",
      href: "/collections/kurta-sets"
    }
  ]
}

// Future: Medusa.js integration function
export const getNewCollectionFromMedusa = async (
  region: HttpTypes.StoreRegion
): Promise<NewCollectionItem[]> => {
  // TODO: Implement Medusa.js integration
  // This would fetch products from a "new collection" and transform them
  // into the NewCollectionItem format
  
  // Example implementation:
  // const { response: { products } } = await listProducts({
  //   regionId: region.id,
  //   queryParams: {
  //     collection_id: "new-collection-id",
  //     limit: 5,
  //     fields: "*variants.calculated_price",
  //   },
  // })
  
  // return products.map(product => ({
  //   id: product.id,
  //   title: product.title,
  //   discount: calculateDiscount(product),
  //   imageSrc: product.thumbnail || product.images[0]?.url,
  //   imageAlt: product.title,
  //   href: `/products/${product.handle}`,
  // }))
  
  // For now, return static data
  return getNewCollectionItems()
}

// Helper function to calculate discount percentage
export const calculateDiscount = (product: HttpTypes.StoreProduct): string => {
  // TODO: Implement discount calculation logic
  // This would compare original price vs sale price
  return "10-40% OFF"
} 