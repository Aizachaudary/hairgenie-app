"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"
import { Cloud, Droplets, Lightbulb, RotateCcw, Sun, Wind, LogOut } from "lucide-react"
import { useMemo } from "react"

const tips = [
  "Avoid brushing wet hair - use a wide-toothed comb instead",
  "Trim your hair every 6-8 weeks to prevent split ends",
  "Use lukewarm water for washing - hot water strips natural oils",
  "Apply conditioner from mid-length to ends, not roots",
  "Protect your hair from sun with a hat or UV spray",
  "Sleep on a silk pillowcase to reduce friction",
  "Avoid tight hairstyles that pull on your hairline",
  "Massage your scalp daily to boost blood circulation",
]

const weatherTips = {
  humid: { icon: Droplets, tip: "High humidity today! Apply an anti-frizz serum before stepping out." },
  dry: { icon: Sun, tip: "Dry weather ahead. Keep your hair hydrated with leave-in conditioner." },
  windy: { icon: Wind, tip: "Windy conditions expected. Tie your hair to prevent tangles." },
  rainy: { icon: Cloud, tip: "Rainy day! Use a waterproof hair product to protect your style." },
}

export function DashboardScreen() {
  const { userProfile, weeklyRoutine, progressEntries, resetApp, logout } = useAppStore()
  
  const todaysTasks = useMemo(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    return weeklyRoutine.filter(item => item.day === today)
  }, [weeklyRoutine])
  
  const completedTasks = todaysTasks.filter(t => t.completed).length
  const totalTasks = todaysTasks.length || 1
  const progressPercent = (completedTasks / totalTasks) * 100
  
  const randomTip = useMemo(() => tips[Math.floor(Math.random() * tips.length)], [])
  
  // Simulate weather based on user concerns/conditions
  const weather = useMemo(() => {
    if (userProfile.concerns.includes('frizz')) return weatherTips.humid
    if (userProfile.hairCondition === 'dry') return weatherTips.dry
    return weatherTips.humid
  }, [userProfile])
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }
  
  const getPersonalizedMessage = () => {
    const messages = []
    if (userProfile.hairCondition === 'dry') {
      messages.push("Focus on hydration and deep conditioning this week.")
    }
    if (userProfile.concerns.includes('hairfall')) {
      messages.push("Remember to be gentle with your hair and avoid tight styles.")
    }
    if (userProfile.concerns.includes('frizz')) {
      messages.push("Anti-frizz serums will be your best friend!")
    }
    if (userProfile.stress === 'high') {
      messages.push("Stress can affect hair health - try some relaxation techniques.")
    }
    return messages[0] || "Keep up with your routine for best results!"
  }
  
  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()}, {userProfile.name || 'there'}! 👋
          </h1>
          <p className="text-muted-foreground">
            {getPersonalizedMessage()}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={resetApp}
            className="text-muted-foreground hover:text-foreground"
            title="Reset app"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Today's Progress */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Today&apos;s Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {completedTasks} of {todaysTasks.length} tasks completed
            </span>
            <span className="text-sm font-semibold text-primary">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </CardContent>
      </Card>
      
      {/* Today's Routine */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Today&apos;s Routine</CardTitle>
        </CardHeader>
        <CardContent>
          {todaysTasks.length > 0 ? (
            <div className="space-y-3">
              {todaysTasks.map((task, index) => (
                <RoutineStep 
                  key={task.id}
                  step={index + 1}
                  task={task.task}
                  completed={task.completed}
                />
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-muted-foreground">
              No tasks scheduled for today. Rest and let your hair breathe! 🌿
            </p>
          )}
        </CardContent>
      </Card>
      
      {/* Weather Tip */}
      <Card className="border-0 bg-primary/5 shadow-lg shadow-black/5">
        <CardContent className="flex items-start gap-4 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <weather.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-foreground">Weather Alert</h3>
            <p className="text-sm text-muted-foreground">{weather.tip}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Hair Tip */}
      <Card className="border-0 bg-accent/30 shadow-lg shadow-black/5">
        <CardContent className="flex items-start gap-4 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent">
            <Lightbulb className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-foreground">Tip of the Day</h3>
            <p className="text-sm text-muted-foreground">{randomTip}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Summary */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Weekly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <StatItem 
              label="Tasks Done" 
              value={weeklyRoutine.filter(t => t.completed).length.toString()}
              total={weeklyRoutine.length}
            />
            <StatItem 
              label="Logs" 
              value={progressEntries.length.toString()}
            />
            <StatItem 
              label="Streak" 
              value="3"
              suffix="days"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RoutineStep({ step, task, completed }: { step: number; task: string; completed: boolean }) {
  const { toggleRoutineItem, weeklyRoutine } = useAppStore()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const item = weeklyRoutine.find(i => i.day === today && i.task === task)
  
  return (
    <button 
      onClick={() => item && toggleRoutineItem(item.id)}
      className="flex w-full items-center gap-3 text-left"
    >
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
        completed 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-secondary text-secondary-foreground'
      }`}>
        {completed ? '✓' : step}
      </div>
      <span className={completed ? 'text-muted-foreground line-through' : 'text-foreground'}>
        {task}
      </span>
    </button>
  )
}

function StatItem({ label, value, total, suffix }: { label: string; value: string; total?: number; suffix?: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-foreground">
        {value}
        {total && <span className="text-sm text-muted-foreground">/{total}</span>}
        {suffix && <span className="ml-1 text-xs text-muted-foreground">{suffix}</span>}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
