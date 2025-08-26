# Explore New Collection Component

## Overview

The `ExploreNewCollection` component is a responsive, animated product showcase section that displays new collection items in a grid layout. It's designed to match the Figma design specifications while providing excellent user experience across all device sizes.

## Features

### 🎨 Design Features
- **Pixel-perfect Figma implementation**: Matches the original 1440px design exactly
- **Responsive design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth animations**: Framer Motion powered entrance and hover effects
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

### 📱 Responsive Breakpoints
- **Mobile (320px+)**: 1 column layout
- **Small (640px+)**: 2 columns
- **Medium (768px+)**: 3 columns  
- **Large (1024px+)**: 4 columns
- **XL (1280px+)**: 5 columns
- **2XL (1536px+)**: 5 columns (optimized for larger screens)

### 🎭 Animations
- **Entrance animations**: Staggered card appearance with fade-in and slide-up effects
- **Hover effects**: Cards lift up and show subtle overlay
- **Image zoom**: Product images scale on hover
- **Tap feedback**: Scale down effect on touch/click

## Component Structure

```
explore-new-collection/
├── index.tsx                 # Main component
├── new-collection-card/
│   └── index.tsx            # Individual card component
└── README.md                # This file
```

## Usage

### Basic Implementation

```tsx
import ExploreNewCollection from "@modules/home/components/explore-new-collection"

// In your page component
<ExploreNewCollection />
```

### Custom Data Integration

The component currently uses static data but is designed for easy integration with Medusa.js:

```tsx
// Example with dynamic data
const newCollectionItems = await getNewCollectionProducts()

<ExploreNewCollection items={newCollectionItems} />
```

## Data Structure

```typescript
interface NewCollectionItem {
  id: string
  title: string
  discount: string
  imageSrc: string
  imageAlt: string
  href: string
}
```

## Styling

### Design Tokens
- **Background**: `rgba(219, 208, 253, 0.4)` (light purple)
- **Card background**: `#FFFFFF` (white)
- **Text colors**: 
  - Title: `#212121` (dark gray)
  - Discount: `#2A1454` (purple)
- **Typography**: Inter font family
- **Shadows**: Tailwind's `shadow-lg` with hover `shadow-xl`

### Responsive Dimensions
- **Card height**: 260px (mobile) → 331px (desktop)
- **Image size**: 120px (mobile) → 186px (desktop)
- **Text sizes**: Responsive scaling from 11px to 14px

## Accessibility

- ✅ Semantic HTML with `article` role
- ✅ ARIA labels for screen readers
- ✅ Keyboard navigation support
- ✅ Focus states and hover effects
- ✅ Alt text for all images
- ✅ Proper color contrast ratios

## Performance

- ✅ Next.js Image optimization
- ✅ Responsive image sizes
- ✅ Lazy loading for off-screen images
- ✅ Optimized animations with `transform` properties
- ✅ Minimal re-renders with React.memo pattern

## Future Enhancements

1. **Medusa.js Integration**: Connect to real product data
2. **Loading States**: Add skeleton loaders
3. **Error Handling**: Graceful fallbacks for failed image loads
4. **Analytics**: Track user interactions
5. **A/B Testing**: Different layouts and content variations

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Testing

The component has been tested across:
- ✅ Desktop (1440px, 1920px, 2560px)
- ✅ Tablet (768px, 1024px)
- ✅ Mobile (320px, 375px, 414px)
- ✅ Touch devices
- ✅ Screen readers (NVDA, JAWS)

## Dependencies

- `framer-motion`: Animation library
- `next/image`: Image optimization
- `@modules/common/components/section-title`: Section header component
- Tailwind CSS: Styling framework 