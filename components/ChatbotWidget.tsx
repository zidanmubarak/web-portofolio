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
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatHistory {
  role: "user" | "model";
  parts: { text: string }[];
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatHistory = useRef<ChatHistory[]>([]);

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typingEffect = (text: string, messageId: string) => {
    let currentText = "";
    let wordIndex = 0;
    const words = text.split(" ");

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex === 0 ? "" : " ") + words[wordIndex++];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, text: currentText } : msg
          )
        );
        scrollToBottom();
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, isLoading: false } : msg
          )
        );
        setIsResponding(false);
      }
    }, 40);
  };

  const generateResponse = async (userMessage: string) => {
    if (!API_KEY) {
      console.error("API key not found");
      return;
    }

    const userMessageObj: ChatHistory = {
      role: "user",
      parts: [{ text: userMessage }],
    };

    chatHistory.current.push(userMessageObj);
    abortControllerRef.current = new AbortController();

    try {
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
        isLoading: true,
      };

      setMessages((prev) => [...prev, botMessage]);
      chatHistory.current.push({
        role: "model",
        parts: [{ text: responseText }],
      });
      typingEffect(responseText, botMessage.id);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage =
          error.name === "AbortError"
            ? "Response generation stopped."
            : error.message;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: errorMessage,
            sender: "bot",
            timestamp: new Date(),
            isLoading: false,
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
    setMessages((prev) =>
      prev.map((msg) => (msg.isLoading ? { ...msg, isLoading: false } : msg))
    );
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    chatHistory.current = [];
    setIsResponding(false);
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Chat Bubble Button */}
      <Button
        className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={toggleChat}
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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed sm:absolute bottom-16 sm:bottom-20 right-0 sm:right-0 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[600px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 rounded-xl shadow-2xl flex flex-col overflow-hidden mx-4 sm:mx-0"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-3 sm:p-4 text-white font-semibold flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">
                  Portfolio Assistant
                </span>
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
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
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
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-200"
                      } ${message.isLoading ? "animate-pulse" : ""}`}
                    >
                      {message.text}
                      {message.isLoading && !message.text && (
                        <span className="inline-block w-2 h-4 bg-white/50 animate-blink" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 border-t border-slate-700/50"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 text-sm sm:text-base rounded-md bg-slate-700/50 border border-slate-600/50 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={isResponding}
                />
                {isResponding ? (
                  <Button
                    type="button"
                    onClick={stopResponse}
                    className="h-9 sm:h-10 px-3 sm:px-4 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    <StopCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="h-9 sm:h-10 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
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
