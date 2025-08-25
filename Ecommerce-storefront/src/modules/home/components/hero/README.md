# Hero Carousel Component

A responsive, accessible image-only carousel component that matches the Figma design specifications for the Shopvora ecommerce platform.

## Features

- **Image-Only Display**: Shows only images without text overlays
- **Click Navigation**: Click on any image to navigate to target pages
- **5 Slides**: Displays 5 different product category images
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Auto-play**: Configurable auto-play with pause on user interaction
- **Smooth Animations**: Framer Motion powered transitions
- **Medusa.js Ready**: Designed for integration with Medusa.js backend
- **TypeScript**: Fully typed with TypeScript interfaces

## Components

### AdvancedCarousel
The main carousel component with full configuration options.

### CarouselArrow
Reusable arrow component for navigation.

### Types
TypeScript interfaces for type safety.

## Usage

### Basic Usage
```tsx
import AdvancedCarousel from "./advanced-carousel"

const Hero = () => {
  return <AdvancedCarousel />
}
```

### Advanced Usage with Custom Configuration
```tsx
import AdvancedCarousel from "./advanced-carousel"
import { CarouselSlide } from "./types"

const customSlides: CarouselSlide[] = [
  {
    id: 1,
    image: "/path/to/image1.jpg",
    alt: "Product Category 1",
    link: "/products/category1"
  },
  {
    id: 2,
    image: "/path/to/image2.jpg",
    alt: "Product Category 2",
    link: "/products/category2"
  }
]

const Hero = () => {
  return (
    <AdvancedCarousel
      slides={customSlides}
      autoPlay={true}
      autoPlayInterval={3000}
      showArrows={true}
      showPagination={true}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `CarouselSlide[]` | `defaultSlides` | Array of carousel slides |
| `autoPlay` | `boolean` | `true` | Enable/disable auto-play |
| `autoPlayInterval` | `number` | `5000` | Auto-play interval in milliseconds |
| `showArrows` | `boolean` | `true` | Show/hide navigation arrows |
| `showPagination` | `boolean` | `true` | Show/hide pagination indicators |

## CarouselSlide Interface

```typescript
interface CarouselSlide {
  id: number
  image: string
  alt: string
  link: string
}
```

## Default Slides

The carousel comes with 5 default slides:
1. **Big Sale Banner** → `/products/sale`
2. **Top Selling Banner** → `/products/top-selling`
3. **Laptop Products** → `/products/laptops`
4. **Footwear Products** → `/products/footwear`
5. **Smartphone Products** → `/products/smartphones`

## Accessibility Features

- **Keyboard Navigation**: Arrow keys for navigation
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators
- **Live Regions**: Announcements for dynamic content
- **Role Descriptions**: Proper semantic roles
- **Click Navigation**: Full image clickable for navigation

## Responsive Breakpoints

- **Mobile**: 280px height
- **Tablet**: 350px height
- **Desktop**: 400px height
- **Large Desktop**: 450px height

## Design Specifications

The component matches the Figma design with:
- **Banner**: 1408px width, 280px height, 8px border radius
- **Navigation Arrows**: White circular buttons with #2A1454 arrows
- **Pagination**: 86px width, 8px height indicators positioned at bottom
- **Colors**: #2A1454 (primary), #DBD0FD (secondary), #FFFFFF (white)
- **Image Hover**: Subtle scale effect on hover

## Medusa.js Integration

To integrate with Medusa.js backend:

1. Create a custom hook to fetch carousel data
2. Pass the fetched data as `slides` prop
3. Handle loading and error states

Example:
```tsx
import { useCarouselData } from "@/hooks/use-carousel-data"

const Hero = () => {
  const { data: slides, isLoading, error } = useCarouselData()
  
  if (isLoading) return <CarouselSkeleton />
  if (error) return <CarouselError />
  
  return <AdvancedCarousel slides={slides} />
}
```

## Performance Optimizations

- **Image Optimization**: Next.js Image component with proper sizing
- **Lazy Loading**: Non-critical images loaded on demand
- **Animation Performance**: Hardware-accelerated animations
- **Memory Management**: Proper cleanup of intervals and event listeners

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

- React 18+
- Next.js 13+
- Framer Motion
- TypeScript
- Tailwind CSS 