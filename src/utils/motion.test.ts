import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp01,
  computeScrollProgress,
  easeOutCubic,
  interpolateCount,
} from './motion';

test('clamp01 bounds values cleanly and guards non-finite inputs', () => {
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(0.42), 0.42);
  assert.equal(clamp01(2.5), 1);
  assert.equal(clamp01(Number.NaN), 0);
});

test('computeScrollProgress returns normalized 0..1 reading progress', () => {
  assert.equal(computeScrollProgress(0, 3000, 1000), 0);
  assert.equal(computeScrollProgress(1000, 3000, 1000), 0.5);
  assert.equal(computeScrollProgress(2000, 3000, 1000), 1);
  assert.equal(computeScrollProgress(2500, 3000, 1000), 1);
  assert.equal(computeScrollProgress(100, 800, 900), 0);
});

test('easeOutCubic and interpolateCount progress monotonically to target', () => {
  assert.equal(easeOutCubic(0), 0);
  assert.ok(easeOutCubic(0.5) > 0.5);
  assert.equal(easeOutCubic(1), 1);

  assert.equal(interpolateCount(27, 0), 0);
  assert.ok(interpolateCount(27, 0.5) >= 20 && interpolateCount(27, 0.5) < 27);
  assert.equal(interpolateCount(27, 1), 27);
  assert.equal(interpolateCount(-5, 0.5), 0);
});
