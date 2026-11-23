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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accent text-2xl text-on-accent shadow-lift transition-transform duration-200"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ y: -3, rotate: 3 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 2 }}
      style={{ transformOrigin: 'bottom right' }}
    >
      <FaWhatsapp />
    </motion.a>
  )
}
