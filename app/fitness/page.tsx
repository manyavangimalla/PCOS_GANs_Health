"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Flame, TrendingUp, Award, Clock, Heart, Play, CheckCircle2 } from "lucide-react"

export default function FitnessPage() {
  const [selectedPhase, setSelectedPhase] = useState("follicular")

  const workoutRecommendations = {
    follicular: {
      phase: "Follicular Phase (Days 1-14)",
      energy: "High",
      description: "Your energy is high! Perfect time for strength training and high-intensity workouts.",
      workouts: [
        {
          name: "HIIT Cardio Blast",
          duration: 30,
          intensity: "High",
          calories: 350,
          type: "Cardio",
        },
        {
          name: "Full Body Strength",
          duration: 45,
          intensity: "High",
          calories: 280,
          type: "Strength",
        },
        {
          name: "Power Yoga Flow",
          duration: 40,
          intensity: "Medium",
          calories: 200,
          type: "Flexibility",
        },
      ],
    },
    luteal: {
      phase: "Luteal Phase (Days 15-28)",
      energy: "Moderate",
      description: "Energy may be lower. Focus on moderate intensity and recovery.",
      workouts: [
        {
          name: "Gentle Pilates",
          duration: 35,
          intensity: "Low",
          calories: 150,
          type: "Flexibility",
        },
        {
          name: "Walking & Stretching",
          duration: 30,
          intensity: "Low",
          calories: 120,
          type: "Cardio",
        },
        {
          name: "Light Resistance Training",
          duration: 40,
          intensity: "Medium",
          calories: 200,
          type: "Strength",
        },
      ],
    },
  }

  const currentRecommendation = workoutRecommendations[selectedPhase as keyof typeof workoutRecommendations]

  const weeklyStats = {
    workoutsCompleted: 4,
    totalMinutes: 165,
    caloriesBurned: 890,
    currentStreak: 3,
  }

  const achievements = [
    { name: "7-Day Streak", icon: "🔥", unlocked: false, progress: 3 },
    { name: "First Workout", icon: "⭐", unlocked: true, progress: 1 },
    { name: "30 Workouts", icon: "💪", unlocked: false, progress: 12 },
    { name: "Consistency King", icon: "👑", unlocked: false, progress: 4 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Workout & Fitness Zone</h1>
          <p className="text-muted-foreground">Adaptive workouts based on your cycle and energy levels</p>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Workouts This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">{weeklyStats.workoutsCompleted}</span>
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Goal: 5 per week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Minutes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">{weeklyStats.totalMinutes}</span>
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Goal: 150 minutes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calories Burned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">{weeklyStats.caloriesBurned}</span>
                <Flame className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">{weeklyStats.currentStreak}</span>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Days in a row</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workouts" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workouts">Recommended Workouts</TabsTrigger>
            <TabsTrigger value="progress">Progress & Stats</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="workouts" className="mt-6 space-y-6">
            {/* Phase Selector */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle>Cycle-Based Recommendations</CardTitle>
                <CardDescription>Workouts adapted to your menstrual phase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Button
                    variant={selectedPhase === "follicular" ? "default" : "outline"}
                    onClick={() => setSelectedPhase("follicular")}
                    className="flex-1"
                  >
                    Follicular Phase
                  </Button>
                  <Button
                    variant={selectedPhase === "luteal" ? "default" : "outline"}
                    onClick={() => setSelectedPhase("luteal")}
                    className="flex-1"
                  >
                    Luteal Phase
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{currentRecommendation.phase}</h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {currentRecommendation.energy} Energy
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentRecommendation.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Workout Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentRecommendation.workouts.map((workout, i) => (
                <Card key={i} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{workout.type}</Badge>
                      <Badge
                        variant="secondary"
                        className={
                          workout.intensity === "High"
                            ? "bg-red-100 text-red-700"
                            : workout.intensity === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }
                      >
                        {workout.intensity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{workout.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Duration
                        </span>
                        <span className="font-semibold text-foreground">{workout.duration} min</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Flame className="h-4 w-4" />
                          Calories
                        </span>
                        <span className="font-semibold text-foreground">{workout.calories} cal</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      <Play className="h-4 w-4 mr-2" />
                      Start Workout
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Wearable Sync */}
            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>Sync with your fitness trackers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Apple Watch", connected: true, lastSync: "2 hours ago" },
                    { name: "Fitbit", connected: false, lastSync: "Not connected" },
                    { name: "Google Fit", connected: false, lastSync: "Not connected" },
                  ].map((device, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Heart className={`h-5 w-5 ${device.connected ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className="font-medium text-foreground">{device.name}</p>
                          <p className="text-xs text-muted-foreground">Last sync: {device.lastSync}</p>
                        </div>
                      </div>
                      <Button variant={device.connected ? "outline" : "default"} size="sm">
                        {device.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your workout consistency over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const completed = i < 4
                    return (
                      <div key={day} className="flex items-center gap-4">
                        <span className="text-sm font-medium text-foreground w-12">{day}</span>
                        <div className="flex-1 bg-secondary rounded-full h-8 flex items-center px-3">
                          {completed ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span className="text-sm text-foreground">Completed - 45 min</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Rest day</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Total Workouts</p>
                    <p className="text-3xl font-bold text-foreground">18</p>
                    <Progress value={72} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">72% of goal</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Active Minutes</p>
                    <p className="text-3xl font-bold text-foreground">720</p>
                    <Progress value={80} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">80% of goal</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Calories Burned</p>
                    <p className="text-3xl font-bold text-foreground">3,840</p>
                    <Progress value={64} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">64% of goal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
                <CardDescription>Unlock rewards as you progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className={`p-4 border rounded-lg ${achievement.unlocked ? "border-primary bg-primary/5" : "border-muted"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-4xl ${achievement.unlocked ? "opacity-100" : "opacity-30 grayscale"}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                          {achievement.unlocked ? (
                            <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary">
                              <Award className="h-3 w-3 mr-1" />
                              Unlocked
                            </Badge>
                          ) : (
                            <div className="mt-2">
                              <Progress value={(achievement.progress / 7) * 100} className="h-2" />
                              <p className="text-xs text-muted-foreground mt-1">{achievement.progress} / 7 progress</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
