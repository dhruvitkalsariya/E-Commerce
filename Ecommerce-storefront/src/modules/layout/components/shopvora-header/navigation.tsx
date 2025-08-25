"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useDropdown } from "@lib/context/dropdown-context"

// Type definitions
interface SubmenuItem {
  name: string
  href: string
}

interface DropdownItem {
  name: string
  href: string
  hasSubmenu?: boolean
}

interface DropdownCategory {
  items: DropdownItem[]
  submenus?: Record<string, SubmenuItem[]>
}

type DropdownData = Record<string, DropdownCategory>

// Dropdown data structure based on Figma design
const dropdownData: DropdownData = {
  "Fashion": {
    items: [
      { name: "Men's Top wear", href: "/categories/mens-topwear", hasSubmenu: true },
      { name: "Men's Bottom wear", href: "/categories/mens-bottomwear", hasSubmenu: true },
      { name: "Women Ethnic", href: "/categories/women-ethnic", hasSubmenu: true },
      { name: "Men Footwear", href: "/categories/mens-footwear", hasSubmenu: true },
      { name: "Watches and Accessories", href: "/categories/watches-accessories", hasSubmenu: true },
      { name: "Women Western", href: "/categories/women-western", hasSubmenu: true },
      { name: "Bags, Suitcases & Luggage", href: "/categories/bags-luggage", hasSubmenu: true },
      { name: "Kids", href: "/categories/kids", hasSubmenu: true },
      { name: "Essentials", href: "/categories/essentials", hasSubmenu: true },
      { name: "Winter", href: "/categories/winter", hasSubmenu: true },
    ],
    submenus: {
      "Men's Top wear": [

        { name: "Men's T-shirts", href: "/categories/mens-topwear/tshirts" },
        { name: "Men's Casual shirts", href: "/categories/mens-topwear/casual-shirts" },
        { name: "Men's Formal shirts", href: "/categories/mens-topwear/formal-shirts" },
        { name: "Men's Kurtas", href: "/categories/mens-topwear/kurtas" },
        { name: "Men's Ethnic sets", href: "/categories/mens-topwear/ethnic-sets" },
        { name: "Men's Blazers", href: "/categories/mens-topwear/blazers" },
        { name: "Men's Raincoat", href: "/categories/mens-topwear/raincoat" },
        { name: "Men's Suits", href: "/categories/mens-topwear/suits" },
      ],
      "Men's Bottom wear": [

        { name: "Men's Jeans", href: "/categories/mens-bottomwear/jeans" },
        { name: "Men's Trousers", href: "/categories/mens-bottomwear/trousers" },
        { name: "Men's Shorts", href: "/categories/mens-bottomwear/shorts" },
        { name: "Men's Track Pants", href: "/categories/mens-bottomwear/track-pants" },
      ],
      "Women Ethnic": [

        { name: "Sarees", href: "/categories/women-ethnic/sarees" },
        { name: "Kurtis", href: "/categories/women-ethnic/kurtis" },
        { name: "Salwar Suits", href: "/categories/women-ethnic/salwar-suits" },
        { name: "Lehengas", href: "/categories/women-ethnic/lehengas" },
      ],
      "Men Footwear": [

        { name: "Men's Sports Shoes", href: "/categories/mens-footwear/sports-shoes" },
        { name: "Men's Casual Shoes", href: "/categories/mens-footwear/casual-shoes" },
        { name: "Men's Formal Shoes", href: "/categories/mens-footwear/formal-shoes" },
        { name: "Men's Sandals", href: "/categories/mens-footwear/sandals" },
      ],
      "Watches and Accessories": [

        { name: "Men's Watches", href: "/categories/watches-accessories/mens-watches" },
        { name: "Women's Watches", href: "/categories/watches-accessories/womens-watches" },
        { name: "Sunglasses", href: "/categories/watches-accessories/sunglasses" },
        { name: "Belts", href: "/categories/watches-accessories/belts" },
      ],
      "Women Western": [

        { name: "Dresses", href: "/categories/women-western/dresses" },
        { name: "Tops", href: "/categories/women-western/tops" },
        { name: "Jeans", href: "/categories/women-western/jeans" },
        { name: "Skirts", href: "/categories/women-western/skirts" },
      ],
      "Bags, Suitcases & Luggage": [

        { name: "Handbags", href: "/categories/bags-luggage/handbags" },
        { name: "Backpacks", href: "/categories/bags-luggage/backpacks" },
        { name: "Suitcases", href: "/categories/bags-luggage/suitcases" },
        { name: "Wallets", href: "/categories/bags-luggage/wallets" },
      ],
      "Kids": [

        { name: "Boys Clothing", href: "/categories/kids/boys-clothing" },
        { name: "Girls Clothing", href: "/categories/kids/girls-clothing" },
        { name: "Kids Footwear", href: "/categories/kids/footwear" },
        { name: "Kids Accessories", href: "/categories/kids/accessories" },
      ],
      "Essentials": [

        { name: "Innerwear", href: "/categories/essentials/innerwear" },
        { name: "Socks", href: "/categories/essentials/socks" },
        { name: "Hair Accessories", href: "/categories/essentials/hair-accessories" },
        { name: "Jewelry", href: "/categories/essentials/jewelry" },
      ],
      "Winter": [

        { name: "Winter Jackets", href: "/categories/winter/jackets" },
        { name: "Sweaters", href: "/categories/winter/sweaters" },
        { name: "Thermals", href: "/categories/winter/thermals" },
        { name: "Winter Accessories", href: "/categories/winter/accessories" },
      ]
    }
  },
  "Electronics": {
    items: [
      { name: "Smartphones", href: "/categories/electronics/smartphones", hasSubmenu: true },
      { name: "Laptops", href: "/categories/electronics/laptops", hasSubmenu: true },
      { name: "Tablets", href: "/categories/electronics/tablets", hasSubmenu: true },
      { name: "Audio", href: "/categories/electronics/audio", hasSubmenu: true },
      { name: "Cameras", href: "/categories/electronics/cameras", hasSubmenu: true },
      { name: "Gaming", href: "/categories/electronics/gaming", hasSubmenu: true },
    ],
    submenus: {
      "Smartphones": [

        { name: "Apple", href: "/categories/electronics/smartphones/apple" },
        { name: "Samsung", href: "/categories/electronics/smartphones/samsung" },
        { name: "OnePlus", href: "/categories/electronics/smartphones/oneplus" },
        { name: "Xiaomi", href: "/categories/electronics/smartphones/xiaomi" },
      ],
      "Laptops": [

        { name: "Gaming Laptops", href: "/categories/electronics/laptops/gaming" },
        { name: "Business Laptops", href: "/categories/electronics/laptops/business" },
        { name: "Student Laptops", href: "/categories/electronics/laptops/student" },
      ],
      "Audio": [

        { name: "Headphones", href: "/categories/electronics/audio/headphones" },
        { name: "Earbuds", href: "/categories/electronics/audio/earbuds" },
        { name: "Speakers", href: "/categories/electronics/audio/speakers" },
      ]
    }
  },
  "Home & Furniture": {
    items: [
      { name: "Living Room", href: "/categories/home-furniture/living-room", hasSubmenu: true },
      { name: "Bedroom", href: "/categories/home-furniture/bedroom", hasSubmenu: true },
      { name: "Kitchen & Dining", href: "/categories/home-furniture/kitchen-dining", hasSubmenu: true },
      { name: "Office Furniture", href: "/categories/home-furniture/office", hasSubmenu: true },
      { name: "Garden & Outdoor", href: "/categories/home-furniture/garden", hasSubmenu: true },
    ],
    submenus: {
      "Living Room": [

        { name: "Sofas", href: "/categories/home-furniture/living-room/sofas" },
        { name: "TV Units", href: "/categories/home-furniture/living-room/tv-units" },
        { name: "Coffee Tables", href: "/categories/home-furniture/living-room/coffee-tables" },
      ],
      "Bedroom": [

        { name: "Beds", href: "/categories/home-furniture/bedroom/beds" },
        { name: "Wardrobes", href: "/categories/home-furniture/bedroom/wardrobes" },
        { name: "Dressers", href: "/categories/home-furniture/bedroom/dressers" },
      ]
    }
  },
  "Beauty, Toys & More": {
    items: [
      { name: "Beauty & Personal Care", href: "/categories/beauty-toys/beauty", hasSubmenu: true },
      { name: "Toys & Games", href: "/categories/beauty-toys/toys", hasSubmenu: true },
      { name: "Sports & Fitness", href: "/categories/beauty-toys/sports", hasSubmenu: true },
      { name: "Books & Stationery", href: "/categories/beauty-toys/books", hasSubmenu: true },
      { name: "Automotive", href: "/categories/beauty-toys/automotive", hasSubmenu: true },
    ],
    submenus: {
      "Beauty & Personal Care": [

        { name: "Skincare", href: "/categories/beauty-toys/beauty/skincare" },
        { name: "Makeup", href: "/categories/beauty-toys/beauty/makeup" },
        { name: "Hair Care", href: "/categories/beauty-toys/beauty/hair-care" },
      ],
      "Toys & Games": [

        { name: "Educational Toys", href: "/categories/beauty-toys/toys/educational" },
        { name: "Action Figures", href: "/categories/beauty-toys/toys/action-figures" },
        { name: "Board Games", href: "/categories/beauty-toys/toys/board-games" },
      ]
    }
  },
  "Two Wheelers": {
    items: [
      { name: "Motorcycles", href: "/categories/two-wheelers/motorcycles", hasSubmenu: true },
      { name: "Scooters", href: "/categories/two-wheelers/scooters", hasSubmenu: true },
      { name: "Electric Vehicles", href: "/categories/two-wheelers/electric", hasSubmenu: true },
      { name: "Spare Parts", href: "/categories/two-wheelers/spare-parts", hasSubmenu: true },
    ],
    submenus: {
      "Motorcycles": [

        { name: "Sports Bikes", href: "/categories/two-wheelers/motorcycles/sports" },
        { name: "Cruiser Bikes", href: "/categories/two-wheelers/motorcycles/cruiser" },
        { name: "Adventure Bikes", href: "/categories/two-wheelers/motorcycles/adventure" },
      ],
      "Scooters": [

        { name: "Gearless Scooters", href: "/categories/two-wheelers/scooters/gearless" },
        { name: "Electric Scooters", href: "/categories/two-wheelers/scooters/electric" },
      ]
    }
  }
}

const Navigation = () => {
  const {
    activeDropdown,
    setActiveDropdown,
    activeSubmenu,
    setActiveSubmenu,
    clickedDropdown,
    setClickedDropdown,
    mobileActiveDropdown,
    setMobileActiveDropdown,
    mobileActiveSubmenu,
    setMobileActiveSubmenu,
    isMobileMenuOpen: contextMobileMenuOpen,
    setIsMobileMenuOpen: setContextMobileMenuOpen,
  } = useDropdown()
  
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null)
  const [hoveredSubmenuItem, setHoveredSubmenuItem] = useState<string | null>(null)
  
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Use context state for mobile menu
  const isMobileMenuOpen = contextMobileMenuOpen
  const setIsMobileMenuOpen = setContextMobileMenuOpen

  const categories = [
    { name: "Grocery", href: "/categories/grocery" },
    { name: "Mobiles", href: "/categories/mobiles" },
    { name: "Fashion", href: "/categories/fashion", hasDropdown: true },
    { name: "Electronics", href: "/categories/electronics", hasDropdown: true },
    { name: "Home & Furniture", href: "/categories/home-furniture", hasDropdown: true },
    { name: "Appliances", href: "/categories/appliances" },
    { name: "Beauty, Toys & More", href: "/categories/beauty-toys", hasDropdown: true },
    { name: "Two Wheelers", href: "/categories/two-wheelers", hasDropdown: true },
  ]

  // Desktop hover handlers - only for lg and up
  const handleMouseEnter = (categoryName: string) => {
    // Only handle hover on desktop (lg and up)
    if (window.innerWidth >= 1024) {
      // Close any other open dropdowns first
      if (activeDropdown && activeDropdown !== categoryName) {
        setActiveDropdown(null)
        setActiveSubmenu(null)
        setClickedDropdown(null)
      }
      setActiveDropdown(categoryName)
      setActiveSubmenu(null)
      // Clear any existing timeout
      if (submenuTimeout) {
        clearTimeout(submenuTimeout)
        setSubmenuTimeout(null)
      }
    }
  }

  const handleMouseLeave = () => {
    // Only handle hover on desktop (lg and up)
    if (window.innerWidth >= 1024) {
      // Add delay before closing to allow moving to dropdown
      const timeout = setTimeout(() => {
        // Only close if not clicked and not hovering dropdown
        if (!clickedDropdown) {
          setActiveDropdown(null)
          setActiveSubmenu(null)
          setHoveredSubmenuItem(null)
        }
      }, 150) // Reduced delay for better responsiveness
      setSubmenuTimeout(timeout)
    }
  }

  // Desktop click handlers - only for lg and up
  const handleClick = (categoryName: string) => {
    // Only handle clicks on desktop (lg and up)
    if (window.innerWidth >= 1024) {
      if (clickedDropdown === categoryName) {
        // Close dropdown if clicking the same category
        setClickedDropdown(null)
        setActiveDropdown(null)
        setActiveSubmenu(null)
        setHoveredSubmenuItem(null)
      } else {
        // Close any other open dropdown first
        setClickedDropdown(null)
        setActiveDropdown(null)
        setActiveSubmenu(null)
        setHoveredSubmenuItem(null)
        // Open new dropdown
        setClickedDropdown(categoryName)
        setActiveDropdown(categoryName)
        setActiveSubmenu(null)
      }
    }
  }

  const handleSubmenuEnter = (itemName: string) => {
    // Only handle hover on desktop (lg and up)
    if (window.innerWidth >= 1024) {
      // Clear any existing timeout
      if (submenuTimeout) {
        clearTimeout(submenuTimeout)
        setSubmenuTimeout(null)
      }
      setActiveSubmenu(itemName)
    }
  }

  const handleSubmenuLeave = () => {
    // Only handle hover on desktop (lg and up)
    if (window.innerWidth >= 1024) {
      // Add a longer delay before hiding submenu to prevent flickering
      const timeout = setTimeout(() => {
        setActiveSubmenu(null)
        setHoveredSubmenuItem(null)
      }, 200) // Reduced from 300ms to 200ms for better responsiveness
      setSubmenuTimeout(timeout)
    }
  }

  const handleSubmenuItemEnter = (itemName: string) => {
    // Only handle hover on desktop (lg and up)
    if (window.innerWidth >= 1024) {
      setHoveredSubmenuItem(itemName)
      // Clear any existing timeout to keep submenu open
      if (submenuTimeout) {
        clearTimeout(submenuTimeout)
        setSubmenuTimeout(null)
      }
    }
  }

  const handleSubmenuItemLeave = () => {
    // Only handle hover on desktop (lg and up)
    if (window.innerWidth >= 1024) {
      setHoveredSubmenuItem(null)
    }
  }

  // Mobile click handlers - only for mobile/tablet
  const handleMobileDropdownToggle = (categoryName: string) => {
    // Only handle clicks on mobile/tablet (below lg)
    if (window.innerWidth < 1024) {
      if (mobileActiveDropdown === categoryName) {
        setMobileActiveDropdown(null)
        setMobileActiveSubmenu(null) // Close submenu when closing main dropdown
      } else {
        setMobileActiveDropdown(categoryName)
        setMobileActiveSubmenu(null) // Reset submenu when opening new dropdown
      }
    }
  }

  // Mobile submenu click handlers
  const handleMobileSubmenuToggle = (itemName: string) => {
    // Only handle clicks on mobile/tablet (below lg)
    if (window.innerWidth < 1024) {
      if (mobileActiveSubmenu === itemName) {
        setMobileActiveSubmenu(null)
      } else {
        setMobileActiveSubmenu(itemName)
      }
    }
  }

  // Mobile nested submenu click handlers
  const handleMobileNestedSubmenuToggle = (subItemName: string) => {
    // Only handle clicks on mobile/tablet (below lg)
    if (window.innerWidth < 1024) {
      if (mobileActiveDropdown === subItemName) {
        setMobileActiveDropdown(null)
      } else {
        setMobileActiveDropdown(subItemName)
      }
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setActiveSubmenu(null)
        setClickedDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setActiveDropdown, setActiveSubmenu, setClickedDropdown])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
        setMobileActiveDropdown(null)
        setMobileActiveSubmenu(null)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen, setIsMobileMenuOpen, setMobileActiveDropdown, setMobileActiveSubmenu])

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
        setMobileActiveDropdown(null)
        setMobileActiveSubmenu(null)
        setActiveDropdown(null)
        setActiveSubmenu(null)
        setClickedDropdown(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setIsMobileMenuOpen, setMobileActiveDropdown, setMobileActiveSubmenu, setActiveDropdown, setActiveSubmenu, setClickedDropdown])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
        setMobileActiveDropdown(null)
        setMobileActiveSubmenu(null)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsMobileMenuOpen, setMobileActiveDropdown, setMobileActiveSubmenu])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (submenuTimeout) {
        clearTimeout(submenuTimeout)
      }
    }
  }, [submenuTimeout])

  // Helper function to check if a category is active
  const isCategoryActive = (categoryName: string) => {
    if (!pathname) return false
    
    // Check if current path matches category
    const categoryPath = `/categories/${categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[&,]/g, '')}`
    return pathname.includes(categoryPath)
  }

  // Helper function to check if a dropdown item is active
  const isDropdownItemActive = (itemHref: string) => {
    if (!pathname) return false
    return pathname === itemHref || pathname.startsWith(itemHref + '/')
  }

  // Helper function to check if a submenu item is active
  const isSubmenuItemActive = (subItemHref: string) => {
    if (!pathname) return false
    return pathname === subItemHref || pathname.startsWith(subItemHref + '/')
  }

  // Helper function to check if a category should be expanded by default (for active items)
  const shouldCategoryBeExpanded = (categoryName: string) => {
    if (!pathname) return false
    return isCategoryActive(categoryName)
  }

  // Helper function to check if a dropdown item should be expanded by default (for active items)
  const shouldDropdownItemBeExpanded = (itemHref: string) => {
    if (!pathname) return false
    return isDropdownItemActive(itemHref)
  }

  return (
    <nav ref={navRef} className="bg-white relative">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
          <div className="flex items-center justify-center h-12">
            <div className="flex items-center gap-8 xl:gap-14 ">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative group"
                  onMouseEnter={() => category.hasDropdown && handleMouseEnter(category.name)}
                  onMouseLeave={() => category.hasDropdown && handleMouseLeave()}
                >
                  <button
                    onClick={() => category.hasDropdown && handleClick(category.name)}
                    className={`flex items-center space-x-1 transition-colors duration-200 font-medium text-sm bg-transparent border-none cursor-pointer ${
                      isCategoryActive(category.name) 
                        ? 'text-[#1a0f3a] font-semibold' 
                        : 'text-[#2A1454] hover:text-[#1a0f3a]'
                    }`}
                  >
                    <span>{category.name}</span>
                    {category.hasDropdown && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          (activeDropdown === category.name || clickedDropdown === category.name) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Desktop Dropdown */}
                  {category.hasDropdown && (activeDropdown === category.name || clickedDropdown === category.name) && (
                    <div 
                      className={`absolute top-full mt-1 w-[270px] min-w-[220px] max-w-[320px] bg-white shadow-lg border border-gray-200 rounded-lg z-50 ${
                        // Align to right for last 2 items to prevent overflow
                        categories.indexOf(category) >= categories.length - 2 ? 'right-0' : 'left-0'
                      }`}
                      onMouseEnter={() => {
                        // Clear any timeout when hovering dropdown
                        if (submenuTimeout) {
                          clearTimeout(submenuTimeout)
                          setSubmenuTimeout(null)
                        }
                      }}
                      onMouseLeave={() => {
                        // Add delay when leaving dropdown
                        const timeout = setTimeout(() => {
                          if (!clickedDropdown) {
                            setActiveDropdown(null)
                            setActiveSubmenu(null)
                            setHoveredSubmenuItem(null)
                          }
                        }, 150)
                        setSubmenuTimeout(timeout)
                      }}
                    >
                      <div className="p-4">
                        <div className="grid grid-cols-1 gap-1">
                          {dropdownData[category.name]?.items.map((item) => (
                            <div
                              key={item.name}
                              className="relative"
                              onMouseEnter={() => item.hasSubmenu && handleSubmenuEnter(item.name)}
                              onMouseLeave={() => item.hasSubmenu && handleSubmenuLeave()}
                            >
                              <LocalizedClientLink
                                href={item.href}
                                className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                                  isDropdownItemActive(item.href)
                                    ? 'bg-[#2A1454] text-white font-medium'
                                    : activeSubmenu === item.name
                                    ? 'bg-gray-50 text-[#2A1454]' // Keep hover effect when submenu is open
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#2A1454]'
                                }`}
                              >
                                <div className="flex items-center">
                                  <span>{item.name}</span>
                                </div>
                                {item.hasSubmenu && (
                                  <svg
                                    className={`w-3 h-3 transition-colors duration-150 ${
                                      isDropdownItemActive(item.href) ? 'text-white' : 'text-gray-400'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </LocalizedClientLink>

                              {/* Submenu */}
                              {item.hasSubmenu && activeSubmenu === item.name && (
                                <>
                                  {/* Invisible hover bridge to maintain hover state */}
                                  <div 
                                    className="absolute top-0 left-0 w-6 h-full bg-transparent"
                                    onMouseEnter={() => handleSubmenuEnter(item.name)}
                                  />
                                  <div 
                                    className={`absolute top-0 bg-white shadow-lg border border-gray-200 rounded-lg ${
                                      // Position submenu to prevent overflow
                                      categories.indexOf(category) >= categories.length - 2 ? 'right-full mr-1' : 'left-full ml-1'
                                    } w-80 z-50`}
                                    onMouseEnter={() => handleSubmenuEnter(item.name)}
                                    onMouseLeave={() => handleSubmenuLeave()}
                                  >
                                    <div className="p-4 pointer-events-auto">
                                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                        More in {item.name}
                                      </h3>
                                      <div className="grid grid-cols-1 gap-1">
                                        {dropdownData[category.name]?.submenus?.[item.name]?.map((subItem: SubmenuItem) => (
                                          <LocalizedClientLink
                                            key={subItem.name}
                                            href={subItem.href}
                                            onMouseEnter={() => handleSubmenuItemEnter(subItem.name)}
                                            onMouseLeave={() => handleSubmenuItemLeave()}
                                            className={`block w-full px-3 py-2 text-sm rounded-md transition-all duration-150 ease-in-out ${
                                              isSubmenuItemActive(subItem.href)
                                                ? 'bg-[#2A1454] text-white font-medium'
                                                : hoveredSubmenuItem === subItem.name
                                                ? 'bg-gray-50 text-[#2A1454]'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-[#2A1454] focus:bg-gray-50 focus:text-[#2A1454]'
                                            }`}
                                          >
                                            {subItem.name}
                                          </LocalizedClientLink>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Dropdown Menu - Only show when explicitly opened */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-2">
              {categories.map((category) => (
                <div key={category.name} className="border-b border-gray-100 last:border-b-0">
                  {category.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => handleMobileDropdownToggle(category.name)}
                        className={`w-full flex items-center justify-between py-3 text-left transition-colors duration-200 font-medium ${
                          isCategoryActive(category.name)
                            ? 'text-[#1a0f3a] font-semibold bg-gray-50'
                            : 'text-[#2A1454] hover:text-[#1a0f3a] hover:bg-gray-50'
                        }`}
                        aria-expanded={mobileActiveDropdown === category.name}
                        aria-controls={`mobile-dropdown-${category.name}`}
                      >
                        <div className="flex items-center">
                          <span>{category.name}</span>
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileActiveDropdown === category.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {mobileActiveDropdown === category.name && (
                        <div 
                          id={`mobile-dropdown-${category.name}`}
                          className="pl-4 pb-2"
                          role="region"
                          aria-labelledby={`mobile-dropdown-${category.name}`}
                        >
                          {dropdownData[category.name]?.items.map((item) => (
                            <div key={item.name}>
                              <div className="flex items-center justify-between">
                                <LocalizedClientLink
                                  href={item.href}
                                  className={`block py-2 text-sm transition-colors duration-200 flex-1 ${
                                    isDropdownItemActive(item.href)
                                      ? 'text-[#1a0f3a] font-semibold'
                                      : mobileActiveSubmenu === item.name
                                      ? 'bg-gray-50 text-[#2A1454]' // Apply the desired styling when submenu is open
                                      : 'text-gray-600 hover:text-[#2A1454]'
                                  }`}
                                  onClick={() => {
                                    // Only close drawer if clicking the main link, not submenu toggle
                                    if (!item.hasSubmenu) {
                                      setIsMobileMenuOpen(false)
                                    }
                                  }}
                                >
                                  <span>{item.name}</span>
                                </LocalizedClientLink>
                                
                                {/* Submenu toggle button for items with submenus */}
                                {item.hasSubmenu && dropdownData[category.name]?.submenus?.[item.name] && (
                                  <button
                                    onClick={() => handleMobileSubmenuToggle(item.name)}
                                    className="p-2 text-gray-400 hover:text-[#2A1454] transition-colors duration-200"
                                    aria-expanded={mobileActiveSubmenu === item.name}
                                  >
                                    <svg
                                      className={`w-3 h-3 transition-transform duration-200 ${
                                        mobileActiveSubmenu === item.name ? 'rotate-90' : ''
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                              
                              {/* Mobile Submenu */}
                              {item.hasSubmenu && mobileActiveSubmenu === item.name && dropdownData[category.name]?.submenus?.[item.name] && (
                                <div className="pl-4 mt-1">
                                  {dropdownData[category.name]?.submenus?.[item.name]?.map((subItem: SubmenuItem) => (
                                    <div key={subItem.name}>
                                      <LocalizedClientLink
                                        href={subItem.href}
                                        className={`block py-1 text-xs transition-colors duration-200 ${
                                          isSubmenuItemActive(subItem.href)
                                            ? 'text-[#1a0f3a] font-semibold'
                                            : 'text-gray-500 hover:text-[#2A1454] hover:bg-gray-50'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        <span>{subItem.name}</span>
                                      </LocalizedClientLink>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <LocalizedClientLink
                      href={category.href}
                      className={`block py-3 transition-colors duration-200 font-medium ${
                        isCategoryActive(category.name)
                          ? 'text-[#1a0f3a] font-semibold bg-gray-50'
                          : 'text-[#2A1454] hover:text-[#1a0f3a] hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </LocalizedClientLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 