import { clx } from "@medusajs/ui"

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: "slash" | "chevron" | "arrow"
  className?: string
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}

export default function Breadcrumb({
  items,
  separator = "chevron",
  className,
  onItemClick,
}: BreadcrumbProps) {
  const separatorIcons = {
    slash: "/",
    chevron: (
      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    arrow: (
      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }

  return (
    <nav className={clx("flex items-center space-x-2", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400" aria-hidden="true">
                {separatorIcons[separator]}
              </span>
            )}
            {item.isActive ? (
              <span
                className={clx(
                  "text-sm font-medium text-gray-900",
                  "cursor-default"
                )}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onItemClick?.(item, index)}
                className={clx(
                  "text-sm text-gray-600 hover:text-gray-900",
                  "transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                  "rounded px-1 py-0.5"
                )}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 