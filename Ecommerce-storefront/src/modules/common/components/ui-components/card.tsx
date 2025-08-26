import { clx } from "@medusajs/ui"

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined" | "flat"
  hover?: boolean
  padding?: "sm" | "md" | "lg" | "xl"
  shadow?: "none" | "sm" | "md" | "lg" | "xl"
  border?: boolean
  rounded?: "sm" | "md" | "lg" | "xl" | "full"
}

export default function Card({
  children,
  className,
  variant = "default",
  hover = false,
  padding = "md",
  shadow = "md",
  border = true,
  rounded = "lg",
}: CardProps) {
  const variantClasses = {
    default: "bg-white",
    elevated: "bg-white shadow-lg",
    outlined: "bg-white border-2 border-gray-200",
    flat: "bg-gray-50",
  }

  const paddingClasses = {
    sm: "p-3",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
    xl: "p-8 sm:p-10",
  }

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  }

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }

  const hoverClasses = hover
    ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    : "transition-shadow duration-300"

  return (
    <div
      className={clx(
        variantClasses[variant],
        paddingClasses[padding],
        shadowClasses[shadow],
        roundedClasses[rounded],
        hoverClasses,
        border && variant !== "outlined" && "border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  )
} 