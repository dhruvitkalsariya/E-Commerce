import { clx } from "@medusajs/ui"

interface WishlistIconProps {
  isAdded?: boolean
  onClick?: (e?: React.MouseEvent<Element, MouseEvent>) => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function WishlistIcon({ 
  isAdded = false, 
  onClick, 
  className,
  size = "md" 
}: WishlistIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  }

  return (
    <button
      onClick={onClick}
      className={clx(
        "transition-all duration-200 hover:scale-110",        
        className
      )}
      aria-label={isAdded ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg 
        width="22" 
        height="20" 
        viewBox="0 0 22 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}
      >
        <path 
          d="M12.9756 2.05762C14.9259 -0.0193206 18.0741 -0.0193206 20.0244 2.05762C21.9916 4.15285 21.9916 7.56297 20.0244 9.6582L11 19.2695L1.97559 9.6582C0.00835238 7.56297 0.00835238 4.15285 1.97559 2.05762C3.92591 -0.0193209 7.07409 -0.0193207 9.02441 2.05762L10.6357 3.77344L11 4.16211L11.3643 3.77344L12.9756 2.05762Z" 
          fill={isAdded ? "#2A1454" : "white"} 
          stroke="#2A1454" 
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
} 