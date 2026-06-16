"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAppStore } from "@/lib/store"
import { Camera, TrendingDown, TrendingUp, Minus, Plus } from "lucide-react"

export function ProgressScreen() {
  const { progressEntries, addProgressEntry } = useAppStore()
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [hairFall, setHairFall] = useState(5)
  const [frizz, setFrizz] = useState(6)

  const handleAddEntry = () => {
    addProgressEntry({
      date: new Date().toISOString().split("T")[0],
      hairFall,
      frizzLevel: frizz,
      notes: "",
    })
    setShowAddEntry(false)
    setHairFall(5)
    setFrizz(6)
  }

  const getMetrics = () => {
    if (progressEntries.length === 0) {
      return {
        avgHairFall: null,
        avgFrizz: null,
        trend: null,
      }
    }

    const recent = progressEntries.slice(-7)
    const avgHairFall = recent.reduce((sum, e) => sum + (e.hairFall || 0), 0) / recent.length
    const avgFrizz = recent.reduce((sum, e) => sum + (e.frizzLevel || 0), 0) / recent.length

    const older = progressEntries.slice(-14, -7)
    const prevAvg =
      older.length > 0
        ? older.reduce((sum, e) => sum + (e.hairFall || 0), 0) / older.length
        : avgHairFall

    return {
      avgHairFall: Math.round(avgHairFall),
      avgFrizz: Math.round(avgFrizz),
      trend: prevAvg > avgHairFall ? "improving" : "declining",
    }
  }

  const metrics = getMetrics()

  return (
    <div className="space-y-6 px-4 pb-24 pt-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Hair Progress</h1>
        <p className="text-muted-foreground">Track your hair health journey</p>
      </div>

      {/* Metrics Cards */}
      {metrics.avgHairFall !== null && (
        <div className="grid grid-cols-2 gap-3">
          {/* Hair Fall */}
          <Card className="border-0 bg-card shadow-lg shadow-black/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Camera className="h-4 w-4 text-primary" />
                Hair Fall
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{metrics.avgHairFall}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {metrics.trend === "improving" ? (
                  <>
                    <TrendingDown className="h-3 w-3 text-green-600" />
                    Improving
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-3 w-3 text-orange-600" />
                    Needs Attention
                  </>
                )}
              </p>
            </CardContent>
          </Card>

          {/* Frizz Level */}
          <Card className="border-0 bg-card shadow-lg shadow-black/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Camera className="h-4 w-4 text-primary" />
                Frizz Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{metrics.avgFrizz}</div>
              <p className="text-xs text-muted-foreground mt-1">7-day average</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Entry Button */}
      <Button
        onClick={() => setShowAddEntry(!showAddEntry)}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {showAddEntry ? "Cancel" : "+ Log Today's Metrics"}
      </Button>

      {/* Add Entry Form */}
      {showAddEntry && (
        <Card className="border-0 bg-card shadow-lg shadow-black/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Today&apos;s Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hair Fall Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Hair Fall Level</label>
                <span className="text-sm font-bold text-primary">{hairFall}/10</span>
              </div>
              <Slider
                value={[hairFall]}
                onValueChange={(val) => setHairFall(val[0])}
                min={0}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-2">0 = Minimal, 10 = Severe</p>
            </div>

            {/* Frizz Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Frizz Level</label>
                <span className="text-sm font-bold text-primary">{frizz}/10</span>
              </div>
              <Slider
                value={[frizz]}
                onValueChange={(val) => setFrizz(val[0])}
                min={0}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-2">0 = Smooth, 10 = Very Frizzy</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleAddEntry}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Entry
              </Button>
              <Button
                onClick={() => setShowAddEntry(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Entries */}
      {progressEntries.length > 0 && (
        <Card className="border-0 bg-card shadow-lg shadow-black/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Entries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {progressEntries
              .slice()
              .reverse()
              .slice(0, 5)
              .map((entry, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-secondary/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{entry.date}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Hair Fall</p>
                      <p className="font-bold text-foreground">{entry.hairFall || 0}/10</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Frizz Level</p>
                      <p className="font-bold text-foreground">{entry.frizzLevel || 0}/10</p>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {progressEntries.length === 0 && !showAddEntry && (
        <Card className="border-0 bg-card shadow-lg shadow-black/5 text-center py-8">
          <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium">Start Tracking Your Progress</p>
          <p className="text-muted-foreground text-sm mt-1">Log your hair metrics to see trends and improvements over time</p>
        </Card>
      )}
    </div>
  )
}
