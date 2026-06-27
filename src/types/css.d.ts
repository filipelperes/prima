/* Allow CSS custom properties in React inline styles */
import 'react'

declare module 'react' {
  interface CSSProperties {
    '--mix-c'?: string
    '--mix-bg-opacity'?: string
    '--mix-border-opacity'?: string
  }
}
