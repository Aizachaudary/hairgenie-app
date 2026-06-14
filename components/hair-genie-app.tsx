"use client"

import { useAppStore } from "@/lib/store"
import { LoginScreen } from "@/components/screens/login-screen"
import { SignupScreen } from "@/components/screens/signup-screen"
import { OnboardingScreen } from "@/components/screens/onboarding-screen"
import { QuizScreen } from "@/components/screens/quiz-screen"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { RoutineScreen } from "@/components/screens/routine-screen"
import { ProductsScreen } from "@/components/screens/products-screen"
import { ProgressScreen } from "@/components/screens/progress-screen"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

export function HairGenieApp() {
  const { currentScreen, hasCompletedOnboarding, isAuthenticated } = useAppStore()
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 animate-pulse text-primary" />
        </div>
        <p className="text-muted-foreground">Loading HairGenie...</p>
      </div>
    )
  }
  
  // Show login/signup if not authenticated
  if (!isAuthenticated) {
    if (currentScreen === 'signup') {
      return <SignupScreen />
    }
    return <LoginScreen />
  }
  
  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return (
      <div className="mx-auto min-h-screen max-w-lg bg-background">
        <OnboardingScreen />
      </div>
    )
  }
  
  // Show quiz screen
  if (currentScreen === 'quiz') {
    return (
      <div className="mx-auto min-h-screen max-w-lg bg-background">
        <QuizScreen />
      </div>
    )
  }
  
  // Main app screens with bottom navigation
  const showBottomNav = ['dashboard', 'routine', 'products', 'progress'].includes(currentScreen)
  
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      <div className="animate-in fade-in duration-300">
        {currentScreen === 'dashboard' && <DashboardScreen />}
        {currentScreen === 'routine' && <RoutineScreen />}
        {currentScreen === 'products' && <ProductsScreen />}
        {currentScreen === 'progress' && <ProgressScreen />}
      </div>
      
      {showBottomNav && <BottomNavigation />}
    </div>
  )
}
