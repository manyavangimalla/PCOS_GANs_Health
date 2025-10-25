import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { FloatingAIAssistant } from "@/components/floating-ai-assistant"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "PCOS Health Assessment | Understand Your Hormonal Health",
  description:
    "Comprehensive PCOS assessment tool for women aged 13-50. Track symptoms, monitor menstrual cycles, and gain insights into your hormonal health.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${poppins.variable} font-sans antialiased`}>
        <Navigation />
        {children}
        <FloatingAIAssistant />
      </body>
    </html>
  )
}
