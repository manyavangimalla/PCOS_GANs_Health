"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  MessageCircle,
  Heart,
  TrendingUp,
  Calendar,
  Video,
  Shield,
  Plus,
  Search,
  ExternalLink,
} from "lucide-react"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const forumCategories = [
    { name: "PCOS Diagnosis & Symptoms", posts: 1243, members: 3421 },
    { name: "Diet & Nutrition", posts: 892, members: 2156 },
    { name: "Mental Health & Support", posts: 654, members: 1876 },
    { name: "Fertility & Pregnancy", posts: 543, members: 1432 },
    { name: "Success Stories", posts: 432, members: 2987 },
    { name: "Medication & Treatment", posts: 387, members: 1654 },
  ]

  const recentPosts = [
    {
      title: "Finally got my period after 3 months!",
      author: "Sarah M.",
      category: "Success Stories",
      replies: 24,
      likes: 156,
      time: "2 hours ago",
      verified: true,
    },
    {
      title: "Low-carb meal prep ideas for busy weeks?",
      author: "Emma K.",
      category: "Diet & Nutrition",
      replies: 18,
      likes: 89,
      time: "5 hours ago",
      verified: false,
    },
    {
      title: "Dealing with anxiety and PCOS - you're not alone",
      author: "Dr. Lisa Chen",
      category: "Mental Health & Support",
      replies: 42,
      likes: 234,
      time: "1 day ago",
      verified: true,
    },
    {
      title: "Metformin side effects - when do they get better?",
      author: "Jessica R.",
      category: "Medication & Treatment",
      replies: 31,
      likes: 67,
      time: "1 day ago",
      verified: false,
    },
  ]

  const upcomingSessions = [
    {
      title: "PCOS Awareness Webinar",
      host: "Dr. Sarah Johnson",
      date: "March 20, 2025",
      time: "6:00 PM EST",
      attendees: 234,
      type: "Webinar",
    },
    {
      title: "Gentle Yoga for Hormonal Balance",
      host: "Maya Patel, Yoga Instructor",
      date: "March 22, 2025",
      time: "7:00 PM EST",
      attendees: 89,
      type: "Yoga Session",
    },
    {
      title: "Nutrition Q&A with Dietitian",
      host: "Lisa Martinez, RD",
      date: "March 25, 2025",
      time: "5:30 PM EST",
      attendees: 156,
      type: "Q&A Session",
    },
  ]

  const supportResources = [
    {
      name: "PCOS Support Hotline",
      description: "24/7 emotional support and guidance",
      contact: "1-800-PCOS-HELP",
      type: "Hotline",
    },
    {
      name: "Mental Health Crisis Line",
      description: "Immediate help for mental health emergencies",
      contact: "988",
      type: "Crisis",
    },
    {
      name: "PCOS Foundation",
      description: "Educational resources and advocacy",
      contact: "www.pcosfoundation.org",
      type: "Organization",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Community & Support Hub</h1>
          <p className="text-muted-foreground">Connect with others, share experiences, and find support</p>
        </div>

        {/* Join Community Channels */}
        <Card className="mb-8 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Join Our PCOS Community Channels
            </CardTitle>
            <CardDescription>Connect with thousands of women on your favorite platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://discord.gg/pcos-health" target="_blank" rel="noopener noreferrer" className="block">
                <div className="p-4 border-2 border-primary/20 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#5865F2] flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Discord Community</h3>
                        <p className="text-sm text-muted-foreground">8.5K+ members</p>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join our active Discord server for real-time chat, support groups, and expert Q&A sessions
                  </p>
                </div>
              </a>

              <a
                href="https://chat.whatsapp.com/PCOSHealthSupport"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="p-4 border-2 border-primary/20 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#25D366] flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">WhatsApp Group</h3>
                        <p className="text-sm text-muted-foreground">5.2K+ members</p>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connect via WhatsApp for daily support, tips, and encouragement from women worldwide
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">12.5K</span>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Growing community</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Forum Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">4.2K</span>
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">432</span>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Shared this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Live Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-foreground">3</span>
                <Video className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Upcoming this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="forums" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forums">Forums</TabsTrigger>
            <TabsTrigger value="events">Events & Sessions</TabsTrigger>
            <TabsTrigger value="support">Support Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="forums" className="mt-6 space-y-6">
            {/* Search and Create */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search forums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </div>

            {/* Forum Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Forum Categories</CardTitle>
                <CardDescription>Browse discussions by topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {forumCategories.map((category, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.posts} posts • {category.members} members
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Discussions</CardTitle>
                <CardDescription>Latest posts from the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{post.title}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {post.author.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-foreground">{post.author}</span>
                              {post.verified && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {post.likes} likes
                        </span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Be respectful and supportive of all members</li>
                  <li>• Share experiences, not medical advice</li>
                  <li>• Protect your privacy - avoid sharing personal information</li>
                  <li>• Report inappropriate content to moderators</li>
                  <li>• All posts are moderated by health experts</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="mt-6 space-y-6">
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Suggest an Event
            </Button>

            {/* Upcoming Sessions */}
            <div className="space-y-4">
              {upcomingSessions.map((session, i) => (
                <Card key={i} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Video className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <CardDescription className="mt-1">Hosted by {session.host}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{session.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Video className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{session.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{session.attendees} registered</span>
                      </div>
                      <Button>Register Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Past Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Past Sessions</CardTitle>
                <CardDescription>Watch recordings of previous events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Understanding PCOS Lab Results", views: 1234, duration: "45 min" },
                    { title: "Stress Management Techniques", views: 987, duration: "30 min" },
                    { title: "PCOS-Friendly Cooking Demo", views: 1567, duration: "60 min" },
                  ].map((video, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{video.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {video.views} views • {video.duration}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="mt-6 space-y-6">
            {/* Crisis Resources */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900">Crisis Support</CardTitle>
                <CardDescription className="text-red-700">
                  If you're in crisis, please reach out immediately
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <p className="font-semibold text-red-900 mb-1">National Crisis Hotline</p>
                    <p className="text-2xl font-bold text-red-900">988</p>
                    <p className="text-sm text-red-700 mt-1">Available 24/7 for immediate support</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <p className="font-semibold text-red-900 mb-1">Crisis Text Line</p>
                    <p className="text-lg font-bold text-red-900">Text HOME to 741741</p>
                    <p className="text-sm text-red-700 mt-1">Free, confidential support via text</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Support Organizations</CardTitle>
                <CardDescription>Professional resources and advocacy groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportResources.map((resource, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{resource.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        </div>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <p className="text-sm font-medium text-primary">{resource.contact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Peer Support */}
            <Card>
              <CardHeader>
                <CardTitle>Peer Support Groups</CardTitle>
                <CardDescription>Connect with others in similar situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "PCOS Warriors", members: 2341, meetingTime: "Every Tuesday, 7 PM EST" },
                    { name: "Fertility Journey Support", members: 1567, meetingTime: "Every Thursday, 6 PM EST" },
                    { name: "Mental Health & PCOS", members: 1892, meetingTime: "Every Monday, 8 PM EST" },
                  ].map((group, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-foreground">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {group.members} members • {group.meetingTime}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Join Group
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
