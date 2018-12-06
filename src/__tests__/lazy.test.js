/* eslint no-undef: 0 */
import { L } from '../lazy';
import { isIterable } from '../validation';
import { identity } from '../common';

describe('lazy functions', () => {
  describe('L.loop', () => {
    test('should work as expected', () => {
      const iter = L.loop(identity, testObj);
      expect(isIterable(iter)).toBe(true);
      expect(iter.next()).toEqual({ value: 1, done: false });
      expect(iter.next()).toEqual({ value: 2, done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
    test('should work as expected', () => {
      const sideEffect = [];
      const iter = L.loop(v => v && sideEffect.push(v), testObj);
      expect(isIterable(iter)).toBe(true);
      iter.next();
      expect(sideEffect).toEqual([1]);
      iter.next();
      expect(sideEffect).toEqual([1, 2]);
      iter.next();
      expect(sideEffect).toEqual([1, 2]);
    });
  });

  describe('L.filter', () => {
    test('should work as expected', () => {
      const iter = L.filter(v => v > 1, testObj);
      expect(isIterable(iter)).toBe(true);
      expect(iter.next()).toEqual({ value: 2, done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
  });
});
