"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Send, Download, FileText, MessageCircle, TrendingUp, Heart, AlertCircle } from "lucide-react"

export default function AssistantPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
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

  const handleSend = () => {
    if (!message.trim()) return

    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content:
          "Based on your question, I can provide some insights. PCOS management typically involves a combination of lifestyle changes, medication, and regular monitoring. Would you like me to elaborate on any specific aspect?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

              {/* Messages */}
              <CardContent className="h-[500px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white to-[#FFF7F3]">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
                ))}
              </CardContent>

              {/* Input */}
              <div className="border-t bg-white p-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Ask me anything about PCOS, hormones, or women's health..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 h-14 text-base border-2 border-[#F6C9B3]/30 focus:border-[#E4AFAF] rounded-xl"
                  />
                  <Button
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
                    onClick={() => setMessage(question)}
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
