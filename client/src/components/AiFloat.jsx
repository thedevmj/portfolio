import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FiCpu, FiX } from 'react-icons/fi'
import AiChatbot from '../ai/chatbot'

export default function AiFloat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div id="ai" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex touch-manipulation items-center gap-2 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.94 }}
              className="pointer-events-none flex select-none items-center gap-2 rounded-full border border-line bg-glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg shadow-soft backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Ask AI
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close AI chat' : 'Open AI chat about Junaid'}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-lift transition-colors duration-200 sm:h-14 sm:w-14 ${
            isOpen
              ? 'border border-line-strong bg-elev text-fg'
              : 'bg-accent text-on-accent'
          }`}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ y: -3, rotate: 3 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.8 }}
          style={{ transformOrigin: 'bottom right' }}
        >
          {isOpen ? <FiX className="h-5 w-5 sm:h-6 sm:w-6" /> : <FiCpu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </motion.button>
      </div>

      <AiChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
