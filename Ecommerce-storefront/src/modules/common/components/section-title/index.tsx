"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

interface SectionTitleProps {
  title: string
  linkText?: string
  linkHref?: string
  className?: string
}

const SectionTitle = ({ 
  title, 
  linkText = "See All", 
  linkHref = "#", 
  className = "" 
}: SectionTitleProps) => {
  return (
    <div className={`flex items-center justify-between mb-8 ${className}`}>
      <h2 className="text-lg sm:text-3xl font-bold text-gray-900">
        {title}
      </h2>
      {linkText && linkHref && (
        <LocalizedClientLink
          href={linkHref}
          className="flex items-center text-sm font-medium text-[#2A1454] hover:text-[#1a0f3a] transition-colors duration-200 group"
        >
          {linkText}
          <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </LocalizedClientLink>
      )}
    </div>
  )
}

export default SectionTitle 