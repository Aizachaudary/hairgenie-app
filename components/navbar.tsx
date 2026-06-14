"use client"

import { useAppStore } from "@/lib/store"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"

export function Navbar() {
  const { userProfile, userEmail, logout } = useAppStore()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-lg flex h-16 items-center justify-between px-4">
        {/* Logo / Branding */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <span className="text-lg font-bold text-primary">✨</span>
          </div>
          <h1 className="text-lg font-bold text-foreground hidden sm:block">HairGenie</h1>
        </div>

        {/* User Profile Dropdown */}
        <UserProfileDropdown
          userName={userProfile.name}
          userEmail={userEmail}
          onLogout={logout}
        />
      </div>
    </nav>
  )
}
