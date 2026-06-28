import { useCallback, useRef, useState } from 'react';

/* ───────── Constants ───────── */

/**
 * Distância mínima em pixels que o ponteiro precisa se mover
 * para considerar que houve um arrasto (e não apenas um clique).
 */
const MOVE_THRESHOLD = 5;

/* ───────── Types ───────── */

interface DragScrollState {
  isDown: boolean;
  startX: number;
  startScrollLeft: number;
}

interface UseDragScrollReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  /** Se o usuário está com o botão pressionado (usado para feedback visual) */
  isDragging: boolean;
  /** Se houve movimento efetivo de arrasto (usado para distinguir clique vs arrasto) */
  didDrag: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
  };
}

/* ───────── Hook ───────── */

/**
 * Hook que habilita drag-to-scroll horizontal em qualquer container
 * com overflow horizontal (overflow-x-auto / overflow-x-scroll).
 *
 * Diferentemente de implementações com setPointerCapture, esta versão
 * escuta pointermove/pointerup no window para evitar que o clique
 * (click event) seja redirecionado ao container ao invés do botão filho.
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
  const [didDrag, setDidDrag] = useState(false);

  const dragState = useRef<DragScrollState>({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const hasMovedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Apenas botão primário
    if (e.button !== 0) return;

    const el = ref.current;
    if (!el) return;

    const s = dragState.current;
    s.isDown = true;
    s.startX = e.clientX;
    s.startScrollLeft = el.scrollLeft;
    hasMovedRef.current = false;

    setIsDragging(true);

    const pid = e.pointerId;
    pointerIdRef.current = pid;

    const onPointerMove = (ev: PointerEvent) => {
      if (ev.pointerId !== pid) return;
      const st = dragState.current;
      if (!st.isDown) return;

      ev.preventDefault();
      const delta = ev.clientX - st.startX;

      if (Math.abs(delta) > MOVE_THRESHOLD) {
        hasMovedRef.current = true;
      }

      ref.current!.scrollLeft = st.startScrollLeft - delta;
    };

    const onPointerUp = () => {
      dragState.current.isDown = false;
      setDidDrag(hasMovedRef.current);
      setIsDragging(false);
      pointerIdRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    const onPointerCancel = () => {
      dragState.current.isDown = false;
      setIsDragging(false);
      pointerIdRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
  }, []);

  return {
    ref,
    isDragging,
    didDrag,
    handlers: {
      onPointerDown,
    },
  };
}
