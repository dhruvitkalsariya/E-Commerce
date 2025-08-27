import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ShopvoraLogo = () => {
  return (
    <LocalizedClientLink
      href="/"
      className="flex items-center"
      data-testid="nav-store-link"
    >
      {/* Logo from Figma */}
      <Image
        src="/assets/Shopvora/logo/Logo.svg"
        alt="Shopvora"
        width={188}
        height={40}
        className="h-8 md:h-10 w-auto"
        priority
      />
    </LocalizedClientLink>
  )
}

export default ShopvoraLogo 