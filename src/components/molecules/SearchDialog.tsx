import { useState, useEffect, useRef, useMemo } from 'react';
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
      <span className="search-hl">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ───────── Component ───────── */

export default function SearchDialog({ onClose, onNavigate }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  /* Debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  /* Auto-focus */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* Keyboard handlers */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

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
          snippet: getSnippet(item.def, q),
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

    return items.slice(0, 10);
  }, [debouncedQuery]);

  const handleSelect = (result: SearchResult) => {
    onNavigate(result.tabId, result.label);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="search-overlay" onClick={handleOverlayClick}>
      <div className="search-dialog">
        {/* Header row */}
        <div className="search-dialog-header">
          <div className="search-dialog-input-wrap">
            <span className="search-dialog-icon">🔍</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar no guia…"
              className="search-dialog-input"
            />
            {query && (
              <button
                className="search-dialog-clear"
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
          <button
            className="search-dialog-close"
            onClick={onClose}
            aria-label="Fechar busca"
          >
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="search-dialog-body">
          {debouncedQuery.trim().length === 0 && (
            <div className="search-dialog-empty">
              <div className="search-dialog-empty-icon">🔍</div>
              <div className="search-dialog-empty-text">
                Digite para buscar termos, definições e analogias
              </div>
            </div>
          )}

          {debouncedQuery.trim().length > 0 && results.length === 0 && (
            <div className="search-dialog-empty">
              <div className="search-dialog-empty-text">
                Nenhum resultado encontrado para "<strong>{debouncedQuery}</strong>"
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="search-dialog-results">
              {results.map((result) => (
                <button
                  key={result.id}
                  className="search-dialog-result"
                  onClick={() => handleSelect(result)}
                >
                  <span className="search-result-icon">
                    {result.type === 'glossário' ? '📚' : '💡'}
                  </span>
                  <div className="search-result-content">
                    <div className="search-result-label">
                      {highlightMatch(result.label, debouncedQuery)}
                    </div>
                    <div className="search-result-snippet">
                      {highlightMatch(result.snippet, debouncedQuery)}
                    </div>
                  </div>
                  <span className="search-result-type">
                    {result.type === 'glossário' ? 'Glossário' : 'Analogia'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="search-dialog-footer">
          <span>ESC</span> fechar · <span>↑↓</span> navegar
        </div>
      </div>
    </div>
  );
}
