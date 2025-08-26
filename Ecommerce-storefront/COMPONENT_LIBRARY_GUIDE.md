# Shopvora Ecommerce - Component Library Guide

## 🏗️ Project Structure Overview

```
Ecommerce-storefront/
├── src/
│   ├── app/                          # Next.js App Router
│   │   └── [countryCode]/
│   │       ├── (main)/               # Main layout pages
│   │       │   ├── page.tsx          # Home page
│   │       │   ├── products/         # Product pages
│   │       │   ├── categories/       # Category pages
│   │       │   ├── cart/             # Cart pages
│   │       │   └── account/          # Account pages
│   │       └── (checkout)/           # Checkout layout pages
│   │           └── checkout/         # Checkout flow
│   ├── modules/                      # Feature-based modules
│   │   ├── common/                   # Shared components
│   │   │   └── components/
│   │   │       ├── ui-components/    # 🎯 REUSABLE UI LIBRARY
│   │   │       ├── category-card/    # Category display
│   │   │       ├── section-title/    # Section headers
│   │   │       ├── input/            # Form inputs
│   │   │       ├── modal/            # Modal dialogs
│   │   │       └── ...               # Other shared components
│   │   ├── home/                     # Home page components
│   │   │   └── components/
│   │   │       ├── hero/             # Hero section
│   │   │       ├── top-categories/   # Category showcase
│   │   │       ├── featured-products/# Featured products
│   │   │       └── categories-scroller/# Category scroller
│   │   ├── layout/                   # Layout components
│   │   │   └── components/
│   │   │       ├── shopvora-header/  # Main header
│   │   │       ├── cart-button/      # Cart icon
│   │   │       ├── cart-dropdown/    # Cart dropdown
│   │   │       └── side-menu/        # Mobile menu
│   │   ├── products/                 # Product-related components
│   │   ├── cart/                     # Cart components
│   │   ├── checkout/                 # Checkout components
│   │   ├── account/                  # Account components
│   │   └── ...                       # Other feature modules
│   ├── lib/                          # Utility libraries
│   │   ├── data/                     # Data fetching functions
│   │   ├── util/                     # Utility functions
│   │   └── config.ts                 # App configuration
│   └── styles/                       # Global styles
└── public/                           # Static assets
    └── assets/
        └── shopvora/                 # Brand assets
```

## 🎯 Reusable UI Components Library

### Quick Import
```tsx
import { 
  SectionContainer, 
  SectionHeader, 
  ResponsiveGrid, 
  Card, 
  Button,
  ProductCard,
  PageHeader,
  Breadcrumb,
  LoadingSpinner,
  EmptyState
} from "@modules/common/components/ui-components"
```

## 📋 Component Categories

### 1. Layout Components
- **PageHeader** - Page-level headers with back buttons
- **SectionContainer** - Consistent section containers
- **SectionHeader** - Section titles with actions

### 2. Grid & Layout
- **ResponsiveGrid** - Flexible responsive grid system

### 3. UI Components
- **Card** - Versatile card with multiple variants
- **Button** - Comprehensive button with states
- **LoadingSpinner** - Consistent loading indicators
- **EmptyState** - Empty state displays

### 4. Ecommerce Specific
- **ProductCard** - Product display cards
- **Breadcrumb** - Navigation breadcrumbs

## 🚀 Usage Examples

### Home Page Section
```tsx
import { SectionContainer, SectionHeader, ResponsiveGrid } from "@modules/common/components/ui-components"

export default function FeaturedProducts() {
  return (
    <SectionContainer background="white" padding="lg">
      <SectionHeader
        title="Featured Products"
        subtitle="Handpicked items for you"
        actionText="View All"
        onActionClick={() => router.push('/products')}
      />
      
      <ResponsiveGrid cols={{ mobile: 2, sm: 3, md: 4, lg: 5 }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
          />
        ))}
      </ResponsiveGrid>
    </SectionContainer>
  )
}
```

### Product Detail Page
```tsx
import { PageHeader, SectionContainer, Card, Button, Breadcrumb } from "@modules/common/components/ui-components"

export default function ProductPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/categories/electronics" },
    { label: product.name, isActive: true }
  ]

  return (
    <>
      <PageHeader
        title={product.name}
        subtitle={product.description}
        showBackButton={true}
        onBackClick={() => router.back()}
      />
      
      <SectionContainer background="gray" padding="lg">
        <Breadcrumb items={breadcrumbItems} />
        
        <Card variant="default" padding="lg" className="mt-6">
          {/* Product details */}
          <Button variant="primary" size="lg" fullWidth>
            Add to Cart
          </Button>
        </Card>
      </SectionContainer>
    </>
  )
}
```

### Account Settings Page
```tsx
import { PageHeader, SectionContainer, Card, Button } from "@modules/common/components/ui-components"

export default function AccountSettings() {
  return (
    <>
      <PageHeader
        title="Account Settings"
        subtitle="Manage your account preferences"
        showBackButton={true}
        onBackClick={() => router.back()}
        rightContent={<Button variant="outline">Save Changes</Button>}
      />
      
      <SectionContainer background="gray" padding="lg">
        <ResponsiveGrid cols={{ mobile: 1, md: 2 }} gap="lg">
          <Card variant="default" padding="lg">
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            {/* Form content */}
          </Card>
          
          <Card variant="default" padding="lg">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
            {/* Security form */}
          </Card>
        </ResponsiveGrid>
      </SectionContainer>
    </>
  )
}
```

## 🎨 Design System

### Colors
- **Primary**: Purple (`purple-600`, `purple-700`)
- **Secondary**: Gray (`gray-600`, `gray-700`)
- **Success**: Green (`green-600`)
- **Warning**: Yellow (`yellow-400`)
- **Error**: Red (`red-600`)

### Spacing
- **sm**: `py-4 px-4`
- **md**: `py-8 px-6`
- **lg**: `py-12 px-8`
- **xl**: `py-16 px-10`

### Typography
- **Page Titles**: `text-2xl sm:text-3xl font-semibold`
- **Section Titles**: `text-xl sm:text-2xl md:text-3xl font-semibold`
- **Body Text**: `text-sm sm:text-base`
- **Small Text**: `text-xs sm:text-sm`

## 🔧 Best Practices

### 1. Component Composition
```tsx
// ✅ Good: Use composition
<SectionContainer background="white" padding="lg">
  <SectionHeader title="Products" actionText="View All" />
  <ResponsiveGrid cols={{ mobile: 2, sm: 3, md: 4 }}>
    {items.map(item => <ProductCard key={item.id} product={item} />)}
  </ResponsiveGrid>
</SectionContainer>

// ❌ Avoid: Custom styling
<div className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Products</h2>
      <button className="text-purple-800 hover:underline">View All</button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {/* Custom grid items */}
    </div>
  </div>
</div>
```

### 2. Responsive Design
```tsx
// ✅ Good: Use ResponsiveGrid
<ResponsiveGrid cols={{ mobile: 1, sm: 2, md: 3, lg: 4 }} gap="md">
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</ResponsiveGrid>

// ❌ Avoid: Manual responsive classes
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</div>
```

### 3. Consistent Spacing
```tsx
// ✅ Good: Use predefined spacing
<SectionContainer padding="lg" background="white">
  <SectionHeader title="Section" />
  <ResponsiveGrid gap="md">
    {/* Content */}
  </ResponsiveGrid>
</SectionContainer>

// ❌ Avoid: Custom spacing
<section className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold">Section</h2>
    </div>
    <div className="grid gap-6">
      {/* Content */}
    </div>
  </div>
</section>
```

## 📱 Responsive Breakpoints

| Breakpoint | Prefix | Min Width | Use Case |
|------------|--------|-----------|----------|
| Mobile | - | 0px | Default mobile layout |
| Small | sm: | 640px | Small tablets |
| Medium | md: | 768px | Tablets |
| Large | lg: | 1024px | Laptops |
| Extra Large | xl: | 1280px | Desktops |

## 🎯 Migration Guide

### Before (Custom Components)
```tsx
// Old way - lots of custom styling
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
      Products
    </h2>
    <button className="text-sm md:text-base text-purple-800 font-medium hover:underline">
      View All
    </button>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
    {products.map(product => (
      <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
        {/* Product content */}
      </div>
    ))}
  </div>
</div>
```

### After (Reusable Components)
```tsx
// New way - clean and consistent
<SectionContainer background="white" padding="lg">
  <SectionHeader
    title="Products"
    actionText="View All"
    onActionClick={() => router.push('/products')}
  />
  <ResponsiveGrid cols={{ mobile: 2, sm: 3, md: 4, lg: 5 }} gap="md">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </ResponsiveGrid>
</SectionContainer>
```

## 🚀 Benefits

1. **Consistency**: All pages use the same design patterns
2. **Maintainability**: Changes in one place affect all instances
3. **Development Speed**: Less time writing repetitive code
4. **Responsive**: Built-in responsive design patterns
5. **Accessibility**: Proper ARIA attributes and keyboard navigation
6. **Performance**: Optimized components with proper re-render handling

## 📚 Additional Resources

- [Component Documentation](./src/modules/common/components/ui-components/README.md)
- [Design System Guide](./DESIGN_SYSTEM.md)
- [Component Examples](./examples/)
- [Migration Examples](./migration-examples/)

---

**Remember**: Always use the reusable components instead of creating custom solutions. This ensures consistency and reduces maintenance overhead across the entire application. 