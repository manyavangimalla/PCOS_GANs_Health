"use client"

import { Progress } from "@/components/ui/progress"

type SymptomBreakdownProps = {
  symptoms: string[]
  severity: { [key: string]: number }
}

const SYMPTOM_NAMES: { [key: string]: string } = {
  "irregular-periods": "Irregular or absent periods",
  "excess-hair": "Excess facial or body hair",
  acne: "Acne or oily skin",
  "weight-gain": "Weight gain or difficulty losing weight",
  "hair-loss": "Thinning hair or hair loss",
  "dark-patches": "Dark patches of skin",
  "skin-tags": "Skin tags",
  "mood-changes": "Mood changes or depression",
  fatigue: "Fatigue or low energy",
  "sleep-issues": "Sleep problems",
}

export function SymptomBreakdown({ symptoms, severity }: SymptomBreakdownProps) {
  if (symptoms.length === 0) {
    return <p className="text-sm text-muted-foreground">No symptoms reported</p>
  }

  return (
    <div className="space-y-4">
      {symptoms.map((symptomId) => {
        const severityValue = severity[symptomId] || 5
        const percentage = (severityValue / 10) * 100

        return (
          <div key={symptomId} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{SYMPTOM_NAMES[symptomId]}</span>
              <span className="text-muted-foreground">{severityValue}/10</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )
      })}
    </div>
  )
}
