// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

const STORAGE_KEY = 'theme';

beforeEach(() => {
  // Clear localStorage and reset DOM state before each test
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.remove('light');
});

describe('useTheme', () => {
  it('initializes with dark theme by default when localStorage is empty', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('reads theme from localStorage when available', () => {
    localStorage.setItem(STORAGE_KEY, 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles from dark to light', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggle();
    });

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');
  });

  it('toggles from light to dark', () => {
    localStorage.setItem(STORAGE_KEY, 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggle();
    });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  it('persists theme to localStorage on toggle', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggle();
    });
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');

    act(() => {
      result.current.toggle();
    });
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  it('applies the correct class to documentElement on toggle', () => {
    const { result } = renderHook(() => useTheme());

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('handles localStorage.setItem throwing (privacy mode)', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('localStorage unavailable');
    });
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useTheme());

    // Toggle should not throw even if localStorage fails
    act(() => {
      result.current.toggle();
    });

    expect(result.current.theme).toBe('light');
    expect(setItemSpy).toHaveBeenCalled();

    setItemSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('handles localStorage.getItem throwing', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('localStorage unavailable');
    });

    const { result } = renderHook(() => useTheme());
    // Falls back to 'dark'
    expect(result.current.theme).toBe('dark');

    getItemSpy.mockRestore();
  });

  it('maintains stable toggle reference', () => {
    const { result } = renderHook(() => useTheme());
    const firstToggle = result.current.toggle;
    act(() => {
      result.current.toggle();
    });
    expect(result.current.toggle).toBe(firstToggle);
  });

  it('returns theme and toggle as const tuple', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('toggle');
    expect(typeof result.current.theme).toBe('string');
    expect(typeof result.current.toggle).toBe('function');
  });
});
