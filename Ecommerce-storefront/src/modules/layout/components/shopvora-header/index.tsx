"use client"

import ShopvoraLogo from "@modules/layout/components/shopvora-logo"
import SearchBar from "./search-bar"
import UserActions from "./user-actions"
import Navigation from "./navigation"
import { DropdownProvider, useDropdown } from "@lib/context/dropdown-context"

const ShopvoraHeaderContent = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useDropdown()

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white shadow-sm">
      {/* Top Header Row */}
      <header className="bg-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <ShopvoraLogo />
            </div>

            {/* Search Bar - Hidden on mobile, visible on lg and up */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-4">
              <SearchBar />
            </div>

            {/* User Actions */}
            <div className="flex-shrink-0">
              <UserActions />
            </div>
          </div>
        </div>
      </header>

      {/* Divider - Exact Figma styling */}
      <div className="w-full h-[1px] bg-[rgba(102,102,102,0.25)]"></div>

      {/* Mobile Second Row - Search and Drawer Icon */}
      <div className="lg:hidden bg-white px-4 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Search Bar - Left side */}
          <div className="flex-1">
            <SearchBar />
          </div>
          
                      {/* Mobile Menu Button - Right side */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleMobileMenuToggle()
              }}
              className="flex-shrink-0 p-2 text-[#2A1454] hover:text-[#1a0f3a] transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Header Row - Navigation */}
      <Navigation />
    </div>
  )
}

const ShopvoraHeader = () => {
  return (
    <DropdownProvider>
      <ShopvoraHeaderContent />
    </DropdownProvider>
  )
}

export default ShopvoraHeader 