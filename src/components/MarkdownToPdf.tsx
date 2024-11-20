'use client'

import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export default function MarkdownToPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.name.endsWith('.md')) {
      setSelectedFile(file)
      setFileName(file.name)
      
      // Read the markdown content
      const text = await file.text()
      setMarkdownContent(text)
    }
  }

  const handleDownload = async () => {
    if (!selectedFile) return

    try {
      const doc = new jsPDF()
      
      // Split content into lines
      const lines = markdownContent.split('\n')
      let y = 20 // Starting y position
      
      lines.forEach(line => {
        if (line.startsWith('#')) {
          // Handle headers
          doc.setFontSize(16)
          doc.text(line.replace(/#/g, '').trim(), 20, y)
          y += 10
        } else {
          // Handle normal text
          doc.setFontSize(12)
          const splitText = doc.splitTextToSize(line, 170) // Split long lines
          doc.text(splitText, 20, y)
          y += 7 * splitText.length
        }
        
        // Add new page if needed
        if (y > 280) {
          doc.addPage()
          y = 20
        }
      })

      doc.save(fileName.replace('.md', '.pdf'))
    } catch (error) {
      console.error('Error converting file:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4">
      <input
        type="file"
        accept=".md"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
      <Button 
        onClick={() => inputRef.current?.click()}
        className="w-full"
      >
        Select Markdown File
      </Button>
      
      {fileName && (
        <div className="space-y-4">
          <div className="text-center p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>
          </div>
          <div className="markdown-preview border rounded-lg p-6 bg-white text-black whitespace-pre-wrap h-[400px] overflow-y-auto">
            {markdownContent}
          </div>
          <Button 
            onClick={handleDownload}
            className="w-full"
            variant="secondary"
          >
            Download as PDF
          </Button>
        </div>
      )}
    </div>
  )
}
