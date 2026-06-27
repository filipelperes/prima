// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDragScroll } from './useDragScroll';

/* ───────── Helpers ───────── */

function createPointerEvent(overrides: Partial<React.PointerEvent> = {}): React.PointerEvent {
  return {
    button: 0,
    clientX: 0,
    pointerId: 1,
    preventDefault: vi.fn(),
    ...overrides,
  } as unknown as React.PointerEvent;
}

function mountWithElement() {
  const { result } = renderHook(() => useDragScroll());
  const el = document.createElement('div');
  el.scrollLeft = 0;
  el.setPointerCapture = vi.fn();
  (result.current.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  return { result, el };
}

/* ───────── Tests ───────── */

describe('useDragScroll', () => {
  it('initializes with isDragging false', () => {
    const { result } = renderHook(() => useDragScroll());
    expect(result.current.isDragging).toBe(false);
  });

  it('sets isDragging true on primary button pointer down', () => {
    const { result } = mountWithElement();

    act(() => {
      result.current.handlers.onPointerDown(createPointerEvent({ clientX: 100 }));
    });

    expect(result.current.isDragging).toBe(true);
  });

  it('calls setPointerCapture with the pointer id', () => {
    const { result, el } = mountWithElement();

    act(() => {
      result.current.handlers.onPointerDown(createPointerEvent({ pointerId: 7 }));
    });

    expect(el.setPointerCapture).toHaveBeenCalledWith(7);
  });

  it('sets isDragging false on pointer up', () => {
    const { result } = mountWithElement();

    act(() => { result.current.handlers.onPointerDown(createPointerEvent()); });
    expect(result.current.isDragging).toBe(true);

    act(() => { result.current.handlers.onPointerUp(); });
    expect(result.current.isDragging).toBe(false);
  });

  it('sets isDragging false on pointer cancel', () => {
    const { result } = mountWithElement();

    act(() => { result.current.handlers.onPointerDown(createPointerEvent()); });
    expect(result.current.isDragging).toBe(true);

    act(() => { result.current.handlers.onPointerCancel(); });
    expect(result.current.isDragging).toBe(false);
  });

  it('ignores non-primary button (button !== 0)', () => {
    const { result } = mountWithElement();

    act(() => {
      result.current.handlers.onPointerDown(createPointerEvent({ button: 2 }));
    });

    expect(result.current.isDragging).toBe(false);
    expect(result.current.ref.current?.setPointerCapture).not.toHaveBeenCalled();
  });

  it('does nothing on pointer move when not dragging', () => {
    const { result, el } = mountWithElement();

    el.scrollLeft = 50;
    act(() => {
      result.current.handlers.onPointerMove(createPointerEvent({ clientX: 200 }));
    });

    expect(el.scrollLeft).toBe(50);
  });

  it('scrolls left when dragging leftwards', () => {
    const { result, el } = mountWithElement();

    el.scrollLeft = 0;

    act(() => { result.current.handlers.onPointerDown(createPointerEvent({ clientX: 200 })); });
    act(() => { result.current.handlers.onPointerMove(createPointerEvent({ clientX: 100 })); });

    // startScrollLeft(0) - (100 - 200) = 0 - (-100) = 100
    expect(el.scrollLeft).toBe(100);
  });

  it('scrolls right when dragging rightwards', () => {
    const { result, el } = mountWithElement();

    el.scrollLeft = 200;

    act(() => { result.current.handlers.onPointerDown(createPointerEvent({ clientX: 100 })); });
    act(() => { result.current.handlers.onPointerMove(createPointerEvent({ clientX: 200 })); });

    // startScrollLeft(200) - (200 - 100) = 200 - 100 = 100
    expect(el.scrollLeft).toBe(100);
  });

  it('calls preventDefault on pointer move', () => {
    const { result } = mountWithElement();
    const preventDefault = vi.fn();

    act(() => { result.current.handlers.onPointerDown(createPointerEvent()); });
    act(() => {
      result.current.handlers.onPointerMove(createPointerEvent({ preventDefault }));
    });

    expect(preventDefault).toHaveBeenCalled();
  });

  it('does nothing on pointer down when ref is null', () => {
    const { result } = renderHook(() => useDragScroll());

    act(() => {
      result.current.handlers.onPointerDown(createPointerEvent({ clientX: 100 }));
    });

    expect(result.current.isDragging).toBe(false);
  });

  it('maintains stable handler references across renders', () => {
    const { result, rerender } = renderHook(() => useDragScroll());

    const handlers1 = result.current.handlers;
    rerender();
    const handlers2 = result.current.handlers;

    expect(handlers1.onPointerDown).toBe(handlers2.onPointerDown);
    expect(handlers1.onPointerMove).toBe(handlers2.onPointerMove);
    expect(handlers1.onPointerUp).toBe(handlers2.onPointerUp);
    expect(handlers1.onPointerCancel).toBe(handlers2.onPointerCancel);
  });

  it('does not scroll on pointer move after pointer up', () => {
    const { result, el } = mountWithElement();

    act(() => { result.current.handlers.onPointerDown(createPointerEvent({ clientX: 200 })); });
    act(() => { result.current.handlers.onPointerUp(); });

    el.scrollLeft = 0;
    act(() => {
      result.current.handlers.onPointerMove(createPointerEvent({ clientX: 50 }));
    });

    expect(el.scrollLeft).toBe(0);
  });
});
