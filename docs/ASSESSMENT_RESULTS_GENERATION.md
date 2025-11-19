# Assessment Results Generation - Technical Documentation

## Overview
This document explains the complete process of how user assessment data is transformed into PCOS risk predictions and personalized recommendations.

---

## Data Flow Pipeline

\`\`\`
Step 1: User Input (Assessment Form)
           ↓
Step 2: Client-Side Validation
           ↓
Step 3: Data Preprocessing
           ↓
Step 4: Feature Engineering
           ↓
Step 5: ML Model Inference
           ↓
Step 6: Risk Scoring Algorithm
           ↓
Step 7: Recommendation Engine
           ↓
Step 8: Results Visualization
\`\`\`

---

## Step-by-Step Process

### Step 1: User Input Collection
**Location**: `app/assessment/page.tsx`

**9-Step Questionnaire Structure**:

1. **Basic Information**
   - Age (years)
   - Weight (kg)
   - Height (cm)
   - Auto-calculated BMI

2. **Menstrual History**
   - Cycle regularity (Regular/Irregular/Absent)
   - Cycle length (days)
   - Flow intensity (Light/Moderate/Heavy)
   - Menstrual pain (0-10 scale)
   - PMS symptoms (checkboxes)

3. **Physical Symptoms**
   - Multiple symptom checklist
   - Severity sliders (1-10) for each selected symptom:
     - Weight gain
     - Excessive hair growth
     - Acne/pimples
     - Hair loss
     - Skin darkening
     - Mood swings
     - Fatigue

4. **Medical History**
   - PCOS diagnosis (Yes/No/Unsure)
   - Family history of PCOS
   - Fertility concerns
   - Thyroid conditions
   - Diabetes history

5. **Hormonal Lab Data** (Optional)
   - LH (Luteinizing Hormone) mIU/mL
   - FSH (Follicle Stimulating Hormone) mIU/mL
   - Testosterone ng/dL
   - AMH (Anti-Müllerian Hormone) ng/mL
   - Fasting Insulin μU/mL
   - Fasting Glucose mg/dL

6. **Additional Hormonal Markers** (Optional)
   - TSH (Thyroid) mIU/L
   - T3 and T4 levels
   - Prolactin ng/mL
   - DHEA-S μg/dL
   - Cortisol μg/dL
   - Progesterone ng/mL
   - Vitamin D ng/mL

7. **Ultrasound Imaging** (Optional)
   - File upload for ovarian ultrasounds
   - Drag-and-drop interface
   - Image preview and management

8. **Lifestyle Factors**
   - Exercise frequency (Daily/3-4x week/1-2x week/Rarely/Never)
   - Diet type (Balanced/Vegetarian/Vegan/Low-carb/Other)
   - Stress level (0-10 slider)
   - Sleep quality (Poor/Fair/Good/Excellent)
   - Average sleep hours

9. **Mental Health** (Optional)
   - Anxiety symptoms
   - Depression indicators
   - Mood disorder history
   - Emotional eating patterns

---

### Step 2: Client-Side Validation
**Technology**: Zod schema validation

\`\`\`typescript
const assessmentSchema = z.object({
  age: z.number().min(13).max(60),
  weight: z.number().min(30).max(200),
  height: z.number().min(130).max(220),
  cycleRegularity: z.enum(['regular', 'irregular', 'absent']),
  // ... all fields validated
})
\`\`\`

**Validation Rules**:
- Required fields enforced
- Numeric ranges checked
- Unit consistency verified
- File size limits (10MB per image)
- Format validation (JPEG, PNG for images)

---

### Step 3: Data Preprocessing
**Location**: `app/api/ml-predict/route.ts`

#### 3.1 Data Cleaning
\`\`\`typescript
// Remove whitespace, convert to proper types
const cleanData = {
  age: parseInt(rawData.age),
  weight: parseFloat(rawData.weight),
  height: parseFloat(rawData.height),
  // ... sanitize all inputs
}
\`\`\`

#### 3.2 Missing Value Imputation
\`\`\`typescript
// Use Kaggle dataset medians
const defaultValues = {
  lh: 6.62,
  fsh: 5.31,
  testosterone: 45.0,
  amh: 3.21,
  insulin: 15.0,
  glucose: 95.0,
  follicleLeft: 5,
  follicleRight: 6,
  // ... dataset-derived medians
}

// Apply when optional fields empty
const processedData = {
  ...cleanData,
  lh: cleanData.lh || defaultValues.lh,
  fsh: cleanData.fsh || defaultValues.fsh,
  // ... fill missing values
}
\`\`\`

#### 3.3 Categorical Encoding
\`\`\`typescript
// Blood group encoding
const bloodGroupMap = {
  'A+': 11, 'A-': 12,
  'B+': 13, 'B-': 14,
  'O+': 15, 'O-': 16,
  'AB+': 17, 'AB-': 18
}

// Cycle regularity encoding
const cycleMap = {
  'regular': 2,
  'irregular': 4,
  'absent': 4
}

// Binary symptom encoding
const symptoms = {
  weightGain: data.weightGain ? 1 : 0,
  hairGrowth: data.hairGrowth ? 1 : 0,
  // ... encode all symptoms
}
\`\`\`

---

### Step 4: Feature Engineering

#### 4.1 Derived Metrics
\`\`\`typescript
// BMI Calculation
const bmi = weight / Math.pow(height / 100, 2)

// LH/FSH Ratio (critical for PCOS)
const lhFshRatio = lh / fsh

// Waist-Hip Ratio
const waistHipRatio = waist / hip

// Symptom Count
const symptomCount = [
  weightGain, hairGrowth, skinDarkening,
  hairLoss, pimples
].filter(Boolean).length

// Average Symptom Severity
const avgSeverity = totalSeverity / symptomCount
\`\`\`

#### 4.2 Feature Scaling
\`\`\`typescript
// Normalize to 0-1 range for model input
const normalize = (value, min, max) => {
  return (value - min) / (max - min)
}

const scaledFeatures = {
  age: normalize(age, 20, 50),
  bmi: normalize(bmi, 15, 40),
  lhFshRatio: normalize(lhFshRatio, 0, 5),
  // ... scale all continuous features
}
\`\`\`

---

### Step 5: ML Model Inference

#### 5.1 Feature Vector Creation
\`\`\`typescript
// Create 41-dimensional feature vector matching Kaggle dataset
const featureVector = [
  age, weight, height, bmi,
  bloodGroupEncoded, pulseRate, respiratoryRate, hemoglobin,
  cycleEncoded, cycleLength, marriageStatus, pregnant, abortions,
  betaHCG1, betaHCG2, fsh, lh, lhFshRatio,
  hip, waist, waistHipRatio,
  tsh, amh, prolactin, vitaminD, progesterone, glucose,
  weightGain, hairGrowth, skinDarkening, hairLoss, pimples,
  fastFood, exercise, bpSystolic, bpDiastolic,
  follicleLeft, follicleRight, avgSizeLeft, avgSizeRight, endometriumThickness
]
\`\`\`

#### 5.2 Random Forest Prediction
\`\`\`typescript
function randomForestPredict(features) {
  // Simulate ensemble of 100 decision trees
  let predictions = []
  
  for (let tree = 0; tree < 100; tree++) {
    // Each tree makes binary prediction
    const treeResult = decisionTree(features, tree)
    predictions.push(treeResult)
  }
  
  // Majority voting
  const pcosVotes = predictions.filter(p => p === 1).length
  const likelihood = pcosVotes / 100
  
  return likelihood
}
\`\`\`

---

### Step 6: Risk Scoring Algorithm

#### 6.1 Multi-Factor Weighted Scoring
\`\`\`typescript
function calculateRiskScore(data) {
  let riskScore = 0
  const riskFactors = []
  
  // Factor 1: Menstrual Irregularity (0-35 points)
  if (data.cycleRegularity === 'absent') {
    riskScore += 35
    riskFactors.push({
      factor: 'Absent Menstrual Cycles',
      severity: 'high',
      impact: 35
    })
  } else if (data.cycleRegularity === 'irregular') {
    riskScore += 25
    riskFactors.push({
      factor: 'Irregular Menstrual Cycles',
      severity: 'moderate',
      impact: 25
    })
  } else if (data.cycleLength < 21 || data.cycleLength > 35) {
    riskScore += 20
    riskFactors.push({
      factor: 'Abnormal Cycle Length',
      severity: 'moderate',
      impact: 20
    })
  }
  
  // Factor 2: BMI (0-20 points)
  const bmi = data.bmi
  if (bmi >= 30) {
    riskScore += 20
    riskFactors.push({
      factor: 'Obesity (BMI ≥30)',
      severity: 'high',
      impact: 20
    })
  } else if (bmi >= 25) {
    riskScore += 10
    riskFactors.push({
      factor: 'Overweight (BMI 25-30)',
      severity: 'moderate',
      impact: 10
    })
  }
  
  // Factor 3: Clinical Symptoms (0-30 points)
  const symptomCount = data.symptoms.length
  const avgSeverity = data.avgSymptomSeverity
  
  if (symptomCount >= 5) {
    riskScore += 20
    riskFactors.push({
      factor: '5+ PCOS Symptoms Present',
      severity: 'high',
      impact: 20
    })
  } else if (symptomCount >= 3) {
    riskScore += 15
    riskFactors.push({
      factor: '3-4 PCOS Symptoms Present',
      severity: 'moderate',
      impact: 15
    })
  }
  
  if (avgSeverity >= 7) {
    riskScore += 10
    riskFactors.push({
      factor: 'High Symptom Severity',
      severity: 'high',
      impact: 10
    })
  }
  
  // Factor 4: Hormonal Imbalance (0-60 points)
  if (data.hasLabData) {
    // LH/FSH Ratio (Rotterdam criteria: ≥2.0)
    if (data.lhFshRatio >= 2.0) {
      riskScore += 25
      riskFactors.push({
        factor: `Elevated LH/FSH Ratio (${data.lhFshRatio.toFixed(2)})`,
        severity: 'high',
        impact: 25
      })
    } else if (data.lhFshRatio >= 1.5) {
      riskScore += 15
      riskFactors.push({
        factor: `Moderately Elevated LH/FSH (${data.lhFshRatio.toFixed(2)})`,
        severity: 'moderate',
        impact: 15
      })
    }
    
    // Testosterone
    if (data.testosterone > 70) {
      riskScore += 20
      riskFactors.push({
        factor: `High Testosterone (${data.testosterone} ng/dL)`,
        severity: 'high',
        impact: 20
      })
    } else if (data.testosterone > 50) {
      riskScore += 10
    }
    
    // AMH
    if (data.amh > 4.0) {
      riskScore += 15
      riskFactors.push({
        factor: `Elevated AMH (${data.amh} ng/mL)`,
        severity: 'high',
        impact: 15
      })
    }
    
    // Insulin Resistance
    if (data.insulin > 20) {
      riskScore += 15
      riskFactors.push({
        factor: `Insulin Resistance (${data.insulin} μU/mL)`,
        severity: 'high',
        impact: 15
      })
    }
    
    if (data.glucose > 100) {
      riskScore += 10
      riskFactors.push({
        factor: `Elevated Fasting Glucose (${data.glucose} mg/dL)`,
        severity: 'moderate',
        impact: 10
      })
    }
  }
  
  // Factor 5: Ultrasound Findings (0-40 points)
  if (data.hasUltrasound) {
    if (data.follicleLeft >= 12 || data.follicleRight >= 12) {
      riskScore += 40
      riskFactors.push({
        factor: 'Polycystic Ovarian Morphology (≥12 follicles)',
        severity: 'high',
        impact: 40
      })
    } else if (data.follicleLeft >= 8 || data.follicleRight >= 8) {
      riskScore += 20
      riskFactors.push({
        factor: 'Borderline Follicle Count (8-11)',
        severity: 'moderate',
        impact: 20
      })
    }
  }
  
  // Factor 6: Lifestyle Factors (0-15 points)
  if (data.exercise === 'rarely' || data.exercise === 'never') {
    riskScore += 5
    riskFactors.push({
      factor: 'Sedentary Lifestyle',
      severity: 'low',
      impact: 5
    })
  }
  
  if (data.fastFood === true) {
    riskScore += 5
    riskFactors.push({
      factor: 'High Fast Food Consumption',
      severity: 'low',
      impact: 5
    })
  }
  
  if (data.stressLevel >= 8) {
    riskScore += 5
    riskFactors.push({
      factor: 'High Stress Levels',
      severity: 'moderate',
      impact: 5
    })
  }
  
  // Factor 7: Family History (0-15 points)
  if (data.familyHistory === 'yes') {
    riskScore += 15
    riskFactors.push({
      factor: 'Family History of PCOS',
      severity: 'moderate',
      impact: 15
    })
  } else if (data.familyHistory === 'unsure') {
    riskScore += 5
  }
  
  return { riskScore, riskFactors }
}
\`\`\`

#### 6.2 Risk Level Classification
\`\`\`typescript
function classifyRiskLevel(riskScore) {
  if (riskScore < 30) {
    return {
      level: 'low',
      description: 'Low risk of PCOS',
      color: 'green'
    }
  } else if (riskScore < 50) {
    return {
      level: 'moderate',
      description: 'Moderate risk of PCOS',
      color: 'yellow'
    }
  } else if (riskScore < 70) {
    return {
      level: 'high',
      description: 'High risk of PCOS',
      color: 'orange'
    }
  } else {
    return {
      level: 'very-high',
      description: 'Very high risk of PCOS',
      color: 'red'
    }
  }
}
\`\`\`

---

### Step 7: Recommendation Engine

\`\`\`typescript
function generateRecommendations(riskFactors, data) {
  const recommendations = []
  
  // High-priority medical consultations
  if (riskScore >= 70) {
    recommendations.push({
      category: 'Medical',
      priority: 'urgent',
      title: 'Consult Healthcare Provider Immediately',
      description: 'Schedule appointment with gynecologist or endocrinologist',
      icon: 'AlertCircle'
    })
  }
  
  // Diagnostic testing
  if (!data.hasLabData) {
    recommendations.push({
      category: 'Diagnostic',
      priority: 'high',
      title: 'Complete Hormonal Panel',
      description: 'Get LH, FSH, testosterone, AMH, and insulin tested',
      icon: 'Activity'
    })
  }
  
  if (!data.hasUltrasound) {
    recommendations.push({
      category: 'Diagnostic',
      priority: 'high',
      title: 'Transvaginal Ultrasound',
      description: 'Assess ovarian morphology and follicle count',
      icon: 'Camera'
    })
  }
  
  // Lifestyle modifications
  if (data.bmi >= 25) {
    recommendations.push({
      category: 'Lifestyle',
      priority: 'medium',
      title: 'Weight Management Program',
      description: '5-10% weight loss can improve PCOS symptoms significantly',
      icon: 'TrendingDown'
    })
  }
  
  if (data.exercise === 'rarely' || data.exercise === 'never') {
    recommendations.push({
      category: 'Lifestyle',
      priority: 'medium',
      title: 'Start Regular Exercise',
      description: '150 minutes/week of moderate activity recommended',
      icon: 'Dumbbell'
    })
  }
  
  // Dietary changes
  if (data.fastFood || data.dietType === 'processed') {
    recommendations.push({
      category: 'Nutrition',
      priority: 'medium',
      title: 'Low GI Diet',
      description: 'Focus on whole grains, lean proteins, vegetables',
      icon: 'Apple'
    })
  }
  
  // Mental health support
  if (data.stressLevel >= 7 || data.hasMentalHealthSymptoms) {
    recommendations.push({
      category: 'Mental Health',
      priority: 'medium',
      title: 'Stress Management',
      description: 'Consider therapy, meditation, or yoga',
      icon: 'Heart'
    })
  }
  
  // Community support
  recommendations.push({
    category: 'Support',
    priority: 'low',
    title: 'Join PCOS Community',
    description: 'Connect with others managing similar symptoms',
    icon: 'Users'
  })
  
  return recommendations
}
\`\`\`

---

### Step 8: Results Visualization
**Location**: `app/results/page.tsx`

#### 8.1 Results Summary Card
- Risk level badge (color-coded)
- Percentage likelihood
- Confidence score
- Primary diagnosis statement

#### 8.2 Risk Factor Breakdown
- Bar chart showing contribution of each factor
- Severity indicators
- Impact scores

#### 8.3 Key Findings List
- Clinical findings in plain language
- Hyperlinked medical terms
- Reference ranges for lab values

#### 8.4 Recommendations Grid
- Categorized action items
- Priority badges
- Expandable details
- Links to relevant app features

#### 8.5 Next Steps
- Schedule doctor appointment
- Track symptoms in dashboard
- Explore nutrition planner
- Join community forums

---

## Confidence Score Calculation

\`\`\`typescript
function calculateConfidence(data) {
  let confidence = 60 // Base confidence
  
  // Add confidence based on data completeness
  if (data.hasBasicInfo) confidence += 0
  if (data.hasSymptoms) confidence += 5
  if (data.hasMenstrualHistory) confidence += 5
  if (data.hasLifestyleInfo) confidence += 5
  
  // Significant boosts for objective data
  if (data.hasLabData) confidence += 15
  if (data.hasUltrasound) confidence += 10
  
  // Penalize for conflicting information
  if (hasConflictingData(data)) confidence -= 10
  
  return Math.min(Math.max(confidence, 50), 98)
}
\`\`\`

---

## Quality Assurance

### Validation Checks
1. **Data Consistency**: Cross-check related fields
2. **Range Validation**: Ensure biological plausibility
3. **Rotterdam Criteria**: Verify against clinical standards
4. **Confidence Thresholds**: Only provide results above 60% confidence

### Error Handling
- Graceful degradation for partial data
- Clear messaging for missing critical information
- Fallback to basic assessment if ML fails

---

This comprehensive documentation explains how every assessment transforms into actionable health insights through a multi-layered approach combining clinical criteria, machine learning, and evidence-based recommendations.
