# Top Deals Component

A responsive, reusable component for displaying top deals/products with discount badges and call-to-action buttons.

## Features

- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Hover Effects**: Smooth animations and visual feedback
- **Discount Badges**: Prominent display of discount percentages
- **Call-to-Action**: "Shop now!" buttons for each deal
- **Accessible**: Proper ARIA labels and semantic HTML
- **Optimized Images**: Next.js Image component with proper sizing

## Usage

```tsx
import TopDeals from "@modules/home/components/top-deals"

// In your page component
<TopDeals />
```

## Component Structure

### TopDealsCard
Individual card component for each deal with:
- Product image with hover zoom effect
- Discount badge overlay
- Product title
- "Shop now!" button

### Props Interface
```tsx
interface TopDealsCardProps {
  title: string
  discount: string
  image: string
  index: number
  onClick?: () => void
}
```

## Responsive Breakpoints

- **Mobile (default)**: 2 columns
- **Small (sm)**: 3 columns  
- **Medium (md)**: 4 columns
- **Large (lg)**: 5 columns

## Images

Uses images from `/assets/Shopvora/Top-Deals-section/`:
- Tablet-Topdeals.png
- Shoes-Topdeals.png
- Sandles-Topdeals.png
- kurta-Topdeals.png
- top-Topdeals.png

## Styling

- Uses Tailwind CSS for responsive design
- Purple theme colors (purple-600, purple-700)
- Red discount badges (red-500)
- Smooth transitions and hover effects
- Box shadows and border effects

## Integration

The component is integrated into the main homepage and uses the shared `SectionContainer` and `SectionHeader` components for consistent layout and styling. 