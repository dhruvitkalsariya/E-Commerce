# Categories Scroller Component

A horizontal scrolling component that displays category cards matching the exact Figma design specifications.

## Features

- **Exact Figma Design**: 208x208px cards with full-image backgrounds
- **Horizontal Scrolling**: Smooth horizontal scroll with hidden scrollbars
- **Real Images**: Uses actual category images from `/assets/shopvora/`
- **Text Frame**: White bottom section (208x53.04px) for category names
- **Typography**: Inter font, 20px, weight 500, color #2A1454
- **Box Shadow**: Exact Figma shadow: `0px 5px 25px rgba(159, 159, 159, 0.1)`

## Categories Included

1. **Skincare** - `/assets/shopvora/Skincare-Categories.png`
2. **Electronic** - `/assets/shopvora/Electroinc-Categories.png`
3. **Footwear** - `/assets/shopvora/Footwear-Categories.png`
4. **Laptop & PC** - `/assets/shopvora/Laptop&pc-Categories.png`
5. **Smartphone** - `/assets/shopvora/Smartphone-Categories.png`
6. **Fashion** - `/assets/shopvora/Fashion-Categories.png`

## Usage

```tsx
import CategoriesScroller from "@modules/home/components/categories-scroller"

// In your page component
<CategoriesScroller />
```

## Component Structure

```
categories-scroller/
├── index.tsx          # Main component
└── README.md         # This documentation
```

## Dependencies

- `@modules/common/components/section-title` - For the section header
- `@modules/common/components/category-card` - For individual category cards
- `@modules/common/components/localized-client-link` - For navigation

## Figma Design Specifications

### Card Layout
- **Dimensions**: 208x208px (w-52 h-52)
- **Background**: #FFFFFF
- **Box Shadow**: `0px 5px 25px rgba(159, 159, 159, 0.1)` (static)
- **Image Coverage**: Full card background
- **Text Frame**: Bottom white section (208x53.04px) at position 154.96px from top

### Typography
- **Font Family**: Inter
- **Font Size**: 20px
- **Font Weight**: 500 (medium)
- **Line Height**: 38px
- **Color**: #2A1454
- **Positioning**: Absolute positioning with category-specific left values

### Layout
- **Card Spacing**: 30px gap between cards (238px - 208px = 30px)
- **Horizontal Scroll**: Smooth scrolling with drag functionality
- **Hidden Scrollbars**: Custom CSS for clean appearance
- **Hover Effects**: Scale-105 for cards, scale-110 for images

### Category-Specific Text Positioning
- **Skincare**: left: 62.5px
- **Electronic**: left: 56px
- **Footwear**: left: 59px
- **Laptop & PC**: left: 45px
- **Smartphone**: left: 45px
- **Fashion**: left: 66.5px

## Customization

### Adding New Categories

To add a new category, modify the `categories` array in `index.tsx`:

```tsx
{
  id: "new-category",
  name: "New Category",
  href: "/categories/new-category",
  imageSrc: "/assets/shopvora/New-Category.png",
  imageAlt: "Description of new category"
}
```

### Styling

The component uses Tailwind CSS classes and can be customized by:
- Modifying the container classes
- Adjusting the scroll behavior
- Changing the spacing and layout
- Updating hover effects

## Performance

- Uses Next.js Image component for automatic optimization
- Efficient hover state management with React hooks
- CSS transforms for smooth animations
- Hidden scrollbars with custom styling 