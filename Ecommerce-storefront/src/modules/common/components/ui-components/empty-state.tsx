import { clx } from "@medusajs/ui"
import Button from "./button"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  actionText?: string
  onActionClick?: () => void
  className?: string
  variant?: "default" | "minimal" | "illustrated"
}

export default function EmptyState({
  title,
  description,
  icon,
  actionText,
  onActionClick,
  className,
  variant = "default",
}: EmptyStateProps) {
  const variantClasses = {
    default: "py-12 px-6",
    minimal: "py-8 px-4",
    illustrated: "py-16 px-8",
  }

  const iconClasses = {
    default: "h-12 w-12",
    minimal: "h-8 w-8",
    illustrated: "h-16 w-16",
  }

  return (
    <div
      className={clx(
        "text-center",
        variantClasses[variant],
        className
      )}
    >
      {icon && (
        <div className="mx-auto mb-4 text-gray-400">
          <div className={clx("mx-auto", iconClasses[variant])}>
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {actionText && onActionClick && (
        <Button onClick={onActionClick} variant="primary" size="md">
          {actionText}
        </Button>
      )}
    </div>
  )
} 