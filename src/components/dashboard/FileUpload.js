"use client"

import { useState } from "react"

const FileUpload = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
      return validTypes.includes(file.type)
    })

    if (validFiles.length === 0) {
      alert("Please select only PDF or DOCX files.")
      return
    }

    validFiles.forEach((file) => {
      setIsUploading(true)
      // Simulate upload delay
      setTimeout(() => {
        onFileUpload(file)
        setIsUploading(false)
      }, 1000)
    })
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900">
              {isUploading ? "Uploading..." : "Drop files here or click to upload"}
            </span>
            <span className="mt-1 block text-xs text-gray-500">PDF, DOCX up to 10MB</span>
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            multiple
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  )
}

export default FileUpload
