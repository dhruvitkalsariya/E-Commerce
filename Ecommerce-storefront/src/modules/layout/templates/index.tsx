import React from "react"

import Footer from "@modules/layout/templates/footer"
import ShopvoraHeader from "@modules/layout/components/shopvora-header"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      <ShopvoraHeader />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
