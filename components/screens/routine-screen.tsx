"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/lib/store"
import { Bell, Calendar, Droplet, Sparkles, Wind } from "lucide-react"
import { useMemo } from "react"

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function getTaskIcon(task: string) {
  if (task.toLowerCase().includes('oil')) return Droplet
  if (task.toLowerCase().includes('wash')) return Wind
  if (task.toLowerCase().includes('mask')) return Sparkles
  if (task.toLowerCase().includes('serum')) return Sparkles
  return Calendar
}

export function RoutineScreen() {
  const { weeklyRoutine, toggleRoutineItem, remindersEnabled, toggleReminders } = useAppStore()
  
  const routineByDay = useMemo(() => {
    const grouped: Record<string, typeof weeklyRoutine> = {}
    dayOrder.forEach(day => {
      const tasks = weeklyRoutine.filter(item => item.day === day)
      if (tasks.length > 0) {
        grouped[day] = tasks
      }
    })
    return grouped
  }, [weeklyRoutine])
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  
  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Weekly Routine</h1>
          <p className="text-muted-foreground">
            Your personalized haircare schedule
          </p>
        </div>
        
        <Card className="border-0 bg-card shadow-lg shadow-black/5">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label htmlFor="reminders" className="font-semibold">Daily Reminders</Label>
                <p className="text-xs text-muted-foreground">Get notified about your routine</p>
              </div>
            </div>
            <Switch id="reminders" checked={remindersEnabled} onCheckedChange={toggleReminders} />
          </CardContent>
        </Card>
        
        {Object.entries(routineByDay).map(([day, tasks]) => (
          <Card key={day} className="border-0 bg-card shadow-lg shadow-black/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                {day} {day === today ? '(Today)' : ''}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task, index) => {
                  const Icon = getTaskIcon(task.task)
                  return (
                    <label key={task.id} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => toggleRoutineItem(task.id)}
                      />
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className={task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}>
                        {task.task}
                      </span>
                    </label>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border-0 bg-accent/20 shadow-lg shadow-black/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Hair Myth Buster</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <MythItem 
                myth="Cutting hair makes it grow faster"
                truth="Hair growth happens at the roots, not the ends. Trimming just removes split ends!"
              />
              <MythItem 
                myth="Brushing 100 strokes makes hair healthier"
                truth="Over-brushing can actually damage hair and cause breakage. Gentle is better!"
              />
            </div>
          </CardContent>
        </Card>
      </div>
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
