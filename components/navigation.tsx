"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isGroupActive = (paths: string[]) => paths.some((path) => pathname === path)

  return (
    <nav className="border-b border-primary/20 bg-primary/10 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
      <div className="flex h-20 items-center justify-between px-0">
        <Link
          href="/"
          className="flex items-center gap-3 font-serif text-2xl font-bold text-primary hover:text-primary/80 transition-colors shrink-0 pl-4"
        >
          <div className="bg-primary/20 p-2.5 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-primary fill-primary/20" />
          </div>
          <span className="hidden sm:inline leading-none">PCOS Health</span>
          <span className="sm:hidden leading-none">PCOS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 pr-4">
          <Button asChild variant={pathname === "/" ? "default" : "ghost"} size="default" className="font-medium">
            <Link href="/">Home</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isGroupActive(["/dashboard", "/assessment", "/results", "/tracker", "/data-upload", "/model-accuracy"]) ? "default" : "ghost"}
                size="default"
                className="font-medium"
              >
                Health Tools <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/assessment" className="cursor-pointer">
                  Assessment
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/results" className="cursor-pointer">
                  Results
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tracker" className="cursor-pointer">
                  Cycle Tracker
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/model-accuracy" className="cursor-pointer">
                  Model Accuracy
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/data-upload" className="cursor-pointer">
                  Data Upload
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isGroupActive(["/nutrition", "/fitness", "/medications"]) ? "default" : "ghost"}
                size="default"
                className="font-medium"
              >
                Wellness <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/nutrition" className="cursor-pointer">
                  Nutrition
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/fitness" className="cursor-pointer">
                  Fitness
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/medications" className="cursor-pointer">
                  Medications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isGroupActive(["/remedies", "/resources", "/learn"]) ? "default" : "ghost"}
                size="default"
                className="font-medium"
              >
                Learn <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/remedies" className="cursor-pointer">
                  Natural Remedies
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources" className="cursor-pointer">
                  Resources
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/learn" className="cursor-pointer">
                  About PCOS
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isGroupActive(["/community", "/share", "/reports"]) ? "default" : "ghost"}
                size="default"
                className="font-medium"
              >
                Support <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/community" className="cursor-pointer">
                  Community
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/share" className="cursor-pointer">
                  Share Your Thoughts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/reports" className="cursor-pointer">
                  Reports
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-primary/20 mr-4"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-primary/20 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <Button
              asChild
              variant={pathname === "/" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium"
            >
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </Button>

            <div className="text-xs font-semibold text-muted-foreground px-3 py-2">Health Tools</div>
            <Button
              asChild
              variant={pathname === "/dashboard" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/assessment" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/assessment" onClick={() => setMobileMenuOpen(false)}>
                Assessment
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/results" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/results" onClick={() => setMobileMenuOpen(false)}>
                Results
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/tracker" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/tracker" onClick={() => setMobileMenuOpen(false)}>
                Cycle Tracker
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/model-accuracy" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/model-accuracy" onClick={() => setMobileMenuOpen(false)}>
                Model Accuracy
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/data-upload" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/data-upload" onClick={() => setMobileMenuOpen(false)}>
                Data Upload
              </Link>
            </Button>

            <div className="text-xs font-semibold text-muted-foreground px-3 py-2 mt-2">Wellness</div>
            <Button
              asChild
              variant={pathname === "/nutrition" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/nutrition" onClick={() => setMobileMenuOpen(false)}>
                Nutrition
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/fitness" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/fitness" onClick={() => setMobileMenuOpen(false)}>
                Fitness
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/medications" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/medications" onClick={() => setMobileMenuOpen(false)}>
                Medications
              </Link>
            </Button>

            <div className="text-xs font-semibold text-muted-foreground px-3 py-2 mt-2">Learn</div>
            <Button
              asChild
              variant={pathname === "/remedies" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/remedies" onClick={() => setMobileMenuOpen(false)}>
                Natural Remedies
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/resources" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/resources" onClick={() => setMobileMenuOpen(false)}>
                Resources
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/learn" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/learn" onClick={() => setMobileMenuOpen(false)}>
                About PCOS
              </Link>
            </Button>

            <div className="text-xs font-semibold text-muted-foreground px-3 py-2 mt-2">Support</div>
            <Button
              asChild
              variant={pathname === "/community" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/community" onClick={() => setMobileMenuOpen(false)}>
                Community
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/share" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/share" onClick={() => setMobileMenuOpen(false)}>
                Share Your Thoughts
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/reports" ? "default" : "ghost"}
              size="default"
              className="justify-start font-medium pl-6"
            >
              <Link href="/reports" onClick={() => setMobileMenuOpen(false)}>
                Reports
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
