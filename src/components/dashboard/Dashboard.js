"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import FileUpload from "./FileUpload"
import DocumentList from "./DocumentList"
import QuestionAnswer from "./QuestionAnswer"

const Dashboard = ({ user, onLogout, showToast }) => {
  const [documents, setDocuments] = useState([])
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    // Load documents from localStorage
    const savedDocuments = localStorage.getItem("documents")
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments))
    }

    // Load conversations from localStorage
    const savedConversations = localStorage.getItem("conversations")
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations))
    }
  }, [])

  const handleFileUpload = (file) => {
    const newDocument = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      userId: user.id,
    }

    const updatedDocuments = [...documents, newDocument]
    setDocuments(updatedDocuments)
    localStorage.setItem("documents", JSON.stringify(updatedDocuments))
    showToast(`${file.name} uploaded successfully!`)
  }

  const handleDocumentUpdate = (documentId, newName) => {
    const updatedDocuments = documents.map((doc) => (doc.id === documentId ? { ...doc, name: newName } : doc))
    setDocuments(updatedDocuments)
    localStorage.setItem("documents", JSON.stringify(updatedDocuments))
    showToast("Document updated successfully!")
  }

  const handleDocumentDelete = (documentId) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== documentId)
    setDocuments(updatedDocuments)
    localStorage.setItem("documents", JSON.stringify(updatedDocuments))
    showToast("Document deleted successfully!")
  }

  const handleQuestionSubmit = (question) => {
    // Simulate AI response
    const responses = [
      "Based on the documents, here's what I found...",
      "According to the uploaded files, the answer is...",
      "From analyzing your documents, I can tell you that...",
      "The information in your documents suggests...",
      "After reviewing the content, here's my response...",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    const newConversation = {
      id: Date.now(),
      question,
      answer: randomResponse,
      timestamp: new Date().toISOString(),
    }

    const updatedConversations = [...conversations, newConversation]
    setConversations(updatedConversations)
    localStorage.setItem("conversations", JSON.stringify(updatedConversations))
  }

  const handleClearConversations = () => {
    setConversations([])
    localStorage.removeItem("conversations")
    showToast("Conversation history cleared!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - File Management */}
            <div className="space-y-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Upload Documents</h3>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    My Documents ({documents.length})
                  </h3>
                  <DocumentList documents={documents} onUpdate={handleDocumentUpdate} onDelete={handleDocumentDelete} />
                </div>
              </div>
            </div>

            {/* Right Column - AI Q&A */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Ask Questions About Your Documents</h3>
                <QuestionAnswer
                  conversations={conversations}
                  onQuestionSubmit={handleQuestionSubmit}
                  onClearConversations={handleClearConversations}
                  documentsCount={documents.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
