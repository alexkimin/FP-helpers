/* eslint no-undef: 0 */
import {
  isPlainObject,
  isIterable,
  isPromise,
  isFunctor,
  isGenerator,
  isArrayLike,
  hasMethod,
} from '../validation';

describe('valdation functions', () => {
  describe('isPlainObject', () => {
    test('should return true', () => {
      expect(isPlainObject({})).toBe(true);
    });
    test('should return false', () => {
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(new Map())).toBe(false);
      expect(isPlainObject(new Set())).toBe(false);
      expect(isPlainObject(() => { })).toBe(false);
      expect(isPlainObject(new String('hello'))).toBe(false);
      expect(isPlainObject(new Number(1))).toBe(false);
      expect(isPlainObject(undefined)).toBe(false);
      expect(isPlainObject(null)).toBe(false);
    });
  });

  describe('isArrayLike', () => {
    test('should return true', () => {
      expect(isArrayLike(argumentObj)).toBe(true);
      expect(isArrayLike(arrLikeObj)).toBe(true);
      expect(isArrayLike([])).toBe(true);
    });
    test('should return false', () => {
      expect(isArrayLike({})).toBe(false);
    });
  });

  describe('isIterable', () => {
    test('should return false', () => {
      expect(isIterable({})).toBe(false);
      expect(isIterable(arrLikeObj)).toBe(false);
      expect(isIterable(undefined)).toBe(false);
      expect(isIterable(null)).toBe(false);
      expect(isIterable(12)).toBe(false);
      expect(isIterable(Function)).toBe(false);
      expect(isIterable(Promise)).toBe(false);
      expect(isIterable(generator)).toBe(false);
    });
    test('should return true', () => {
      expect(isIterable([])).toBe(true);
      expect(isIterable(argumentObj)).toBe(true);
      expect(isIterable(new Map())).toBe(true);
      expect(isIterable(new Set())).toBe(true);
      expect(isIterable('hello')).toBe(true);
      expect(isIterable(generatorObject)).toBe(true);
    });
  });

  describe('isPromise', () => {
    test('should return true', () => {
      expect(isPromise(promiseFn())).toBe(true);
    });
    test('should return false', () => {
      expect(isPromise(Promise)).toBe(false);
      expect(isPromise({})).toBe(false);
    });
  });

  describe('isGenerator', () => {
    test('should return true', () => {
      expect(isGenerator(generator)).toBe(true);
    });
    test('should return false', () => {
      expect(isGenerator(() => { })).toBe(false);
      expect(isGenerator(promiseFn())).toBe(false);
      expect(isGenerator(argumentObj)).toBe(false);
      expect(isGenerator({})).toBe(false);
      expect(isGenerator('hello')).toBe(false);
      expect(isGenerator(undefined)).toBe(false);
      expect(isGenerator(null)).toBe(false);
    });
  });

  describe('isFunctor', () => {
    test('should return true', () => {
      expect(isFunctor({})).toBe(true);
      expect(isFunctor(generatorObject)).toBe(true);
      expect(isFunctor([])).toBe(true);
      expect(isFunctor(() => { })).toBe(true);
      expect(isFunctor(generator)).toBe(true);
      expect(isFunctor(Promise)).toBe(true);
      expect(isFunctor(new Map())).toBe(true);
    });
    test('should return false', () => {
      expect(isFunctor(new Set())).toBe(false);
      expect(isFunctor(new Set())).toBe(false);
      expect(isFunctor('hello')).toBe(false);
      expect(isFunctor(String('hello'))).toBe(false);
    });
  });

  describe('hasMethod', () => {
    test('should return true', () => {
      expect(hasMethod(testObj, 'hasOwnProperty')).toBe(true);
    });
    test('should return false', () => {
      expect(hasMethod(testObj, 'forEach')).toBe(false);
    });
  });
});
