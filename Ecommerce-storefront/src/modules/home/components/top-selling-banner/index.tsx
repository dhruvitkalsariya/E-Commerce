import TopSellingBannerTemplate from "./template"

interface TopSellingBannerProps {
  product?: {
    id: string
    title: string
    description: string
    originalPrice: number
    discountedPrice: number
    image: string
  }
}

const TopSellingBanner = ({ product }: TopSellingBannerProps) => {
  return <TopSellingBannerTemplate product={product} />
}

export default TopSellingBanner 