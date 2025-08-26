import { clx } from "@medusajs/ui"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg" | "xl"
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500",
    ghost: "text-purple-600 hover:bg-purple-50 focus:ring-purple-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  }

  const disabledClasses = disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  const widthClasses = fullWidth ? "w-full" : ""

  const iconClasses = icon ? "space-x-2" : ""

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        widthClasses,
        iconClasses,
        className
      )}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  )
} 