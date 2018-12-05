import {
  ifElse,
  and,
  or,
  not,
  allTrue,
  anyTrue,
} from '../condition';

describe('condition functions', () => {
  describe('ifElse', () => {
    test('should return true onTure case if the predicate is ture', () => {
      expect(ifElse(
        () => true,
        () => 'onTrue',
        () => 'onFalse',
      )(1)).toBe('onTrue');
    });
    test('should return true onTure case if the predicate is ture', () => {
      expect(ifElse(
        () => true,
        [n => n * 2, n => n * 2],
        [n => n * 0],
      )(1)).toBe(4);
    });
  });

  describe('Logical operators', () => {
    test('and', () => {
      expect(and(true, true)).toBe(true);
      expect(and(true, false)).toBe(false);
    });
    test('or', () => {
      expect(or(true, false)).toBe(true);
    });
    test('not', () => {
      expect(not(true)).toBe(false);
      expect(not(() => true)).toBe(false);
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
