"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, TrendingUp, Download, Plus, Info, Droplet, Moon, Sun, Cloud } from "lucide-react"
import { CycleChart } from "@/components/cycle-chart"
import { SymptomHeatmap } from "@/components/symptom-heatmap"

type FlowIntensity = "none" | "spotting" | "light" | "moderate" | "heavy"
type Mood = "great" | "good" | "okay" | "low" | "anxious"

type DayData = {
  date: string
  isPeriod: boolean
  flowIntensity: FlowIntensity
  symptoms: string[]
  mood: Mood | null
  painLevel: number
  notes: string
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
  { id: "back-pain", label: "Back Pain" },
  { id: "nausea", label: "Nausea" },
]

const MOODS = [
  { value: "great" as Mood, label: "Great", icon: Sun, color: "text-yellow-500" },
  { value: "good" as Mood, label: "Good", icon: Sun, color: "text-green-500" },
  { value: "okay" as Mood, label: "Okay", icon: Cloud, color: "text-gray-500" },
  { value: "low" as Mood, label: "Low", icon: Cloud, color: "text-blue-500" },
  { value: "anxious" as Mood, label: "Anxious", icon: Moon, color: "text-purple-500" },
]

export default function TrackerPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [trackedDays, setTrackedDays] = useState<Map<string, DayData>>(new Map())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [currentDayData, setCurrentDayData] = useState<DayData>({
    date: selectedDate.toISOString().split("T")[0],
    isPeriod: false,
    flowIntensity: "none",
    symptoms: [],
    mood: null,
    painLevel: 0,
    notes: "",
  })

  const dateKey = selectedDate.toISOString().split("T")[0]
  const dayData = trackedDays.get(dateKey) || currentDayData

  const handleSaveDay = () => {
    const newTrackedDays = new Map(trackedDays)
    newTrackedDays.set(dateKey, { ...currentDayData, date: dateKey })
    setTrackedDays(newTrackedDays)
    setIsDialogOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      const key = date.toISOString().split("T")[0]
      const existingData = trackedDays.get(key)
      if (existingData) {
        setCurrentDayData(existingData)
      } else {
        setCurrentDayData({
          date: key,
          isPeriod: false,
          flowIntensity: "none",
          symptoms: [],
          mood: null,
          painLevel: 0,
          notes: "",
        })
      }
      setIsDialogOpen(true)
    }
  }

  const handleSymptomToggle = (symptomId: string) => {
    setCurrentDayData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter((s) => s !== symptomId)
        : [...prev.symptoms, symptomId],
    }))
  }

  const getPeriodDays = () => {
    return Array.from(trackedDays.values()).filter((day) => day.isPeriod)
  }

  const getAverageCycleLength = () => {
    const periodDays = getPeriodDays().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    if (periodDays.length < 2) return null

    const cycles: number[] = []
    for (let i = 1; i < periodDays.length; i++) {
      const diff = Math.floor(
        (new Date(periodDays[i].date).getTime() - new Date(periodDays[i - 1].date).getTime()) / (1000 * 60 * 60 * 24),
      )
      if (diff > 15 && diff < 45) {
        cycles.push(diff)
      }
    }

    if (cycles.length === 0) return null
    return Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length)
  }

  const getNextPredictedPeriod = () => {
    const avgCycle = getAverageCycleLength()
    if (!avgCycle) return null

    const periodDays = getPeriodDays().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    if (periodDays.length === 0) return null

    const lastPeriod = new Date(periodDays[0].date)
    const nextPeriod = new Date(lastPeriod)
    nextPeriod.setDate(nextPeriod.getDate() + avgCycle)

    return nextPeriod
  }

  const modifiers = {
    period: Array.from(trackedDays.values())
      .filter((day) => day.isPeriod)
      .map((day) => new Date(day.date)),
    tracked: Array.from(trackedDays.keys()).map((date) => new Date(date)),
  }

  const modifiersStyles = {
    period: {
      backgroundColor: "hsl(var(--primary))",
      color: "white",
      fontWeight: "bold",
    },
    tracked: {
      border: "2px solid hsl(var(--primary))",
    },
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Menstrual Cycle Tracker</h1>
          <p className="text-muted-foreground">
            Track your periods, symptoms, and mood to identify patterns and better manage your health.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Tracked</p>
                <p className="text-2xl font-bold">{trackedDays.size}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Cycle Length</p>
                <p className="text-2xl font-bold">{getAverageCycleLength() || "—"} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Droplet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Period Days</p>
                <p className="text-2xl font-bold">{getPeriodDays().length}</p>
              </div>
            </div>
          </Card>
        </div>

        {getNextPredictedPeriod() && (
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Based on your cycle history, your next period is predicted around{" "}
              <strong>{getNextPredictedPeriod()?.toLocaleDateString()}</strong>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Track Your Cycle</h2>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>

              <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    className="rounded-md border"
                  />
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                      <span>Period day</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-primary" />
                      <span>Tracked day</span>
                    </div>
                  </div>
                </div>

                <Card className="w-full bg-muted/30 p-6 lg:w-96">
                  <h3 className="mb-4 font-semibold">Quick Add</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Click on any date in the calendar to log detailed information, or use quick actions below.
                  </p>
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      onClick={() => {
                        const today = new Date()
                        setSelectedDate(today)
                        setCurrentDayData({
                          date: today.toISOString().split("T")[0],
                          isPeriod: true,
                          flowIntensity: "moderate",
                          symptoms: [],
                          mood: null,
                          painLevel: 0,
                          notes: "",
                        })
                        setIsDialogOpen(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Log Period Today
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        const today = new Date()
                        setSelectedDate(today)
                        setCurrentDayData({
                          date: today.toISOString().split("T")[0],
                          isPeriod: false,
                          flowIntensity: "none",
                          symptoms: [],
                          mood: null,
                          painLevel: 0,
                          notes: "",
                        })
                        setIsDialogOpen(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Log Symptoms Today
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Cycle Insights</h2>
              <CycleChart trackedDays={Array.from(trackedDays.values())} />
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Symptom Patterns</h2>
              <SymptomHeatmap trackedDays={Array.from(trackedDays.values())} />
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">Most Common Symptoms</h3>
                {trackedDays.size === 0 ? (
                  <p className="text-sm text-muted-foreground">Start tracking to see symptom patterns</p>
                ) : (
                  <div className="space-y-3">
                    {SYMPTOMS.slice(0, 5).map((symptom) => {
                      const count = Array.from(trackedDays.values()).filter((day) =>
                        day.symptoms.includes(symptom.id),
                      ).length
                      const percentage = trackedDays.size > 0 ? (count / trackedDays.size) * 100 : 0
                      return (
                        <div key={symptom.id} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{symptom.label}</span>
                            <span className="text-muted-foreground">{count} days</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">Mood Trends</h3>
                {trackedDays.size === 0 ? (
                  <p className="text-sm text-muted-foreground">Start tracking to see mood trends</p>
                ) : (
                  <div className="space-y-3">
                    {MOODS.map((mood) => {
                      const count = Array.from(trackedDays.values()).filter((day) => day.mood === mood.value).length
                      const Icon = mood.icon
                      return (
                        <div key={mood.value} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${mood.color}`} />
                            <span className="text-sm">{mood.label}</span>
                          </div>
                          <Badge variant="secondary">{count} days</Badge>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Tracking History</h2>
              {trackedDays.size === 0 ? (
                <div className="py-12 text-center">
                  <CalendarIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="mb-2 font-medium">No data tracked yet</p>
                  <p className="text-sm text-muted-foreground">Start tracking your cycle to see your history here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from(trackedDays.values())
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((day) => (
                      <Card key={day.date} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <p className="font-semibold">{new Date(day.date).toLocaleDateString()}</p>
                              {day.isPeriod && (
                                <Badge className="bg-primary">
                                  <Droplet className="mr-1 h-3 w-3" />
                                  Period
                                </Badge>
                              )}
                              {day.mood && (
                                <Badge variant="outline">{MOODS.find((m) => m.value === day.mood)?.label}</Badge>
                              )}
                            </div>
                            {day.symptoms.length > 0 && (
                              <div className="mb-2 flex flex-wrap gap-2">
                                {day.symptoms.map((symptomId) => {
                                  const symptom = SYMPTOMS.find((s) => s.id === symptomId)
                                  return (
                                    <Badge key={symptomId} variant="secondary">
                                      {symptom?.label}
                                    </Badge>
                                  )
                                })}
                              </div>
                            )}
                            {day.notes && <p className="text-sm text-muted-foreground">{day.notes}</p>}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedDate(new Date(day.date))
                              setCurrentDayData(day)
                              setIsDialogOpen(true)
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Log Day: {selectedDate.toLocaleDateString()}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Is this a period day?</Label>
                <div className="flex gap-3">
                  <Button
                    variant={currentDayData.isPeriod ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setCurrentDayData({ ...currentDayData, isPeriod: true })}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={!currentDayData.isPeriod ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setCurrentDayData({ ...currentDayData, isPeriod: false })}
                  >
                    No
                  </Button>
                </div>
              </div>

              {currentDayData.isPeriod && (
                <div>
                  <Label className="mb-3 block">Flow Intensity</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "spotting" as FlowIntensity, label: "Spotting" },
                      { value: "light" as FlowIntensity, label: "Light" },
                      { value: "moderate" as FlowIntensity, label: "Moderate" },
                      { value: "heavy" as FlowIntensity, label: "Heavy" },
                    ].map((flow) => (
                      <Button
                        key={flow.value}
                        variant={currentDayData.flowIntensity === flow.value ? "default" : "outline"}
                        onClick={() => setCurrentDayData({ ...currentDayData, flowIntensity: flow.value })}
                      >
                        {flow.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="mb-3 block">How are you feeling?</Label>
                <div className="grid grid-cols-3 gap-2">
                  {MOODS.map((mood) => {
                    const Icon = mood.icon
                    return (
                      <Button
                        key={mood.value}
                        variant={currentDayData.mood === mood.value ? "default" : "outline"}
                        className="flex flex-col gap-1 py-3"
                        onClick={() => setCurrentDayData({ ...currentDayData, mood: mood.value })}
                      >
                        <Icon className={`h-5 w-5 ${currentDayData.mood === mood.value ? "" : mood.color}`} />
                        <span className="text-xs">{mood.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Pain Level: {currentDayData.painLevel}/10</Label>
                <Slider
                  value={[currentDayData.painLevel]}
                  onValueChange={(value) => setCurrentDayData({ ...currentDayData, painLevel: value[0] })}
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
                <Label className="mb-3 block">Symptoms</Label>
                <div className="grid grid-cols-2 gap-2">
                  {SYMPTOMS.map((symptom) => (
                    <label
                      key={symptom.id}
                      htmlFor={`dialog-${symptom.id}`}
                      className="flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-colors hover:bg-accent"
                    >
                      <Checkbox
                        id={`dialog-${symptom.id}`}
                        checked={currentDayData.symptoms.includes(symptom.id)}
                        onCheckedChange={() => handleSymptomToggle(symptom.id)}
                      />
                      <span className="text-sm">{symptom.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="mb-3 block">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes about today..."
                  value={currentDayData.notes}
                  onChange={(e) => setCurrentDayData({ ...currentDayData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveDay} className="flex-1">
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
