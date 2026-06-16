# User Profile Dropdown Component

A modern, responsive user profile dropdown menu component for navigation bars. Designed for the HairGenie app with a clean, intuitive interface.

## Features

✅ **Round Avatar Circle** - Displays user initials or profile image
✅ **Smooth Animations** - Chevron rotates and dropdown fades in
✅ **Responsive Design** - Works perfectly on desktop and mobile
✅ **Click Outside to Close** - Automatically closes when clicking elsewhere
✅ **User Information** - Shows user name and email in header
✅ **Menu Options** - View Profile, Settings, and Log Out
✅ **Visual Distinction** - Red accent on Log Out button with icon
✅ **Keyboard Accessible** - ARIA labels and semantic HTML
✅ **Tailwind CSS** - Fully styled with Tailwind utilities
✅ **Lucide Icons** - Professional icons throughout

## Installation

The component is already included in the HairGenie project. No additional dependencies needed.

## Usage

```tsx
import { UserProfileDropdown } from "@/components/user-profile-dropdown"

export default function NavigationBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-bold">App Name</h1>
        {/* Other nav items */}
      </div>
      
      {/* User Profile Dropdown */}
      <UserProfileDropdown />
    </nav>
  )
}
```

## Component Structure

### Main Component: `UserProfileDropdown`

Located at: `/components/user-profile-dropdown.tsx`

**Props:** None (uses Zustand store for state)

**Features:**
- Displays user avatar with initials
- Shows chevron icon that rotates when menu is open
- Dropdown menu with three sections:
  - Header with user name and email
  - Menu items (View Profile, Settings)
  - Logout button with visual distinction

## Customization

### Change Avatar Size

Modify the Avatar component className:
```tsx
<Avatar className="h-10 w-10">  {/* Default is h-8 w-8 */}
```

### Change Dropdown Width

Update the dropdown menu width:
```tsx
<div className="w-56">  {/* Default is w-48 */}
```

### Customize Colors

The component uses Tailwind's semantic color tokens:
- `bg-card` - Dropdown background
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `text-destructive` - Red logout button

To change colors, modify the CSS classes or update your Tailwind theme.

## Accessibility

- ARIA labels for screen readers
- Keyboard accessible with proper focus management
- Semantic HTML structure
- Proper role attributes on interactive elements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- IE11+ with appropriate polyfills

## Integration Points

The component uses the following from the app store:
- `userEmail` - Displayed in dropdown header
- `userProfile.name` - User's display name
- `logout()` - Logout handler
- `setScreen()` - Navigation handler

## Mobile Responsiveness

The dropdown is fully responsive and works great on:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (320px - 768px)

The dropdown menu positions itself correctly on small screens, staying within viewport bounds.

## Demo Page

A demo page is available at `/user-profile-demo` to test the component in isolation.

## Performance

- Lightweight component with minimal re-renders
- Uses React hooks efficiently
- CSS animations handled by Tailwind
- No heavy dependencies

## Future Enhancements

Potential improvements:
- Add profile image upload
- Add preferences/theme switching
- Add logout confirmation dialog
- Add notification badge on avatar
- Add recent activity section
