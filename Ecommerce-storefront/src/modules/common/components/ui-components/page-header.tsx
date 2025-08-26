import { clx } from "@medusajs/ui"

interface PageHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  onBackClick?: () => void
  rightContent?: React.ReactNode
  className?: string
}

export default function PageHeader({
  title,
  subtitle,
  showBackButton = false,
  onBackClick,
  rightContent,
  className,
}: PageHeaderProps) {
  return (
    <div className={clx("w-full bg-white border-b border-gray-200", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {rightContent && (
            <div className="flex items-center space-x-3">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 