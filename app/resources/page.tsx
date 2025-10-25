import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Video,
  FileText,
  Users,
  Heart,
  Utensils,
  Activity,
  Brain,
  Stethoscope,
  Download,
  ExternalLink,
  Search,
  Calendar,
  Pill,
  Baby,
} from "lucide-react"
import Link from "next/link"

const ARTICLES = [
  {
    title: "Understanding PCOS: A Comprehensive Guide",
    description: "Learn about the causes, symptoms, and diagnosis of Polycystic Ovary Syndrome.",
    category: "Education",
    readTime: "10 min read",
    icon: BookOpen,
    link: "/learn",
  },
  {
    title: "Managing PCOS Through Diet",
    description: "Evidence-based nutritional strategies for managing PCOS symptoms and improving insulin sensitivity.",
    category: "Nutrition",
    readTime: "8 min read",
    icon: Utensils,
    link: "#",
  },
  {
    title: "Exercise and PCOS: What Works Best",
    description: "Discover the most effective exercise routines for women with PCOS.",
    category: "Fitness",
    readTime: "7 min read",
    icon: Activity,
    link: "#",
  },
  {
    title: "Mental Health and PCOS",
    description: "Understanding the connection between PCOS and mental health, plus coping strategies.",
    category: "Mental Health",
    readTime: "12 min read",
    icon: Brain,
    link: "#",
  },
  {
    title: "PCOS and Fertility: What You Need to Know",
    description: "Comprehensive information about fertility challenges and treatment options for women with PCOS.",
    category: "Fertility",
    readTime: "15 min read",
    icon: Baby,
    link: "#",
  },
  {
    title: "Hormonal Balance: Beyond PCOS",
    description: "Understanding thyroid function, cortisol, and other hormones that affect women's health.",
    category: "Hormones",
    readTime: "10 min read",
    icon: Stethoscope,
    link: "#",
  },
]

const TOOLS = [
  {
    title: "PCOS Symptom Tracker",
    description: "Track your symptoms over time to identify patterns and share with your healthcare provider.",
    icon: Calendar,
    type: "Interactive Tool",
    link: "/tracker",
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand what it means for your health.",
    icon: Activity,
    type: "Calculator",
    link: "#",
  },
  {
    title: "Meal Planning Template",
    description: "Download our PCOS-friendly meal planning template to organize your nutrition.",
    icon: Utensils,
    type: "Download",
    link: "#",
  },
  {
    title: "Medication Tracker",
    description: "Keep track of your medications, dosages, and schedules in one place.",
    icon: Pill,
    type: "Interactive Tool",
    link: "#",
  },
]

const VIDEOS = [
  {
    title: "PCOS 101: What Every Woman Should Know",
    description: "A comprehensive video introduction to PCOS by leading endocrinologists.",
    duration: "25 min",
    thumbnail: "/women-health-education.jpg",
  },
  {
    title: "Cooking for PCOS: Easy Recipes",
    description: "Learn to prepare delicious, PCOS-friendly meals with our cooking series.",
    duration: "18 min",
    thumbnail: "/women-healthy-cooking.jpg",
  },
  {
    title: "Yoga for Hormonal Balance",
    description: "Gentle yoga sequences designed to support hormonal health and reduce stress.",
    duration: "30 min",
    thumbnail: "/women-yoga-wellness.jpg",
  },
  {
    title: "Managing PCOS Naturally",
    description: "Expert advice on natural approaches to managing PCOS symptoms.",
    duration: "22 min",
    thumbnail: "/women-natural-health.jpg",
  },
]

const SUPPORT_GROUPS = [
  {
    name: "PCOS Awareness Association",
    description: "Leading nonprofit organization providing education, support, and advocacy for women with PCOS.",
    type: "Organization",
    link: "https://www.pcosaa.org",
  },
  {
    name: "PCOS Challenge",
    description: "Online community and support network for women with PCOS worldwide.",
    type: "Online Community",
    link: "https://pcoschallenge.org",
  },
  {
    name: "Reddit r/PCOS",
    description: "Active online forum with over 100k members sharing experiences and support.",
    type: "Forum",
    link: "https://reddit.com/r/PCOS",
  },
  {
    name: "PCOS Nutrition Center",
    description: "Specialized nutrition counseling and meal planning services for women with PCOS.",
    type: "Professional Service",
    link: "https://www.pcosnutrition.com",
  },
]

const DOWNLOADABLES = [
  {
    title: "PCOS Symptom Diary",
    description: "A printable diary to track your symptoms, cycles, and lifestyle factors.",
    format: "PDF",
    size: "2.5 MB",
  },
  {
    title: "PCOS-Friendly Grocery List",
    description: "Comprehensive shopping list of foods that support hormonal balance.",
    format: "PDF",
    size: "1.2 MB",
  },
  {
    title: "Questions to Ask Your Doctor",
    description: "Prepared list of important questions for your PCOS consultation.",
    format: "PDF",
    size: "800 KB",
  },
  {
    title: "Exercise Routine Guide",
    description: "12-week progressive exercise program designed for women with PCOS.",
    format: "PDF",
    size: "3.8 MB",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Women's Health Resource Library</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Comprehensive resources, tools, and support for managing PCOS and hormonal health
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Educational Articles</h2>
              <p className="text-muted-foreground">
                Evidence-based articles written by healthcare professionals and PCOS experts.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ARTICLES.map((article, index) => {
                const Icon = article.icon
                return (
                  <Card key={index} className="flex flex-col p-6 transition-shadow hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{article.category}</Badge>
                    </div>
                    <h3 className="mb-2 font-semibold leading-tight">{article.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={article.link}>
                          Read More
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Interactive Tools & Calculators</h2>
              <p className="text-muted-foreground">
                Practical tools to help you track symptoms, plan meals, and manage your health.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {TOOLS.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <Card key={index} className="p-6 transition-shadow hover:shadow-lg">
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-semibold">{tool.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {tool.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={tool.link}>
                        {tool.type === "Download" ? "Download" : "Open Tool"}
                        {tool.type === "Download" ? (
                          <Download className="ml-2 h-4 w-4" />
                        ) : (
                          <ExternalLink className="ml-2 h-4 w-4" />
                        )}
                      </Link>
                    </Button>
                  </Card>
                )
              })}
            </div>

            <Card className="bg-secondary p-6">
              <h3 className="mb-2 font-semibold">Need a Custom Tool?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Let us know what tools would be most helpful for managing your PCOS journey.
              </p>
              <Button variant="outline">Submit Feedback</Button>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Video Library</h2>
              <p className="text-muted-foreground">
                Educational videos, cooking demonstrations, and exercise routines for PCOS management.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {VIDEOS.map((video, index) => (
                <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition-transform hover:scale-110">
                        <Video className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <Badge className="absolute bottom-2 right-2">{video.duration}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-semibold">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Support Groups & Communities</h2>
              <p className="text-muted-foreground">
                Connect with others, find support, and access professional resources for your PCOS journey.
              </p>
            </div>

            <div className="space-y-4">
              {SUPPORT_GROUPS.map((group, index) => (
                <Card key={index} className="p-6 transition-shadow hover:shadow-lg">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{group.name}</h3>
                        <Badge variant="secondary">{group.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <Button asChild variant="outline" className="shrink-0 bg-transparent">
                      <a href={group.link} target="_blank" rel="noopener noreferrer">
                        Visit
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-secondary p-6">
              <div className="flex items-start gap-4">
                <Heart className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="mb-2 font-semibold">Crisis Support</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    If you're experiencing a mental health crisis, please reach out for immediate help:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>National Suicide Prevention Lifeline:</strong> 988
                    </p>
                    <p>
                      <strong>Crisis Text Line:</strong> Text HOME to 741741
                    </p>
                    <p>
                      <strong>SAMHSA National Helpline:</strong> 1-800-662-4357
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-6">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Downloadable Resources</h2>
              <p className="text-muted-foreground">
                Free printable guides, templates, and worksheets to support your PCOS management.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {DOWNLOADABLES.map((resource, index) => (
                <Card key={index} className="p-6 transition-shadow hover:shadow-lg">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold">{resource.title}</h3>
                      <p className="mb-2 text-sm text-muted-foreground">{resource.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{resource.format}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="bg-secondary p-6">
              <h3 className="mb-2 font-semibold">All Resources Pack</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Download all our resources in one convenient package (ZIP file, 12 MB).
              </p>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download All Resources
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-12 bg-primary/5 p-8">
          <div className="text-center">
            <h2 className="mb-4 font-serif text-2xl font-bold">Ready to Take Control of Your Health?</h2>
            <p className="mb-6 text-muted-foreground">
              Start with our comprehensive PCOS assessment to understand your risk factors and get personalized
              recommendations.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/assessment">Start Assessment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tracker">Track Your Cycle</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
