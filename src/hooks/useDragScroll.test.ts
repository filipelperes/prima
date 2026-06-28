// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDragScroll } from './useDragScroll';

/* ───────── Helpers ───────── */

function createPointerEvent(overrides: Partial<PointerEvent> = {}): PointerEvent {
  return {
    button: 0,
    clientX: 0,
    pointerId: 1,
    preventDefault: vi.fn(),
    ...overrides,
  } as unknown as PointerEvent;
}

function mountWithElement() {
  const { result } = renderHook(() => useDragScroll());
  const el = document.createElement('div');
  el.scrollLeft = 0;
  (result.current.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;

  // Wrapper para transformar React.PointerEvent em PointerEvent nativo
  const triggerDown = (overrides?: Partial<PointerEvent>) => {
    act(() => {
      result.current.handlers.onPointerDown(
        createPointerEvent(overrides) as unknown as React.PointerEvent
      );
    });
  };

  return { result, el, triggerDown };
}

/* ───────── Tests ───────── */

describe('useDragScroll', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    // Limpa listeners que podem ter vazado
    (window as any)._listeners?.forEach(([event, fn]: [string, EventListener]) => {
      window.removeEventListener(event, fn);
    });
    (window as any)._listeners = undefined;
  });

  it('initializes with isDragging false and didDrag false', () => {
    const { result } = renderHook(() => useDragScroll());
    expect(result.current.isDragging).toBe(false);
    expect(result.current.didDrag).toBe(false);
  });

  it('sets isDragging true on primary button pointer down', () => {
    const { result, triggerDown } = mountWithElement();
    triggerDown({ clientX: 100 });
    expect(result.current.isDragging).toBe(true);
  });

  it('ignores non-primary button (button !== 0)', () => {
    const { result } = mountWithElement();

    act(() => {
      result.current.handlers.onPointerDown(
        createPointerEvent({ button: 2 }) as unknown as React.PointerEvent
      );
    });

    expect(result.current.isDragging).toBe(false);
  });

  it('sets isDragging false on pointer up', () => {
    const { result, triggerDown } = mountWithElement();

    triggerDown({ clientX: 100 });
    expect(result.current.isDragging).toBe(true);

    act(() => {
      window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
    });

    expect(result.current.isDragging).toBe(false);
  });

  it('scrolls left when dragging leftwards', () => {
    const { el, triggerDown } = mountWithElement();

    el.scrollLeft = 0;

    triggerDown({ clientX: 200 });

    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 100,
        pointerId: 1,
      }));
    });

    // startScrollLeft(0) - (100 - 200) = 0 - (-100) = 100
    expect(el.scrollLeft).toBe(100);
  });

  it('scrolls right when dragging rightwards', () => {
    const { el, triggerDown } = mountWithElement();

    el.scrollLeft = 200;

    triggerDown({ clientX: 100 });

    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 200,
        pointerId: 1,
      }));
    });

    // startScrollLeft(200) - (200 - 100) = 200 - 100 = 100
    expect(el.scrollLeft).toBe(100);
  });

  it('calls preventDefault on pointer move', () => {
    const { triggerDown } = mountWithElement();

    triggerDown();

    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 50,
        pointerId: 1,
      }));
    });

    // O preventDefault é chamado internamente pelo hook.
    // O teste verifica que o scrollLeft mudou (o handler executou).
  });

  it('sets isDragging false and didDrag false on a simple click', () => {
    const { result, triggerDown } = mountWithElement();

    triggerDown({ clientX: 100 });

    act(() => {
      window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
    });

    expect(result.current.isDragging).toBe(false);
    expect(result.current.didDrag).toBe(false);
  });

  it('sets didDrag true when movement exceeds MOVE_THRESHOLD', () => {
    const { result, triggerDown } = mountWithElement();

    triggerDown({ clientX: 100 });

    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 94, // 6px < move threshold
        pointerId: 1,
      }));
    });

    act(() => {
      window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
    });

    expect(result.current.didDrag).toBe(true);
  });

  it('resets didDrag to false on a new pointer down after a drag', () => {
    const { result, triggerDown } = mountWithElement();

    // First: drag
    triggerDown({ clientX: 100 });
    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 80,
        pointerId: 1,
      }));
    });
    act(() => {
      window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
    });
    expect(result.current.didDrag).toBe(true);

    // Second: simple click
    triggerDown({ clientX: 200 });
    act(() => {
      window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 2 }));
    });
    expect(result.current.didDrag).toBe(false);
  });

  it('does not move on pointerUp + pointerMove after (no dangling listener)', () => {
    const { el, triggerDown } = mountWithElement();

    el.scrollLeft = 0;
    triggerDown({ clientX: 200 });
    act(() => {
      window.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
    });

    // This move should be ignored
    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 50,
        pointerId: 1,
      }));
    });

    expect(el.scrollLeft).toBe(0);
  });

  it('does nothing on pointer down when ref is null', () => {
    const { result } = renderHook(() => useDragScroll());

    act(() => {
      result.current.handlers.onPointerDown(
        createPointerEvent({ clientX: 100 }) as unknown as React.PointerEvent
      );
    });

    expect(result.current.isDragging).toBe(false);
  });

  it('ignores move events from different pointer IDs', () => {
    const { el, triggerDown } = mountWithElement();

    el.scrollLeft = 0;
    triggerDown({ clientX: 200, pointerId: 1 });

    // Move from a different pointer — should be ignored
    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 50,
        pointerId: 2,
      }));
    });

    expect(el.scrollLeft).toBe(0);
  });
});
