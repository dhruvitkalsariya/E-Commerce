import Image from "next/image"
import { clx } from "@medusajs/ui"

// Custom CSS for responsive design at 425px and below
const responsiveStyles = `
  @media (max-width: 425px) {
    .top-deals-card {
      min-height: 280px;
      padding: 12px 8px;
    }
    
    .top-deals-card__image {
      padding-top: 16px !important;
      padding-bottom: 12px !important;
    }
    
    .top-deals-card__image .flex {
      width: 140px !important;
      height: 140px !important;
    }
    
    .top-deals-card__content {
      padding: 0 8px 12px 8px !important;
      gap: 6px !important;
    }
    
    .top-deals-card__content h3 {
      font-size: 12px !important;
      line-height: 16px !important;
    }
    
    .top-deals-card__content .text-\\[16px\\] {
      font-size: 14px !important;
      line-height: 18px !important;
    }
    
    .top-deals-card__cta {
      font-size: 12px !important;
      line-height: 16px !important;
    }
  }
`

interface TopDealsCardProps {
  title: string
  discount: string
  image: string
  index: number
  onClick?: () => void
}

export default function TopDealsCard({
  title,
  discount,
  image,
  index,
  onClick,
}: TopDealsCardProps) {
  return (
    <>
      <style jsx>{responsiveStyles}</style>
    <div
      className={clx(
        "top-deals-card group", // <-- add group here
        "flex flex-col items-center justify-between",
        "bg-white rounded-[4px] shadow-[0_10px_20px_rgba(159,159,159,0.15)]",
        "transition-shadow duration-300 cursor-pointer overflow-hidden",
        "hover:shadow-[0_16px_32px_rgba(42,20,84,0.10)]"
      )}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      {/* Image Section */}
      <div className="top-deals-card__image flex items-center justify-center w-full flex-shrink-0 pt-9 pb-4 ">
        <div className="flex items-center justify-center rounded-[2px] overflow-hidden w-[186px] h-[186px] bg-gray-50 transition-transform duration-300">
          <Image
            src={image}
            alt={title}
            width={186}
            height={186}
            className="w-full h-auto object-cover px-2 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 186px"
            priority={index === 0}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="top-deals-card__content flex flex-col items-center gap-[7px] w-full px-4 pb-6">
        <h3
          className="text-[14px] leading-5 font-normal text-[#212121] text-center font-inter"
          style={{ letterSpacing: "-0.01px" }}
        >
          {title}
        </h3>
        <div
          className="text-[16px] leading-5 font-semibold text-[#2A1454] text-center font-inter"
          style={{ letterSpacing: "-0.01px" }}
        >
          {discount}
        </div>
        <a
          href="#"
          className={clx(
            "top-deals-card__cta",
            "text-[14px] leading-5 font-normal text-[#212121] text-center font-inter",
            "no-underline hover:text-[#2A1454] transition-colors duration-200",
            "cursor-pointer px-0 py-0"
          )}
          tabIndex={-1}
        >
          Shop now!
        </a>
      </div>
    </div>
    </>
  )
} 