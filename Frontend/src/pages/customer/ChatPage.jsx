import  { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hi! I'm your AI support assistant. Describe your issue and I'll try to help." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { id: Date.now(), role: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // TODO: Replace with real API call to your chatbot backend
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: "Thanks for reaching out! I'm looking into your issue. Could you provide a bit more detail?" },
      ])
      setLoading(false)
    }, 1200)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-800/40 flex-shrink-0">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/customer/dashboard" className="text-slate-400 hover:text-white transition-colors">
              ← Back
            </Link>
            <div className="h-4 w-px bg-slate-700" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">AI Support Chat</span>
          </div>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                  </svg>
                </div>
              )}
              <div
                className={`max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-sm'
                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-200 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-slate-700/50 bg-slate-800/40 backdrop-blur-sm px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Describe your issue..."
            rows={1}
            className="flex-1 bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage