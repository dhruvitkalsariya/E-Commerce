# Recently Viewed Section

This component displays a grid of recently viewed products for logged-in users, with a design that matches the Figma specifications exactly.

## Features

- **Authentication-based display**: Only shows when user is logged in
- **Pixel-perfect Figma design**: Matches the exact dimensions and styling from the Figma file
- **Responsive grid**: Adapts to different screen sizes
- **Wishlist functionality**: Toggle wishlist state for each product
- **Product cards**: Reusable product card component with exact Figma styling
- **Section header**: Consistent with other sections using the same header component
- **Gray background**: Uses gray background to differentiate from other sections

## Authentication Logic

The component checks if the user is logged in using the `clientRetrieveCustomer()` function:
- If user is logged in: Shows the recently viewed products section
- If user is not logged in: Component returns `null` (not rendered)
- While checking auth status: Component returns `null` (loading state)

## Components

### RecentlyViewed
Main section component that renders the product grid conditionally based on authentication status.

### ProductCard
Reuses the existing product card component that exactly matches the Figma design specifications:
- Width: 261px, Height: 397px
- White background with shadow
- Wishlist icon in top-right corner
- Product image (241px × 200px)
- Rating with star icon
- Category, title, description
- Price with strikethrough for original price

## Usage

```tsx
import RecentlyViewed from "@modules/home/components/recently-viewed"

// In your page component
<RecentlyViewed />
```

## Props

No props required - uses authentication check and static data for now.

## Styling

The component uses:
- **Background**: Gray background (`bg-gray-50`) to differentiate from other sections
- **Fonts**: Poppins and Inter (imported from Google Fonts)
- **Colors**: Exact colors from Figma design
- **Shadows**: Box shadow matching Figma specifications
- **Responsive**: Grid adapts from 1 column on mobile to 5 columns on desktop

## Future Enhancements

- Replace static data with actual recently viewed products from user's browsing history
- Add product view tracking functionality
- Implement local storage fallback for non-logged-in users
- Add product view timestamps
- Implement product view analytics

## Authentication Integration

The component integrates with the existing authentication system:
- Uses `clientRetrieveCustomer()` to check login status
- Handles authentication errors gracefully
- Provides smooth loading states during auth checks

## Responsive Behavior

- **Mobile**: 1 column layout
- **Tablet**: 2-3 columns layout  
- **Desktop**: 4-5 columns layout
- **Large screens**: 5 columns layout

## Error Handling

- Authentication errors are logged but don't break the component
- Loading states are handled gracefully
- Failed data fetching shows appropriate error message 