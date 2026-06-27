import { useCallback, useRef, useState } from 'react';

/* ───────── Types ───────── */

interface DragScrollState {
  isDown: boolean;
  startX: number;
  startScrollLeft: number;
}

interface UseDragScrollReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: () => void;
    onPointerCancel: () => void;
  };
}

/* ───────── Hook ───────── */

/**
 * Hook que habilita drag-to-scroll horizontal em qualquer container
 * com overflow horizontal (overflow-x-auto / overflow-x-scroll).
 *
 * Funciona tanto em desktop (mouse) quanto mobile (touch) via
 * Pointer Events API, que unifica os dois inputs.
 *
 * Uso:
 * ```tsx
 * const { ref, isDragging, handlers } = useDragScroll();
 *
 * return (
 *   <div
 *     ref={ref}
 *     {...handlers}
 *     className={isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}
 *   >
 *     {children}
 *   </div>
 * );
 * ```
 */
export function useDragScroll(): UseDragScrollReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragScrollState>({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Apenas botão primário (左)
    if (e.button !== 0) return;

    const el = ref.current;
    if (!el) return;

    const s = dragState.current;
    s.isDown = true;
    s.startX = e.clientX;
    s.startScrollLeft = el.scrollLeft;

    el.setPointerCapture(e.pointerId);
    setIsDragging(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = dragState.current;
    if (!s.isDown) return;

    const el = ref.current;
    if (!el) return;

    e.preventDefault();
    const delta = e.clientX - s.startX;
    el.scrollLeft = s.startScrollLeft - delta;
  }, []);

  const onPointerUp = useCallback(() => {
    dragState.current.isDown = false;
    setIsDragging(false);
  }, []);

  const onPointerCancel = useCallback(() => {
    dragState.current.isDown = false;
    setIsDragging(false);
  }, []);

  return {
    ref,
    isDragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}
