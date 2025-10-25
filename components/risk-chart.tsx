"use client"

import { Progress } from "@/components/ui/progress"

type RiskFactors = {
  menstrualIrregularity: number
  symptomCount: number
  bmi: number
  familyHistory: number
  lifestyle: number
}

type RiskChartProps = {
  factors: RiskFactors
}

const FACTOR_LABELS = {
  menstrualIrregularity: { label: "Menstrual Irregularity", max: 30 },
  symptomCount: { label: "Symptom Severity", max: 25 },
  bmi: { label: "BMI Factor", max: 20 },
  familyHistory: { label: "Family History", max: 15 },
  lifestyle: { label: "Lifestyle Factors", max: 10 },
}

export function RiskChart({ factors }: RiskChartProps) {
  return (
    <div className="space-y-4">
      {Object.entries(factors).map(([key, value]) => {
        const { label, max } = FACTOR_LABELS[key as keyof RiskFactors]
        const percentage = (value / max) * 100

        return (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{label}</span>
              <span className="text-muted-foreground">
                {value}/{max}
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )
      })}
    </div>
  )
}
