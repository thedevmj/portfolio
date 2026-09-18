import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FiCpu, FiX } from 'react-icons/fi'
import AiChatbot from '../ai/chatbot'

export default function AiFloat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating AI Action Button (Responsive positioning & sizing) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 touch-manipulation">
        {/* Tooltip Pill */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="flex items-center gap-1.5 border-2 border-neo-ink bg-neo-secondary px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-black shadow-neo-sm pointer-events-none select-none"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Ask AI
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI chat" : "Open AI chat with Junaid's Copilot"}
          className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center border-3 sm:border-4 border-neo-ink text-xl sm:text-2xl shadow-neo-sm sm:shadow-neo-md transition-all duration-200 hover:shadow-neo-lg active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer ${
            isOpen ? "bg-neo-panel text-neo-ink" : "bg-neo-accent text-white"
          }`}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ y: -4, rotate: 3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.8 }}
          style={{ transformOrigin: "bottom right" }}
        >
          {isOpen ? <FiX className="h-5 w-5 sm:h-6 sm:w-6" /> : <FiCpu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </motion.button>
      </div>

      {/* The AI Chatbot Dialog Window */}
      <AiChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
