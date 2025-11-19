"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import * as XLSX from 'xlsx'

export default function DataUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && (selectedFile.name.endsWith('.csv') || 
        selectedFile.name.endsWith('.xlsx') || 
        selectedFile.name.endsWith('.xls'))) {
      setFile(selectedFile)
      setError(null)
    } else {
      setError("Please upload a CSV or Excel file")
    }
  }

  const processExcel = async (file: File) => {
    return new Promise<any[]>((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          
          const headers = jsonData[0] as string[]
          const rows = jsonData.slice(1).map((row: any) => {
            const obj: Record<string, any> = {}
            headers.forEach((header, index) => {
              obj[header] = row[index] !== undefined ? row[index] : ''
            })
            return obj
          })
          
          resolve(rows)
        } catch (error) {
          reject(error)
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsBinaryString(file)
    })
  }

  const processCSV = async (file: File) => {
    const text = await file.text()
    const lines = text.split('\n')
    const headers = lines[0].split(',').map(h => h.trim())
    
    const data = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',')
        const row: Record<string, string> = {}
        headers.forEach((header, index) => {
          row[header] = values[index]?.trim() || ''
        })
        return row
      })
    
    return data
  }

  const processDataset = async () => {
    if (!file) return

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      let data: any[]
      
      if (file.name.endsWith('.csv')) {
        data = await processCSV(file)
      } else {
        data = await processExcel(file)
      }

      const headers = Object.keys(data[0])

      localStorage.setItem('kaggle_pcos_dataset', JSON.stringify(data))
      localStorage.setItem('kaggle_pcos_headers', JSON.stringify(headers))

      await fetch('/api/process-dataset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, headers })
      })

      setSuccess(true)

    } catch (err) {
      setError("Error processing file. Please check the format.")
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-3">
            Upload Kaggle PCOS Dataset
          </h1>
          <p className="text-muted-foreground text-lg">
            Import your 541 PCOS records from Kaggle (Excel or CSV format)
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-6 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Dataset File
            </CardTitle>
            <CardDescription>
              Select your Kaggle PCOS dataset (CSV or Excel format)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
                id="dataset-upload"
              />
              <label htmlFor="dataset-upload" className="cursor-pointer">
                <FileText className="h-12 w-12 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">
                  {file ? file.name : "Click to upload file"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported: .csv, .xlsx, .xls files
                </p>
              </label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Dataset successfully uploaded and processed! The ML model can now use this data for predictions.
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={processDataset}
              disabled={!file || uploading}
              className="w-full"
              size="lg"
            >
              {uploading ? "Processing..." : "Process Dataset"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
