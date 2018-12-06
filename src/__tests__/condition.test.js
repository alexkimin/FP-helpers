/* eslint no-undef: 0 */
import {
  ifElse, and, or, not, allTrue, anyTrue, eq,
} from '../condition';

describe('condition functions', () => {
  describe('ifElse', () => {
    test('should return true onTure case if the predicate is ture', () => {
      expect(ifElse(() => true, () => 'onTrue', () => 'onFalse')(1)).toBe('onTrue');
    });
    test('should return true onTure case if the predicate is ture', () => {
      expect(ifElse(() => true, [n => n * 2, n => n * 2], [n => n * 0])(1)).toBe(4);
    });
    test('should return true onFalse case if the predicate is false', () => {
      expect(ifElse(() => false, [n => n * 2, n => n * 2], [n => n * 0])(1)).toBe(0);
    });
    test('should return true identity case if the predicate is false and no argument', () => {
      expect(ifElse(() => false, [n => n * 2, n => n * 2])(1)).toBe(1);
    });
    test('should return undefined if the predicate is not a function', () => {
      expect(ifElse(true, () => true, () => true)(1)).toBe(undefined);
    });
  });

  describe('Logical operators', () => {
    test('and', () => {
      expect(and(true, true)).toBe(true);
      expect(and(true, false)).toBe(false);
    });
    test('or', () => {
      expect(or(true, false)).toBe(true);
      expect(or(false, true)).toBe(true);
    });
    test('not', () => {
      expect(not(true)).toBe(false);
    });
    test('eq', () => {
      expect(eq(true, true)).toBe(true);
      expect(eq(true, 1)).toBe(false);
    });
  });

  describe('allTrue', () => {
    test('should work as expected', () => {
      expect(allTrue(true, s => !!s)('hello')).toBe(true);
      expect(allTrue(true, () => false)('hello')).toBe(false);
    });
  });
  describe('anyTrue', () => {
    test('should work as expected', () => {
      expect(anyTrue(false, s => !!s)('hello')).toBe(true);
      expect(anyTrue(false, () => false)('hello')).toBe(false);
    });
  });
});
