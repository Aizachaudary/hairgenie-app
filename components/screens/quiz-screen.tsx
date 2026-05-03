"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore, type Concern } from "@/lib/store"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const hairTypes = [
  { value: 'straight', label: 'Straight', emoji: '〰️' },
  { value: 'wavy', label: 'Wavy', emoji: '🌊' },
  { value: 'curly', label: 'Curly', emoji: '🔄' },
  { value: 'coily', label: 'Coily', emoji: '➰' },
] as const

const hairConditions = [
  { value: 'dry', label: 'Dry', emoji: '🏜️' },
  { value: 'oily', label: 'Oily', emoji: '💧' },
  { value: 'normal', label: 'Normal', emoji: '✨' },
  { value: 'damaged', label: 'Damaged', emoji: '💔' },
] as const

const scalpConditions = [
  { value: 'dandruff', label: 'Dandruff', emoji: '❄️' },
  { value: 'itchy', label: 'Itchy', emoji: '😣' },
  { value: 'healthy', label: 'Healthy', emoji: '💚' },
] as const

const concerns = [
  { value: 'hairfall', label: 'Hair Fall', emoji: '📉' },
  { value: 'frizz', label: 'Frizz', emoji: '⚡' },
  { value: 'thinning', label: 'Thinning', emoji: '🪶' },
  { value: 'splitends', label: 'Split Ends', emoji: '✂️' },
] as const

const sleepOptions = [
  { value: 'good', label: 'Good Sleep', emoji: '😴' },
  { value: 'poor', label: 'Poor Sleep', emoji: '😵' },
] as const

const stressOptions = [
  { value: 'low', label: 'Low Stress', emoji: '😌' },
  { value: 'high', label: 'High Stress', emoji: '😰' },
] as const

const waterTypes = [
  { value: 'hard', label: 'Hard Water', emoji: '🧱' },
  { value: 'soft', label: 'Soft Water', emoji: '💦' },
] as const

export function QuizScreen() {
  const [step, setStep] = useState(1)
  const totalSteps = 7
  
  const { userProfile, updateProfile, generateRoutine, setScreen } = useAppStore()
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      generateRoutine()
    }
  }
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      setScreen('onboarding')
    }
  }
  
  const toggleConcern = (concern: Concern) => {
    const current = userProfile.concerns
    if (current.includes(concern)) {
      updateProfile({ concerns: current.filter(c => c !== concern) })
    } else {
      updateProfile({ concerns: [...current, concern] })
    }
  }
  
  const canProceed = () => {
    switch (step) {
      case 1: return !!userProfile.name
      case 2: return !!userProfile.hairType
      case 3: return !!userProfile.hairCondition
      case 4: return !!userProfile.scalpCondition
      case 5: return userProfile.concerns.length > 0
      case 6: return !!userProfile.sleep && !!userProfile.stress
      case 7: return !!userProfile.waterType
      default: return false
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={handleBack}
          className="mb-4 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        {/* Progress bar */}
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div 
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        {step === 1 && (
          <StepContent title="What should we call you?">
            <div className="space-y-4">
              <Label htmlFor="name" className="text-base">Your name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={userProfile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className="h-14 rounded-xl text-lg"
              />
            </div>
          </StepContent>
        )}
        
        {step === 2 && (
          <StepContent title="What&apos;s your hair type?">
            <OptionGrid
              options={hairTypes}
              selected={userProfile.hairType}
              onSelect={(value) => updateProfile({ hairType: value })}
            />
          </StepContent>
        )}
        
        {step === 3 && (
          <StepContent title="How would you describe your hair condition?">
            <OptionGrid
              options={hairConditions}
              selected={userProfile.hairCondition}
              onSelect={(value) => updateProfile({ hairCondition: value })}
            />
          </StepContent>
        )}
        
        {step === 4 && (
          <StepContent title="How&apos;s your scalp?">
            <OptionGrid
              options={scalpConditions}
              selected={userProfile.scalpCondition}
              onSelect={(value) => updateProfile({ scalpCondition: value })}
              cols={3}
            />
          </StepContent>
        )}
        
        {step === 5 && (
          <StepContent title="What are your main concerns?" subtitle="Select all that apply">
            <OptionGrid
              options={concerns}
              selected={userProfile.concerns}
              onSelect={toggleConcern}
              multiSelect
            />
          </StepContent>
        )}
        
        {step === 6 && (
          <StepContent title="Tell us about your lifestyle">
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block text-base text-muted-foreground">Sleep Quality</Label>
                <OptionGrid
                  options={sleepOptions}
                  selected={userProfile.sleep}
                  onSelect={(value) => updateProfile({ sleep: value })}
                  cols={2}
                />
              </div>
              <div>
                <Label className="mb-3 block text-base text-muted-foreground">Stress Level</Label>
                <OptionGrid
                  options={stressOptions}
                  selected={userProfile.stress}
                  onSelect={(value) => updateProfile({ stress: value })}
                  cols={2}
                />
              </div>
            </div>
          </StepContent>
        )}
        
        {step === 7 && (
          <StepContent title="Almost done!">
            <div className="space-y-6">
              <div>
                <Label htmlFor="location" className="mb-3 block text-base">Your Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Mumbai, Delhi, NYC"
                  value={userProfile.location}
                  onChange={(e) => updateProfile({ location: e.target.value })}
                  className="h-14 rounded-xl text-lg"
                />
              </div>
              <div>
                <Label className="mb-3 block text-base text-muted-foreground">Water Type</Label>
                <OptionGrid
                  options={waterTypes}
                  selected={userProfile.waterType}
                  onSelect={(value) => updateProfile({ waterType: value })}
                  cols={2}
                />
              </div>
            </div>
          </StepContent>
        )}
      </div>
      
      {/* Footer */}
      <div className="pb-6 pt-4">
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
          className="h-14 w-full rounded-2xl text-lg font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
        >
          {step === totalSteps ? (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate My Routine
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

function StepContent({ 
  title, 
  subtitle,
  children 
}: { 
  title: string
  subtitle?: string
  children: React.ReactNode 
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">{title}</h2>
      {subtitle && <p className="mb-6 text-muted-foreground">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  )
}

function OptionGrid<T extends string>({ 
  options,
  selected,
  onSelect,
  cols = 2,
  multiSelect = false
}: { 
  options: readonly { value: T; label: string; emoji: string }[]
  selected: T | T[] | null
  onSelect: (value: T) => void
  cols?: number
  multiSelect?: boolean
}) {
  const isSelected = (value: T) => {
    if (multiSelect && Array.isArray(selected)) {
      return selected.includes(value)
    }
    return selected === value
  }
  
  return (
    <div className={cn(
      "grid gap-3",
      cols === 2 && "grid-cols-2",
      cols === 3 && "grid-cols-3",
      cols === 4 && "grid-cols-4"
    )}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={cn(
            "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all",
            isSelected(option.value) 
              ? "border-primary bg-primary/10 shadow-md" 
              : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
          )}
        >
          <span className="text-2xl">{option.emoji}</span>
          <span className={cn(
            "text-sm font-medium",
            isSelected(option.value) ? "text-primary" : "text-foreground"
          )}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  )
}
