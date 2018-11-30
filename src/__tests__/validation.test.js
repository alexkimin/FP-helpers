import {
  isIterable,
  isPromise,
  isFunctor,
  isGenerator,
  isArrayLike,
} from '../validation';

describe('valdation functions', () => {
  describe('isIterable', () => {
    function* gen(){
      yield* ['a', 'b', 'c'];
    }
    const generatorObject = gen();
    test('should return false', () => {
      expect(isIterable({})).toBe(false);
      expect(isIterable({
        0: 1,
        1: 2,
        length: 2,
      })).toBe(false);
      expect(isIterable(undefined)).toBe(false);
      expect(isIterable(null)).toBe(false);
      expect(isIterable(12)).toBe(false);
      expect(isIterable(Function)).toBe(false);
      expect(isIterable(Promise)).toBe(false);
      expect(isIterable(gen)).toBe(false);
    });
    test('should return true', () => {
      expect(isIterable([])).toBe(true);
      expect(isIterable(new Map())).toBe(true);
      expect(isIterable(new Set())).toBe(true);
      expect(isIterable('hello')).toBe(true);
      expect(isIterable(generatorObject)).toBe(true);
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

  describe('isGenerator', () => {
    test('should return true', () => {
      expect(isGenerator(function* () {})).toBe(true);
    });
    test('should return false', () => {
      expect(isGenerator(function() {})).toBe(false);
      expect(isGenerator({})).toBe(false);
      expect(isGenerator('hello')).toBe(false);
      expect(isGenerator(undefined)).toBe(false);
      expect(isGenerator(null)).toBe(false);
    });
  });

  describe('isArrayLike', () => {
    test('should return true', () => {
      expect(isArrayLike({
        0: 1,
        length: 1,
      })).toBe(true);
    });
    test('should return false', () => {
      expect(isArrayLike({})).toBe(false);
    });
  });

  describe('isFunctor', () => {
    test('should return true', () => {
      expect(isFunctor({})).toBe(true);
      expect(isFunctor([])).toBe(true);
      expect(isFunctor(() => {})).toBe(true);
      expect(isFunctor(Promise)).toBe(true);
      expect(isFunctor(new Map())).toBe(true);
    });
    test('should return false', () => {
      expect(isFunctor(new Set())).toBe(false);
      expect(isFunctor('hello')).toBe(false);
    });
  });
});
