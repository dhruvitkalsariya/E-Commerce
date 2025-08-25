# Section Title Component

A reusable component for consistent section headers across the application.

## Features

- **Consistent Styling**: Standardized typography and spacing
- **Optional Link**: Configurable "See All" link with hover effects
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Proper heading hierarchy and ARIA labels

## Usage

```tsx
import SectionTitle from "@modules/common/components/section-title"

// Basic usage
<SectionTitle title="Explore Top Categories" />

// With link
<SectionTitle 
  title="Featured Products"
  linkText="View All"
  linkHref="/products"
/>

// With custom className
<SectionTitle 
  title="New Arrivals"
  className="mb-6"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | The section heading text |
| `linkText` | `string` | `"See All"` | Text for the optional link |
| `linkHref` | `string` | `"#"` | URL for the optional link |
| `className` | `string` | `""` | Additional CSS classes |

## Styling

The component uses Tailwind CSS classes and follows the design system:
- Heading: `text-2xl font-bold text-gray-900 sm:text-3xl`
- Link: `text-sm font-medium text-[#2A1454]`
- Hover effects with smooth transitions 