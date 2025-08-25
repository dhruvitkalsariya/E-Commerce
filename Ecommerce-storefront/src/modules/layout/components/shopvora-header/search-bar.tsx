"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useDropdown } from "@lib/context/dropdown-context"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const { isAnyDropdownOpen } = useDropdown()

  // Mock suggestions data based on Figma design
  const popularSearches = [
    "mobiles",
    "Tops", 
    "shoes",
    "furniture",
    "smart wearables"
  ]

  const recentSearches = [
    "motorola mobiles 5g",
    "motorola 50 fusion", 
    "motorola edge 50",
    "motorola g85 5g",
    "motorola g45 5g"
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    
    if (value.trim().length > 0) {
      // Filter suggestions based on input
      const filteredSuggestions = [
        ...popularSearches.filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        ),
        ...recentSearches.filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        )
      ].slice(0, 5) // Limit to 5 suggestions like in Figma
      
      setSuggestions(filteredSuggestions)
      // Only show suggestions if no dropdown is open
      if (!isAnyDropdownOpen) {
        setShowSuggestions(true)
      }
    } else {
      // When input is empty, show popular searches if focused
      if (showSuggestions) {
        setSuggestions(popularSearches)
      } else {
        setShowSuggestions(false)
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    // Show suggestions when focused, regardless of whether there's text
    if (!isAnyDropdownOpen) {
      setShowSuggestions(true)
      // If there's no text, show popular searches
      if (searchQuery.trim().length === 0) {
        setSuggestions(popularSearches)
      }
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hide suggestions when any dropdown opens
  useEffect(() => {
    if (isAnyDropdownOpen) {
      setShowSuggestions(false)
    }
  }, [isAnyDropdownOpen])

  return (
    <div ref={searchRef} className="w-full relative">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          {/* Search icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.9935 13.6061L17.9232 18.5348M7.96133 15.6914C9.84851 15.6914 11.6584 14.9419 12.9928 13.6077C14.3273 12.2735 15.077 10.464 15.077 8.57714C15.077 6.69032 14.3273 4.88079 12.9928 3.54661C11.6584 2.21243 9.84851 1.46289 7.96133 1.46289C6.07415 1.46289 4.26426 2.21243 2.92982 3.54661C1.59538 4.88079 0.845703 6.69032 0.845703 8.57714C0.845703 10.464 1.59538 12.2735 2.92982 13.6077C4.26426 14.9419 6.07415 15.6914 7.96133 15.6914Z" stroke="#2A1454" strokeWidth="1.36594" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Search input with exact Figma styling */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search for Products, Brands and More"
            className="block w-full pl-10 pr-4 py-3 bg-[rgba(219,208,253,0.17)] border border-transparent rounded-lg text-[rgba(42,20,84,0.6)] placeholder-[rgba(42,20,84,0.6)] focus:outline-none focus:ring-2 focus:ring-[#2A1454] focus:border-transparent transition-all duration-200 text-xs sm:text-sm md:text-base lg:text-[17px] leading-[21px] tracking-[0.8px] font-normal"
            style={{
              fontFamily: 'Inter, sans-serif',
            }}
            aria-label="Search products"
          />
        </div>
      </form>

      {/* Search Suggestions Dropdown - Exact Figma styling */}
      {showSuggestions && !isAnyDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3">
            {/* Simple suggestions list like in Figma */}
            {suggestions.length > 0 ? (
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2A1454] rounded-md transition-colors duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : searchQuery.trim().length > 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">No suggestions found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-1">
                {popularSearches.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2A1454] rounded-md transition-colors duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar 