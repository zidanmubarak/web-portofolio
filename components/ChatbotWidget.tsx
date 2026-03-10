"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, StopCircle, Trash2, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const PORTFOLIO_CONTEXT = `You are Zidan's Portfolio Assistant. You help visitors learn about Zidan Mubarak, an AI/ML Engineer from Indonesia.

IMPORTANT LANGUAGE RULE: 
- If the user writes in Indonesian, respond ONLY in Indonesian. Do NOT add English translation.
- If the user writes in English, respond ONLY in English. Do NOT add Indonesian translation.
- NEVER provide bilingual or dual-language responses.
- Match the user's language exactly with no exceptions.

**About Zidan:**
- Name: Zidan Mubarak
- Role: AI/ML Engineer & Full-Stack Developer
- Location: Indonesia (Available for remote work worldwide)
- Status: Available for projects

**Education:**
- S1 Information Technology - UIN Ar-Raniry (2022-2026)

**Experience:**
1. Machine Learning Engineer Cohort - Coding Camp by DBS Foundation (Feb 2025 - Present)
   - Developing AI solutions with Django, TensorFlow, PyTorch
   - Leading developer teams in creating innovative AI solutions

2. Data Management & Analysis - Badan Pengelolaan Keuangan Aceh (Jan 2025 - Mar 2025)
   - Financial data digitization and processing

**Technical Skills:**
- Languages: Python, JavaScript, TypeScript
- AI/ML: TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy
- Web: React, Next.js, Node.js, Django
- Database: PostgreSQL, MongoDB, SQLite

**Contact:**
- Email: zidanmubarak00@gmail.com
- GitHub: github.com/zidanmubarak
- LinkedIn: linkedin.com/in/zidan-mubarak

Keep responses concise and helpful. Remember: ONE LANGUAGE ONLY based on user's question.`;

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatHistory = useRef<ChatMessage[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  // OpenRouter API configuration
  const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
  const MODEL = "google/gemma-3-27b-it:free";

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleChatbotClick = () => {
    if (messages.length === 0) {
      setMessages([{
        id: "1",
        text: "Hi! I'm Zidan's AI assistant. Ask me about his experience, skills, or projects.",
        sender: "bot",
        timestamp: new Date(),
      }]);
    }
    setIsOpen(!isOpen);
  };

  const typeMessage = (text: string, messageId: string) => {
    return new Promise<void>((resolve) => {
      let currentText = "";
      let charIndex = 0;

      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

      typingIntervalRef.current = setInterval(() => {
        if (charIndex < text.length) {
          currentText += text[charIndex];
          setMessages((prev) =>
            prev.map((msg) => msg.id === messageId ? { ...msg, text: currentText } : msg)
          );
          charIndex++;
          scrollToBottom();
        } else {
          if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
          setMessages((prev) =>
            prev.map((msg) => msg.id === messageId ? { ...msg, isTyping: false } : msg)
          );
          resolve();
        }
      }, 20);
    });
  };

  const generateResponse = async (userMessage: string) => {
    if (!OPENROUTER_API_KEY) {
      console.error("OpenRouter API key not found");
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        text: "API key tidak ditemukan. Silakan hubungi Zidan langsung via email.",
        sender: "bot",
        timestamp: new Date(),
      }]);
      setIsResponding(false);
      return;
    }

    // Initialize chat history with system message if empty
    if (chatHistory.current.length === 0) {
      chatHistory.current = [
        { role: "system", content: PORTFOLIO_CONTEXT }
      ];
    }

    // Add user message to history
    chatHistory.current.push({ role: "user", content: userMessage });

    abortControllerRef.current = new AbortController();

    try {
      setIsThinking(true);

      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
          "X-Title": "Zidan Mubarak Portfolio"
        },
        body: JSON.stringify({
          model: MODEL,
          messages: chatHistory.current,
          max_tokens: 500,
          temperature: 0.7,
        }),
        signal: abortControllerRef.current.signal,
      });

      setIsThinking(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "API request failed");
      }

      const data = await response.json();
      const responseText = data.choices[0]?.message?.content?.trim() || "Maaf, saya tidak bisa merespons saat ini.";

      // Add assistant response to history
      chatHistory.current.push({ role: "assistant", content: responseText });

      const botMessage: Message = {
        id: Date.now().toString(),
        text: "",
        sender: "bot",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Type the message character by character
      await typeMessage(responseText, botMessage.id);
      setIsResponding(false);
    } catch (error) {
      setIsThinking(false);
      const errorMessage = error instanceof Error && error.name === "AbortError"
        ? "Response stopped."
        : "Maaf, terjadi kesalahan. Silakan coba lagi.";
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        text: errorMessage,
        sender: "bot",
        timestamp: new Date(),
      }]);
      setIsResponding(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isResponding) return;

    setMessages((prev) => [...prev, {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }]);
    setInputMessage("");
    setIsResponding(true);
    await generateResponse(inputMessage);
  };

  const stopResponse = () => {
    abortControllerRef.current?.abort();
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setIsResponding(false);
    setIsThinking(false);
    setMessages((prev) => prev.map((msg) => msg.isTyping ? { ...msg, isTyping: false } : msg));
  };

  const clearChat = () => {
    setMessages([{
      id: "1",
      text: "Hi! I'm Zidan's AI assistant. Ask me about his experience, skills, or projects.",
      sender: "bot",
      timestamp: new Date(),
    }]);
    chatHistory.current = [];
    setIsResponding(false);
    setIsThinking(false);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={handleChatbotClick}
        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-neutral-200 transition-colors"
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatbotRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">AI Assistant</h3>
                  <p className="text-xs text-neutral-500">
                    {isResponding ? "Typing..." : "Powered by Gemma 3"}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={clearChat}
                  disabled={isResponding}
                  className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      message.sender === "user" ? "bg-white" : "bg-neutral-800"
                    }`}>
                      {message.sender === "user" 
                        ? <User className="w-3 h-3 text-black" />
                        : <Bot className="w-3 h-3 text-neutral-400" />
                      }
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-white text-black"
                        : "bg-neutral-800 text-neutral-200"
                    }`}>
                      {message.text}
                      {message.isTyping && (
                        <span className="inline-block w-0.5 h-4 bg-neutral-400 ml-1 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Thinking indicator */}
              {isThinking && (
                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask something..."
                  className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                  disabled={isResponding}
                />
                {isResponding ? (
                  <button
                    type="button"
                    onClick={stopResponse}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <StopCircle className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="px-3 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
