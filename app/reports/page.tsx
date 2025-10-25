"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Activity,
  Heart,
  Sparkles,
  FileText,
  BarChart3,
} from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ReportsPage() {
  const cycleData = [
    { month: "Oct", length: 32 },
    { month: "Nov", length: 35 },
    { month: "Dec", length: 30 },
    { month: "Jan", length: 28 },
    { month: "Feb", length: 29 },
    { month: "Mar", length: 28 },
  ]

  const symptomData = [
    { month: "Oct", severity: 7 },
    { month: "Nov", severity: 8 },
    { month: "Dec", severity: 6 },
    { month: "Jan", severity: 5 },
    { month: "Feb", severity: 4 },
    { month: "Mar", severity: 3 },
  ]

  const moodData = [
    { month: "Oct", score: 6 },
    { month: "Nov", score: 5 },
    { month: "Dec", score: 7 },
    { month: "Jan", score: 7 },
    { month: "Feb", score: 8 },
    { month: "Mar", score: 8 },
  ]

  const weightData = [
    { month: "Oct", weight: 165 },
    { month: "Nov", weight: 163 },
    { month: "Dec", weight: 161 },
    { month: "Jan", weight: 159 },
    { month: "Feb", weight: 158 },
    { month: "Mar", weight: 156 },
  ]

  const monthlyInsights = {
    cycleRegularity: { current: 28, previous: 30, improvement: 7 },
    symptomSeverity: { current: 3, previous: 4, improvement: 25 },
    moodBalance: { current: 8, previous: 7, improvement: 14 },
    weightChange: { current: 156, previous: 158, improvement: 1.3 },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track your progress and health trends over time</p>
        </div>

        {/* Time Period Selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Select defaultValue="6months">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate PDF Report
            </Button>
          </div>
        </div>

        {/* AI Summary */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI-Generated Health Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground leading-relaxed mb-4">
              Cycle regularity improved by 25% since last month. Your symptom severity has decreased significantly,
              showing great progress with your treatment plan. Mood balance is trending upward, and weight management
              efforts are paying off with steady progress.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Cycle Improving
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Symptoms Decreasing
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Mood Stable
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Weight Progress
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cycle Regularity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-foreground">
                  {monthlyInsights.cycleRegularity.current} days
                </span>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  {monthlyInsights.cycleRegularity.improvement}% better
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Symptom Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-foreground">{monthlyInsights.symptomSeverity.current}/10</span>
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  {monthlyInsights.symptomSeverity.improvement}% reduction
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Mood Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-foreground">{monthlyInsights.moodBalance.current}/10</span>
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  {monthlyInsights.moodBalance.improvement}% improvement
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-foreground">{monthlyInsights.weightChange.current} lbs</span>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">{monthlyInsights.weightChange.improvement}% decrease</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="cycle" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cycle">Cycle Trends</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
          </TabsList>

          <TabsContent value="cycle" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Menstrual Cycle Length Trends</CardTitle>
                <CardDescription>Track your cycle regularity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cycleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="length" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Average Cycle Length</p>
                    <p className="text-2xl font-bold text-foreground">30 days</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Shortest Cycle</p>
                    <p className="text-2xl font-bold text-foreground">28 days</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Longest Cycle</p>
                    <p className="text-2xl font-bold text-foreground">35 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Severity Over Time</CardTitle>
                <CardDescription>Monitor how your symptoms are improving</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={symptomData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="severity" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-6">
                  <h3 className="font-semibold text-foreground mb-4">Most Common Symptoms</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Irregular periods", frequency: 85 },
                      { name: "Acne", frequency: 72 },
                      { name: "Weight gain", frequency: 68 },
                      { name: "Fatigue", frequency: 65 },
                    ].map((symptom, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-foreground">{symptom.name}</span>
                          <span className="text-sm font-semibold text-foreground">{symptom.frequency}%</span>
                        </div>
                        <Progress value={symptom.frequency} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mood" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood Balance Trends</CardTitle>
                <CardDescription>Track your emotional wellbeing</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Average Mood Score</p>
                    <p className="text-2xl font-bold text-foreground">7.2/10</p>
                    <p className="text-xs text-green-600 mt-1">Improving trend</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Best Mood Days</p>
                    <p className="text-2xl font-bold text-foreground">Follicular Phase</p>
                    <p className="text-xs text-muted-foreground mt-1">Days 7-14 of cycle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weight" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weight Management Progress</CardTitle>
                <CardDescription>Monitor your weight trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Weight Loss</p>
                    <p className="text-2xl font-bold text-foreground">9 lbs</p>
                    <p className="text-xs text-green-600 mt-1">Since October</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Average Monthly Loss</p>
                    <p className="text-2xl font-bold text-foreground">1.5 lbs</p>
                    <p className="text-xs text-muted-foreground mt-1">Healthy pace</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Goal Progress</p>
                    <p className="text-2xl font-bold text-foreground">60%</p>
                    <Progress value={60} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detailed Report */}
        <Card>
          <CardHeader>
            <CardTitle>Comprehensive Health Report</CardTitle>
            <CardDescription>Detailed analysis for healthcare consultations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Over the past 6 months, significant improvements have been observed across multiple health metrics.
                Menstrual cycle regularity has improved by 25%, with average cycle length stabilizing at 28-30 days.
                Symptom severity has decreased by 57%, indicating effective management strategies. Mood balance scores
                have increased by 33%, suggesting improved emotional wellbeing. Weight management efforts have resulted
                in a healthy 5.5% reduction in body weight.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Key Achievements</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Achieved regular menstrual cycles for 3 consecutive months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Reduced acne severity by 40% through dietary changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Maintained 95% medication adherence rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Completed 18 workouts this month, exceeding goal</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Recommendations</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Continue current medication regimen with regular monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Maintain low-GI diet and regular exercise routine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Consider adding stress management techniques like meditation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Schedule follow-up hormone panel in 3 months</span>
                </li>
              </ul>
            </div>

            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Complete Report (PDF)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
