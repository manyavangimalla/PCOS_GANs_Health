import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Extract assessment data
    const {
      age,
      height,
      weight,
      cycleRegularity,
      cycleDuration,
      symptoms,
      symptomSeverity,
      diagnosedPCOS,
      familyHistory,
      hasLabData,
      lhLevel,
      fshLevel,
      testosteroneLevel,
      amhLevel,
      insulinLevel,
      glucoseLevel,
      exerciseFrequency,
      dietType,
      stressLevel,
    } = data

    // Calculate BMI
    const bmi = Number(weight) / Math.pow(Number(height) / 100, 2)

    // Calculate risk score based on multiple factors
    let riskScore = 0
    const riskFactors: string[] = []

    // Menstrual irregularity (high weight)
    if (cycleRegularity === "irregular") {
      riskScore += 25
      riskFactors.push("Irregular menstrual cycles")
    } else if (cycleRegularity === "absent") {
      riskScore += 35
      riskFactors.push("Absent menstrual periods")
    } else if (cycleRegularity === "frequent") {
      riskScore += 20
      riskFactors.push("Frequent menstrual cycles")
    }

    // BMI factor
    if (bmi >= 30) {
      riskScore += 20
      riskFactors.push("BMI indicates obesity")
    } else if (bmi >= 25) {
      riskScore += 10
      riskFactors.push("BMI indicates overweight")
    }

    // Symptom count and severity
    const symptomCount = symptoms.length
    if (symptomCount >= 5) {
      riskScore += 20
      riskFactors.push(`Multiple PCOS symptoms (${symptomCount})`)
    } else if (symptomCount >= 3) {
      riskScore += 15
      riskFactors.push(`Several PCOS symptoms (${symptomCount})`)
    }

    // Average symptom severity
    const severities = Object.values(symptomSeverity) as number[]
    const avgSeverity = severities.length > 0 ? severities.reduce((a, b) => a + b, 0) / severities.length : 0
    if (avgSeverity >= 7) {
      riskScore += 10
      riskFactors.push("High symptom severity")
    }

    // Family history
    if (familyHistory === "yes") {
      riskScore += 15
      riskFactors.push("Family history of PCOS")
    }

    // Hormonal analysis (if lab data provided)
    let hormonalAnalysis = null
    if (hasLabData === "yes") {
      const lh = Number(lhLevel)
      const fsh = Number(fshLevel)
      const testosterone = Number(testosteroneLevel)
      const amh = Number(amhLevel)
      const insulin = Number(insulinLevel)
      const glucose = Number(glucoseLevel)

      const hormonalRiskFactors: string[] = []

      // LH/FSH ratio (PCOS indicator)
      if (lh && fsh) {
        const ratio = lh / fsh
        if (ratio >= 2) {
          riskScore += 25
          hormonalRiskFactors.push(`Elevated LH/FSH ratio (${ratio.toFixed(2)})`)
        } else if (ratio >= 1.5) {
          riskScore += 15
          hormonalRiskFactors.push(`Moderately elevated LH/FSH ratio (${ratio.toFixed(2)})`)
        }
      }

      // Elevated testosterone
      if (testosterone && testosterone > 70) {
        riskScore += 20
        hormonalRiskFactors.push("Elevated testosterone levels")
      } else if (testosterone && testosterone > 50) {
        riskScore += 10
        hormonalRiskFactors.push("Moderately elevated testosterone")
      }

      // Elevated AMH
      if (amh && amh > 4) {
        riskScore += 15
        hormonalRiskFactors.push("Elevated AMH levels")
      }

      // Insulin resistance indicators
      if (insulin && insulin > 20) {
        riskScore += 15
        hormonalRiskFactors.push("Elevated insulin levels")
      }

      if (glucose && glucose > 100) {
        riskScore += 10
        hormonalRiskFactors.push("Elevated fasting glucose")
      }

      hormonalAnalysis = {
        lhFshRatio: lh && fsh ? (lh / fsh).toFixed(2) : null,
        testosteroneStatus:
          testosterone > 70 ? "High" : testosterone > 50 ? "Moderately High" : testosterone ? "Normal" : null,
        amhStatus: amh > 4 ? "High" : amh > 1 ? "Normal" : amh ? "Low" : null,
        insulinStatus: insulin > 20 ? "High" : insulin ? "Normal" : null,
        glucoseStatus: glucose > 100 ? "High" : glucose >= 70 ? "Normal" : glucose ? "Low" : null,
        riskFactors: hormonalRiskFactors,
      }

      riskFactors.push(...hormonalRiskFactors)
    }

    // Lifestyle factors
    if (exerciseFrequency === "rarely") {
      riskScore += 5
      riskFactors.push("Sedentary lifestyle")
    }

    if (dietType === "processed") {
      riskScore += 5
      riskFactors.push("Poor dietary habits")
    }

    if (stressLevel >= 8) {
      riskScore += 5
      riskFactors.push("High stress levels")
    }

    // Cap risk score at 100
    riskScore = Math.min(riskScore, 100)

    // Determine risk level
    let riskLevel: "low" | "moderate" | "high" | "very-high"
    if (riskScore < 30) {
      riskLevel = "low"
    } else if (riskScore < 50) {
      riskLevel = "moderate"
    } else if (riskScore < 70) {
      riskLevel = "high"
    } else {
      riskLevel = "very-high"
    }

    // Generate recommendations based on risk factors
    const recommendations = generateRecommendations(riskFactors, riskLevel, data)

    return NextResponse.json({
      success: true,
      analysis: {
        riskScore,
        riskLevel,
        riskFactors,
        hormonalAnalysis,
        bmi: bmi.toFixed(1),
        symptomCount,
        avgSeverity: avgSeverity.toFixed(1),
        recommendations,
      },
    })
  } catch (error) {
    console.error("[v0] Error in analyze API:", error)
    return NextResponse.json({ success: false, error: "Failed to analyze data" }, { status: 500 })
  }
}

function generateRecommendations(riskFactors: string[], riskLevel: string, data: any): string[] {
  const recommendations: string[] = []

  // Always recommend consulting a healthcare provider for high risk
  if (riskLevel === "high" || riskLevel === "very-high") {
    recommendations.push("Schedule an appointment with a gynecologist or endocrinologist for comprehensive evaluation")
    recommendations.push(
      "Request blood tests including hormone panels (LH, FSH, testosterone, AMH) if not done recently",
    )
  }

  // Menstrual irregularity
  if (data.cycleRegularity !== "regular") {
    recommendations.push("Track your menstrual cycles using a period tracking app")
    recommendations.push("Consider hormonal birth control to regulate cycles (consult your doctor)")
  }

  // Weight management
  const bmi = Number(data.weight) / Math.pow(Number(data.height) / 100, 2)
  if (bmi >= 25) {
    recommendations.push("Focus on gradual weight loss (5-10% of body weight can significantly improve symptoms)")
    recommendations.push("Consider working with a registered dietitian specializing in PCOS")
  }

  // Exercise
  if (data.exerciseFrequency === "rarely" || data.exerciseFrequency === "1-2-times") {
    recommendations.push("Aim for at least 150 minutes of moderate exercise per week")
    recommendations.push("Include both cardio and strength training exercises")
  }

  // Diet
  if (data.dietType === "processed" || data.dietType === "moderate") {
    recommendations.push("Adopt a low-glycemic index diet with whole grains, lean proteins, and vegetables")
    recommendations.push("Reduce refined carbohydrates and added sugars")
  }

  // Stress management
  if (data.stressLevel >= 7) {
    recommendations.push("Practice stress-reduction techniques like meditation, yoga, or deep breathing")
    recommendations.push("Ensure adequate sleep (7-9 hours per night)")
  }

  // Hormonal issues
  if (data.hasLabData === "yes") {
    const testosterone = Number(data.testosteroneLevel)
    const insulin = Number(data.insulinLevel)

    if (testosterone > 70) {
      recommendations.push("Discuss anti-androgen medications with your doctor to manage elevated testosterone")
    }

    if (insulin > 20) {
      recommendations.push("Consider metformin or other insulin-sensitizing medications (consult your doctor)")
      recommendations.push("Monitor for signs of insulin resistance and type 2 diabetes")
    }
  }

  // Symptoms management
  if (data.symptoms.includes("excess-hair")) {
    recommendations.push("Explore hair removal options and discuss anti-androgen treatments with your doctor")
  }

  if (data.symptoms.includes("acne")) {
    recommendations.push("Consult a dermatologist for acne management strategies")
  }

  // General PCOS management
  recommendations.push("Join PCOS support groups or online communities for peer support")
  recommendations.push("Educate yourself about PCOS through reliable medical sources")

  return recommendations
}
