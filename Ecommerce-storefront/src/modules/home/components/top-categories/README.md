# TopCategories Component

A responsive category display component for the ecommerce storefront that showcases top product categories with interactive hover effects.

## Features

- **Responsive Design**: Adapts to different screen sizes with responsive grid layout
- **Image-Only Hover Effects**: Only images scale on hover, cards remain stable
- **100% Image Width**: Images fill the entire container width
- **Bottom Labels**: Category names positioned at bottom center with overlay
- **Overflow Hidden**: Prevents scaled images from breaking card boundaries
- **Image Optimization**: Uses Next.js Image component with proper sizing and optimization
- **Accessibility**: Proper alt text and semantic HTML structure
- **Performance**: Optimized with proper image sizing and lazy loading

## Component Structure

- `index.tsx` - Main TopCategories component with header and grid
- `category-card.tsx` - Individual CategoryCard component with hover effects

## Responsive Breakpoints

- **Mobile (default)**: 2 columns
- **Small (sm)**: 3 columns  
- **Medium (md)**: 4 columns
- **Large (lg)**: 6 columns

## Hover Effects

- **Card**: Enhanced shadow effect and border color change
- **Image Only**: Scale up (110%) for enhanced visual feedback
- **Smooth Transitions**: 300ms duration for all animations
- **Overflow Hidden**: Keeps scaled images within card boundaries

## Usage

```tsx
import TopCategories from "@modules/home/components/top-categories"

// In your page component
<TopCategories />
```

## Categories

The component displays 6 main categories:
- Skincare
- Electronic  
- Footwear
- Laptop & PC
- Smartphone
- Fashion

Each category uses optimized images from the `/assets/shopvora/` directory.

## Technical Details

- Uses `aspect-square` for consistent image container sizing
- Implements `group` and `group-hover` for image-only scaling
- Images use `object-cover` for 100% width display
- Bottom labels with semi-transparent background and backdrop blur
- Proper z-index layering for labels above images
- Container with `max-w-7xl` for consistent layout 