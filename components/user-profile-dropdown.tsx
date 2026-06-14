"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"

export function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { userEmail, userProfile, logout, setScreen } = useAppStore()

  // Get user initials from email or name
  const getInitials = () => {
    if (userProfile.name) {
      return userProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (userEmail) {
      return userEmail.split("@")[0].slice(0, 2).toUpperCase()
    }
    return "U"
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [isOpen])

  const handleLogout = () => {
    setIsOpen(false)
    logout()
  }

  const handleViewProfile = () => {
    setIsOpen(false)
    // Navigate to profile screen
    setScreen("dashboard") // Replace with profile screen when available
  }

  const handleSettings = () => {
    setIsOpen(false)
    // Navigate to settings screen
    setScreen("dashboard") // Replace with settings screen when available
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full px-3 py-2 transition-all hover:bg-accent"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={userProfile.profileImage || ""} alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 origin-top-right animate-in fade-in slide-in-from-top-2 rounded-lg border border-border bg-card shadow-lg">
          {/* Header */}
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">
              {userProfile.name || userEmail || "User"}
            </p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleViewProfile}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <User className="h-4 w-4" />
              View Profile
            </button>

            <button
              onClick={handleSettings}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>

          {/* Logout Button */}
          <div className="border-t border-border">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
