"use client"

import { useAppStore } from "@/lib/store"
import { Calendar, Home, LineChart, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'routine', label: 'Routine', icon: Calendar },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'progress', label: 'Progress', icon: LineChart },
] as const

export function BottomNavigation() {
  const { currentScreen, setScreen } = useAppStore()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-all",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                isActive && "bg-primary/10"
              )}>
                <item.icon className={cn(
                  "h-5 w-5 transition-all",
                  isActive && "scale-110"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium transition-all",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      {/* Safe area for iPhone */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  )
}
