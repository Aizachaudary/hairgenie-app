"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/lib/store"
import { Bell, Calendar, Droplet, Sparkles, Wind } from "lucide-react"
import { useMemo } from "react"

export function RoutineScreen() {
  const { weeklyRoutine, remindersEnabled, toggleRoutineItem, toggleReminders } =
    useAppStore()

  const completedTasks = weeklyRoutine.filter((item) => item.completed).length
  const completionRate = ((completedTasks / weeklyRoutine.length) * 100).toFixed(0)

  const routinesByDay = useMemo(() => {
    const grouped: { [key: string]: typeof weeklyRoutine } = {}
    weeklyRoutine.forEach((item) => {
      if (!grouped[item.day]) {
        grouped[item.day] = []
      }
      grouped[item.day].push(item)
    })
    return grouped
  }, [weeklyRoutine])

  const getDayIcon = (day: string) => {
    const icons: { [key: string]: any } = {
      Monday: Droplet,
      Wednesday: Sparkles,
      Friday: Sparkles,
      Sunday: Droplet,
      Daily: Wind,
    }
    const IconComponent = icons[day] || Calendar
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Your Hair Routine</h1>
        <p className="text-muted-foreground">
          {completionRate}% complete this week
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1">
            {weeklyRoutine.map((item, idx) => (
              <div
                key={item.id}
                className={`flex-1 h-12 rounded-t-lg transition-colors ${
                  item.completed
                    ? "bg-primary"
                    : "bg-muted"
                }`}
                title={`${item.day}: ${item.completed ? "Completed" : "Pending"}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {completedTasks} of {weeklyRoutine.length} tasks completed
          </p>
        </CardContent>
      </Card>

      {/* Routines by Day */}
      {Object.entries(routinesByDay).map(([day, items]) => (
        <Card key={day} className="border-0 bg-card shadow-lg shadow-black/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              {getDayIcon(day)}
              {day}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  onCheckedChange={() => toggleRoutineItem(item.id)}
                  className="h-5 w-5"
                />
                <label
                  htmlFor={item.id}
                  className={`flex-1 text-sm font-medium cursor-pointer transition-colors ${
                    item.completed
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {item.task}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Hair Myths & Facts */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Hair Myths Debunked</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MythItem 
            myth="Frequent shampooing makes hair grow faster"
            truth="Hair growth happens at the scalp, not from shampooing. Over-washing strips natural oils and damages hair."
          />
          <MythItem 
            myth="Cutting hair makes it grow thicker"
            truth="Cutting removes dead ends but doesn't affect growth rate or thickness. A trim keeps hair healthy-looking!"
          />
          <MythItem 
            myth="Brushing 100 strokes makes hair healthier"
            truth="Over-brushing can actually damage hair and cause breakage. Gentle is better!"
          />
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card className="border-0 bg-card shadow-lg shadow-black/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div>
              <Label htmlFor="reminders" className="font-semibold">Daily Reminders</Label>
              <p className="text-xs text-muted-foreground">Get notified about your routine</p>
            </div>
            <Switch id="reminders" checked={remindersEnabled} onCheckedChange={toggleReminders} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MythItem({ myth, truth }: { myth: string; truth: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-foreground">
        <span className="text-destructive">Myth:</span> {myth}
      </p>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-primary">Truth:</span> {truth}
      </p>
    </div>
  )
}
