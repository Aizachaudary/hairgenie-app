"use client"

import { UserProfileDropdown } from "@/components/user-profile-dropdown"

export default function UserProfileDemo() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <span className="text-lg font-bold text-foreground">HairGenie</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden gap-8 md:flex">
            <a href="#" className="text-sm text-foreground hover:text-primary">
              Dashboard
            </a>
            <a href="#" className="text-sm text-foreground hover:text-primary">
              Routine
            </a>
            <a href="#" className="text-sm text-foreground hover:text-primary">
              Products
            </a>
          </div>

          {/* User Profile Dropdown */}
          <UserProfileDropdown />
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Profile Dropdown Demo</h1>
            <p className="mt-2 text-muted-foreground">
              Click the avatar button in the top-right corner to see the dropdown menu in action.
            </p>
          </div>

          {/* Demo Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold text-foreground">Features</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>✓ Round avatar with user initials</li>
                <li>✓ Chevron indicator for dropdown state</li>
                <li>✓ Smooth animations and transitions</li>
                <li>✓ Click outside to close</li>
                <li>✓ Fully responsive design</li>
                <li>✓ Red accent on logout button</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold text-foreground">Menu Options</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>👤 View Profile - Navigate to user profile page</li>
                <li>⚙️ Settings - Access account settings</li>
                <li>🚪 Log Out - Logout with visual distinction</li>
                <li>User info displays at the top</li>
                <li>Hover effects on menu items</li>
                <li>Keyboard accessible</li>
              </ul>
            </div>
          </div>

          {/* Code Example */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-semibold text-foreground">Usage</h2>
            <pre className="mt-4 overflow-x-auto rounded bg-muted p-4 text-xs text-muted-foreground">
{`import { UserProfileDropdown } from "@/components/user-profile-dropdown"

export default function YourNavBar() {
  return (
    <nav>
      <div className="flex items-center justify-between">
        {/* Other nav items */}
        <UserProfileDropdown />
      </div>
    </nav>
  )
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
