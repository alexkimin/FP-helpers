import {
  curry,
  curryR,
} from '../curry';

describe('curry functions', () => {
  describe('curry', () => {
    test('should work as expected', () => {
      const add = (a, b, c) => a + b + c;
      const curriedAdd = curry(add);
      expect(curriedAdd(1, 2, 3)).toBe(6);
      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1)(2, 3)).toBe(6);
      expect(curriedAdd(1)(2)(3)).toBe(6);
    });
  });
  describe('curryR', () => {
    test('should work as expected', () => {
      const addAndMult = (a, b, c) => a * b + c;
      const curried = curryR(addAndMult);
      expect(curried(1, 2, 3)).toBe(7);
      expect(curried(1, 2)(3)).toBe(7);
      expect(curried(1)(2, 3)).toBe(7);
      expect(curried(1)(2)(3)).toBe(7);
    });
  });

});