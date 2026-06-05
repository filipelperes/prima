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
      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
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

    /* ── Glossary ── */
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

    /* ── Analogies ── */
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
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* ── Input wrapper ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--surface)',
          border: isFocused
            ? '1px solid var(--accent)'
            : '1px solid var(--border)',
          borderRadius: 10,
          padding: '0 12px',
          transition: 'border-color 0.2s',
        }}
      >
        <Search size={16} color="var(--muted)" style={{ flexShrink: 0 }} />
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
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text)',
            padding: '10px 8px',
            fontSize: 13,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Limpar busca"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <X size={14} color="var(--muted)" />
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            overflow: 'hidden',
            zIndex: 1000,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: '14px 12px',
                fontSize: 12,
                color: 'var(--muted)',
                textAlign: 'center',
              }}
            >
              Nenhum resultado encontrado
            </div>
          ) : (
            results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#00d4ff11';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Section indicator */}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color:
                      result.type === 'glossário'
                        ? 'var(--accent)'
                        : 'var(--yellow)',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {result.type === 'glossário' ? '📚' : '💡'}
                </span>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--text)',
                      marginBottom: 3,
                    }}
                  >
                    {result.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--muted)',
                      lineHeight: 1.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
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
