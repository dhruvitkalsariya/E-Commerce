# Category Card Component

A reusable component for displaying category items that matches the exact Figma design specifications.

## Features

- **Exact Figma Design**: 208x208px cards with full-image background
- **Text Frame**: White bottom section (208x53.04px) for category name
- **Typography**: Inter font, 20px, weight 500, color #2A1454
- **Hover Effects**: Scale and shadow animations matching Figma
- **Box Shadow**: Exact Figma shadow: `0px 5px 25px rgba(159, 159, 159, 0.1)`

## Usage

```tsx
import CategoryCard from "@modules/common/components/category-card"

<CategoryCard
  id="skincare"
  name="Skincare"
  href="/categories/skincare"
  imageSrc="/assets/shopvora/Skincare-Categories.png"
  imageAlt="Skincare products and cosmetics"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the category |
| `name` | `string` | Yes | Display name of the category |
| `href` | `string` | Yes | Navigation URL for the category |
| `imageSrc` | `string` | Yes | Path to the category image |
| `imageAlt` | `string` | Yes | Alt text for accessibility |
| `className` | `string` | No | Additional CSS classes |

## Figma Design Specifications

### Card Structure
- **Dimensions**: 208x208px (w-52 h-52)
- **Background**: #FFFFFF
- **Box Shadow**: `0px 5px 25px rgba(159, 159, 159, 0.1)` (static, no hover change)

### Image
- **Coverage**: Full card background (absolute inset-0)
- **Object Fit**: cover for proper image scaling
- **Hover Effect**: scale-110 on hover

### Text Frame (Frame 15)
- **Position**: Absolute positioning at bottom
- **Dimensions**: 208x53.04px (full width, h-[53px])
- **Background**: #FFFFFF
- **Top Position**: 154.96px from card top

### Typography
- **Font Family**: Inter
- **Font Size**: 20px
- **Font Weight**: 500 (medium)
- **Line Height**: 38px
- **Color**: #2A1454
- **Positioning**: Absolute positioning with specific left values for each category
- **Text Positioning**: Top 7.52px within the text frame

### Category-Specific Text Positioning
- **Skincare**: left: 62.5px
- **Electronic**: left: 56px
- **Footwear**: left: 59px
- **Laptop & PC**: left: 45px
- **Smartphone**: left: 45px
- **Fashion**: left: 66.5px

## Image Optimization

- Uses Next.js Image component for automatic optimization
- Fixed size: 208px (matches Figma specifications)
- Object-fit: cover for full card coverage
- Hover scale effect: scale-105 