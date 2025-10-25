"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Pill, Calendar, Clock, CheckCircle2, Bell, TrendingUp, Plus, Stethoscope } from "lucide-react"

export default function MedicationsPage() {
  const medications = [
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: ["8:00 AM", "8:00 PM"],
      purpose: "Insulin resistance",
      streak: 14,
      adherence: 95,
    },
    {
      name: "Inositol",
      dosage: "2000mg",
      frequency: "Once daily",
      time: ["9:00 AM"],
      purpose: "Hormonal balance",
      streak: 21,
      adherence: 100,
    },
    {
      name: "Vitamin D",
      dosage: "2000 IU",
      frequency: "Once daily",
      time: ["8:00 AM"],
      purpose: "Supplement",
      streak: 30,
      adherence: 97,
    },
  ]

  const todaySchedule = [
    { medication: "Metformin", time: "8:00 AM", taken: true },
    { medication: "Vitamin D", time: "8:00 AM", taken: true },
    { medication: "Inositol", time: "9:00 AM", taken: true },
    { medication: "Metformin", time: "8:00 PM", taken: false },
  ]

  const upcomingAppointments = [
    {
      type: "OB/GYN",
      doctor: "Dr. Sarah Johnson",
      date: "March 15, 2025",
      time: "10:30 AM",
      location: "Women's Health Center",
      notes: "Annual checkup",
    },
    {
      type: "Endocrinologist",
      doctor: "Dr. Michael Chen",
      date: "March 22, 2025",
      time: "2:00 PM",
      location: "Hormone Health Clinic",
      notes: "Follow-up on hormone levels",
    },
    {
      type: "Nutritionist",
      doctor: "Lisa Martinez, RD",
      date: "April 5, 2025",
      time: "11:00 AM",
      location: "Wellness Center",
      notes: "PCOS diet consultation",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Medication & Appointment Manager</h1>
          <p className="text-muted-foreground">Track your medications and healthcare appointments</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">{medications.length}</span>
                <Pill className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Currently taking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Doses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">3/4</span>
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Taken so far</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Adherence Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">97%</span>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">5</span>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Days away</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="medications" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="medications" className="mt-6 space-y-6">
            {/* Add Medication Button */}
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add New Medication
            </Button>

            {/* Medication Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medications.map((med, i) => (
                <Card key={i} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Pill className="h-6 w-6 text-primary" />
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {med.frequency}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{med.name}</CardTitle>
                    <CardDescription>{med.dosage}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Purpose</p>
                      <p className="text-sm font-medium text-foreground">{med.purpose}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Schedule</p>
                      <div className="space-y-1">
                        {med.time.map((t, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-foreground">
                            <Clock className="h-3 w-3 text-primary" />
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Adherence</span>
                        <span className="text-sm font-semibold text-foreground">{med.adherence}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${med.adherence}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{med.streak} day streak</p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Edit Medication
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Reminders Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Reminder Settings</CardTitle>
                <CardDescription>Configure how you want to be reminded</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when it's time to take medication</p>
                    </div>
                  </div>
                  <Checkbox defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Email Reminders</p>
                      <p className="text-sm text-muted-foreground">Receive daily medication summary via email</p>
                    </div>
                  </div>
                  <Checkbox />
                </div>

                <div className="pt-4 border-t">
                  <Label className="mb-2 block">Reminder Time Before Dose</Label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Medication Schedule</CardTitle>
                <CardDescription>Track your doses for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaySchedule.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 border rounded-lg ${item.taken ? "bg-primary/5 border-primary/20" : ""}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${item.taken ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                        >
                          {item.taken ? <CheckCircle2 className="h-5 w-5" /> : <Pill className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.medication}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {item.time}
                          </p>
                        </div>
                      </div>
                      {!item.taken && <Button size="sm">Mark as Taken</Button>}
                      {item.taken && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Completed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Adherence */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Weekly Adherence</CardTitle>
                <CardDescription>Your medication consistency this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const adherence = i < 5 ? 100 : i === 5 ? 75 : 0
                    return (
                      <div key={day} className="flex items-center gap-4">
                        <span className="text-sm font-medium text-foreground w-12">{day}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">
                              {adherence === 100 ? "All doses taken" : adherence > 0 ? "Partially taken" : "No data"}
                            </span>
                            <span className="text-xs font-semibold text-foreground">{adherence}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${adherence === 100 ? "bg-primary" : adherence > 0 ? "bg-yellow-500" : "bg-muted"}`}
                              style={{ width: `${adherence}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="mt-6 space-y-6">
            {/* Add Appointment Button */}
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Schedule New Appointment
            </Button>

            {/* Upcoming Appointments */}
            <div className="space-y-4">
              {upcomingAppointments.map((apt, i) => (
                <Card key={i} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Stethoscope className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{apt.type}</CardTitle>
                          <CardDescription className="mt-1">{apt.doctor}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{apt.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{apt.time}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{apt.location}</p>
                    </div>

                    {apt.notes && (
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">Notes</p>
                        <p className="text-sm text-foreground">{apt.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Add to Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Calendar Sync */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar Integration</CardTitle>
                <CardDescription>Sync appointments with your calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Google Calendar", connected: true },
                    { name: "Apple Calendar", connected: false },
                    { name: "Outlook Calendar", connected: false },
                  ].map((cal, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className={`h-5 w-5 ${cal.connected ? "text-primary" : "text-muted-foreground"}`} />
                        <p className="font-medium text-foreground">{cal.name}</p>
                      </div>
                      <Button variant={cal.connected ? "outline" : "default"} size="sm">
                        {cal.connected ? "Disconnect" : "Connect"}
                      </Button>
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
