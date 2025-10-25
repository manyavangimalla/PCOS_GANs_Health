"use client"

import { Card } from "@/components/ui/card"

type DayData = {
  date: string
  isPeriod: boolean
  flowIntensity: string
  symptoms: string[]
  mood: string | null
  painLevel: number
  notes: string
}

type CycleChartProps = {
  trackedDays: DayData[]
}

export function CycleChart({ trackedDays }: CycleChartProps) {
  if (trackedDays.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Start tracking your cycle to see insights here</p>
      </div>
    )
  }

  const periodDays = trackedDays
    .filter((day) => day.isPeriod)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (periodDays.length < 2) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Track at least 2 periods to see cycle length trends</p>
      </div>
    )
  }

  const cycles: { start: string; length: number }[] = []
  for (let i = 1; i < periodDays.length; i++) {
    const length = Math.floor(
      (new Date(periodDays[i].date).getTime() - new Date(periodDays[i - 1].date).getTime()) / (1000 * 60 * 60 * 24),
    )
    if (length > 15 && length < 45) {
      cycles.push({ start: periodDays[i - 1].date, length })
    }
  }

  const maxLength = Math.max(...cycles.map((c) => c.length), 35)

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {cycles.map((cycle, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Cycle {index + 1}</span>
              <span className="text-muted-foreground">
                {new Date(cycle.start).toLocaleDateString()} - {cycle.length} days
              </span>
            </div>
            <div className="h-8 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${(cycle.length / maxLength) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-muted/30 p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Average Cycle</p>
            <p className="text-2xl font-bold">
              {Math.round(cycles.reduce((sum, c) => sum + c.length, 0) / cycles.length)} days
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Shortest Cycle</p>
            <p className="text-2xl font-bold">{Math.min(...cycles.map((c) => c.length))} days</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Longest Cycle</p>
            <p className="text-2xl font-bold">{Math.max(...cycles.map((c) => c.length))} days</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
