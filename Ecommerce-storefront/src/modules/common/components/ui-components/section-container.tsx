import { clx } from "@medusajs/ui"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  padding?: "sm" | "md" | "lg" | "xl"
  background?: "white" | "gray" | "purple" | "transparent"
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full"
}

export default function SectionContainer({
  children,
  className,
  containerClassName,
  padding = "lg",
  background = "white",
  maxWidth = "7xl",
}: SectionContainerProps) {
  const paddingClasses = {
    sm: "py-4",
    md: "py-8",
    lg: "py-12",
    xl: "py-16",
  }

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    purple: "bg-purple-50",
    transparent: "bg-transparent",
  }

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }

  return (
    <section
      className={clx(
        "w-full",
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
    >
      <div
        className={clx(
          "mx-auto px-4 sm:px-6 lg:px-8",
          maxWidthClasses[maxWidth],
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
} 