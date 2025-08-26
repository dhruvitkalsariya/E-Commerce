# Reusable UI Components Library

A comprehensive collection of reusable UI components for the Shopvora ecommerce storefront. These components are designed to maintain consistency across the application and reduce development time.

## Quick Start

```tsx
import { 
  SectionContainer, 
  SectionHeader, 
  ResponsiveGrid, 
  Card, 
  Button 
} from "@modules/common/components/ui-components"
```

## Layout Components

### PageHeader
Used for page-level headers with optional back button and right content.

```tsx
<PageHeader
  title="My Account"
  subtitle="Manage your account settings"
  showBackButton={true}
  onBackClick={() => router.back()}
  rightContent={<Button>Save Changes</Button>}
/>
```

**Props:**
- `title: string` - Main page title
- `subtitle?: string` - Optional subtitle
- `showBackButton?: boolean` - Show back button
- `onBackClick?: () => void` - Back button handler
- `rightContent?: React.ReactNode` - Right side content
- `className?: string` - Additional CSS classes

### SectionContainer
Consistent container for page sections with responsive padding and backgrounds.

```tsx
<SectionContainer 
  background="white" 
  padding="lg" 
  maxWidth="7xl"
>
  {/* Section content */}
</SectionContainer>
```

**Props:**
- `children: React.ReactNode` - Section content
- `padding?: "sm" | "md" | "lg" | "xl"` - Vertical padding
- `background?: "white" | "gray" | "purple" | "transparent"` - Background color
- `maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full"` - Max width
- `className?: string` - Additional CSS classes

### SectionHeader
Consistent headers for sections with optional action buttons.

```tsx
<SectionHeader
  title="Featured Products"
  subtitle="Handpicked items for you"
  actionText="View All"
  onActionClick={() => router.push('/products')}
  titleSize="lg"
  align="left"
/>
```

**Props:**
- `title: string` - Section title
- `subtitle?: string` - Optional subtitle
- `actionText?: string` - Action button text
- `onActionClick?: () => void` - Action button handler
- `actionIcon?: React.ReactNode` - Icon for action button
- `titleSize?: "sm" | "md" | "lg" | "xl"` - Title size
- `align?: "left" | "center" | "right"` - Text alignment

## Grid and Layout

### ResponsiveGrid
Flexible responsive grid system with customizable columns and gaps.

```tsx
<ResponsiveGrid
  cols={{ mobile: 2, sm: 3, md: 4, lg: 6 }}
  gap="md"
  items="stretch"
  justify="start"
>
  {/* Grid items */}
</ResponsiveGrid>
```

**Props:**
- `children: React.ReactNode` - Grid items
- `cols?: { mobile?: number, sm?: number, md?: number, lg?: number, xl?: number }` - Column counts
- `gap?: "sm" | "md" | "lg" | "xl"` - Gap size
- `items?: "start" | "center" | "end" | "stretch"` - Vertical alignment
- `justify?: "start" | "center" | "end" | "between" | "around"` - Horizontal alignment

## UI Components

### Card
Versatile card component with multiple variants and hover effects.

```tsx
<Card
  variant="default"
  hover={true}
  padding="md"
  shadow="md"
  border={true}
  rounded="lg"
>
  {/* Card content */}
</Card>
```

**Props:**
- `children: React.ReactNode` - Card content
- `variant?: "default" | "elevated" | "outlined" | "flat"` - Card style
- `hover?: boolean` - Enable hover effects
- `padding?: "sm" | "md" | "lg" | "xl"` - Internal padding
- `shadow?: "none" | "sm" | "md" | "lg" | "xl"` - Shadow size
- `border?: boolean` - Show border
- `rounded?: "sm" | "md" | "lg" | "xl" | "full"` - Border radius

### Button
Comprehensive button component with multiple variants, sizes, and states.

```tsx
<Button
  variant="primary"
  size="md"
  disabled={false}
  loading={false}
  fullWidth={false}
  icon={<Icon />}
  iconPosition="left"
  onClick={() => console.log('clicked')}
>
  Click Me
</Button>
```

**Props:**
- `children: React.ReactNode` - Button content
- `variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"` - Button style
- `size?: "sm" | "md" | "lg" | "xl"` - Button size
- `disabled?: boolean` - Disable button
- `loading?: boolean` - Show loading spinner
- `fullWidth?: boolean` - Full width button
- `icon?: React.ReactNode` - Icon element
- `iconPosition?: "left" | "right"` - Icon position
- `onClick?: () => void` - Click handler

### LoadingSpinner
Consistent loading spinner with different sizes and colors.

```tsx
<LoadingSpinner
  size="md"
  color="primary"
  className="my-4"
/>
```

**Props:**
- `size?: "sm" | "md" | "lg" | "xl"` - Spinner size
- `color?: "primary" | "white" | "gray"` - Spinner color
- `className?: string` - Additional CSS classes

### EmptyState
Consistent empty state displays for lists, grids, and pages.

```tsx
<EmptyState
  title="No products found"
  description="Try adjusting your search criteria"
  icon={<SearchIcon />}
  actionText="Browse All Products"
  onActionClick={() => router.push('/products')}
  variant="default"
/>
```

**Props:**
- `title: string` - Empty state title
- `description?: string` - Optional description
- `icon?: React.ReactNode` - Icon element
- `actionText?: string` - Action button text
- `onActionClick?: () => void` - Action button handler
- `variant?: "default" | "minimal" | "illustrated"` - Display variant

## Usage Examples

### Product Grid Page
```tsx
import { SectionContainer, SectionHeader, ResponsiveGrid, Card } from "@modules/common/components/ui-components"

export default function ProductsPage() {
  return (
    <SectionContainer background="white" padding="lg">
      <SectionHeader
        title="All Products"
        subtitle="Discover our amazing collection"
        actionText="Filter"
        onActionClick={() => setShowFilters(true)}
      />
      
      <ResponsiveGrid cols={{ mobile: 2, sm: 3, md: 4, lg: 5 }}>
        {products.map(product => (
          <Card key={product.id} hover={true} variant="default">
            <ProductCard product={product} />
          </Card>
        ))}
      </ResponsiveGrid>
    </SectionContainer>
  )
}
```

### Account Settings Page
```tsx
import { PageHeader, SectionContainer, Card, Button } from "@modules/common/components/ui-components"

export default function AccountPage() {
  return (
    <>
      <PageHeader
        title="Account Settings"
        subtitle="Manage your account preferences"
        showBackButton={true}
        onBackClick={() => router.back()}
      />
      
      <SectionContainer background="gray" padding="lg">
        <Card variant="default" padding="lg">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          {/* Form content */}
          <Button variant="primary" size="lg" fullWidth>
            Save Changes
          </Button>
        </Card>
      </SectionContainer>
    </>
  )
}
```

## Best Practices

1. **Consistent Spacing**: Use the predefined padding and gap options
2. **Responsive Design**: Always use ResponsiveGrid for layouts
3. **Accessibility**: Components include proper ARIA attributes and keyboard navigation
4. **Performance**: Components are optimized for re-renders
5. **Theme Consistency**: Use the predefined color variants

## Customization

All components accept `className` props for additional styling. For theme customization, modify the component source files or extend them with wrapper components.

## Migration Guide

When migrating existing components:

1. Replace custom containers with `SectionContainer`
2. Use `SectionHeader` for consistent section titles
3. Replace manual grids with `ResponsiveGrid`
4. Use `Card` component for consistent card styling
5. Replace custom buttons with the `Button` component

This will ensure consistency and reduce maintenance overhead across the application. 