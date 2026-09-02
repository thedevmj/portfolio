import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppLink } from '../constants'

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with me on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-green-500/40 hover:scale-110 hover:shadow-green-500/60 transition-all cursor-pointer"
    >
      <FaWhatsapp />
    </a>
  )
}
