export const WHATSAPP_NUMBER = '919649354858'

// Pre-filled message a recruiter/client sees when they tap any WhatsApp entry point
export const WHATSAPP_GREETING =
  "Hello Junaid! I came across your portfolio and would love to connect with you regarding a project or opportunity."

export const buildWhatsAppLink = (text = WHATSAPP_GREETING) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

// Backend API base. Falls back to the deployed Render API so the AI chatbot
// works even if VITE_API_URL is missing from the frontend build.
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://portfolio-3-xx49.onrender.com"
).replace(/\/$/, "")