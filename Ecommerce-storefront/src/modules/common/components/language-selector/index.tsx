"use client"

import React, { useState, useRef, useEffect } from "react"

interface LanguageSelectorProps {
  className?: string
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" }
]

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Always open dropdown downwards (bottom of parent)
  useEffect(() => {
    setIsOpen(true)
  }, [])

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Set html lang attribute and trigger browser translation
  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language)
    setIsOpen(false)

    // Set the <html lang="..."> attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = language.code
    }

    // Try to trigger browser translation for homepage
    // This will only work if the browser supports auto-translate and user has it enabled
    // We reload the homepage to encourage browser to offer translation
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        window.location.href = "/"
      } else {
        // If already on homepage, reload to trigger translation
        window.location.reload()
      }
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center justify-between border border-[#BCC1CA] rounded-[3px] px-2 py-1.5 hover:border-[#212121] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 min-w-[127px]"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-xs text-[rgba(33,33,33,0.67)] leading-[20px]">
          {selectedLanguage.name}
        </span>
        <svg 
          className={`w-4 h-4 text-[rgba(33,33,33,0.67)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        // Change dropdown to open upwards (above the button)
        <div className="absolute bottom-full left-0 mb-1 w-48 bg-white border border-[#BCC1CA] rounded-[3px] shadow-lg z-50">
          <ul 
            className="py-1 max-h-60 overflow-auto"
            role="listbox"
          >
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  onClick={() => handleLanguageSelect(language)}
                  className={`w-full text-left px-3 py-2 text-xs text-[rgba(33,33,33,0.67)] hover:bg-[#F3F3F3] hover:text-[#212121] transition-colors flex items-center space-x-2 ${
                    selectedLanguage.code === language.code ? 'bg-[#F3F3F3] text-[#212121]' : ''
                  }`}
                  role="option"
                  aria-selected={selectedLanguage.code === language.code}
                >
                  <span className="text-sm">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector 