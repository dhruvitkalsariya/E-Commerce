import { render, screen } from "@testing-library/react"
import CategoriesScroller from "./index"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock the components
jest.mock("@modules/common/components/section-title", () => {
  return function MockSectionTitle({ title, linkText }: any) {
    return (
      <div>
        <h2>{title}</h2>
        <a href="/categories">{linkText}</a>
      </div>
    )
  }
})

jest.mock("@modules/common/components/category-card", () => {
  return function MockCategoryCard({ name, href }: any) {
    return (
      <div>
        <a href={href}>{name}</a>
      </div>
    )
  }
})

describe("CategoriesScroller", () => {
  it("renders the section title", () => {
    render(<CategoriesScroller />)
    expect(screen.getByText("Explore Top Categories")).toBeInTheDocument()
  })

  it("renders the 'See All' link", () => {
    render(<CategoriesScroller />)
    expect(screen.getByText("See All")).toBeInTheDocument()
  })

  it("renders all category names", () => {
    render(<CategoriesScroller />)
    
    const expectedCategories = [
      "Skincare",
      "Electronic", 
      "Footwear",
      "Laptop & PC",
      "Smartphone",
      "Fashion"
    ]
    
    expectedCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it("renders category links with correct hrefs", () => {
    render(<CategoriesScroller />)
    
    expect(screen.getByText("Skincare").closest("a")).toHaveAttribute("href", "/categories/skincare")
    expect(screen.getByText("Electronic").closest("a")).toHaveAttribute("href", "/categories/electronics")
    expect(screen.getByText("Footwear").closest("a")).toHaveAttribute("href", "/categories/footwear")
    expect(screen.getByText("Laptop & PC").closest("a")).toHaveAttribute("href", "/categories/laptop-pc")
    expect(screen.getByText("Smartphone").closest("a")).toHaveAttribute("href", "/categories/smartphones")
    expect(screen.getByText("Fashion").closest("a")).toHaveAttribute("href", "/categories/fashion")
  })

  it("has proper section semantics", () => {
    render(<CategoriesScroller />)
    
    const section = screen.getByRole("region", { hidden: true })
    expect(section).toBeInTheDocument()
  })
}) 