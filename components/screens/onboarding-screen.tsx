"use client"

import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { Sparkles } from "lucide-react"

export function OnboardingScreen() {
  const completeOnboarding = useAppStore((state) => state.completeOnboarding)
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-14 w-14 text-primary" />
        </div>
        
        {/* Title */}
        <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground">
          HairGenie
        </h1>
        
        {/* Subtitle */}
        <p className="mb-2 text-xl font-medium text-foreground/80">
          Your Personal Haircare Assistant
        </p>
        
        {/* Description */}
        <p className="mb-12 max-w-xs text-pretty text-muted-foreground">
          Discover personalized routines, expert tips, and track your hair health journey with AI-powered recommendations.
        </p>
        
        {/* Features */}
        <div className="mb-12 flex flex-col gap-4">
          <FeatureItem icon="✨" text="Personalized hair routines" />
          <FeatureItem icon="🧴" text="Product recommendations" />
          <FeatureItem icon="📊" text="Progress tracking" />
        </div>
        
        {/* CTA Button */}
        <Button 
          onClick={completeOnboarding}
          className="h-14 w-full max-w-xs rounded-2xl text-lg font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <span className="text-muted-foreground">{text}</span>
    </div>
  )
}
