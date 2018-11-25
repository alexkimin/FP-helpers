import {
  isFunction,
  isIterable,
  isPromise,
} from '../validation';

describe('valdation functions', () => {
  describe('isFunction', () => {
    test('should return true if all arg is a function type', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(() => {}, () => {}, () => {})).toBe(true);
    });
    test('should return false if any arg is not a function type', () => {
      expect(isFunction(() => {}, () => {}, 'hello', () => {})).toBe(false);
    });
  });

  describe('isIterable', () => {
    test('should return false', () => {
      expect(isIterable({})).toBe(false);
      expect(isIterable(undefined)).toBe(false);
      expect(isIterable(null)).toBe(false);
      expect(isIterable(12)).toBe(false);
    });
    test('should return true', () => {
      expect(isIterable([])).toBe(true);
      expect(isIterable(new Map())).toBe(true);
      expect(isIterable(new Set())).toBe(true);
      expect(isIterable('hello')).toBe(true);
    });
  });

  describe('isPromise', () => {
    test('should return true', () => {
      const test = () => new Promise(resolve => setTimeout(() => resolve(), 2000));
      expect(isPromise(test())).toBe(true);
    });
    test('should return false', () => {
      expect(isPromise({})).toBe(false);
    });
  });
});
