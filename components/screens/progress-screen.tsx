"use client"

import { Navbar } from "@/components/navbar"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAppStore } from "@/lib/store"
import { Camera, TrendingDown, TrendingUp, Minus, Plus } from "lucide-react"

export function ProgressScreen() {
  const { progressEntries, addProgressEntry, weeklyRoutine } = useAppStore()
  const [hairfallLevel, setHairfallLevel] = useState(5)
  const [frizzLevel, setFrizzLevel] = useState(5)
  const [showLogForm, setShowLogForm] = useState(false)
  
  const handleLog = () => {
    const today = new Date().toISOString().split('T')[0]
    addProgressEntry({
      date: today,
      hairfallLevel,
      frizzLevel,
    })
    setShowLogForm(false)
    setHairfallLevel(5)
    setFrizzLevel(5)
  }
  
  const completedTasks = weeklyRoutine.filter(t => t.completed).length
  const totalTasks = weeklyRoutine.length
  const adherenceRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  const getTrend = (metric: 'hairfallLevel' | 'frizzLevel') => {
    if (progressEntries.length < 2) return 'neutral'
    const recent = progressEntries.slice(-3)
    const avg = recent.reduce((sum, e) => sum + e[metric], 0) / recent.length
    const firstAvg = progressEntries.slice(0, 3).reduce((sum, e) => sum + e[metric], 0) / Math.min(3, progressEntries.length)
    if (avg < firstAvg - 1) return 'improving'
    if (avg > firstAvg + 1) return 'worsening'
    return 'neutral'
  }
  
  const hairfallTrend = getTrend('hairfallLevel')
  const frizzTrend = getTrend('frizzLevel')
  
  return (
    <>
      <Navbar />
      <div className="space-y-6 px-4 pb-24 pt-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Progress</h1>
          <p className="text-muted-foreground">
            Track your hair health journey
          </p>
        </div>
        
        <Card className="border-0 bg-card shadow-lg shadow-black/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Photo Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <PhotoPlaceholder label="Before" date="Start" />
              <PhotoPlaceholder label="Current" date="Today" />
            </div>
            <Button 
              variant="outline" 
              className="mt-4 w-full gap-2"
            >
              <Camera className="h-4 w-4" />
              Add Photo
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            title="Hair Fall"
            trend={hairfallTrend}
            value={progressEntries.length > 0 ? progressEntries[progressEntries.length - 1].hairfallLevel : '-'}
            description={hairfallTrend === 'improving' ? 'Reducing!' : hairfallTrend === 'worsening' ? 'Needs attention' : 'Stable'}
          />
          <StatCard 
            title="Frizz Level"
            trend={frizzTrend}
            value={progressEntries.length > 0 ? progressEntries[progressEntries.length - 1].frizzLevel : '-'}
            description={frizzTrend === 'improving' ? 'Getting better!' : frizzTrend === 'worsening' ? 'Try more serum' : 'Consistent'}
          />
        </div>
        
        <Card className="border-0 bg-primary/5 shadow-lg shadow-black/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Routine Adherence</h3>
                <p className="text-sm text-muted-foreground">{completedTasks} of {totalTasks} tasks completed</p>
              </div>
              <div className="text-3xl font-bold text-primary">{adherenceRate}%</div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div 
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${adherenceRate}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        {!showLogForm ? (
          <Button 
            onClick={() => setShowLogForm(true)}
            className="h-14 w-full gap-2 rounded-2xl text-lg font-semibold shadow-lg shadow-primary/25"
          >
            <Plus className="h-5 w-5" />
            Log Today&apos;s Progress
          </Button>
        ) : (
          <Card className="border-0 bg-card shadow-lg shadow-black/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Log Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Hair Fall Level</span>
                  <span className="text-sm text-muted-foreground">{hairfallLevel}/10</span>
                </div>
                <Slider 
                  value={[hairfallLevel]}
                  onValueChange={([v]) => setHairfallLevel(v)}
                  max={10}
                  min={1}
                  step={1}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Frizz Level</span>
                  <span className="text-sm text-muted-foreground">{frizzLevel}/10</span>
                </div>
                <Slider 
                  value={[frizzLevel]}
                  onValueChange={([v]) => setFrizzLevel(v)}
                  max={10}
                  min={1}
                  step={1}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleLog}
                  className="flex-1"
                >
                  Save Entry
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowLogForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

function PhotoPlaceholder({ label, date }: { label: string; date: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 flex h-32 w-full items-center justify-center rounded-2xl bg-secondary">
        <Camera className="h-8 w-8 text-muted-foreground" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{date}</span>
    </div>
  )
}

function StatCard({ 
  title, 
  trend, 
  value, 
  description 
}: { 
  title: string
  trend: 'improving' | 'worsening' | 'neutral'
  value: number | string
  description: string
}) {
  const TrendIcon = trend === 'improving' ? TrendingDown : trend === 'worsening' ? TrendingUp : Minus
  const trendColor = trend === 'improving' ? 'text-green-500' : trend === 'worsening' ? 'text-red-500' : 'text-muted-foreground'
  
  return (
    <Card className="border-0 bg-card shadow-lg shadow-black/5">
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{title}</span>
          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
        </div>
        <div className="text-2xl font-bold text-foreground">
          {value}
          {typeof value === 'number' && <span className="text-sm text-muted-foreground">/10</span>}
        </div>
        <p className={`text-xs ${trendColor}`}>{description}</p>
      </CardContent>
    </Card>
  )
}
