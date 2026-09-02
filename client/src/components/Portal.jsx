import { createPortal } from 'react-dom'

// Renders children into document.body to avoid stacking-context conflicts
// from ancestor backdrop-blur / transforms (common with modals).
export default function Portal({ children }) {
  return createPortal(children, document.body)
}
