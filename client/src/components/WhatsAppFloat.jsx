import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppLink } from '../constants'
import { motion } from 'motion/react'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with me on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 border-4 border-neo-ink bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-neo-md hover:shadow-neo-lg duration-200 active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ y: -4, rotate: 3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 2 }}
      style={{ transformOrigin: 'bottom right' }}
    >
      <FaWhatsapp />
    </motion.a>
  )
}