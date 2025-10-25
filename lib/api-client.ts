export async function analyzeAssessment(assessmentData: any) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assessmentData),
  })

  if (!response.ok) {
    throw new Error("Failed to analyze assessment")
  }

  return response.json()
}

export async function processUltrasoundImages(images: File[]) {
  const formData = new FormData()
  images.forEach((image) => {
    formData.append("images", image)
  })

  const response = await fetch("/api/process-image", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to process images")
  }

  return response.json()
}

export async function getMLPrediction(data: any) {
  const response = await fetch("/api/ml-predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to get ML prediction")
  }

  return response.json()
}
