"use client"

import { Badge } from "@/components/ui/badge"

type DayData = {
  date: string
  isPeriod: boolean
  flowIntensity: string
  symptoms: string[]
  mood: string | null
  painLevel: number
  notes: string
}

type SymptomHeatmapProps = {
  trackedDays: DayData[]
}

const SYMPTOMS = [
  { id: "cramps", label: "Cramps" },
  { id: "bloating", label: "Bloating" },
  { id: "headache", label: "Headache" },
  { id: "breast-tenderness", label: "Breast Tenderness" },
  { id: "fatigue", label: "Fatigue" },
  { id: "acne", label: "Acne Breakout" },
  { id: "mood-swings", label: "Mood Swings" },
  { id: "cravings", label: "Food Cravings" },
]

export function SymptomHeatmap({ trackedDays }: SymptomHeatmapProps) {
  if (trackedDays.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Start tracking symptoms to see patterns</p>
      </div>
    )
  }

  const symptomCounts = SYMPTOMS.map((symptom) => {
    const count = trackedDays.filter((day) => day.symptoms.includes(symptom.id)).length
    const percentage = (count / trackedDays.length) * 100
    return { ...symptom, count, percentage }
  }).sort((a, b) => b.count - a.count)

  return (
    <div className="space-y-4">
      {symptomCounts.map((symptom) => (
        <div key={symptom.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{symptom.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{symptom.count} days</span>
              <Badge variant="secondary">{symptom.percentage.toFixed(0)}%</Badge>
            </div>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all"
              style={{ width: `${symptom.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
