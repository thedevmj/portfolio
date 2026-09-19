import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiSend,
  FiX,
  FiRefreshCw,
  FiZap
} from "react-icons/fi";
import { API_BASE_URL } from "../constants";
import Portal from "../components/Portal";

const SUGGESTED_PROMPTS = [
  "What tech stack does Junaid work with?",
  "Tell me about Junaid's project experience",
  "Can Junaid build a full stack e-commerce app?",
  "What makes Junaid a good fit for a React Native role?"
];

// Client-side rate limiting: minimum seconds between messages.
// Module-scoped so clearing history / reopening the chat can't reset it.
const COOLDOWN_MS = 8000;
let lastAiRequestAt = 0;

const API_ENDPOINT = `${API_BASE_URL}/api/ai/blueprint`;

const INLINE_RE = /(\*\*[^*]+\*\*|`[^`]+`)/g;

const renderInline = (text) => {
  const parts = text.split(INLINE_RE).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-black">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className="font-mono text-[11px] border border-neo-ink/30 bg-neo-bg/60 px-1">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const isSectionHeader = (line) => {
  const t = line.trim();
  if (t.length < 3 || t.length > 48) return false;
  if (t !== t.toUpperCase()) return false;
  return /[A-Z]/.test(t);
};

function FormattedText({ text }) {
  const lines = (text || "").split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, idx) => {
        const t = line.trim();
        if (t === "") return <div key={idx} className="h-1.5" />;
        if (t.startsWith("- ")) {
          return (
            <div key={idx} className="flex gap-2">
              <span className="shrink-0 font-black select-none">-</span>
              <span className="min-w-0 break-words">{renderInline(t.slice(2))}</span>
            </div>
          );
        }
        if (isSectionHeader(t)) {
          return (
            <p
              key={idx}
              className="mt-2.5 mb-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest border-b-2 border-neo-ink/20 pb-0.5 first:mt-0"
            >
              {renderInline(t)}
            </p>
          );
        }
        return <p key={idx} className="break-words">{renderInline(t)}</p>;
      })}
    </div>
  );
}

export default function AiChatbot({ isOpen, onClose }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi there — I can answer questions about Junaid's skills, projects, and experience as a full stack developer. Feel free to ask anything.",
      blueprint: null
    }
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || prompt;
    if (!query || !query.trim() || loading) return;

    // Client-side rate limit
    const now = Date.now();
    const elapsed = now - lastAiRequestAt;
    if (elapsed < COOLDOWN_MS) {
      const waitSec = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      setMessages((prev) => [
        ...prev,
        {
          id: `rate-${now}`,
          role: "assistant",
          isError: true,
          text: `Please wait ${waitSec} second${waitSec > 1 ? "s" : ""} before sending another message.`
        }
      ]);
      return;
    }
    lastAiRequestAt = now;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: query.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query.trim() })
      });

      // Read as text first so a non-JSON body (e.g. a proxy that returns the
      // model's raw prose) can't throw "Unexpected token ... is not valid JSON".
      const rawText = await response.text();
      let json = null;
      try {
        json = rawText ? JSON.parse(rawText) : null;
      } catch {
        json = null;
      }

      const body = (rawText || "").trim();
      const isHtml = /^\s*<(?:!DOCTYPE|html)/i.test(body);

      if (json && json.success && json.data) {
        const botMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          text: json.data?.answer || `Here is the architectural blueprint for "${json.data?.projectName || "your project"}":`,
          blueprint: json.data
        };
        setMessages((prev) => [...prev, botMessage]);
      } else if (!response.ok) {
        throw new Error(json?.message || `Request failed (${response.status}). Please try again.`);
      } else if (isHtml) {
        throw new Error("The server returned an unexpected response. Please try again.");
      } else if (body) {
        // 2xx with a plain-text body — surface the raw response as the answer.
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "assistant",
            text: body.slice(0, 4000),
            blueprint: null
          }
        ]);
      } else {
        throw new Error("Failed to generate AI response.");
      }
    } catch (err) {
      console.error("[AiChatbot] Error:", err);
      const errorMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        isError: true,
        text: err.message || "Sorry, I couldn't process that request. Please try again."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(prompt);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        text: "Conversation cleared. Go ahead and ask something new.",
        blueprint: null
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      {/* Dimmed mobile backdrop for focus and easy tap-to-dismiss */}
      <div 
        className="fixed inset-0 z-[75] bg-black/60 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Chat Window: Responsive dock for both mobile & desktop */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed inset-x-2.5 bottom-2.5 top-14 z-[80] flex max-h-[calc(100dvh-4rem)] flex-col border-4 border-neo-ink bg-neo-bg shadow-neo-lg sm:inset-x-auto sm:top-auto sm:bottom-6 sm:right-6 sm:h-[640px] sm:w-[480px] sm:max-h-[82vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Junaid's portfolio assistant"
      >
        {/* Window Header */}
        <div className="flex shrink-0 items-center justify-between border-b-4 border-neo-ink bg-neo-panel px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border-2 border-neo-ink bg-neo-accent text-white shadow-neo-sm">
              <FiZap className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-xs sm:text-sm font-black uppercase tracking-tight text-neo-ink">
                  Ask About Junaid
                </span>
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-neo-ink/60 leading-tight">
                Full Stack Developer • MERN • React Native
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClearHistory}
              title="Reset conversation"
              aria-label="Clear chat history"
              className="flex h-8 w-8 sm:h-8 sm:w-8 items-center justify-center border-2 border-neo-ink bg-neo-bg text-neo-ink transition-colors hover:bg-neo-secondary hover:text-black active:translate-x-0.5 active:translate-y-0.5 touch-manipulation cursor-pointer"
            >
              <FiRefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close chat"
              aria-label="Close AI chat"
              className="flex h-8 w-8 sm:h-8 sm:w-8 items-center justify-center border-2 border-neo-ink bg-neo-accent text-white transition-colors hover:bg-red-600 active:translate-x-0.5 active:translate-y-0.5 touch-manipulation cursor-pointer"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips Header (Horizontally scrollable on mobile) */}
        <div className="shrink-0 border-b-2 border-neo-ink/20 bg-neo-panel/60 px-3 py-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px] scrollbar-none">
            <span className="shrink-0 font-black uppercase tracking-wider text-neo-ink/50 text-[10px]">
              Suggestions:
            </span>
            {SUGGESTED_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(item)}
                className="shrink-0 border-2 border-neo-ink bg-neo-bg px-2.5 py-1 text-[11px] font-bold text-neo-ink transition-all hover:bg-neo-secondary hover:text-black active:translate-x-0.5 active:translate-y-0.5 touch-manipulation cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[94%] sm:max-w-[88%] border-2 border-neo-ink p-3 shadow-neo-sm ${
                  msg.role === "user"
                    ? "bg-neo-secondary text-black font-semibold"
                    : msg.isError
                    ? "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200 font-medium"
                    : "bg-neo-panel text-neo-ink font-medium"
                }`}
              >
                <div className="text-xs sm:text-sm leading-relaxed">
                  <FormattedText text={msg.text} />
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator Bubble */}
          {loading && (
            <div className="flex items-start">
              <div className="border-2 border-neo-ink bg-neo-panel p-2.5 sm:p-3 shadow-neo-sm">
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-neo-accent"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0 }}
                  />
                  <motion.span
                    className="h-2 w-2 rounded-full bg-neo-secondary"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }}
                  />
                  <motion.span
                    className="h-2 w-2 rounded-full bg-neo-muted"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }}
                  />
                  <span className="ml-1 text-[11px] sm:text-xs font-bold text-neo-ink/70">
                    Generating response...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar (16px base font on mobile prevents Safari auto-zoom) */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 border-t-4 border-neo-ink bg-neo-panel p-2.5 sm:p-3"
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question or request a project..."
              maxLength={2000}
              className="flex-1 border-2 border-neo-ink bg-neo-bg px-3 py-2 text-base sm:text-sm font-medium text-neo-ink outline-none placeholder:text-neo-ink/40 focus:border-neo-accent focus:shadow-neo-sm"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || loading}
              className="btn-primary shrink-0 h-10 px-4 py-2 text-xs font-black touch-manipulation cursor-pointer"
            >
              {loading ? (
                <FiRefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-1">
                  <FiSend className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </Portal>
  );
}