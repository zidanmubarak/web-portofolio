"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  X,
  Send,
  StopCircle,
  Trash2,
  Upload,
  Bot,
  User,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isLoading?: boolean;
  isTyping?: boolean;
}

interface ChatHistory {
  role: "user" | "model";
  parts: { text: string }[];
}

// Portfolio Context - Informasi tentang Zidan
const PORTFOLIO_CONTEXT = `
Saya adalah Portfolio Assistant untuk Zidan Mubarak, seorang AI/ML Engineer dan Full-Stack Developer dari Indonesia. Berikut adalah informasi lengkap tentang Zidan:

**Informasi Pribadi:**
- Nama: Zidan Mubarak
- Lokasi: Indonesia
- Status: Available for projects
- Remote: Worldwide

**Pendidikan:**
- S1 Teknologi Informasi (S.Kom.) - Universitas Islam Negeri Ar-Raniry (2022-2026)
- SMA IPA - MAS Tgk. Chiek Oemar Diyan (2019-2022)

**Pengalaman Kerja:**
1. Machine Learning Engineer Cohort - Coding Camp powered by DBS Foundation (Feb 2025 - Present)
   - Mengembangkan solusi AI dengan Django, TensorFlow, PyTorch
   - Memimpin tim developer dalam membuat solusi AI inovatif
   - Mengarsiteki sistem machine learning yang scalable

2. Data Management & Analysis - Badan Pengelolaan Keuangan Aceh (Jan 2025 - Mar 2025)
   - Membantu proses digitalisasi dan pengolahan data keuangan
   - Menyiapkan dokumentasi internal dan laporan aktivitas operasional
   - Mendukung tim dalam aktivitas administratif dan pelaporan data keuangan

**Sertifikasi:**
1. Applied Machine Learning - Dicoding Indonesia (Mei 2025)
   - Machine Learning System Design
   - Developing a Machine Learning Project
   - Case studies: Predictive Analytics, Sentiment Analysis, Computer Vision, Recommendation Systems

2. Learn Data Processing Fundamentals - Dicoding Indonesia (Mei 2025)
   - Software Engineering with Python
   - Data Repository
   - ETL Pipelines: Extract, Transform, Load
   - Automation with Python

**Keahlian Teknis:**
- **Programming Languages:** Python, JavaScript, TypeScript
- **AI/ML:** TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy
- **Web Development:** React, Next.js, Node.js, Django
- **Database:** PostgreSQL, MongoDB, SQLite
- **Tools:** Git, Docker, Jupyter Notebook, VS Code
- **Cloud:** AWS, Google Cloud Platform
- **Other:** REST APIs, GraphQL, CI/CD, Agile/Scrum

**Proyek & Portfolio:**
- Climate Agriculture ML Analysis - Analisis machine learning untuk pertanian berbasis iklim
- Enkripsi Python - Implementasi algoritma enkripsi dan dekripsi
- Toko Buku CLI CRUD - Aplikasi CLI untuk manajemen toko buku
- Data Visualization Dashboard - Dashboard visualisasi data interaktif
- Guest Book System - Sistem buku tamu web-based dengan PHP
- Portfolio Website - Website portfolio pribadi dengan React dan Next.js
- Chatbot AI dengan Gemini API (proyek ini)

**Tujuan & Visi:**
- Mendemokratisasi teknologi AI dan membuatnya accessible untuk semua orang
- Membangun solusi AI yang menyelesaikan masalah real-world
- Berkolaborasi dalam proyek inovatif yang mendorong batas kemungkinan AI
- Berbagi pengetahuan dengan komunitas developer

**Kontak & Sosial Media:**
- Email: zidanmubarak00@gmail.com
- GitHub: github.com/zidanmubarak
- LinkedIn: linkedin.com/in/zidan-mubarak
- Portfolio: [URL Portfolio]

**Pesan untuk Klien/Pengunjung:**
Saya siap membantu Anda dengan pertanyaan tentang portfolio, pengalaman, keahlian teknis, atau proyek yang ingin dikembangkan. Saya juga terbuka untuk kolaborasi dan proyek freelance dalam bidang AI/ML dan web development.

Jawablah pertanyaan pengunjung dengan ramah, profesional, dan berdasarkan informasi di atas. Jika ada pertanyaan yang tidak tercakup dalam konteks ini, berikan jawaban yang umum namun tetap membantu.
`;

// Typing Indicator Component
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg max-w-[80%]"
  >
    <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
      <Bot className="w-3 h-3 text-blue-400" />
    </div>
    <div className="flex items-center gap-1">
      <div className="flex space-x-1">
        <motion.div
          className="w-2 h-2 bg-blue-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 bg-blue-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 bg-blue-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      <span className="text-xs text-slate-400 ml-2">AI sedang mengetik...</span>
    </div>
  </motion.div>
);

// Thinking Animation Component
const ThinkingAnimation = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg max-w-[80%]"
  >
    <div className="w-6 h-6 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
      <Bot className="w-3 h-3 text-purple-400" />
    </div>
    <div className="flex items-center gap-2">
      <motion.div
        className="flex space-x-1"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-1 h-1 bg-purple-400 rounded-full" />
        <div className="w-1 h-1 bg-purple-400 rounded-full" />
        <div className="w-1 h-1 bg-purple-400 rounded-full" />
      </motion.div>
      <span className="text-xs text-slate-400">AI sedang berpikir...</span>
    </div>
  </motion.div>
);

// Improved ModernThinking spinner
const ModernThinking = () => (
  <div className="flex items-center gap-2 p-3">
    <div className="relative w-8 h-8 flex items-center justify-center">
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
      {/* Bola utama */}
      <motion.div
        className="w-4 h-4 rounded-full bg-blue-400 z-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      {/* Bola kecil keliling */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-400"
          style={{
            top: "50%",
            left: "50%",
            marginTop: -4,
            marginLeft: -4,
          }}
          animate={{
            x: [0, 12 * Math.cos((i * 2 * Math.PI) / 3), 0],
            y: [0, 12 * Math.sin((i * 2 * Math.PI) / 3), 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "linear",
          }}
        />
      ))}
    </div>
    <span className="text-xs text-slate-400">AI sedang berpikir...</span>
  </div>
);

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatHistory = useRef<ChatHistory[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  // Hide notification after 5 seconds or when user interacts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Hide notification when user clicks on chatbot
  const handleChatbotClick = () => {
    setShowNotification(false);
    setHasInteracted(true);

    // Add welcome message if this is the first time opening
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          text: "Hello! I'm Zidan's Portfolio Assistant. I can help you learn about his experience, skills, projects, and more! How can I assist you today? 🤖",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }

    toggleChat();
  };

  // Detect click outside for closing
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping, isThinking]);

  const typeMessage = (text: string, messageId: string) => {
    return new Promise<void>((resolve) => {
      let currentText = "";
      let charIndex = 0;
      const typingSpeed = 30; // ms per character

      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }

      typingIntervalRef.current = setInterval(() => {
        if (charIndex < text.length) {
          currentText += text[charIndex];
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId ? { ...msg, text: currentText } : msg
            )
          );
          charIndex++;
          scrollToBottom();
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId ? { ...msg, isTyping: false } : msg
            )
          );
          resolve();
        }
      }, typingSpeed);
    });
  };

  const generateResponse = async (userMessage: string) => {
    if (!API_KEY) {
      console.error("API key not found");
      return;
    }

    // Prepare the system message with portfolio context
    const systemMessage: ChatHistory = {
      role: "user",
      parts: [
        {
          text: `You are Zidan's Portfolio Assistant. Use this context to answer questions about Zidan:

${PORTFOLIO_CONTEXT}

User's question: ${userMessage}

Please respond in a friendly, professional manner. If the question is about Zidan's portfolio, experience, skills, or projects, use the context above. If it's a general question, provide a helpful response. Always respond in the same language as the user's question (Indonesian or English).`,
        },
      ],
    };

    // If this is the first message, initialize chat history with system message
    if (chatHistory.current.length === 0) {
      chatHistory.current = [systemMessage];
    } else {
      // Add user message to existing conversation
      const userMessageObj: ChatHistory = {
        role: "user",
        parts: [{ text: userMessage }],
      };
      chatHistory.current.push(userMessageObj);
    }

    abortControllerRef.current = new AbortController();

    try {
      // Show thinking animation
      setIsThinking(true);
      await new Promise((resolve) => setTimeout(resolve, 1800)); // Perpanjang waktu thinking
      setIsThinking(false);

      // Show typing indicator
      setShowTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800)); // Minimum typing delay
      setShowTyping(false);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: chatHistory.current }),
        signal: abortControllerRef.current.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to get response");
      }

      const responseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .trim();

      const botMessage: Message = {
        id: Date.now().toString(),
        text: "",
        sender: "bot",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, botMessage]);
      chatHistory.current.push({
        role: "model",
        parts: [{ text: responseText }],
      });

      // Type the message character by character
      await typeMessage(responseText, botMessage.id);
      setIsResponding(false);
    } catch (error) {
      setIsThinking(false);
      setShowTyping(false);

      if (error instanceof Error) {
        const errorMessage =
          error.name === "AbortError"
            ? "Response generation stopped."
            : "Sorry, I encountered an error. Please try again.";

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: errorMessage,
            sender: "bot",
            timestamp: new Date(),
            isTyping: false,
          },
        ]);
      }
      setIsResponding(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isResponding) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsResponding(true);

    await generateResponse(inputMessage);
  };

  const stopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    setIsResponding(false);
    setIsThinking(false);
    setShowTyping(false);
    setMessages((prev) =>
      prev.map((msg) => (msg.isTyping ? { ...msg, isTyping: false } : msg))
    );
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm Zidan's Portfolio Assistant. I can help you learn about his experience, skills, projects, and more! How can I assist you today? 🤖",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    chatHistory.current = [];
    setIsResponding(false);
    setIsThinking(false);
    setShowTyping(false);
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Notification Bubble */}
      <AnimatePresence>
        {showNotification && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-full right-0 mb-3 w-64 sm:w-72 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-lg border border-white/20 backdrop-blur-sm"
          >
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">👋 Hi there!</p>
                <p className="text-xs text-white/90 leading-relaxed">
                  I'm Zidan's AI assistant. Ask me about his experience,
                  projects, skills, or anything about his portfolio!
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            {/* Arrow pointing down */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Bubble Button */}
      <Button
        className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={handleChatbotClick}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="x-icon"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </motion.div>
          ) : (
            <motion.div
              key="message-icon"
              initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatbotRef}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 h-[calc(100vh-8rem)] sm:h-[600px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden mx-4 sm:mx-0"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-3 sm:p-4 text-white font-semibold flex justify-between items-center">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center"
                  animate={{ rotate: isResponding ? 360 : 0 }}
                  transition={{
                    duration: 2,
                    repeat: isResponding ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
                <span className="text-sm sm:text-base">Zidan's Assistant</span>
              </div>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-white/80 hover:text-white hover:bg-white/10"
                  onClick={clearChat}
                  disabled={isResponding}
                >
                  <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 text-white/80 hover:text-white hover:bg-white/10"
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 p-3 sm:p-4 text-slate-300 overflow-y-auto custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 sm:mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] sm:max-w-[80%] ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                      </div>
                    )}
                    {message.sender === "user" && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-600/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      </div>
                    )}
                    <div
                      className={`p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700/80 text-slate-200"
                      }`}
                    >
                      {message.text}
                      {message.isTyping && (
                        <motion.span
                          className="inline-block w-0.5 h-4 bg-blue-400 ml-1"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Modern thinking animation */}
              {isThinking && <ModernThinking />}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 border-t border-white/10"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about Zidan's experience, skills, projects..."
                  className="flex-1 p-2 text-sm sm:text-base rounded-md bg-slate-700/50 border border-slate-600/50 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                  disabled={isResponding}
                />
                {isResponding ? (
                  <Button
                    type="button"
                    onClick={stopResponse}
                    className="h-9 sm:h-10 px-3 sm:px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all duration-200"
                  >
                    <StopCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-9 sm:h-10 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
