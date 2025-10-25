import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // This endpoint would integrate with the Python ML models
    // For now, we'll return a mock prediction based on the research proposal's approach

    const { age, bmi, symptoms, hormonalData, ultrasoundAnalysis, menstrualHistory } = data

    // Simulate Few-Shot Learning (MAML) prediction
    const fewShotPrediction = {
      pcosLikelihood: calculatePCOSLikelihood(data),
      confidence: (Math.random() * 0.2 + 0.75).toFixed(2), // 75-95%
      modelUsed: "MAML (Model-Agnostic Meta-Learning)",
      features: {
        clinicalFeatures: extractClinicalFeatures(data),
        hormonalFeatures: hormonalData || null,
        imageFeatures: ultrasoundAnalysis || null,
      },
    }

    // Simulate NLP analysis of clinical data
    const nlpAnalysis = {
      keyFindings: extractKeyFindings(data),
      riskIndicators: identifyRiskIndicators(data),
      modelUsed: "BioBERT",
    }

    // Combined prediction
    const finalPrediction = {
      diagnosis: fewShotPrediction.pcosLikelihood > 0.6 ? "PCOS Likely" : "PCOS Unlikely",
      confidence: fewShotPrediction.confidence,
      likelihood: (fewShotPrediction.pcosLikelihood * 100).toFixed(1) + "%",
      fewShotAnalysis: fewShotPrediction,
      nlpAnalysis,
      recommendation: generateMLRecommendation(fewShotPrediction.pcosLikelihood),
    }

    return NextResponse.json({
      success: true,
      prediction: finalPrediction,
    })
  } catch (error) {
    console.error("[v0] Error in ML prediction:", error)
    return NextResponse.json({ success: false, error: "Failed to generate ML prediction" }, { status: 500 })
  }
}

function calculatePCOSLikelihood(data: any): number {
  let likelihood = 0.0

  // Menstrual irregularity (strong indicator)
  if (data.menstrualHistory?.cycleRegularity === "irregular") {
    likelihood += 0.25
  } else if (data.menstrualHistory?.cycleRegularity === "absent") {
    likelihood += 0.35
  }

  // BMI factor
  if (data.bmi >= 30) {
    likelihood += 0.15
  } else if (data.bmi >= 25) {
    likelihood += 0.1
  }

  // Symptom count
  const symptomCount = data.symptoms?.length || 0
  if (symptomCount >= 5) {
    likelihood += 0.2
  } else if (symptomCount >= 3) {
    likelihood += 0.15
  }

  // Hormonal indicators
  if (data.hormonalData) {
    const { lhFshRatio, testosteroneStatus, amhStatus } = data.hormonalData
    if (lhFshRatio && Number.parseFloat(lhFshRatio) >= 2) {
      likelihood += 0.2
    }
    if (testosteroneStatus === "High") {
      likelihood += 0.15
    }
    if (amhStatus === "High") {
      likelihood += 0.1
    }
  }

  // Ultrasound findings
  if (data.ultrasoundAnalysis?.polycysticOvariesDetected) {
    likelihood += 0.25
  }

  return Math.min(likelihood, 1.0)
}

function extractClinicalFeatures(data: any): string[] {
  const features: string[] = []

  if (data.age) features.push(`Age: ${data.age}`)
  if (data.bmi) features.push(`BMI: ${data.bmi}`)
  if (data.menstrualHistory?.cycleRegularity) {
    features.push(`Cycle regularity: ${data.menstrualHistory.cycleRegularity}`)
  }
  if (data.symptoms?.length > 0) {
    features.push(`Symptoms: ${data.symptoms.length} reported`)
  }

  return features
}

function extractKeyFindings(data: any): string[] {
  const findings: string[] = []

  if (data.menstrualHistory?.cycleRegularity !== "regular") {
    findings.push("Menstrual irregularity detected")
  }

  if (data.symptoms?.includes("excess-hair")) {
    findings.push("Hyperandrogenism symptoms present")
  }

  if (data.bmi >= 25) {
    findings.push("Elevated BMI")
  }

  if (data.hormonalData?.lhFshRatio && Number.parseFloat(data.hormonalData.lhFshRatio) >= 2) {
    findings.push("Elevated LH/FSH ratio")
  }

  return findings
}

function identifyRiskIndicators(data: any): string[] {
  const indicators: string[] = []

  if (data.familyHistory === "yes") {
    indicators.push("Positive family history")
  }

  if (data.lifestyle?.stressLevel >= 7) {
    indicators.push("High stress levels")
  }

  if (data.lifestyle?.exerciseFrequency === "rarely") {
    indicators.push("Sedentary lifestyle")
  }

  return indicators
}

function generateMLRecommendation(likelihood: number): string {
  if (likelihood >= 0.7) {
    return "High likelihood of PCOS detected. Strongly recommend comprehensive medical evaluation including ultrasound and hormone testing."
  } else if (likelihood >= 0.5) {
    return "Moderate likelihood of PCOS. Recommend medical consultation and further diagnostic testing."
  } else if (likelihood >= 0.3) {
    return "Some PCOS indicators present. Consider monitoring symptoms and lifestyle modifications. Consult healthcare provider if symptoms worsen."
  } else {
    return "Low likelihood of PCOS based on current data. Continue healthy lifestyle practices and monitor any changes in symptoms."
  }
}
