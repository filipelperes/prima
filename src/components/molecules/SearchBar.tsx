import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { GLOSSARY } from '@/data/glossary';
import { ANALOGIES } from '@/data/analogies';

/* ───────── Types ───────── */

interface SearchBarProps {
  onNavigate?: (tabId: string, searchTerm?: string) => void;
}

interface SearchResult {
  id: string;
  type: 'glossário' | 'analogia';
  label: string;
  snippet: string;
  tabId: string;
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
      <span className="text-accent font-bold">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ───────── Component ───────── */

export function SearchBar({ onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  /* Outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Compute search results */
  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) return [];

    const items: SearchResult[] = [];

    for (const item of GLOSSARY) {
      if (item.term.toLowerCase().includes(q)) {
        items.push({
          id: `gloss-term-${item.term}`,
          type: 'glossário',
          label: item.term,
          snippet: getSnippet(item.term, q),
          tabId: 'glossario',
        });
      }
      if (item.def.toLowerCase().includes(q)) {
        items.push({
          id: `gloss-def-${item.term}`,
          type: 'glossário',
          label: item.term,
          snippet: getSnippet(item.def, q),
          tabId: 'glossario',
        });
      }
      if (item.analogy && item.analogy.toLowerCase().includes(q)) {
        items.push({
          id: `gloss-ana-${item.term}`,
          type: 'glossário',
          label: item.term,
          snippet: getSnippet(item.analogy, q),
          tabId: 'glossario',
        });
      }
    }

    for (const item of ANALOGIES) {
      if (item.title.toLowerCase().includes(q)) {
        items.push({
          id: `analog-title-${item.id}`,
          type: 'analogia',
          label: item.title,
          snippet: getSnippet(item.title, q),
          tabId: 'intro',
        });
      }
      for (let i = 0; i < item.financeiro.length; i++) {
        if (item.financeiro[i].toLowerCase().includes(q)) {
          items.push({
            id: `analog-fin-${item.id}-${i}`,
            type: 'analogia',
            label: item.title,
            snippet: getSnippet(item.financeiro[i], q),
            tabId: 'intro',
          });
        }
      }
      for (let i = 0; i < item.mundoReal.length; i++) {
        if (item.mundoReal[i].toLowerCase().includes(q)) {
          items.push({
            id: `analog-real-${item.id}-${i}`,
            type: 'analogia',
            label: item.title,
            snippet: getSnippet(item.mundoReal[i], q),
            tabId: 'intro',
          });
        }
      }
    }

    return items.slice(0, 8);
  }, [debouncedQuery]);

  /* Handlers */
  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    setDebouncedQuery('');
    onNavigate?.(result.tabId, result.label);
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsFocused(false), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const showDropdown = isOpen && debouncedQuery.trim().length > 0;

  return (
    <div ref={containerRef} className="relative">
      {/* ── Input wrapper ── */}
      <div
        className={`flex items-center rounded-xl px-3 transition-colors duration-200 bg-surface ${
          isFocused ? 'border-accent' : 'border-border-custom'
        }`}
      >
        <Search size={16} className="text-muted shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder="Buscar no guia..."
          className="flex-1 bg-transparent border-none outline-none text-text py-2.5 px-2 text-[13px] font-sans placeholder:text-soft"
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Limpar busca"
            className="bg-transparent border-none cursor-pointer p-1 flex items-center shrink-0"
          >
            <X size={14} className="text-muted" />
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {showDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-card-custom border border-border-custom rounded-xl overflow-hidden z-[1000] shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          {results.length === 0 ? (
            <div className="py-3.5 px-3 text-xs text-muted text-center">
              Nenhum resultado encontrado
            </div>
          ) : (
            results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result)}
                className="flex items-start gap-2.5 w-full px-3 py-2.5 bg-transparent border-none border-b border-border-custom cursor-pointer text-left font-sans transition-colors duration-150 last:border-b-0 hover:bg-accent/5"
              >
                <span
                  className="text-[10px] font-bold shrink-0 mt-0.5"
                  style={{
                    color: result.type === 'glossário'
                      ? 'var(--color-accent)'
                      : 'var(--color-yellow)',
                  }}
                >
                  {result.type === 'glossário' ? '📚' : '💡'}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-text mb-[3px]">
                    {result.label}
                  </div>
                  <div className="text-[11px] text-muted leading-relaxed overflow-hidden text-ellipsis">
                    {highlightMatch(result.snippet, debouncedQuery)}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
