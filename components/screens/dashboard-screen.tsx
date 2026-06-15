"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAppStore } from "@/lib/store"
import { Cloud, Droplets, Lightbulb, Sun, Wind } from "lucide-react"
import { useMemo } from "react"

export function DashboardScreen() {
  const { userProfile, weeklyRoutine, progressEntries } = useAppStore()

  const completedTasks = weeklyRoutine.filter((item) => item.completed).length
  const todaysTasks = weeklyRoutine.slice(0, 3)

  const progressData = useMemo(() => {
    if (progressEntries.length === 0) {
      return { avgHairFall: 5, avgFrizz: 6 }
    }
    const avgHairFall =
      progressEntries.reduce((sum, e) => sum + (e.hairFall || 0), 0) /
      progressEntries.length
    const avgFrizz =
      progressEntries.reduce((sum, e) => sum + (e.frizzLevel || 0), 0) /
      progressEntries.length
    return { avgHairFall, avgFrizz }
  }, [progressEntries])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  const getPersonalizedMessage = () => {
    if (completedTasks === todaysTasks.length) {
      return "Great job! You completed today's routine! 🎉"
    } else if (completedTasks > 0) {
      return `Keep it up! You've completed ${completedTasks} task${completedTasks !== 1 ? "s" : ""} today.`
    }
    return "Start your daily hair routine to maintain healthy, beautiful hair!"
  }

  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
      {/* Greeting */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          {getGreeting()}, {userProfile.name || "there"}! 👋
        </h1>
        <p className="text-muted-foreground">
          {getPersonalizedMessage()}
        </p>
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
              {Math.round((completedTasks / todaysTasks.length) * 100)}%
            </span>
          </div>
          <Progress
            value={(completedTasks / todaysTasks.length) * 100}
            className="h-2"
          />
        </CardContent>
      </Card>

      {/* Weekly Routine Preview */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">This Week&apos;s Routine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyRoutine.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-start justify-between rounded-lg bg-secondary/50 p-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{item.day}</p>
                  <p className="text-xs text-muted-foreground">{item.task}</p>
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  item.completed
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {item.completed ? "Done" : "Pending"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hair Health Summary */}
      <div className="grid grid-cols-2 gap-3">
        {/* Hair Fall */}
        <Card className="border-0 bg-card shadow-lg shadow-black/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              Hair Fall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(progressData.avgHairFall)}/10
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {progressData.avgHairFall < 5 ? "Improving ↓" : "Monitor"}
            </p>
          </CardContent>
        </Card>

        {/* Frizz Level */}
        <Card className="border-0 bg-card shadow-lg shadow-black/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Wind className="h-4 w-4 text-primary" />
              Frizz Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(progressData.avgFrizz)}/10
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {progressData.avgFrizz < 6 ? "Looking Good ↓" : "High"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weather-based Tips */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Cloud className="h-4 w-4 text-primary" />
            Weather Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            Sunny weather today? Use a UV-protective spray to shield your hair from sun damage.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              <Sun className="h-3 w-3" />
              UV Protection
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              <Lightbulb className="h-3 w-3" />
              Pro Tip
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Daily Tip */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Daily Hair Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            💡 Pro Tip: Use lukewarm water when washing your hair instead of hot water. Hot water can strip natural oils and make your hair drier and more prone to breakage.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
