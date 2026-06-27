import { useState, useRef, useEffect, useCallback } from 'react';

/* ───────── Types ───────── */

interface SearchResult {
  id: string;
  type: 'glossário' | 'analogia';
  label: string;
  snippet: string;
  tabId: string;
}

interface UseSearchKeyboardReturn {
  selectedIndex: number;
  setSelectedIndex: (index: number | ((prev: number) => number)) => void;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  handleMouseEnter: (index: number) => void;
}

/* ───────── Hook ───────── */

/**
 * Hook de navegação por teclado para diálogos de busca.
 *
 * Gerencia:
 * - selectedIndex (qual resultado está destacado)
 * - Keyboard events: Escape, ArrowUp, ArrowDown, Enter
 * - Scroll dos resultados para viewport
 * - Mouse enter para sync do índice
 * - listeners document-level com refs para evitar recriação
 */
export function useSearchKeyboard(
  results: SearchResult[],
  onClose: () => void,
  onNavigate: (tabId: string, label?: string) => void,
): UseSearchKeyboardReturn {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ── Refs para evitar recriação do listener a cada keystroke ── */
  const latestResultsRef = useRef(results);
  const latestSelectedIndexRef = useRef(selectedIndex);

  useEffect(() => { latestResultsRef.current = results; });
  useEffect(() => { latestSelectedIndexRef.current = selectedIndex; });

  function scrollResultIntoView(index: number) {
    requestAnimationFrame(() => {
      const container = resultsRef.current;
      if (!container) return;
      const buttons = container.querySelectorAll<HTMLButtonElement>('button');
      buttons[index]?.scrollIntoView({ block: 'nearest' });
    });
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    const currentResults = latestResultsRef.current;
    const currentSelectedIndex = latestSelectedIndexRef.current;
    if (currentResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = prev < currentResults.length - 1 ? prev + 1 : 0;
        scrollResultIntoView(next);
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = prev > 0 ? prev - 1 : currentResults.length - 1;
        scrollResultIntoView(next);
        return next;
      });
    } else if (e.key === 'Enter' && currentSelectedIndex >= 0) {
      e.preventDefault();
      const result = currentResults[currentSelectedIndex];
      if (result) onNavigate(result.tabId, result.label);
    }
  }, [onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return { selectedIndex, setSelectedIndex, resultsRef, handleMouseEnter };
}
