import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import TopCategories from "@modules/home/components/top-categories"
import TopDeals from "@modules/home/components/top-deals"
import PopularProducts from "@modules/home/components/popular-products"
import TopSellingBanner from "@modules/home/components/top-selling-banner"
import ExploreNewCollection from "@modules/home/components/explore-new-collection"
import RecentlyViewed from "@modules/home/components/recently-viewed"

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <TopCategories />
      <PopularProducts />
      <RecentlyViewed />
      <TopSellingBanner />
      <ExploreNewCollection />
      <TopDeals />
    </>
  )
}
