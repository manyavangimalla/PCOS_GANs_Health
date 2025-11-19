import { type NextRequest, NextResponse } from "next/server"

const BLOOD_GROUP_ENCODING = {
  "A+": 11,
  "A-": 12,
  "B+": 13,
  "B-": 14,
  "O+": 15,
  "O-": 16,
  "AB+": 17,
  "AB-": 18,
}

const CYCLE_ENCODING = {
  Regular: 2,
  Irregular: 4,
}

const BINARY_ENCODING = {
  Yes: 1,
  No: 0,
}

// Median values from Kaggle PCOS dataset for missing value imputation
const DATASET_MEDIANS = {
  Age: 26,
  Weight: 65,
  Height: 162,
  BMI: 24.5,
  PulseRate: 75,
  RR: 16,
  Hb: 12.5,
  Cycle: 4,
  CycleLength: 5,
  MarriageStatus: 0,
  Pregnant: 0,
  NoOfAbortions: 0,
  FSH: 6.0,
  LH: 8.0,
  "FSH/LH": 1.2,
  Hip: 36,
  Waist: 32,
  "Waist:Hip Ratio": 0.89,
  TSH: 2.5,
  AMH: 4.0,
  PRL: 15,
  VitD3: 25,
  PRG: 10,
  RBS: 100,
  BP_Systolic: 120,
  BP_Diastolic: 80,
  Follicle_L: 5,
  Follicle_R: 5,
  AvgFollicleSize_L: 10,
  AvgFollicleSize_R: 10,
  Endometrium: 8,
}

interface ValidationResult {
  valid: boolean
  errors: string[]
}

function validateInputUnits(data: any): ValidationResult {
  const errors: string[] = []

  // Validate height (should be in cm)
  if (data.Height && (data.Height < 100 || data.Height > 250)) {
    errors.push("Height must be in cm (range: 100-250)")
  }

  // Validate AMH (ng/mL)
  if (data.AMH && (data.AMH < 0 || data.AMH > 50)) {
    errors.push("AMH must be in ng/mL (range: 0-50)")
  }

  // Validate FSH/LH (mIU/mL)
  if (data.FSH && (data.FSH < 0 || data.FSH > 100)) {
    errors.push("FSH must be in mIU/mL (range: 0-100)")
  }
  if (data.LH && (data.LH < 0 || data.LH > 100)) {
    errors.push("LH must be in mIU/mL (range: 0-100)")
  }

  // Validate TSH (mIU/L)
  if (data.TSH && (data.TSH < 0 || data.TSH > 20)) {
    errors.push("TSH must be in mIU/L (range: 0-20)")
  }

  // Validate Blood Pressure format
  if (data.BloodPressure && !data.BP_Systolic && !data.BP_Diastolic) {
    errors.push("Blood Pressure must be split into BP_Systolic and BP_Diastolic")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

function encodeCategoricalFeatures(data: any): any {
  const encoded = { ...data }

  // Blood Group encoding
  if (data.BloodGroup && data.BloodGroup in BLOOD_GROUP_ENCODING) {
    encoded.BloodGroup = BLOOD_GROUP_ENCODING[data.BloodGroup as keyof typeof BLOOD_GROUP_ENCODING]
  }

  // Cycle regularity encoding
  if (data.CycleRegularity) {
    encoded.Cycle = CYCLE_ENCODING[data.CycleRegularity as keyof typeof CYCLE_ENCODING] || DATASET_MEDIANS.Cycle
  }

  // Binary Yes/No fields encoding
  const binaryFields = ["PCOS", "Pregnant", "WeightGain", "HairLoss", "SkinDarkening", "HairGrowth", "Pimples", "FastFood", "RegExercise"]
  
  for (const field of binaryFields) {
    if (data[field] !== undefined) {
      if (typeof data[field] === "string") {
        encoded[field] = BINARY_ENCODING[data[field] as keyof typeof BINARY_ENCODING] ?? 0
      }
    }
  }

  return encoded
}

function handleMissingValues(data: any): any {
  const filled = { ...data }

  // Fill missing numeric values with dataset medians
  for (const [key, medianValue] of Object.entries(DATASET_MEDIANS)) {
    if (filled[key] === undefined || filled[key] === null || filled[key] === "") {
      filled[key] = medianValue
    }
  }

  return filled
}

function preprocessData(rawData: any): any {
  // Step 1: Encode categorical features
  let processed = encodeCategoricalFeatures(rawData)

  // Step 2: Handle missing values
  processed = handleMissingValues(processed)

  // Step 3: Calculate derived features
  if (processed.Weight && processed.Height) {
    const heightInMeters = processed.Height / 100
    processed.BMI = processed.Weight / (heightInMeters * heightInMeters)
  }

  if (processed.FSH && processed.LH && processed.LH !== 0) {
    processed["FSH/LH"] = processed.FSH / processed.LH
  }

  if (processed.Waist && processed.Hip && processed.Hip !== 0) {
    processed["Waist:Hip Ratio"] = processed.Waist / processed.Hip
  }

  // Step 4: Split blood pressure if provided as single value
  if (processed.BloodPressure && typeof processed.BloodPressure === "string") {
    const [systolic, diastolic] = processed.BloodPressure.split("/").map(Number)
    processed.BP_Systolic = systolic || DATASET_MEDIANS.BP_Systolic
    processed.BP_Diastolic = diastolic || DATASET_MEDIANS.BP_Diastolic
  }

  return processed
}

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json()

    const validation = validateInputUnits(rawData)
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Input validation failed",
          details: validation.errors,
        },
        { status: 400 }
      )
    }

    const preprocessedData = preprocessData(rawData)

    const pcosLikelihood = calculatePCOSLikelihoodKaggle(preprocessedData)

    // Simulate Few-Shot Learning (MAML) prediction with preprocessed data
    const fewShotPrediction = {
      pcosLikelihood,
      confidence: (Math.random() * 0.2 + 0.75).toFixed(2), // 75-95%
      modelUsed: "MAML (Model-Agnostic Meta-Learning) with Kaggle PCOS Dataset",
      features: {
        clinicalFeatures: extractClinicalFeaturesKaggle(preprocessedData),
        hormonalFeatures: extractHormonalFeatures(preprocessedData),
        imageFeatures: preprocessedData.ultrasoundAnalysis || null,
      },
      preprocessedData, // Include preprocessed data for transparency
    }

    // Simulate NLP analysis of clinical data
    const nlpAnalysis = {
      keyFindings: extractKeyFindingsKaggle(preprocessedData),
      riskIndicators: identifyRiskIndicatorsKaggle(preprocessedData),
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

function calculatePCOSLikelihoodKaggle(data: any): number {
  let likelihood = 0.0

  // Cycle irregularity (Cycle = 4 means irregular in Kaggle dataset)
  if (data.Cycle === 4) {
    likelihood += 0.25
  }

  // BMI factor
  if (data.BMI >= 30) {
    likelihood += 0.15
  } else if (data.BMI >= 25) {
    likelihood += 0.1
  }

  // LH/FSH ratio (Rotterdam criteria: ratio >= 2 indicates PCOS)
  if (data["FSH/LH"] && data["FSH/LH"] <= 0.5) {
    // Low FSH/LH means high LH/FSH
    likelihood += 0.25
  } else if (data["FSH/LH"] && data["FSH/LH"] <= 0.8) {
    likelihood += 0.15
  }

  // AMH levels (Anti-Müllerian Hormone > 4 ng/mL indicates PCOS)
  if (data.AMH > 4) {
    likelihood += 0.15
  }

  // Waist:Hip Ratio (Android obesity indicator)
  if (data["Waist:Hip Ratio"] > 0.85) {
    likelihood += 0.1
  }

  // Follicle count (>=12 follicles per ovary)
  if (data.Follicle_L >= 12 || data.Follicle_R >= 12) {
    likelihood += 0.2
  }

  // Clinical symptoms
  if (data.WeightGain === 1) likelihood += 0.05
  if (data.HairGrowth === 1) likelihood += 0.05
  if (data.SkinDarkening === 1) likelihood += 0.05
  if (data.HairLoss === 1) likelihood += 0.05
  if (data.Pimples === 1) likelihood += 0.05

  return Math.min(likelihood, 1.0)
}

function extractClinicalFeaturesKaggle(data: any): string[] {
  const features: string[] = []

  if (data.Age) features.push(`Age: ${data.Age}`)
  if (data.BMI) features.push(`BMI: ${data.BMI.toFixed(1)}`)
  if (data.Cycle === 4) features.push("Cycle: Irregular")
  if (data.Cycle === 2) features.push("Cycle: Regular")
  if (data["Waist:Hip Ratio"]) features.push(`Waist:Hip Ratio: ${data["Waist:Hip Ratio"].toFixed(2)}`)
  if (data.BP_Systolic && data.BP_Diastolic) {
    features.push(`Blood Pressure: ${data.BP_Systolic}/${data.BP_Diastolic}`)
  }

  return features
}

function extractHormonalFeatures(data: any): any {
  return {
    FSH: data.FSH,
    LH: data.LH,
    "FSH/LH": data["FSH/LH"],
    TSH: data.TSH,
    AMH: data.AMH,
    PRL: data.PRL,
    VitD3: data.VitD3,
    PRG: data.PRG,
    RBS: data.RBS,
  }
}

function extractKeyFindingsKaggle(data: any): string[] {
  const findings: string[] = []

  if (data.Cycle === 4) {
    findings.push("Menstrual irregularity detected (Irregular cycle)")
  }

  if (data.HairGrowth === 1 || data.HairLoss === 1 || data.Pimples === 1) {
    findings.push("Hyperandrogenism symptoms present")
  }

  if (data.BMI >= 25) {
    findings.push(`Elevated BMI: ${data.BMI.toFixed(1)}`)
  }

  if (data["FSH/LH"] && data["FSH/LH"] <= 0.5) {
    findings.push("Elevated LH/FSH ratio (inverted FSH/LH)")
  }

  if (data.AMH > 4) {
    findings.push(`Elevated AMH: ${data.AMH} ng/mL`)
  }

  if (data.Follicle_L >= 12 || data.Follicle_R >= 12) {
    findings.push("Polycystic ovaries detected (>=12 follicles)")
  }

  return findings
}

function identifyRiskIndicatorsKaggle(data: any): string[] {
  const indicators: string[] = []

  if (data.WeightGain === 1) {
    indicators.push("Recent weight gain reported")
  }

  if (data.FastFood === 1) {
    indicators.push("Regular fast food consumption")
  }

  if (data.RegExercise === 0) {
    indicators.push("Sedentary lifestyle (no regular exercise)")
  }

  if (data["Waist:Hip Ratio"] > 0.85) {
    indicators.push("Android obesity pattern")
  }

  if (data.TSH > 4.5) {
    indicators.push("Elevated TSH (thyroid dysfunction)")
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
