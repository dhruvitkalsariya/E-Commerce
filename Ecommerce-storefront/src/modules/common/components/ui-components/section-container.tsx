import { clx } from "@medusajs/ui"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  background?: "white" | "gray" | "transparent"
  padding?: "sm" | "md" | "lg" | "xl"
  maxWidth?: "full" | "8xl"
}

export default function SectionContainer({
  children,
  className,
  background = "white",
  padding = "lg",
  maxWidth = "8xl",
}: SectionContainerProps) {
  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    transparent: "bg-transparent",
  }

  const paddingClasses = {
    sm: "py-6",
    md: "py-8",
    lg: "py-12",
    xl: "py-16",
  }

  const maxWidthClasses = {
    full: "w-full",
    "8xl": "w-full xl:max-w-8xl",
  }

  return (
    <div
      className={clx(
        maxWidthClasses[maxWidth],
        "mx-auto",
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
} 