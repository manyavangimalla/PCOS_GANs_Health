"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Activity,
  Heart,
  AlertTriangle,
  ArrowRight,
  Brain,
  Microscope,
} from "lucide-react"
import { RiskChart } from "@/components/risk-chart"
import { SymptomBreakdown } from "@/components/symptom-breakdown"
import { analyzeAssessment, getMLPrediction } from "@/lib/api-client"

type AssessmentData = {
  age: string
  height: string
  weight: string
  cycleRegularity: string
  cycleDuration: string
  periodLength: string
  lastPeriod: string
  symptoms: string[]
  symptomSeverity: { [key: string]: number }
  diagnosedPCOS: string
  familyHistory: string
  fertilityIssues: string
  exerciseFrequency: string
  dietType: string
  stressLevel: number
  hasLabData: string
  ultrasoundImages?: any[]
}

type RiskLevel = "low" | "moderate" | "high"

type RiskAssessment = {
  overallRisk: RiskLevel
  riskScore: number
  factors: {
    menstrualIrregularity: number
    symptomCount: number
    bmi: number
    familyHistory: number
    lifestyle: number
  }
  recommendations: string[]
}

type MLPrediction = {
  diagnosis: string
  confidence: string
  likelihood: string
  fewShotAnalysis: any
  nlpAnalysis: any
  recommendation: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [data, setData] = useState<AssessmentData | null>(null)
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null)
  const [mlPrediction, setMlPrediction] = useState<MLPrediction | null>(null)
  const [isLoadingML, setIsLoadingML] = useState(false)

  useEffect(() => {
    const storedData = sessionStorage.getItem("assessmentData")
    if (!storedData) {
      router.push("/assessment")
      return
    }

    const parsedData: AssessmentData = JSON.parse(storedData)
    setData(parsedData)

    const performAnalysis = async () => {
      try {
        const analysisResult = await analyzeAssessment(parsedData)

        if (analysisResult.success) {
          const apiAssessment = analysisResult.analysis

          const riskAssessment: RiskAssessment = {
            overallRisk: apiAssessment.riskLevel === "very-high" ? "high" : apiAssessment.riskLevel,
            riskScore: apiAssessment.riskScore,
            factors: {
              menstrualIrregularity: 0,
              symptomCount: apiAssessment.symptomCount * 2,
              bmi: Number(apiAssessment.bmi) >= 30 ? 20 : Number(apiAssessment.bmi) >= 25 ? 10 : 0,
              familyHistory: parsedData.familyHistory === "yes" ? 15 : 0,
              lifestyle: 0,
            },
            recommendations: apiAssessment.recommendations,
          }

          setAssessment(riskAssessment)

          if (parsedData.hasLabData === "yes" || parsedData.ultrasoundImages?.length > 0) {
            setIsLoadingML(true)

            const bmi = Number(parsedData.weight) / Math.pow(Number(parsedData.height) / 100, 2)

            const mlData = {
              age: parsedData.age,
              bmi: bmi.toFixed(1),
              symptoms: parsedData.symptoms,
              hormonalData: apiAssessment.hormonalAnalysis,
              ultrasoundAnalysis: null,
              menstrualHistory: {
                cycleRegularity: parsedData.cycleRegularity,
                cycleDuration: parsedData.cycleDuration,
              },
              familyHistory: parsedData.familyHistory,
              lifestyle: {
                exerciseFrequency: parsedData.exerciseFrequency,
                dietType: parsedData.dietType,
                stressLevel: parsedData.stressLevel,
              },
            }

            const mlResult = await getMLPrediction(mlData)

            if (mlResult.success) {
              setMlPrediction(mlResult.prediction)
            }

            setIsLoadingML(false)
          }
        }
      } catch (error) {
        console.error("[v0] Error performing analysis:", error)
        const riskAssessment = calculateRisk(parsedData)
        setAssessment(riskAssessment)
      }
    }

    performAnalysis()
  }, [router])

  const calculateRisk = (data: AssessmentData): RiskAssessment => {
    let riskScore = 0
    const factors = {
      menstrualIrregularity: 0,
      symptomCount: 0,
      bmi: 0,
      familyHistory: 0,
      lifestyle: 0,
    }

    if (data.cycleRegularity === "absent") {
      factors.menstrualIrregularity = 30
    } else if (data.cycleRegularity === "irregular") {
      factors.menstrualIrregularity = 20
    } else if (data.cycleRegularity === "frequent") {
      factors.menstrualIrregularity = 15
    } else {
      factors.menstrualIrregularity = 0
    }

    const symptomCount = data.symptoms.length
    const avgSeverity =
      symptomCount > 0 ? data.symptoms.reduce((sum, s) => sum + (data.symptomSeverity[s] || 5), 0) / symptomCount : 0
    factors.symptomCount = Math.min(25, symptomCount * 2 + avgSeverity)

    const bmi = Number(data.weight) / Math.pow(Number(data.height) / 100, 2)
    if (bmi >= 30) {
      factors.bmi = 20
    } else if (bmi >= 25) {
      factors.bmi = 10
    } else if (bmi < 18.5) {
      factors.bmi = 5
    } else {
      factors.bmi = 0
    }

    if (data.familyHistory === "yes") {
      factors.familyHistory = 15
    } else if (data.familyHistory === "unsure") {
      factors.familyHistory = 5
    } else {
      factors.familyHistory = 0
    }

    let lifestyleScore = 0
    if (data.exerciseFrequency === "rarely") lifestyleScore += 3
    if (data.dietType === "processed") lifestyleScore += 3
    if (data.stressLevel >= 7) lifestyleScore += 4
    factors.lifestyle = lifestyleScore

    riskScore = Object.values(factors).reduce((sum, val) => sum + val, 0)

    let overallRisk: RiskLevel
    if (riskScore >= 60) {
      overallRisk = "high"
    } else if (riskScore >= 30) {
      overallRisk = "moderate"
    } else {
      overallRisk = "low"
    }

    const recommendations: string[] = []

    if (data.diagnosedPCOS === "no" && overallRisk !== "low") {
      recommendations.push("Schedule an appointment with a healthcare provider to discuss PCOS screening")
    }

    if (factors.menstrualIrregularity > 15) {
      recommendations.push("Track your menstrual cycles for 3 months and share the data with your doctor")
    }

    if (factors.bmi >= 10) {
      recommendations.push("Consider working with a nutritionist on a balanced eating plan")
      recommendations.push("Aim for 150 minutes of moderate exercise per week")
    }

    if (data.symptoms.length >= 4) {
      recommendations.push("Keep a symptom diary to identify patterns and triggers")
    }

    if (data.stressLevel >= 7) {
      recommendations.push("Explore stress management techniques like meditation, yoga, or therapy")
    }

    if (data.dietType === "processed") {
      recommendations.push("Focus on whole foods, lean proteins, and complex carbohydrates")
      recommendations.push("Limit refined sugars and processed foods to help manage insulin levels")
    }

    if (data.familyHistory === "yes") {
      recommendations.push("Inform your healthcare provider about your family history of PCOS")
    }

    recommendations.push("Join a PCOS support group to connect with others managing similar challenges")
    recommendations.push("Stay informed about PCOS through reputable medical sources")

    return {
      overallRisk,
      riskScore,
      factors,
      recommendations: recommendations.slice(0, 6),
    }
  }

  if (!data || !assessment) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    )
  }

  const bmi = (Number(data.weight) / Math.pow(Number(data.height) / 100, 2)).toFixed(1)

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "moderate":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
    }
  }

  const getRiskIcon = (risk: RiskLevel) => {
    switch (risk) {
      case "low":
        return <CheckCircle2 className="h-12 w-12 text-green-600" />
      case "moderate":
        return <AlertTriangle className="h-12 w-12 text-yellow-600" />
      case "high":
        return <AlertCircle className="h-12 w-12 text-red-600" />
    }
  }

  const getRiskMessage = (risk: RiskLevel) => {
    switch (risk) {
      case "low":
        return "Based on your responses, you have a low risk profile for PCOS. However, continue monitoring your health and maintain healthy lifestyle habits."
      case "moderate":
        return "Your responses indicate a moderate risk profile for PCOS. We recommend consulting with a healthcare provider for proper evaluation and guidance."
      case "high":
        return "Your responses suggest a higher risk profile for PCOS. It's important to schedule an appointment with a healthcare provider for comprehensive evaluation and testing."
    }
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Your PCOS Risk Assessment</h1>
          <p className="text-muted-foreground">
            Based on the information you provided, here's your personalized health analysis
          </p>
        </div>

        <Card className="mb-6 p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="flex-shrink-0">{getRiskIcon(assessment.overallRisk)}</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold">
                <span className={getRiskColor(assessment.overallRisk)}>
                  {assessment.overallRisk.charAt(0).toUpperCase() + assessment.overallRisk.slice(1)} Risk
                </span>
              </h2>
              <p className="mb-4 text-muted-foreground">{getRiskMessage(assessment.overallRisk)}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Risk Score:</span>
                  <span className={getRiskColor(assessment.overallRisk)}>{assessment.riskScore}/100</span>
                </div>
                <Progress value={assessment.riskScore} className="h-2" />
              </div>
            </div>
          </div>
        </Card>

        {isLoadingML && (
          <Card className="mb-6 p-6">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Running advanced ML analysis...</p>
            </div>
          </Card>
        )}

        {mlPrediction && (
          <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6">
            <div className="mb-4 flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
              <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Advanced ML Model
              </span>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <p className="mb-1 text-sm text-muted-foreground">ML Diagnosis</p>
                <p className="text-lg font-semibold">{mlPrediction.diagnosis}</p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <p className="mb-1 text-sm text-muted-foreground">Confidence Level</p>
                <p className="text-lg font-semibold">{mlPrediction.confidence}</p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <p className="mb-1 text-sm text-muted-foreground">PCOS Likelihood</p>
                <p className="text-lg font-semibold">{mlPrediction.likelihood}</p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <p className="mb-1 text-sm text-muted-foreground">Model Used</p>
                <p className="text-sm font-medium">{mlPrediction.fewShotAnalysis.modelUsed}</p>
              </div>
            </div>

            {mlPrediction.nlpAnalysis.keyFindings.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Microscope className="h-4 w-4" />
                  Key Clinical Findings (BioBERT NLP Analysis)
                </h4>
                <div className="space-y-2">
                  {mlPrediction.nlpAnalysis.keyFindings.map((finding: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{mlPrediction.recommendation}</AlertDescription>
            </Alert>
          </Card>
        )}

        {data.diagnosedPCOS === "no" && assessment.overallRisk !== "low" && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This assessment is not a diagnosis. Only a qualified healthcare provider can diagnose PCOS through
              physical examination, blood tests, and ultrasound imaging.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="h-5 w-5 text-primary" />
              Risk Factor Analysis
            </h3>
            <RiskChart factors={assessment.factors} />
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5 text-primary" />
              Your Health Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-sm font-medium">Age</span>
                <span className="text-sm">{data.age} years</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-sm font-medium">BMI</span>
                <span className="text-sm">{bmi}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-sm font-medium">Cycle Regularity</span>
                <span className="text-sm capitalize">{data.cycleRegularity}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-sm font-medium">Symptoms Reported</span>
                <span className="text-sm">{data.symptoms.length}</span>
              </div>
            </div>
          </Card>
        </div>

        {data.symptoms.length > 0 && (
          <Card className="mb-6 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Heart className="h-5 w-5 text-primary" />
              Your Symptoms
            </h3>
            <SymptomBreakdown symptoms={data.symptoms} severity={data.symptomSeverity} />
          </Card>
        )}

        <Card className="mb-6 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Calendar className="h-5 w-5 text-primary" />
            Personalized Recommendations
          </h3>
          <div className="space-y-3">
            {assessment.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border p-4">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mb-6 bg-secondary p-6">
          <h3 className="mb-4 text-lg font-semibold">What to Do Next</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-medium">Save Your Results</p>
                <p className="text-sm text-muted-foreground">
                  Take a screenshot or print this page to share with your healthcare provider
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-medium">Schedule an Appointment</p>
                <p className="text-sm text-muted-foreground">
                  Discuss these results with a gynecologist or endocrinologist
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-medium">Learn More</p>
                <p className="text-sm text-muted-foreground">
                  Explore our educational resources to better understand PCOS
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/learn">
              Learn More About PCOS
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
            <Link href="/assessment">Retake Assessment</Link>
          </Button>
        </div>

        <div className="mt-8 rounded-lg border bg-muted/50 p-4">
          <p className="text-center text-xs text-muted-foreground">
            <strong>Important:</strong> This assessment tool is for educational and informational purposes only. It does
            not provide medical diagnosis, advice, or treatment. Always consult with a qualified healthcare professional
            for proper medical evaluation, diagnosis, and treatment of PCOS or any health concerns.
          </p>
        </div>
      </div>
    </div>
  )
}
