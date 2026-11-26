/**
 * Pure motion & scroll-math helpers for deterministic, 60fps UI transitions.
 */

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

export function computeScrollProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number
): number {
  const maxScroll = scrollHeight - viewportHeight;
  if (!Number.isFinite(maxScroll) || maxScroll <= 0) return 0;
  return clamp01(scrollY / maxScroll);
}

export function easeOutCubic(t: number): number {
  const clamped = clamp01(t);
  return 1 - Math.pow(1 - clamped, 3);
}

export function interpolateCount(target: number, progress: number): number {
  if (!Number.isFinite(target) || target <= 0) return 0;
  const eased = easeOutCubic(progress);
  return Math.round(target * eased);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
