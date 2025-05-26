"use client"

import { useState } from "react"
import Modal from "../common/Modal"

const DocumentList = ({ documents, onUpdate, onDelete }) => {
  const [editingDoc, setEditingDoc] = useState(null)
  const [newName, setNewName] = useState("")

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleEdit = (doc) => {
    setEditingDoc(doc)
    setNewName(doc.name.replace(/\.[^/.]+$/, "")) // Remove extension
  }

  const handleSaveEdit = () => {
    if (newName.trim()) {
      const extension = editingDoc.name.split(".").pop()
      onUpdate(editingDoc.id, `${newName.trim()}.${extension}`)
      setEditingDoc(null)
      setNewName("")
    }
  }

  const handleCancelEdit = () => {
    setEditingDoc(null)
    setNewName("")
  }

  const getFileIcon = (type) => {
    if (type === "application/pdf") {
      return (
        <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
    return (
      <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by uploading your first document.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {getFileIcon(doc.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(doc.size)} • {formatDate(doc.uploadDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEdit(doc)}
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Edit
              </button>
              <button onClick={() => onDelete(doc.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {editingDoc && (
        <Modal isOpen={true} onClose={handleCancelEdit} title="Edit Document Name">
          <div className="space-y-4">
            <div>
              <label htmlFor="docName" className="block text-sm font-medium text-gray-700">
                Document Name
              </label>
              <input
                type="text"
                id="docName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter document name"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default DocumentList
