import { clx } from "@medusajs/ui"

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    mobile?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "sm" | "md" | "lg" | "xl"
  items?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around"
}

export default function ResponsiveGrid({
  children,
  className,
  cols = { mobile: 2, sm: 3, md: 4, lg: 6 },
  gap = "md",
  items = "stretch",
  justify = "start",
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: "gap-2 sm:gap-3",
    md: "gap-3 sm:gap-4 md:gap-6",
    lg: "gap-4 sm:gap-6 md:gap-8",
    xl: "gap-6 sm:gap-8 md:gap-10",
  }

  const itemsClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  }

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  }

  const getGridCols = () => {
    const gridCols = []
    if (cols.mobile) gridCols.push(`grid-cols-${cols.mobile}`)
    if (cols.sm) gridCols.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) gridCols.push(`md:grid-cols-${cols.md}`)
    if (cols.lg) gridCols.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) gridCols.push(`xl:grid-cols-${cols.xl}`)
    return gridCols.join(" ")
  }

  return (
    <div
      className={clx(
        "grid",
        getGridCols(),
        gapClasses[gap],
        itemsClasses[items],
        justifyClasses[justify],
        className
      )}
    >
      {children}
    </div>
  )
} 