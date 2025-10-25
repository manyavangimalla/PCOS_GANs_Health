"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Send, Download, FileText, MessageCircle, TrendingUp, Heart, AlertCircle } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: string
  followUpQuestions?: string[]
}

export default function AssistantPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Health Assistant, trained on PCOS and women's health data. I can help answer questions about your symptoms, explain lab results, provide lifestyle recommendations, and offer emotional support. How can I help you today?",
      timestamp: "10:00 AM",
    },
  ])

  const quickQuestions = [
    "What does my LH/FSH ratio mean?",
    "How can I manage insulin resistance?",
    "What foods should I avoid with PCOS?",
    "Why am I experiencing hair loss?",
    "How does stress affect my hormones?",
    "What supplements are recommended?",
  ]

  const getAIResponse = (userQuestion: string) => {
    const responses = [
      {
        content:
          "Based on your question about LH/FSH ratio, this is an important indicator for PCOS. A ratio higher than 2:1 or 3:1 may suggest PCOS. Would you like me to explain what this means for your treatment options, or do you need help understanding your specific lab results?",
        followUp: ["Explain treatment options", "Help with my lab results", "What's a normal ratio?"],
      },
      {
        content:
          "Managing insulin resistance is key for PCOS. I recommend focusing on low-glycemic foods, regular exercise, and possibly supplements like inositol. What specific aspect would you like to explore - diet changes, exercise routines, or supplement recommendations?",
        followUp: ["Diet changes for insulin resistance", "Best exercises for PCOS", "Tell me about inositol"],
      },
      {
        content:
          "Great question! With PCOS, it's best to limit refined carbs, sugary foods, and inflammatory foods. A low-GI diet can really help. Would you like a sample meal plan, specific food lists, or tips for eating out with PCOS?",
        followUp: ["Show me a meal plan", "Give me food lists", "Tips for eating out"],
      },
      {
        content:
          "Hair loss with PCOS is often related to elevated androgens (male hormones). This can be managed through medication, supplements, and lifestyle changes. What would you like to know more about - treatment options, natural remedies, or how to track your progress?",
        followUp: ["Treatment options for hair loss", "Natural remedies", "How to track progress"],
      },
      {
        content:
          "Stress significantly impacts your hormones by increasing cortisol, which can worsen PCOS symptoms and disrupt your cycle. Managing stress through mindfulness, exercise, and sleep is crucial. Would you like stress management techniques, information about the cortisol-PCOS connection, or tips for better sleep?",
        followUp: ["Stress management techniques", "Cortisol and PCOS connection", "Better sleep tips"],
      },
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSend = () => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      return
    }

    const userMessage: Message = {
      role: "user",
      content: trimmedMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    setTimeout(() => {
      const response = getAIResponse(trimmedMessage)
      const aiResponse: Message = {
        role: "assistant",
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        followUpQuestions: response.followUp,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      role: "user",
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const response = getAIResponse(question)
      const aiResponse: Message = {
        role: "assistant",
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        followUpQuestions: response.followUp,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFEFEA]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#F6C9B3] to-[#E4AFAF] mb-6 shadow-lg">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1
            className="text-5xl font-semibold text-[#6B4F4F] mb-4 tracking-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            AI Health Assistant
          </h1>
          <p className="text-lg text-[#8B6B61] max-w-2xl mx-auto leading-relaxed">
            Get personalized health guidance and support powered by AI trained on PCOS and women's health data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1 animate-in fade-in slide-in-from-left duration-700">
            <Card className="shadow-[0px_6px_20px_rgba(0,0,0,0.1)] border-0 rounded-2xl overflow-hidden">
              <CardHeader className="border-b bg-gradient-to-r from-[#F6C9B3] to-[#E4AFAF] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Sparkles className="h-7 w-7 text-[#E4AFAF]" />
                    </div>
                    <div>
                      <CardTitle
                        className="text-xl text-white font-semibold"
                        style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "0.3px" }}
                      >
                        AI Health Assistant
                      </CardTitle>
                      <CardDescription className="text-white/90 text-sm">
                        Trained on PCOS and women's health data
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-[#AEE5D8] text-[#2D5F52] border-0 px-3 py-1.5 text-xs font-medium">
                    <span className="w-2 h-2 bg-[#2D5F52] rounded-full mr-2 animate-pulse"></span>
                    Online
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="h-[350px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white to-[#FFF7F3]">
                {messages.map((msg, i) => (
                  <div key={i} className="space-y-3">
                    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-2xl p-5 shadow-sm ${
                          msg.role === "user"
                            ? "bg-[#E4AFAF] text-white"
                            : "bg-white border border-[#F6C9B3]/30 text-[#6B4F4F]"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <p className={`text-xs mt-2 ${msg.role === "user" ? "text-white/80" : "text-[#8B6B61]"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>

                    {msg.role === "assistant" && msg.followUpQuestions && (
                      <div className="flex flex-wrap gap-2 justify-start ml-2">
                        {msg.followUpQuestions.map((question, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickQuestion(question)}
                            className="text-xs bg-[#FFF7F3] border border-[#F6C9B3] hover:bg-[#FCE9E3] hover:border-[#E4AFAF] transition-all duration-300 rounded-full px-4 py-2 h-auto"
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>

              <div className="border-t bg-white p-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Ask me anything about PCOS, hormones, or women's health..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    className="flex-1 h-14 text-base border-2 border-[#F6C9B3]/30 focus:border-[#E4AFAF] rounded-xl"
                  />
                  <Button
                    type="button"
                    onClick={handleSend}
                    size="lg"
                    className="px-8 h-14 bg-[#E4AFAF] hover:bg-[#D89FA0] shadow-[0px_4px_10px_rgba(228,175,175,0.4)] hover:scale-105 transition-all duration-300 rounded-xl"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6 order-1 lg:order-2 animate-in fade-in slide-in-from-right duration-700">
            {/* Quick Questions */}
            <Card className="shadow-[0px_6px_20px_rgba(0,0,0,0.1)] border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-[#F6C9B3]/20 to-[#E4AFAF]/20 p-6">
                <CardTitle
                  className="text-lg flex items-center gap-3 text-[#6B4F4F] font-semibold"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <MessageCircle className="h-6 w-6 text-[#E4AFAF]" />
                  Quick Questions
                </CardTitle>
                <CardDescription className="text-[#8B6B61]">Tap to ask common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                {quickQuestions.map((question, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-4 px-5 bg-[#FFF7F3] border border-[#F6C9B3] hover:bg-[#FCE9E3] hover:border-[#E4AFAF] transition-all duration-300 rounded-xl text-[#6B4F4F]"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <span className="text-sm leading-relaxed">{question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="shadow-[0px_6px_20px_rgba(0,0,0,0.1)] border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-[#F6C9B3]/20 to-[#E4AFAF]/20 p-6">
                <CardTitle
                  className="text-lg text-[#6B4F4F] font-semibold"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  What I Can Help With
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FFF7F3] transition-colors duration-300">
                  <div className="h-12 w-12 rounded-full bg-[#F6C9B3]/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-[#E4AFAF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#6B4F4F] mb-1.5">Lab Result Explanations</p>
                    <p className="text-xs text-[#8B6B61] leading-relaxed">
                      Understand your hormone levels and what they mean
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FFF7F3] transition-colors duration-300">
                  <div className="h-12 w-12 rounded-full bg-[#F6C9B3]/20 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-[#E4AFAF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#6B4F4F] mb-1.5">Emotional Support</p>
                    <p className="text-xs text-[#8B6B61] leading-relaxed">
                      Get encouragement and mental health guidance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FFF7F3] transition-colors duration-300">
                  <div className="h-12 w-12 rounded-full bg-[#F6C9B3]/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-[#E4AFAF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#6B4F4F] mb-1.5">Lifestyle Recommendations</p>
                    <p className="text-xs text-[#8B6B61] leading-relaxed">
                      Personalized diet, exercise, and wellness tips
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FFF7F3] transition-colors duration-300">
                  <div className="h-12 w-12 rounded-full bg-[#F6C9B3]/20 flex items-center justify-center flex-shrink-0">
                    <Download className="h-6 w-6 text-[#E4AFAF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#6B4F4F] mb-1.5">Doctor Reports</p>
                    <p className="text-xs text-[#8B6B61] leading-relaxed">Generate PDF summaries for consultations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Report */}
            <Card className="shadow-[0px_6px_20px_rgba(0,0,0,0.1)] border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#F6C9B3]/30 to-[#E4AFAF]/20">
              <CardHeader className="p-6">
                <CardTitle
                  className="text-lg flex items-center gap-3 text-[#6B4F4F] font-semibold"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Download className="h-6 w-6 text-[#E4AFAF]" />
                  Health Summary Report
                </CardTitle>
                <CardDescription className="text-[#8B6B61]">
                  Generate a comprehensive report for your doctor
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Button className="w-full h-14 text-base bg-[#E4AFAF] hover:bg-[#D89FA0] shadow-[0px_4px_10px_rgba(228,175,175,0.4)] hover:scale-105 transition-all duration-300 rounded-xl">
                  <Download className="h-5 w-5 mr-2" />
                  Generate PDF Report
                </Button>
                <p className="text-xs text-[#8B6B61] mt-4 leading-relaxed">
                  Includes your symptoms, cycle data, medications, and health trends
                </p>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="shadow-[0px_6px_20px_rgba(0,0,0,0.1)] border-0 rounded-2xl overflow-hidden bg-amber-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    This AI assistant provides general health information and is not a substitute for professional
                    medical advice. Always consult with your healthcare provider for medical decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
