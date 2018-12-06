/* eslint no-undef: 0 */
import { take, takeAll } from '../take';

describe('take functions', () => {
  describe('take', () => {
    test('should return expected result array', () => {
      expect(take(1, testArr)).toEqual([1]);
      expect(take(5, testArr)).toEqual([1, 2]);
      expect(take(1, testObj)).toEqual([1]);
      expect(take(1, testMap)).toEqual([['a', 1]]);
      expect(take(2, testSet)).toEqual([1, 2]);
      expect(take(2, undefined)).toEqual([]);
    });
    test('should work with iterator that created by generator', () => {
      expect(take(2, (function* (coll) {
        for (const v of coll.values()) yield v;
      }([1, 2, 3])))).toEqual([1, 2]);
    });
    test('should return expected result string', () => {
      expect(take(2, 'hello')).toBe('he');
      expect(take(10, 'hello')).toBe('hello');
      expect(take(10, '')).toBe('');
    });
  });
  describe('takeAll', () => {
    test('should return expected result array', () => {
      expect(takeAll(testArr)).toEqual([1, 2]);
      expect(takeAll(testObj)).toEqual([1, 2]);
      expect(takeAll(testMap)).toEqual([['a', 1], ['b', 2]]);
      expect(takeAll(testSet)).toEqual([1, 2]);
    });
    test('should return expected result string', () => {
      expect(takeAll('hello')).toBe('hello');
    });
  });
});
