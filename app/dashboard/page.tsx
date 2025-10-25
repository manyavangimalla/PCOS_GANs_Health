import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Calendar, Heart, TrendingUp, Sparkles, Apple, Dumbbell, Pill, Users } from "lucide-react"

export default function DashboardPage() {
  // Mock data - in production, this would come from user's logged data
  const hormoneScore = 72
  const cycleDay = 14
  const nextPeriod = 14
  const moodTrend = "improving"
  const recentSymptoms = ["Mild bloating", "Good energy", "Clear skin"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back, Sarah</h1>
          <p className="text-muted-foreground">Here's your health overview for today</p>
        </div>

        {/* AI Summary Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI Health Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground leading-relaxed">
              You've had regular cycles for 2 months! Keep up your morning walks. Your hormone balance has improved by
              15% this month, and your stress levels are trending down. Great progress!
            </p>
            <div className="flex gap-2 mt-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Regular Cycles
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Improved Balance
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Lower Stress
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Hormone Balance Score */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hormone Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-foreground">{hormoneScore}%</span>
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <Progress value={hormoneScore} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">Good balance this month</p>
            </CardContent>
          </Card>

          {/* Cycle Day */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cycle Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-foreground">Day {cycleDay}</span>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Next period in {nextPeriod} days</p>
              <Badge variant="outline" className="mt-2">
                Ovulation Phase
              </Badge>
            </CardContent>
          </Card>

          {/* Mood Trend */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Mood Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-foreground capitalize">{moodTrend}</span>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">7-day average</p>
              <div className="flex gap-1 mt-2">
                {[8, 7, 6, 7, 8, 8, 9].map((val, i) => (
                  <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${val * 4}px` }} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Symptoms */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                {recentSymptoms.map((symptom, i) => (
                  <p key={i} className="text-xs text-foreground">
                    • {symptom}
                  </p>
                ))}
              </div>
              <Button variant="link" className="p-0 h-auto mt-2 text-primary" asChild>
                <Link href="/tracker">View all symptoms</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="journal" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
            <TabsTrigger value="journal">Daily Journal</TabsTrigger>
            <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Journal</CardTitle>
                <CardDescription>Record your emotions, energy levels, and reflections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">How are you feeling today?</label>
                  <Textarea
                    placeholder="Write about your mood, energy, any symptoms, or thoughts..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Energy Level</label>
                    <div className="flex gap-2">
                      {["Low", "Medium", "High"].map((level) => (
                        <Button key={level} variant="outline" size="sm" className="flex-1 bg-transparent">
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Overall Mood</label>
                    <div className="flex gap-2">
                      {["😔", "😐", "😊"].map((emoji) => (
                        <Button key={emoji} variant="outline" size="sm" className="flex-1 text-xl bg-transparent">
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Journal Entry</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quick-actions" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer" asChild>
                <Link href="/tracker">
                  <CardHeader>
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Track Cycle</CardTitle>
                    <CardDescription>Log your period and symptoms</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:border-primary/50 transition-colors cursor-pointer" asChild>
                <Link href="/nutrition">
                  <CardHeader>
                    <Apple className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Meal Planner</CardTitle>
                    <CardDescription>Get PCOS-friendly recipes</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:border-primary/50 transition-colors cursor-pointer" asChild>
                <Link href="/fitness">
                  <CardHeader>
                    <Dumbbell className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Workout Plan</CardTitle>
                    <CardDescription>Adaptive fitness routines</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:border-primary/50 transition-colors cursor-pointer" asChild>
                <Link href="/medications">
                  <CardHeader>
                    <Pill className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Medications</CardTitle>
                    <CardDescription>Track pills and supplements</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:border-primary/50 transition-colors cursor-pointer" asChild>
                <Link href="/assistant">
                  <CardHeader>
                    <Sparkles className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">AI Assistant</CardTitle>
                    <CardDescription>Ask health questions</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:border-primary/50 transition-colors cursor-pointer" asChild>
                <Link href="/community">
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Community</CardTitle>
                    <CardDescription>Connect with others</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your health journey this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Today", activity: "Logged morning symptoms", icon: Activity },
                { date: "Yesterday", activity: "Completed 30-min yoga session", icon: Dumbbell },
                { date: "2 days ago", activity: "Took all medications on time", icon: Pill },
                { date: "3 days ago", activity: "Logged period day 1", icon: Calendar },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
