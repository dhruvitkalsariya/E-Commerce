# Popular Products Section

This component displays a grid of popular products with a design that matches the Figma specifications exactly.

## Features

- **Pixel-perfect Figma design**: Matches the exact dimensions and styling from the Figma file
- **Responsive grid**: Adapts to different screen sizes
- **Wishlist functionality**: Toggle wishlist state for each product
- **Product cards**: Reusable product card component with exact Figma styling
- **Section header**: Consistent with other sections using the same header component

## Components

### PopularProducts
Main section component that renders the product grid.

### ProductCardFigma
Product card component that exactly matches the Figma design specifications:
- Width: 261px, Height: 397px
- White background with shadow
- Wishlist icon in top-right corner
- Product image (241px × 200px)
- Rating with star icon
- Category, title, description
- Price with strikethrough for original price

### WishlistIcon
Reusable wishlist icon component that toggles between filled and unfilled states.

## Usage

```tsx
import PopularProducts from "@modules/home/components/popular-products"

// In your page component
<PopularProducts />
```

## Props

### PopularProducts
No props required - uses static data for now.

### ProductCardFigma
```tsx
interface ProductCardFigmaProps {
  product: {
    id: string
    title: string
    category: string
    description: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviewCount: number
  }
  isWishlisted?: boolean
  onWishlistToggle?: (productId: string) => void
  onClick?: (productId: string) => void
  className?: string
}
```

## Styling

The component uses:
- **Fonts**: Poppins and Inter (imported from Google Fonts)
- **Colors**: Exact colors from Figma design
- **Shadows**: Box shadow matching Figma specifications
- **Responsive**: Grid adapts from 1 column on mobile to 5 columns on desktop

## Future Enhancements

- Replace static data with Medusa.js product data
- Add loading states
- Implement actual wishlist functionality
- Add product detail page navigation
- Add add-to-cart functionality 