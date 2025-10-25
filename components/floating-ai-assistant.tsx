"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

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
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              <div className="bg-primary/10 rounded-lg p-3">
                <p className="text-sm text-foreground">
                  Hi! I'm your AI health assistant. I can help answer questions about PCOS, hormonal health, and
                  wellness. How can I help you today?
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="Ask me anything..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Link href="/assistant" className="block">
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  Open Full Assistant
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
