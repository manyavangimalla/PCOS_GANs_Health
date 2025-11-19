import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { data, headers } = await req.json()

    // Validate dataset structure
    const requiredFields = ['Age (yrs)', 'BMI', 'PCOS (Y/N)']
    const hasRequiredFields = requiredFields.every(field => headers.includes(field))

    if (!hasRequiredFields) {
      return NextResponse.json(
        { error: 'Missing required fields in dataset' },
        { status: 400 }
      )
    }

    // Perform data preprocessing
    const preprocessedData = data.map((row: Record<string, string>) => {
      const processed: Record<string, any> = {}

      // Convert numeric fields
      Object.entries(row).forEach(([key, value]) => {
        if (value === 'NA' || value === '') {
          processed[key] = null
        } else if (!isNaN(Number(value))) {
          processed[key] = Number(value)
        } else {
          processed[key] = value
        }
      })

      return processed
    })

    // Calculate dataset statistics
    const pcosCount = preprocessedData.filter((row: any) => 
      row['PCOS (Y/N)'] === 'Y' || row['PCOS (Y/N)'] === 1
    ).length

    // Calculate feature means for imputation
    const featureMeans: Record<string, number> = {}
    headers.forEach((header: string) => {
      const values = preprocessedData
        .map((row: any) => row[header])
        .filter((val: any) => val !== null && !isNaN(val))
      
      if (values.length > 0) {
        featureMeans[header] = values.reduce((a: number, b: number) => a + b, 0) / values.length
      }
    })

    return NextResponse.json({
      success: true,
      statistics: {
        totalRecords: data.length,
        pcosPositiveCount: pcosCount,
        pcosPositivePercentage: (pcosCount / data.length * 100).toFixed(2),
        featureMeans,
        dataPreprocessed: true
      }
    })

  } catch (error) {
    console.error('Error processing dataset:', error)
    return NextResponse.json(
      { error: 'Failed to process dataset' },
      { status: 500 }
    )
  }
}
