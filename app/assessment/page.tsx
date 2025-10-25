"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, ChevronLeft, Upload, X, FileImage } from "lucide-react"

type AssessmentData = {
  // Demographics
  age: string
  height: string
  weight: string

  // Menstrual History
  cycleRegularity: string
  cycleDuration: string
  periodLength: string
  lastPeriod: string
  flowIntensity: string
  periodPain: number
  pmsSymptoms: string[]
  spotting: string

  // Symptoms
  symptoms: string[]
  symptomSeverity: { [key: string]: number }

  // Medical History
  diagnosedPCOS: string
  familyHistory: string
  fertilityIssues: string
  thyroidCondition: string
  otherConditions: string[]

  // Hormonal Lab Data
  hasLabData: string
  lhLevel: string
  fshLevel: string
  testosteroneLevel: string
  amhLevel: string
  insulinLevel: string
  glucoseLevel: string
  thyroidTSH: string
  thyroidT3: string
  thyroidT4: string
  prolactin: string
  dheas: string
  cortisol: string
  vitaminD: string
  progesterone: string

  // Ultrasound Images
  ultrasoundImages: File[]

  // Lifestyle
  exerciseFrequency: string
  dietType: string
  stressLevel: number
  sleepQuality: string
  sleepHours: string
  mentalHealth: string[]
}

const SYMPTOMS = [
  { id: "irregular-periods", label: "Irregular or absent periods" },
  { id: "excess-hair", label: "Excess facial or body hair" },
  { id: "acne", label: "Acne or oily skin" },
  { id: "weight-gain", label: "Weight gain or difficulty losing weight" },
  { id: "hair-loss", label: "Thinning hair or hair loss" },
  { id: "dark-patches", label: "Dark patches of skin" },
  { id: "skin-tags", label: "Skin tags" },
  { id: "mood-changes", label: "Mood changes or depression" },
  { id: "fatigue", label: "Fatigue or low energy" },
  { id: "sleep-issues", label: "Sleep problems" },
  { id: "hot-flashes", label: "Hot flashes or night sweats" },
  { id: "cold-sensitivity", label: "Sensitivity to cold" },
  { id: "dry-skin", label: "Dry skin or brittle nails" },
  { id: "breast-tenderness", label: "Breast tenderness or changes" },
  { id: "headaches", label: "Frequent headaches or migraines" },
]

const PMS_SYMPTOMS = [
  { id: "bloating", label: "Bloating" },
  { id: "breast-pain", label: "Breast pain or tenderness" },
  { id: "mood-swings", label: "Mood swings or irritability" },
  { id: "cravings", label: "Food cravings" },
  { id: "cramps", label: "Abdominal cramps" },
  { id: "back-pain", label: "Back pain" },
  { id: "headache", label: "Headaches" },
  { id: "anxiety", label: "Anxiety or tension" },
]

const OTHER_CONDITIONS = [
  { id: "diabetes", label: "Diabetes or prediabetes" },
  { id: "hypertension", label: "High blood pressure" },
  { id: "thyroid", label: "Thyroid disorder" },
  { id: "endometriosis", label: "Endometriosis" },
  { id: "depression", label: "Depression" },
  { id: "anxiety-disorder", label: "Anxiety disorder" },
  { id: "autoimmune", label: "Autoimmune condition" },
]

const MENTAL_HEALTH_SYMPTOMS = [
  { id: "anxiety", label: "Anxiety or excessive worry" },
  { id: "depression", label: "Persistent sadness or depression" },
  { id: "mood-swings", label: "Severe mood swings" },
  { id: "irritability", label: "Irritability or anger" },
  { id: "brain-fog", label: "Brain fog or difficulty concentrating" },
  { id: "low-motivation", label: "Low motivation or interest" },
]

export default function AssessmentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<AssessmentData>({
    age: "",
    height: "",
    weight: "",
    cycleRegularity: "",
    cycleDuration: "",
    periodLength: "",
    lastPeriod: "",
    flowIntensity: "",
    periodPain: 5,
    pmsSymptoms: [],
    spotting: "",
    symptoms: [],
    symptomSeverity: {},
    diagnosedPCOS: "",
    familyHistory: "",
    fertilityIssues: "",
    thyroidCondition: "",
    otherConditions: [],
    hasLabData: "",
    lhLevel: "",
    fshLevel: "",
    testosteroneLevel: "",
    amhLevel: "",
    insulinLevel: "",
    glucoseLevel: "",
    thyroidTSH: "",
    thyroidT3: "",
    thyroidT4: "",
    prolactin: "",
    dheas: "",
    cortisol: "",
    vitaminD: "",
    progesterone: "",
    ultrasoundImages: [],
    exerciseFrequency: "",
    dietType: "",
    stressLevel: 5,
    sleepQuality: "",
    sleepHours: "",
    mentalHealth: [],
  })

  const totalSteps = 9

  const handleSymptomToggle = (symptomId: string) => {
    setData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter((s) => s !== symptomId)
        : [...prev.symptoms, symptomId],
    }))
  }

  const handleSeverityChange = (symptomId: string, value: number[]) => {
    setData((prev) => ({
      ...prev,
      symptomSeverity: {
        ...prev.symptomSeverity,
        [symptomId]: value[0],
      },
    }))
  }

  const handlePMSToggle = (symptomId: string) => {
    setData((prev) => ({
      ...prev,
      pmsSymptoms: prev.pmsSymptoms.includes(symptomId)
        ? prev.pmsSymptoms.filter((s) => s !== symptomId)
        : [...prev.pmsSymptoms, symptomId],
    }))
  }

  const handleConditionToggle = (conditionId: string) => {
    setData((prev) => ({
      ...prev,
      otherConditions: prev.otherConditions.includes(conditionId)
        ? prev.otherConditions.filter((c) => c !== conditionId)
        : [...prev.otherConditions, conditionId],
    }))
  }

  const handleMentalHealthToggle = (symptomId: string) => {
    setData((prev) => ({
      ...prev,
      mentalHealth: prev.mentalHealth.includes(symptomId)
        ? prev.mentalHealth.filter((s) => s !== symptomId)
        : [...prev.mentalHealth, symptomId],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).filter((file) => file.type.startsWith("image/"))
      setData((prev) => ({
        ...prev,
        ultrasoundImages: [...prev.ultrasoundImages, ...newImages],
      }))
    }
  }

  const removeImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      ultrasoundImages: prev.ultrasoundImages.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    // Store data in sessionStorage for results page
    sessionStorage.setItem(
      "assessmentData",
      JSON.stringify({
        ...data,
        // Convert File objects to base64 for storage
        ultrasoundImages: data.ultrasoundImages.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        })),
      }),
    )
    router.push("/results")
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.age && data.height && data.weight
      case 2:
        return data.cycleRegularity && data.cycleDuration && data.flowIntensity
      case 3:
        return true // Symptoms are optional
      case 4:
        return data.diagnosedPCOS && data.familyHistory && data.thyroidCondition
      case 5:
        return true // Lab data is optional
      case 6:
        return true // Additional hormones are optional
      case 7:
        return true // Images are optional
      case 8:
        return data.exerciseFrequency && data.dietType && data.sleepQuality
      case 9:
        return true // Mental health is optional
      default:
        return false
    }
  }

  return (
    <div className="relative min-h-screen py-12">
      <div className="absolute inset-0 z-0">
        <img src="/assessment-background.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/90 to-primary/20" />
      </div>

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-6 md:p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Basic Information</h2>
                <p className="text-muted-foreground">Let's start with some basic health metrics.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="13"
                    max="50"
                    placeholder="Enter your age"
                    value={data.age}
                    onChange={(e) => setData({ ...data, age: e.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 165"
                      value={data.height}
                      onChange={(e) => setData({ ...data, height: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 65"
                      value={data.weight}
                      onChange={(e) => setData({ ...data, weight: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                {data.height && data.weight && (
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm font-medium">Your BMI:</p>
                    <p className="text-2xl font-bold">
                      {(Number(data.weight) / Math.pow(Number(data.height) / 100, 2)).toFixed(1)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Menstrual History - Enhanced */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Menstrual History</h2>
                <p className="text-muted-foreground">Tell us about your menstrual cycle patterns in detail.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">How regular are your periods? *</Label>
                  <RadioGroup
                    value={data.cycleRegularity}
                    onValueChange={(value) => setData({ ...data, cycleRegularity: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="regular"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="regular" id="regular" />
                      <span className="flex-1 font-normal">Regular (every 21-35 days)</span>
                    </label>
                    <label
                      htmlFor="irregular"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="irregular" id="irregular" />
                      <span className="flex-1 font-normal">Irregular (varies by more than 7 days)</span>
                    </label>
                    <label
                      htmlFor="absent"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="absent" id="absent" />
                      <span className="flex-1 font-normal">Absent (no periods for 3+ months)</span>
                    </label>
                    <label
                      htmlFor="frequent"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="frequent" id="frequent" />
                      <span className="flex-1 font-normal">Too frequent (less than 21 days apart)</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="cycleDuration">Average cycle length (days) *</Label>
                  <Input
                    id="cycleDuration"
                    type="number"
                    placeholder="e.g., 28"
                    value={data.cycleDuration}
                    onChange={(e) => setData({ ...data, cycleDuration: e.target.value })}
                    className="mt-1.5"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    From the first day of one period to the first day of the next
                  </p>
                </div>

                <div>
                  <Label htmlFor="periodLength">Period duration (days)</Label>
                  <Input
                    id="periodLength"
                    type="number"
                    placeholder="e.g., 5"
                    value={data.periodLength}
                    onChange={(e) => setData({ ...data, periodLength: e.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="lastPeriod">First day of last period</Label>
                  <Input
                    id="lastPeriod"
                    type="date"
                    value={data.lastPeriod}
                    onChange={(e) => setData({ ...data, lastPeriod: e.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Flow intensity *</Label>
                  <RadioGroup
                    value={data.flowIntensity}
                    onValueChange={(value) => setData({ ...data, flowIntensity: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="light"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="light" id="light" />
                      <span className="flex-1 font-normal">Light (minimal bleeding)</span>
                    </label>
                    <label
                      htmlFor="moderate"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="moderate" id="moderate" />
                      <span className="flex-1 font-normal">Moderate (normal flow)</span>
                    </label>
                    <label
                      htmlFor="heavy"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="heavy" id="heavy" />
                      <span className="flex-1 font-normal">Heavy (soaking through pads/tampons frequently)</span>
                    </label>
                    <label
                      htmlFor="very-heavy"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="very-heavy" id="very-heavy" />
                      <span className="flex-1 font-normal">Very heavy (with clots, interferes with daily life)</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Period pain level: {data.periodPain}/10</Label>
                  <Slider
                    value={[data.periodPain]}
                    onValueChange={(value) => setData({ ...data, periodPain: value[0] })}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>No pain</span>
                    <span>Severe pain</span>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">PMS symptoms (select all that apply)</Label>
                  <div className="space-y-2">
                    {PMS_SYMPTOMS.map((symptom) => (
                      <label
                        key={symptom.id}
                        htmlFor={`pms-${symptom.id}`}
                        className="flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors hover:bg-accent"
                      >
                        <Checkbox
                          id={`pms-${symptom.id}`}
                          checked={data.pmsSymptoms.includes(symptom.id)}
                          onCheckedChange={() => handlePMSToggle(symptom.id)}
                        />
                        <span className="flex-1 text-sm">{symptom.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Do you experience spotting between periods?</Label>
                  <RadioGroup
                    value={data.spotting}
                    onValueChange={(value) => setData({ ...data, spotting: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="spotting-never"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="never" id="spotting-never" />
                      <span className="flex-1 font-normal">Never</span>
                    </label>
                    <label
                      htmlFor="spotting-occasionally"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="occasionally" id="spotting-occasionally" />
                      <span className="flex-1 font-normal">Occasionally</span>
                    </label>
                    <label
                      htmlFor="spotting-frequently"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="frequently" id="spotting-frequently" />
                      <span className="flex-1 font-normal">Frequently</span>
                    </label>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Symptoms - Enhanced */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Symptoms</h2>
                <p className="text-muted-foreground">
                  Select any symptoms you've experienced in the past 6 months and rate their severity.
                </p>
              </div>

              <div className="space-y-4">
                {SYMPTOMS.map((symptom) => (
                  <div key={symptom.id} className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={symptom.id}
                        checked={data.symptoms.includes(symptom.id)}
                        onCheckedChange={() => handleSymptomToggle(symptom.id)}
                      />
                      <Label htmlFor={symptom.id} className="font-normal leading-relaxed">
                        {symptom.label}
                      </Label>
                    </div>

                    {data.symptoms.includes(symptom.id) && (
                      <div className="ml-7 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Severity:</span>
                          <span className="font-medium">{data.symptomSeverity[symptom.id] || 5}/10</span>
                        </div>
                        <Slider
                          value={[data.symptomSeverity[symptom.id] || 5]}
                          onValueChange={(value) => handleSeverityChange(symptom.id, value)}
                          min={1}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Mild</span>
                          <span>Severe</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Medical History - Enhanced */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Medical History</h2>
                <p className="text-muted-foreground">Help us understand your medical background.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Have you been diagnosed with PCOS? *</Label>
                  <RadioGroup
                    value={data.diagnosedPCOS}
                    onValueChange={(value) => setData({ ...data, diagnosedPCOS: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="diagnosed-yes"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="yes" id="diagnosed-yes" />
                      <span className="flex-1 font-normal">Yes, by a healthcare provider</span>
                    </label>
                    <label
                      htmlFor="diagnosed-suspected"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="suspected" id="diagnosed-suspected" />
                      <span className="flex-1 font-normal">Suspected but not confirmed</span>
                    </label>
                    <label
                      htmlFor="diagnosed-no"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="no" id="diagnosed-no" />
                      <span className="flex-1 font-normal">No</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Family history of PCOS? *</Label>
                  <RadioGroup
                    value={data.familyHistory}
                    onValueChange={(value) => setData({ ...data, familyHistory: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="family-yes"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="yes" id="family-yes" />
                      <span className="flex-1 font-normal">Yes (mother, sister, or aunt)</span>
                    </label>
                    <label
                      htmlFor="family-unsure"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="unsure" id="family-unsure" />
                      <span className="flex-1 font-normal">Not sure</span>
                    </label>
                    <label
                      htmlFor="family-no"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="no" id="family-no" />
                      <span className="flex-1 font-normal">No</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Have you experienced fertility issues?</Label>
                  <RadioGroup
                    value={data.fertilityIssues}
                    onValueChange={(value) => setData({ ...data, fertilityIssues: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="fertility-yes"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="yes" id="fertility-yes" />
                      <span className="flex-1 font-normal">Yes</span>
                    </label>
                    <label
                      htmlFor="fertility-na"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="not-applicable" id="fertility-na" />
                      <span className="flex-1 font-normal">Not applicable</span>
                    </label>
                    <label
                      htmlFor="fertility-no"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="no" id="fertility-no" />
                      <span className="flex-1 font-normal">No</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Do you have a thyroid condition? *</Label>
                  <RadioGroup
                    value={data.thyroidCondition}
                    onValueChange={(value) => setData({ ...data, thyroidCondition: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="thyroid-hypo"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="hypothyroid" id="thyroid-hypo" />
                      <span className="flex-1 font-normal">Yes, hypothyroidism (underactive)</span>
                    </label>
                    <label
                      htmlFor="thyroid-hyper"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="hyperthyroid" id="thyroid-hyper" />
                      <span className="flex-1 font-normal">Yes, hyperthyroidism (overactive)</span>
                    </label>
                    <label
                      htmlFor="thyroid-no"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="no" id="thyroid-no" />
                      <span className="flex-1 font-normal">No thyroid condition</span>
                    </label>
                    <label
                      htmlFor="thyroid-unsure"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="unsure" id="thyroid-unsure" />
                      <span className="flex-1 font-normal">Not sure</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Other medical conditions (select all that apply)</Label>
                  <div className="space-y-2">
                    {OTHER_CONDITIONS.map((condition) => (
                      <label
                        key={condition.id}
                        htmlFor={`condition-${condition.id}`}
                        className="flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors hover:bg-accent"
                      >
                        <Checkbox
                          id={`condition-${condition.id}`}
                          checked={data.otherConditions.includes(condition.id)}
                          onCheckedChange={() => handleConditionToggle(condition.id)}
                        />
                        <span className="flex-1 text-sm">{condition.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Basic Hormonal Lab Data */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Basic Hormonal Lab Data</h2>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Optional</span>
                </div>
                <p className="text-muted-foreground">
                  If you have recent blood test results, enter your hormone levels here for more accurate assessment.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Do you have recent lab results?</Label>
                  <RadioGroup
                    value={data.hasLabData}
                    onValueChange={(value) => setData({ ...data, hasLabData: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="lab-yes"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="yes" id="lab-yes" />
                      <span className="flex-1 font-normal">Yes, I have my lab results</span>
                    </label>
                    <label
                      htmlFor="lab-no"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="no" id="lab-no" />
                      <span className="flex-1 font-normal">No, I don't have lab results</span>
                    </label>
                  </RadioGroup>
                </div>

                {data.hasLabData === "yes" && (
                  <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                    <p className="text-sm font-medium">Enter your reproductive hormone levels:</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="lh">LH Level (mIU/mL)</Label>
                        <Input
                          id="lh"
                          type="number"
                          step="0.1"
                          placeholder="e.g., 8.5"
                          value={data.lhLevel}
                          onChange={(e) => setData({ ...data, lhLevel: e.target.value })}
                          className="mt-1.5"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Normal: 5-25 mIU/mL</p>
                      </div>

                      <div>
                        <Label htmlFor="fsh">FSH Level (mIU/mL)</Label>
                        <Input
                          id="fsh"
                          type="number"
                          step="0.1"
                          placeholder="e.g., 4.2"
                          value={data.fshLevel}
                          onChange={(e) => setData({ ...data, fshLevel: e.target.value })}
                          className="mt-1.5"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Normal: 4-13 mIU/mL</p>
                      </div>

                      <div>
                        <Label htmlFor="testosterone">Testosterone (ng/dL)</Label>
                        <Input
                          id="testosterone"
                          type="number"
                          step="0.1"
                          placeholder="e.g., 45"
                          value={data.testosteroneLevel}
                          onChange={(e) => setData({ ...data, testosteroneLevel: e.target.value })}
                          className="mt-1.5"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Normal: 15-70 ng/dL</p>
                      </div>

                      <div>
                        <Label htmlFor="amh">AMH Level (ng/mL)</Label>
                        <Input
                          id="amh"
                          type="number"
                          step="0.1"
                          placeholder="e.g., 3.5"
                          value={data.amhLevel}
                          onChange={(e) => setData({ ...data, amhLevel: e.target.value })}
                          className="mt-1.5"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Normal: 1-4 ng/mL</p>
                      </div>

                      <div>
                        <Label htmlFor="insulin">Fasting Insulin (μIU/mL)</Label>
                        <Input
                          id="insulin"
                          type="number"
                          step="0.1"
                          placeholder="e.g., 12"
                          value={data.insulinLevel}
                          onChange={(e) => setData({ ...data, insulinLevel: e.target.value })}
                          className="mt-1.5"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Normal: 2-20 μIU/mL</p>
                      </div>

                      <div>
                        <Label htmlFor="glucose">Fasting Glucose (mg/dL)</Label>
                        <Input
                          id="glucose"
                          type="number"
                          step="0.1"
                          placeholder="e.g., 95"
                          value={data.glucoseLevel}
                          onChange={(e) => setData({ ...data, glucoseLevel: e.target.value })}
                          className="mt-1.5"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Normal: 70-100 mg/dL</p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900 dark:bg-blue-950 dark:text-blue-100">
                      <p className="font-medium">Note:</p>
                      <p className="mt-1 text-xs">
                        These values should be from recent blood tests (within 3 months). More hormone levels can be
                        added in the next step.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Additional Hormonal Markers</h2>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Optional</span>
                </div>
                <p className="text-muted-foreground">
                  Enter additional hormone levels if available for a more comprehensive hormonal health assessment.
                </p>
              </div>

              <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-medium">Thyroid Function Tests:</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="tsh">TSH (μIU/mL)</Label>
                    <Input
                      id="tsh"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 2.5"
                      value={data.thyroidTSH}
                      onChange={(e) => setData({ ...data, thyroidTSH: e.target.value })}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Normal: 0.4-4.0 μIU/mL</p>
                  </div>

                  <div>
                    <Label htmlFor="t3">Free T3 (pg/mL)</Label>
                    <Input
                      id="t3"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 3.2"
                      value={data.thyroidT3}
                      onChange={(e) => setData({ ...data, thyroidT3: e.target.value })}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Normal: 2.3-4.2 pg/mL</p>
                  </div>

                  <div>
                    <Label htmlFor="t4">Free T4 (ng/dL)</Label>
                    <Input
                      id="t4"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 1.2"
                      value={data.thyroidT4}
                      onChange={(e) => setData({ ...data, thyroidT4: e.target.value })}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Normal: 0.8-1.8 ng/dL</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-medium">Other Hormones:</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="prolactin">Prolactin (ng/mL)</Label>
                    <Input
                      id="prolactin"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 15"
                      value={data.prolactin}
                      onChange={(e) => setData({ ...data, prolactin: e.target.value })}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Normal: 4-23 ng/mL</p>
                  </div>

                  <div>
                    <Label htmlFor="dheas">DHEA-S (μg/dL)</Label>
                    <Input
                      id="dheas"
                      type="number"
                      step="1"
                      placeholder="e.g., 200"
                      value={data.dheas}
                      onChange={(e) => setData({ ...data, dheas: e.target.value })}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Normal: 35-430 μg/dL</p>
                  </div>

                  <div>
                    <Label htmlFor="cortisol">Cortisol (μg/dL)</Label>
                    <Input
                      id="cortisol"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 12"
                      value={data.cortisol}
                      onChange={(e) => setData({ ...data, cortisol: e.target.value })}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Morning: 6-23 μg/dL</p>
                  </div>

                  <div>
                    <Label htmlFor="progesterone">Progesterone (ng/mL)</Label>
                    <Input
                      id="progesterone"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 8"
                      value={data.progesterone}
                      onChange={(e) => setData({ ...data, progesterone: e.target.value })}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Luteal phase: 5-20 ng/mL</p>
                  </div>

                  <div>
                    <Label htmlFor="vitaminD">Vitamin D (ng/mL)</Label>
                    <Input
                      id="vitaminD"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 35"
                      value={data.vitaminD}
                      onChange={(e) => setData({ ...data, vitaminD: e.target.value })}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Optimal: 30-50 ng/mL</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                <p className="font-medium">Important:</p>
                <p className="mt-1 text-xs">
                  These additional markers help provide a complete picture of your hormonal health. Thyroid function and
                  vitamin D levels are particularly important for women with PCOS.
                </p>
              </div>
            </div>
          )}

          {/* Step 7: Ultrasound Images (previously step 6) */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Ultrasound Images</h2>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Optional</span>
                </div>
                <p className="text-muted-foreground">
                  Upload ovarian ultrasound images if available. This helps our AI model provide more accurate
                  assessment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-colors hover:border-primary/50">
                  <input
                    type="file"
                    id="ultrasound-upload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="ultrasound-upload" className="cursor-pointer">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mb-2 font-medium">Click to upload ultrasound images</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {data.ultrasoundImages.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Uploaded Images ({data.ultrasoundImages.length}):</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {data.ultrasoundImages.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 rounded-lg border p-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                            <FileImage className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeImage(index)}
                            className="h-8 w-8 shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                  <p className="font-medium">Privacy Notice:</p>
                  <p className="mt-1 text-xs">
                    Your images are processed securely and are not stored permanently. They are only used for assessment
                    purposes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Lifestyle Factors - Enhanced (previously step 7) */}
          {step === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Lifestyle Factors</h2>
                <p className="text-muted-foreground">
                  Lifestyle plays an important role in managing hormonal health and PCOS symptoms.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">How often do you exercise? *</Label>
                  <RadioGroup
                    value={data.exerciseFrequency}
                    onValueChange={(value) => setData({ ...data, exerciseFrequency: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="exercise-daily"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="daily" id="exercise-daily" />
                      <span className="flex-1 font-normal">Daily or almost daily</span>
                    </label>
                    <label
                      htmlFor="exercise-regular"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="3-5-times" id="exercise-regular" />
                      <span className="flex-1 font-normal">3-5 times per week</span>
                    </label>
                    <label
                      htmlFor="exercise-occasional"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="1-2-times" id="exercise-occasional" />
                      <span className="flex-1 font-normal">1-2 times per week</span>
                    </label>
                    <label
                      htmlFor="exercise-rarely"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="rarely" id="exercise-rarely" />
                      <span className="flex-1 font-normal">Rarely or never</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">How would you describe your diet? *</Label>
                  <RadioGroup
                    value={data.dietType}
                    onValueChange={(value) => setData({ ...data, dietType: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="diet-balanced"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="balanced" id="diet-balanced" />
                      <span className="flex-1 font-normal">Balanced with fruits, vegetables, and whole grains</span>
                    </label>
                    <label
                      htmlFor="diet-moderate"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="moderate" id="diet-moderate" />
                      <span className="flex-1 font-normal">Moderately healthy</span>
                    </label>
                    <label
                      htmlFor="diet-processed"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="processed" id="diet-processed" />
                      <span className="flex-1 font-normal">High in processed foods and sugar</span>
                    </label>
                    <label
                      htmlFor="diet-special"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="special" id="diet-special" />
                      <span className="flex-1 font-normal">Following a special diet (keto, low-carb, etc.)</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Current stress level: {data.stressLevel}/10</Label>
                  <Slider
                    value={[data.stressLevel]}
                    onValueChange={(value) => setData({ ...data, stressLevel: value[0] })}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Low stress</span>
                    <span>High stress</span>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">How would you rate your sleep quality? *</Label>
                  <RadioGroup
                    value={data.sleepQuality}
                    onValueChange={(value) => setData({ ...data, sleepQuality: value })}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="sleep-excellent"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="excellent" id="sleep-excellent" />
                      <span className="flex-1 font-normal">Excellent (fall asleep easily, wake refreshed)</span>
                    </label>
                    <label
                      htmlFor="sleep-good"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="good" id="sleep-good" />
                      <span className="flex-1 font-normal">Good (generally sleep well)</span>
                    </label>
                    <label
                      htmlFor="sleep-fair"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="fair" id="sleep-fair" />
                      <span className="flex-1 font-normal">Fair (some difficulty sleeping)</span>
                    </label>
                    <label
                      htmlFor="sleep-poor"
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-accent"
                    >
                      <RadioGroupItem value="poor" id="sleep-poor" />
                      <span className="flex-1 font-normal">Poor (frequent insomnia or disrupted sleep)</span>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="sleepHours">Average hours of sleep per night</Label>
                  <Input
                    id="sleepHours"
                    type="number"
                    step="0.5"
                    min="0"
                    max="12"
                    placeholder="e.g., 7"
                    value={data.sleepHours}
                    onChange={(e) => setData({ ...data, sleepHours: e.target.value })}
                    className="mt-1.5"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Recommended: 7-9 hours</p>
                </div>
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-serif text-2xl font-bold">Mental Health & Well-being</h2>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Optional</span>
                </div>
                <p className="text-muted-foreground">
                  Hormonal imbalances can affect mental health. This information helps us provide more comprehensive
                  recommendations.
                </p>
              </div>

              <div className="space-y-4">
                <Label className="mb-3 block">
                  Have you experienced any of these in the past 6 months? (select all that apply)
                </Label>
                <div className="space-y-2">
                  {MENTAL_HEALTH_SYMPTOMS.map((symptom) => (
                    <label
                      key={symptom.id}
                      htmlFor={`mental-${symptom.id}`}
                      className="flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors hover:bg-accent"
                    >
                      <Checkbox
                        id={`mental-${symptom.id}`}
                        checked={data.mentalHealth.includes(symptom.id)}
                        onCheckedChange={() => handleMentalHealthToggle(symptom.id)}
                      />
                      <span className="flex-1 text-sm">{symptom.label}</span>
                    </label>
                  ))}
                </div>

                <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900 dark:bg-blue-950 dark:text-blue-100">
                  <p className="font-medium">Mental Health Support:</p>
                  <p className="mt-2 text-xs">
                    If you're experiencing persistent mental health symptoms, please consider speaking with a mental
                    health professional. Hormonal imbalances and PCOS can significantly impact mood and mental
                    well-being, and treatment is available.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {step < totalSteps ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed()} className="gap-2">
                View Results
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          This assessment is for informational purposes only and does not constitute medical advice.
        </p>
      </div>
    </div>
  )
}
