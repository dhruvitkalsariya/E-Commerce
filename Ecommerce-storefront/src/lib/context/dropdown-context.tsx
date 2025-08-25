"use client"

import React, { createContext, useContext, useState } from "react"

interface DropdownContextType {
  isAnyDropdownOpen: boolean
  setAnyDropdownOpen: (open: boolean) => void
  activeDropdown: string | null
  setActiveDropdown: (dropdown: string | null) => void
  activeSubmenu: string | null
  setActiveSubmenu: (submenu: string | null) => void
  clickedDropdown: string | null
  setClickedDropdown: (dropdown: string | null) => void
  mobileActiveDropdown: string | null
  setMobileActiveDropdown: (dropdown: string | null) => void
  mobileActiveSubmenu: string | null
  setMobileActiveSubmenu: (submenu: string | null) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

interface DropdownProviderProps {
  children: React.ReactNode
}

export const DropdownProvider = ({ children }: DropdownProviderProps) => {
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const setAnyDropdownOpenHandler = (open: boolean) => {
    setIsAnyDropdownOpen(open)
  }

  const setActiveDropdownHandler = (dropdown: string | null) => {
    setActiveDropdown(dropdown)
    setIsAnyDropdownOpen(!!dropdown)
  }

  const setActiveSubmenuHandler = (submenu: string | null) => {
    setActiveSubmenu(submenu)
    setIsAnyDropdownOpen(!!submenu)
  }

  const setClickedDropdownHandler = (dropdown: string | null) => {
    setClickedDropdown(dropdown)
    setIsAnyDropdownOpen(!!dropdown)
  }

  const setMobileActiveDropdownHandler = (dropdown: string | null) => {
    setMobileActiveDropdown(dropdown)
    setIsAnyDropdownOpen(!!dropdown)
  }

  const setMobileActiveSubmenuHandler = (submenu: string | null) => {
    setMobileActiveSubmenu(submenu)
    setIsAnyDropdownOpen(!!submenu)
  }

  const setIsMobileMenuOpenHandler = (open: boolean) => {
    setIsMobileMenuOpen(open)
    setIsAnyDropdownOpen(open)
  }

  return (
    <DropdownContext.Provider
      value={{
        isAnyDropdownOpen,
        setAnyDropdownOpen: setAnyDropdownOpenHandler,
        activeDropdown,
        setActiveDropdown: setActiveDropdownHandler,
        activeSubmenu,
        setActiveSubmenu: setActiveSubmenuHandler,
        clickedDropdown,
        setClickedDropdown: setClickedDropdownHandler,
        mobileActiveDropdown,
        setMobileActiveDropdown: setMobileActiveDropdownHandler,
        mobileActiveSubmenu,
        setMobileActiveSubmenu: setMobileActiveSubmenuHandler,
        isMobileMenuOpen,
        setIsMobileMenuOpen: setIsMobileMenuOpenHandler,
      }}
    >
      {children}
    </DropdownContext.Provider>
  )
}

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (context === null) {
    throw new Error("useDropdown must be used within a DropdownProvider")
  }
  return context
} 