import { clx } from "@medusajs/ui"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  actionText?: string
  onActionClick?: () => void
  actionIcon?: React.ReactNode
  className?: string
  titleSize?: "sm" | "md" | "lg" | "xl"
  align?: "left" | "center" | "right"
}

export default function SectionHeader({
  title,
  subtitle,
  actionText,
  onActionClick,
  actionIcon,
  className,
  titleSize = "lg",
  align = "left",
}: SectionHeaderProps) {
  const titleSizeClasses = {
    sm: "text-lg sm:text-xl",
    md: "text-xl sm:text-2xl",
    lg: "text-xl sm:text-2xl md:text-3xl",
    xl: "text-2xl sm:text-3xl md:text-4xl",
  }

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between mb-6 sm:mb-8",
        alignClasses[align],
        className
      )}
    >
      <div className="flex-1">
        <h2
          className={clx(
            "font-semibold text-gray-900",
            titleSizeClasses[titleSize]
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            {subtitle}
          </p>
        )}
      </div>
      {actionText && (
        <button
          onClick={onActionClick}
          className="flex items-center space-x-2 text-sm md:text-base text-purple-800 font-medium hover:underline transition-colors duration-200"
        >
          {actionIcon && <span>{actionIcon}</span>}
          <span>{actionText}</span>
        </button>
      )}
    </div>
  )
} 