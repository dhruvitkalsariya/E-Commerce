import { render, screen } from '@testing-library/react'
import CategoriesScroller from './index'

// Mock the CategoryCard component
jest.mock('@modules/common/components/category-card', () => {
  return function MockCategoryCard({ name }: { name: string }) {
    return <div data-testid={`category-card-${name.toLowerCase().replace(/\s+/g, '-')}`}>{name}</div>
  }
})

// Mock the SectionTitle component
jest.mock('@modules/common/components/section-title', () => {
  return function MockSectionTitle({ title }: { title: string }) {
    return <h2>{title}</h2>
  }
})

describe('CategoriesScroller', () => {
  it('renders all 6 category cards', () => {
    render(<CategoriesScroller />)
    
    // Check that all 6 categories are rendered
    expect(screen.getByTestId('category-card-skincare')).toBeInTheDocument()
    expect(screen.getByTestId('category-card-electronic')).toBeInTheDocument()
    expect(screen.getByTestId('category-card-footwear')).toBeInTheDocument()
    expect(screen.getByTestId('category-card-laptop-pc')).toBeInTheDocument()
    expect(screen.getByTestId('category-card-smartphone')).toBeInTheDocument()
    expect(screen.getByTestId('category-card-fashion')).toBeInTheDocument()
  })

  it('renders section title', () => {
    render(<CategoriesScroller />)
    expect(screen.getByText('Explore Top Categories')).toBeInTheDocument()
  })

  it('renders correct category names', () => {
    render(<CategoriesScroller />)
    
    expect(screen.getByText('Skincare')).toBeInTheDocument()
    expect(screen.getByText('Electronic')).toBeInTheDocument()
    expect(screen.getByText('Footwear')).toBeInTheDocument()
    expect(screen.getByText('Laptop & PC')).toBeInTheDocument()
    expect(screen.getByText('Smartphone')).toBeInTheDocument()
    expect(screen.getByText('Fashion')).toBeInTheDocument()
  })
}) 