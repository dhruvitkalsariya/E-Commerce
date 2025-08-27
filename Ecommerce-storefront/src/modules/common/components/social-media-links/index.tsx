import React from "react"
import Image from "next/image"

interface SocialMediaLinksProps {
  className?: string
  iconSize?: number
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  className = "", 
  iconSize = 24 
}) => {
  const socialLinks = [
    {
      name: "Twitter",
      icon: "/assets/Shopvora/social-media/X-social.svg",
      href: "https://twitter.com/shopvora",
      ariaLabel: "Follow us on Twitter"
    },
    {
      name: "Facebook",
      icon: "/assets/Shopvora/social-media/Facebook-social.svg",
      href: "https://facebook.com/shopvora",
      ariaLabel: "Follow us on Facebook"
    },
    {
      name: "LinkedIn",
      icon: "/assets/Shopvora/social-media/Linkdln-scoial.svg",
      href: "https://linkedin.com/company/shopvora",
      ariaLabel: "Follow us on LinkedIn"
    },
    {
      name: "YouTube",
      icon: "/assets/Shopvora/social-media/Youtube-social.svg",
      href: "https://youtube.com/shopvora",
      ariaLabel: "Follow us on YouTube"
    }
  ]

  return (
    <div className={`flex items-center space-x-5 order-1 sm:order-2 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className="group transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 hover:scale-110"
        >
          <div className="relative w-6 h-6">
            <Image
              src={social.icon}
              alt={social.name}
              fill
              className="transition-all duration-200 group-hover:opacity-80"
              sizes="24px"
            />
          </div>
        </a>
      ))}
    </div>
  )
}

export default SocialMediaLinks 