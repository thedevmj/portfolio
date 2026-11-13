import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
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
        <strong key={i} className="font-semibold text-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className="rounded border border-line bg-elev-2 px-1 font-mono text-[11px]">
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
              <span className="shrink-0 select-none text-accent">–</span>
              <span className="min-w-0 break-words">{renderInline(t.slice(2))}</span>
            </div>
          );
        }
        if (isSectionHeader(t)) {
          return (
            <p
              key={idx}
              className="mb-0.5 mt-2.5 border-b border-line pb-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted first:mt-0"
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
      {/* Dimmed backdrop for focus and tap-to-dismiss */}
      <div
        className="fixed inset-0 z-[75] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Chat window */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed inset-x-3 bottom-3 top-16 z-[80] flex max-h-[calc(100dvh-4.75rem)] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-bg shadow-lift sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[640px] sm:w-[480px] sm:max-h-[82vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Junaid's portfolio assistant"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-line bg-elev px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-on-accent">
              <FiZap className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold tracking-tight text-fg sm:text-sm">
                  Ask about Junaid
                </span>
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              </div>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                Full Stack · MERN · React Native
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClearHistory}
              title="Reset conversation"
              aria-label="Clear chat history"
              className="flex h-8 w-8 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg"
            >
              <FiRefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close chat"
              aria-label="Close AI chat"
              className="flex h-8 w-8 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg hover:text-fg"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="shrink-0 border-b border-line bg-bg px-3 py-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              Try:
            </span>
            {SUGGESTED_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(item)}
                className="shrink-0 cursor-pointer touch-manipulation rounded-full border border-line px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-3 sm:p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[94%] px-4 py-2.5 text-xs leading-relaxed sm:max-w-[88%] sm:text-sm ${
                  msg.role === "user"
                    ? "rounded-2xl rounded-br-md bg-accent font-medium text-on-accent"
                    : msg.isError
                    ? "rounded-2xl rounded-bl-md border border-line bg-elev text-accent"
                    : "rounded-2xl rounded-bl-md border border-line bg-elev text-fg"
                }`}
              >
                <FormattedText text={msg.text} />
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start">
              <div className="rounded-2xl rounded-bl-md border border-line bg-elev px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0 }}
                  />
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }}
                  />
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }}
                  />
                  <span className="ml-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Generating…
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input (16px base font on mobile prevents Safari auto-zoom) */}
        <form onSubmit={handleSubmit} className="shrink-0 border-t border-line bg-elev p-2.5 sm:p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question or request a project…"
              maxLength={2000}
              className="w-full flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-base font-medium text-fg outline-none transition-colors placeholder:text-muted focus:border-accent sm:text-sm"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || loading}
              className="btn btn-accent h-10 shrink-0 px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
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
  )
}
