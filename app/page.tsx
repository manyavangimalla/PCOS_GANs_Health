"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Activity, Heart, Calendar, TrendingUp, ArrowRight, Sparkles, Users, BookOpen } from 'lucide-react'
import { useEffect, useState } from "react"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      text: "This app helped me understand my symptoms and gave me the confidence to talk to my doctor.",
      author: "Sarah, 28",
      rating: 5,
    },
    {
      text: "The cycle tracker and meal planner have been game-changers for managing my PCOS.",
      author: "Maya, 32",
      rating: 5,
    },
    {
      text: "Finally, a comprehensive tool that addresses all aspects of women's hormonal health!",
      author: "Jessica, 25",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-women-health.jpg')",
          }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-secondary/60 to-primary/10" />

        {/* Animated blur effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-4 top-20 h-72 w-72 animate-pulse rounded-full bg-primary/5 blur-3xl" />
          <div
            className="absolute -right-4 bottom-20 h-96 w-96 animate-pulse rounded-full bg-accent/10 blur-3xl"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container relative mx-auto px-4">
          <div
            className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-balance md:text-6xl">
              Your Complete Guide to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hormonal Wellness
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
              Track symptoms, manage PCOS, plan nutrition, and connect with a supportive community—all in one
              comprehensive platform designed for women aged 13-50.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="group w-full sm:w-auto">
                <Link href="/assessment">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-background/50 backdrop-blur-sm"
              >
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is PCOS Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center font-serif text-3xl font-bold md:text-4xl">Understanding PCOS</h2>
            <p className="mb-6 text-center text-lg text-muted-foreground text-pretty md:text-xl">
              Polycystic Ovary Syndrome (PCOS) affects 1 in 10 women of reproductive age. It impacts menstrual cycles,
              fertility, hormone levels, and overall health—but with the right tools, you can take control.
            </p>
            <Card className="overflow-hidden border-2 p-6 md:p-8">
              <h3 className="mb-4 text-xl font-semibold">Common Symptoms Include:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    •
                  </span>
                  <span>Irregular or absent menstrual periods</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    •
                  </span>
                  <span>Excess hair growth on face, chest, or back</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    •
                  </span>
                  <span>Acne or oily skin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    •
                  </span>
                  <span>Weight gain or difficulty losing weight</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    •
                  </span>
                  <span>Thinning hair or hair loss</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    •
                  </span>
                  <span>Darkening of skin in body creases</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center font-serif text-3xl font-bold md:text-4xl">
            Comprehensive Health Management
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Everything you need to manage PCOS and hormonal health in one place
          </p>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group p-6 transition-all hover:scale-105 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Symptom Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor symptoms with severity ratings and identify patterns over time.
              </p>
            </Card>

            <Card className="group p-6 transition-all hover:scale-105 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Cycle Tracker</h3>
              <p className="text-sm text-muted-foreground">
                Track periods, ovulation, and predict your next cycle with AI insights.
              </p>
            </Card>

            <Card className="group p-6 transition-all hover:scale-105 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Nutrition Planner</h3>
              <p className="text-sm text-muted-foreground">
                Get PCOS-friendly meal plans with macro tracking and grocery lists.
              </p>
            </Card>

            <Card className="group p-6 transition-all hover:scale-105 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">AI Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Receive personalized insights and recommendations based on your data.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold md:text-4xl">What Women Are Saying</h2>
          <div className="mx-auto max-w-3xl">
            <Card className="relative overflow-hidden p-8 md:p-12">
              <div className="absolute right-4 top-4 text-6xl text-primary/10">"</div>
              <div className="relative">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      index === currentTestimonial ? "opacity-100" : "absolute inset-0 opacity-0"
                    }`}
                  >
                    <div className="mb-4 flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="mb-4 text-lg italic text-muted-foreground">{testimonial.text}</p>
                    <p className="font-semibold text-primary">— {testimonial.author}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentTestimonial ? "w-8 bg-primary" : "bg-primary/20"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Supportive Community</h3>
              <p className="text-sm text-muted-foreground">
                Connect with others, share experiences, and find support in moderated forums.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">AI Health Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Get instant answers to your health questions with our intelligent chatbot.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Expert Resources</h3>
              <p className="text-sm text-muted-foreground">
                Access evidence-based articles, videos, and tools curated by health professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Ready to Take Control of Your Health?</h2>
            <p className="mb-8 text-lg text-muted-foreground text-pretty">
              Join thousands of women who are managing their PCOS and hormonal health with confidence. Start your free
              assessment today—it takes just 5-10 minutes.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/assessment">
                Begin Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required • 100% confidential • Trusted by 15,000+ women
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t bg-muted py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            <strong>Medical Disclaimer:</strong> This assessment tool is for educational purposes only and does not
            provide medical diagnosis. Always consult with a qualified healthcare provider for proper diagnosis and
            treatment.
          </p>
        </div>
      </section>
    </div>
  )
}
