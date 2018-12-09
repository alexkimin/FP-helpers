/* eslint no-undef: 0 */
import { memoize } from '../memoize';

describe('memoize function', () => {
  test('memoize', () => {
    const add = memoize((a, b) => a + b);
    expect(add(1, 2)).toBe(3);
    expect(add(1, 2)).toBe(3);
    expect(add.cache.size).toBe(1);
    expect(add.cache).toEqual(new Map([[JSON.stringify([1, 2]), 3]]));
  });
});
