"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const generateAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase()

  // PCOS symptoms and diagnosis
  if (lowerMessage.includes("symptom") || lowerMessage.includes("sign")) {
    return "Common PCOS symptoms include irregular periods, excess hair growth, acne, weight gain, and difficulty getting pregnant. Each woman's experience is unique. Would you like to take our comprehensive assessment to evaluate your symptoms?"
  }

  // Fertility and pregnancy
  if (lowerMessage.includes("fertility") || lowerMessage.includes("pregnant") || lowerMessage.includes("conceive")) {
    return "PCOS can affect fertility, but many women with PCOS do conceive successfully. Managing PCOS through lifestyle changes, medication, and working with a fertility specialist can improve your chances. Would you like information about fertility treatments or lifestyle modifications?"
  }

  // Diet and nutrition
  if (
    lowerMessage.includes("diet") ||
    lowerMessage.includes("food") ||
    lowerMessage.includes("eat") ||
    lowerMessage.includes("nutrition")
  ) {
    return "A PCOS-friendly diet focuses on low-glycemic foods, lean proteins, healthy fats, and plenty of vegetables. Avoiding processed foods and refined sugars can help manage insulin resistance. Check out our Nutrition section for personalized meal plans!"
  }

  // Weight management
  if (lowerMessage.includes("weight") || lowerMessage.includes("lose") || lowerMessage.includes("gain")) {
    return "Weight management with PCOS can be challenging due to insulin resistance. Focus on balanced nutrition, regular exercise, stress management, and adequate sleep. Even a 5-10% weight loss can significantly improve PCOS symptoms. Visit our Fitness section for workout plans!"
  }

  // Exercise and fitness
  if (lowerMessage.includes("exercise") || lowerMessage.includes("workout") || lowerMessage.includes("fitness")) {
    return "Regular exercise helps manage PCOS by improving insulin sensitivity and hormone balance. A mix of cardio and strength training works best. Our Fitness Zone offers cycle-based workout recommendations tailored to your hormonal phases!"
  }

  // Hormones and lab tests
  if (
    lowerMessage.includes("hormone") ||
    lowerMessage.includes("test") ||
    lowerMessage.includes("lab") ||
    lowerMessage.includes("blood")
  ) {
    return "Key hormones to test for PCOS include LH, FSH, testosterone, AMH, insulin, and glucose. The LH/FSH ratio is particularly important. You can track your lab results in our assessment section. Would you like to know more about interpreting your results?"
  }

  // Menstrual cycle
  if (
    lowerMessage.includes("period") ||
    lowerMessage.includes("cycle") ||
    lowerMessage.includes("menstrual") ||
    lowerMessage.includes("irregular")
  ) {
    return "Irregular periods are one of the most common PCOS symptoms. Tracking your cycle can help identify patterns and guide treatment. Try our Cycle Tracker to monitor your periods, symptoms, and ovulation predictions!"
  }

  // Natural remedies
  if (
    lowerMessage.includes("natural") ||
    lowerMessage.includes("remedy") ||
    lowerMessage.includes("herb") ||
    lowerMessage.includes("supplement")
  ) {
    return "Natural remedies like spearmint tea, cinnamon, inositol, and omega-3s can help manage PCOS symptoms. Visit our Natural Remedies page to learn about Ayurvedic approaches and evidence-based supplements!"
  }

  // Medication
  if (
    lowerMessage.includes("medication") ||
    lowerMessage.includes("medicine") ||
    lowerMessage.includes("metformin") ||
    lowerMessage.includes("pill")
  ) {
    return "Common PCOS medications include metformin for insulin resistance, birth control pills for cycle regulation, and spironolactone for excess hair growth. Always consult your doctor before starting any medication. Use our Medication Tracker to stay on top of your prescriptions!"
  }

  // Mental health
  if (
    lowerMessage.includes("stress") ||
    lowerMessage.includes("anxiety") ||
    lowerMessage.includes("depression") ||
    lowerMessage.includes("mental")
  ) {
    return "PCOS can impact mental health due to hormonal imbalances and the stress of managing symptoms. Prioritizing self-care, seeking support, and managing stress through mindfulness can help. Our Community Hub connects you with others who understand what you're going through."
  }

  // Diagnosis
  if (lowerMessage.includes("diagnose") || lowerMessage.includes("diagnosis") || lowerMessage.includes("doctor")) {
    return "PCOS is typically diagnosed using the Rotterdam criteria: irregular periods, high androgen levels, and polycystic ovaries on ultrasound. You need 2 out of 3 criteria. Take our assessment to evaluate your risk and get a report to share with your doctor!"
  }

  // General greeting
  if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
    return "Hello! I'm here to help you with PCOS and women's health questions. You can ask me about symptoms, diet, exercise, treatments, or anything else related to hormonal health. How can I help you today?"
  }

  // Default response
  return "That's a great question about PCOS and women's health. You can explore our Resources section for articles and tools, or ask me more specific questions about symptoms, diet, exercise, treatments, or hormonal health. What specific aspect would you like to know more about?"
}

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI health assistant. I can help answer questions about PCOS, hormonal health, and wellness. How can I help you today?",
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return

    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentMessage = message
    setMessage("")

    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: generateAIResponse(currentMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
            <CardTitle className="text-lg">AI Health Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 min-h-0 scrollbar-hide">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`rounded-lg p-3 max-w-[80%] break-words ${
                      msg.role === "assistant" ? "bg-primary/10 text-foreground" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  className="flex-1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button size="icon" onClick={handleSend} type="button">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
