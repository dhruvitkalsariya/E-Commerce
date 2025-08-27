import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import SocialMediaLinks from "@modules/common/components/social-media-links"
import PaymentMethods from "@modules/common/components/payment-methods"
import LanguageSelector from "@modules/common/components/language-selector"

// Footer link sections data
const footerSections = [
  {
    title: "Customer Service",
    links: [
      { label: "Help Centre", href: "#" },
      { label: "How To Buy", href: "#" },
      { label: "Payment", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Return & Refund", href: "#" },
      { label: "Warranty Policy", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "About Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Seller Centre", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Shop: Men", href: "#" },
      { label: "Shop: Women", href: "#" },
      { label: "Shop: Kids", href: "#" },
      { label: "Shop: Beauty, Toys & More", href: "#" },
      { label: "Shop: Electronics", href: "#" },
      { label: "Shop: Home & Furniture", href: "#" },
    ],
  },
]

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-[#F3F3F3] w-full">
      <div className="max-w-[1440px] mx-auto px-8 py-9">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Render footer sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col space-y-4">
              <h3 className="text-base font-bold text-[#212121] leading-[26px]">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-[rgba(33,33,33,0.67)] leading-[22px] hover:text-[#6b21a8] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payment Methods */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-bold text-[#212121] leading-[26px]">
              Payment
            </h3>
            <PaymentMethods iconSize={20} />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#666666] pt-6 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Language Selector */}
          <LanguageSelector />
          {/* Left side - Copyright */}
          <div className="flex  items-center space-y-2 sm:space-y-0 sm:space-x-6 order-2 sm:order-1">
            <div className="flex sm:flex-row flex-col justify-center items-center space-x-1">
              <span className="text-sm text-[#565656] leading-[22px]">
                © {new Date().getFullYear()} shopvora.com
              </span>
              
              <p className="text-sm text-[#565656] leading-[22px]"><span className="text-sm text-[#565656] leading-[18px] mx-2">•</span>All rights reserved.</p>
            </div>
          </div>
          {/* Right side - Social Media */}
          <SocialMediaLinks iconSize={24} />
        </div>
      </div>
    </footer>
  )
}
