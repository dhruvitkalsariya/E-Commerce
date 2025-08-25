"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ShopvoraCartButton from "./cart-button"

const UserActions = () => {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {/* Login Button - Hidden on mobile */}
      <LocalizedClientLink
        href="/account"
        className="sm:px-6 px-3 sm:py-2 py-1  border border-[#2A1454] rounded-lg hover:bg-[#2A1454] hover:text-white transition-all duration-200 font-medium sm:text-[16px] text-[14px] leading-[19px] text-[#2A1454]"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
        }}
        data-testid="nav-account-link"
      >
        Login
      </LocalizedClientLink>

      {/* Cart Button */}
      <ShopvoraCartButton />
    </div>
  )
}

export default UserActions 