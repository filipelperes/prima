/**
 * Re-export do hook useTheme do ThemeProvider.
 *
 * Mantém o path de importação original @/hooks/useTheme
 * para compatibilidade com os consumidores existentes.
 *
 * Uso:
 *   import { useTheme } from '@/hooks/useTheme'
 *
 * Agora o estado é compartilhado via Context (ThemeProvider em main.tsx),
 * garantindo que múltiplos consumidores tenham o mesmo tema sincronizado.
 */
export { useTheme } from '@/lib/ThemeProvider';
