"use client"

import { useState } from "react"

const QuestionAnswer = ({ conversations, onQuestionSubmit, onClearConversations, documentsCount }) => {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!question.trim()) return

    if (documentsCount === 0) {
      alert("Please upload some documents first before asking questions.")
      return
    }

    setIsLoading(true)

    // Simulate AI processing time
    setTimeout(() => {
      onQuestionSubmit(question)
      setQuestion("")
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="h-96 flex flex-col">
      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 border border-gray-200 rounded-lg p-4">
        {conversations.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="mt-2">No conversations yet. Ask a question about your documents!</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <div key={conv.id} className="space-y-2">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-900">You:</p>
                <p className="text-sm text-blue-800">{conv.question}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">AI Assistant:</p>
                <p className="text-sm text-gray-700">{conv.answer}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(conv.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear Conversations Button */}
      {conversations.length > 0 && (
        <div className="mb-4">
          <button onClick={onClearConversations} className="text-sm text-red-600 hover:text-red-800">
            Clear conversation history
          </button>
        </div>
      )}

      {/* Question Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              documentsCount === 0
                ? "Upload documents first to ask questions..."
                : "Ask a question about your documents..."
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            rows={3}
            disabled={isLoading || documentsCount === 0}
          />
        </div>
        <button
          type="submit"
          disabled={!question.trim() || isLoading || documentsCount === 0}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "AI is thinking..." : "Ask Question"}
        </button>
      </form>
    </div>
  )
}

export default QuestionAnswer
