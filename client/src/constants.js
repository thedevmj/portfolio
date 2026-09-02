export const WHATSAPP_NUMBER = '919649354858'

// Pre-filled message a recruiter/client sees when they tap any WhatsApp entry point
export const WHATSAPP_GREETING =
  "Hello Junaid! I came across your portfolio and would love to connect with you regarding a project or opportunity."

export const buildWhatsAppLink = (text = WHATSAPP_GREETING) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`