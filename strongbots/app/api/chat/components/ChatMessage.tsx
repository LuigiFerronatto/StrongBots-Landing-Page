"use client"

import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface ChatMessageProps {
  content: string
  role: "user" | "assistant"
  isLoading?: boolean
  isError?: boolean
  isConflict?: boolean
  appointmentDetails?: any
}

export default function ChatMessage({
  content,
  role,
  isLoading = false,
  isError = false,
  isConflict = false,
  appointmentDetails,
}: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageRef.current) {
      // Processar links no conteúdo
      const links = messageRef.current.querySelectorAll("a")
      links.forEach((link) => {
        link.setAttribute("target", "_blank")
        link.setAttribute("rel", "noopener noreferrer")
      })
    }
  }, [content])

  // Determine message style based on type
  const getMessageStyle = () => {
    if (role === "user") {
      return "bg-blue-500 text-white"
    }

    if (isError) {
      return "bg-red-100 text-red-800 border border-red-300"
    }

    if (isConflict) {
      return "bg-yellow-100 text-yellow-800 border border-yellow-300"
    }

    if (appointmentDetails) {
      return "bg-green-100 text-green-800 border border-green-300"
    }

    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div ref={messageRef} className={`max-w-[80%] rounded-lg px-4 py-2 ${getMessageStyle()}`}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.4s" }}></div>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a className="text-blue-600 underline" {...props} target="_blank" rel="noopener noreferrer" />
              ),
              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
              em: ({ node, ...props }) => <em className="italic" {...props} />,
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-2" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-2" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        )}

        {appointmentDetails && (
          <div className="mt-3 pt-3 border-t border-green-300">
            <a
              href={appointmentDetails.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
            >
              Ver no Google Calendar
            </a>
          </div>
        )}
      </div>
    </div>
  )
}