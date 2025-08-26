# Top Selling Banner Component

A responsive banner component designed to showcase top-selling products with dynamic pricing and call-to-action buttons.

## Features

- **Responsive Design**: Adapts to different screen sizes (mobile, tablet, desktop)
- **Dynamic Content**: Accepts product data as props
- **Price Formatting**: Automatically formats prices with Rs. prefix
- **Hover Effects**: Interactive button with hover animations
- **Accessibility**: Proper alt text and semantic HTML
- **Performance**: Optimized image loading with Next.js Image component

## Usage

### Basic Usage
```tsx
import TopSellingBanner from "@modules/home/components/top-selling-banner"

// Use with default data
<TopSellingBanner />
```

### With Custom Product Data
```tsx
const productData = {
  id: "123",
  title: "Adidas Continental 80",
  description: "Classic white sneakers with red and navy stripes",
  originalPrice: 2999,
  discountedPrice: 1999,
  image: "/assets/shopvora/Top-selling-banner.png"
}

<TopSellingBanner product={productData} />
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `product` | `ProductData` | No | Default product | Product information to display |

### ProductData Interface
```tsx
interface ProductData {
  id: string
  title: string
  description: string
  originalPrice: number
  discountedPrice: number
  image: string
}
```

## Responsive Breakpoints

- **Mobile**: 300px height, smaller text sizes
- **Small (sm)**: 400px height, medium text sizes
- **Medium (md)**: 500px height, larger text sizes
- **Large (lg)**: 550px height, full text sizes
- **Extra Large (xl)**: Maximum text sizes (65px title, 50px price)

## Styling

The component uses Tailwind CSS classes and follows the design system:
- **Font**: Inter (already imported in globals.css)
- **Colors**: 
  - Primary: #2A1454 (purple)
  - Text: #2A1454 (purple)
  - Price: #565656 (gray for original price), #000000 (black for discounted price)
- **Spacing**: Responsive padding and margins
- **Shadows**: Subtle shadows for depth

## File Structure

```
top-selling-banner/
├── index.tsx          # Main component export
├── template.tsx       # Template component with full implementation
└── README.md         # This documentation
```

## Integration

The component is integrated into the home page at `src/app/[countryCode]/(main)/page.tsx` and appears between the Top Categories and Popular Products sections. 