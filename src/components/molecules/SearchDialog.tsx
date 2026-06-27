import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';
import { useSearchKeyboard } from '@/hooks/useSearchKeyboard';
import { GLOSSARY } from '@/data/glossary';
import { ANALOGIES } from '@/data/analogies';

/* ───────── Types ───────── */

interface SearchDialogProps {
  onClose: () => void;
  onNavigate: (tabId: string, searchTerm?: string) => void;
}

interface SearchResult {
  id: string;
  type: 'glossário' | 'analogia';
  label: string;
  snippet: string;
  tabId: string;
}

/* ───────── Lazy search index (built once on first use) ───────── */

interface SearchIndexEntry {
  id: string;
  type: 'glossário' | 'analogia';
  label: string;
  text: string;
  tabId: string;
}

function buildSearchIndex(): SearchIndexEntry[] {
  const index: SearchIndexEntry[] = [];

  for (const item of GLOSSARY) {
    index.push({ id: `gloss-term-${item.term}`, type: 'glossário', label: item.term, text: item.term, tabId: 'glossario' });
    index.push({ id: `gloss-def-${item.term}`, type: 'glossário', label: item.term, text: item.def, tabId: 'glossario' });
    if (item.analogy) {
      index.push({ id: `gloss-ana-${item.term}`, type: 'glossário', label: item.term, text: item.analogy, tabId: 'glossario' });
    }
  }

  for (const item of ANALOGIES) {
    index.push({ id: `analog-title-${item.id}`, type: 'analogia', label: item.title, text: item.title, tabId: 'intro' });
    for (let i = 0; i < item.financeiro.length; i++) {
      index.push({ id: `analog-fin-${item.id}-${i}`, type: 'analogia', label: item.title, text: item.financeiro[i]!, tabId: 'intro' });
    }
    for (let i = 0; i < item.mundoReal.length; i++) {
      index.push({ id: `analog-real-${item.id}-${i}`, type: 'analogia', label: item.title, text: item.mundoReal[i]!, tabId: 'intro' });
    }
  }

  return index;
}

let searchIndexInstance: SearchIndexEntry[] | null = null;

function getSearchIndex(): SearchIndexEntry[] {
  if (!searchIndexInstance) {
    searchIndexInstance = buildSearchIndex();
  }
  return searchIndexInstance;
}

/* ───────── Helpers ───────── */

function getSnippet(text: string, query: string): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, 80);

  const start = Math.max(0, idx - 30);
  const end = Math.min(text.length, idx + query.length + 40);
  let snippet = text.slice(start, end);
  if (start > 0) snippet = '…' + snippet;
  if (end < text.length) snippet = snippet + '…';
  return snippet;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <span className="text-accent font-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export const SearchDialog = memo(function SearchDialog({ onClose, onNavigate }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  /* Compute search results from pre-computed index */
  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) return [];

    return getSearchIndex()
      .filter((entry) => entry.text.toLowerCase().includes(q))
      .slice(0, 10)
      .map((entry) => ({
        id: entry.id,
        type: entry.type,
        label: entry.label,
        snippet: getSnippet(entry.text, q),
        tabId: entry.tabId,
      }));
  }, [debouncedQuery]);

  /* Keyboard navigation via extracted hook */
  const {
    selectedIndex,
    setSelectedIndex,
    resultsRef,
    handleMouseEnter,
  } = useSearchKeyboard(results, onClose, onNavigate);

  /* Debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setSelectedIndex(-1);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, setSelectedIndex]);

  /* Auto-focus */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSelect = (result: SearchResult) => {
    onNavigate(result.tabId, result.label);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-bg/85 backdrop-blur-[20px] will-change-[backdrop-filter] flex items-start justify-center px-4 pt-[10vh] animate-[fade-in_0.2s_ease-out] max-sm:px-2.5 max-sm:pt-[6vh]"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-[620px] bg-card-custom border border-border-custom rounded-2xl overflow-hidden shadow-[var(--shadow-lg)_var(--shadow-lg-color)] animate-[slide-down_0.25s_ease-out] max-sm:rounded-2xl"
      >
        {/* Header row */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border-custom max-sm:px-2.5 max-sm:py-2.5">
          <div className="flex-1 flex items-center gap-2.5 bg-surface border border-border-custom rounded-lg px-3 focus-within:border-accent dark:focus-within:border-accent max-sm:px-2">
            <span className="text-base shrink-0">🔍</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar no guia…"
              className="flex-1 bg-transparent border-none outline-none text-text font-sans text-[15px] py-2.5 placeholder:text-soft max-sm:text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
                className="bg-transparent border-none cursor-pointer text-muted text-sm p-1 rounded-md transition-colors hover:text-text dark:hover:text-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar busca"
            className="w-9 h-9 flex items-center justify-center bg-surface border border-border-custom rounded-[10px] text-sm text-muted transition-colors hover:bg-accent/5 hover:text-text dark:hover:bg-accent/[0.07] dark:hover:text-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0 max-sm:w-8 max-sm:h-8"
          >
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[55vh] overflow-y-auto p-2 max-sm:max-h-[50vh]">
          {debouncedQuery.trim().length === 0 && (
            <div className="text-center py-10 px-5">
              <div className="text-[32px] mb-3 opacity-50">🔍</div>
              <div className="text-[13px] text-muted leading-relaxed">
                Digite para buscar termos, definições e analogias
              </div>
            </div>
          )}

          {debouncedQuery.trim().length > 0 && results.length === 0 && (
            <div className="text-center py-10 px-5">
              <div className="text-[13px] text-muted leading-relaxed">
                Nenhum resultado encontrado para "<strong className="text-text">{debouncedQuery}</strong>"
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div ref={resultsRef} className="flex flex-col gap-0.5">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={cn(
                    'flex items-start gap-3 w-full p-2.5 border-none rounded-[10px] cursor-pointer text-left font-sans transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    selectedIndex === index
                      ? 'bg-accent/10'
                      : 'bg-transparent hover:bg-accent/5 dark:hover:bg-accent/[0.07]',
                  )}
                >
                  <span className="text-lg shrink-0 mt-0.5">
                    {result.type === 'glossário' ? '📚' : '💡'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-text mb-0.5">
                      {highlightMatch(result.label, debouncedQuery)}
                    </div>
                    <div className="text-xs text-muted leading-relaxed overflow-hidden text-ellipsis line-clamp-2">
                      {highlightMatch(result.snippet, debouncedQuery)}
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-soft tracking-wide uppercase shrink-0 px-2 py-0.5 bg-surface rounded-md mt-0.5">
                    {result.type === 'glossário' ? 'Glossário' : 'Analogia'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-border-custom text-[10px] text-soft text-center tracking-wide max-sm:text-[9px]">
          <span className="bg-surface border border-border-custom rounded-[4px] px-1.5 py-0.5 font-mono text-[9px]">ESC</span> fechar ·{' '}
          <span className="bg-surface border border-border-custom rounded-[4px] px-1.5 py-0.5 font-mono text-[9px]">↑↓</span> navegar
        </div>
      </div>
    </div>
  );
});
