import {
  curry,
  curryR,
  curryRR,
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
    test('should work as expected', () => {
      const add = (a, b) => (...c) => a(...c) + b(...c);
      const curriedAdd = curry(add);
      expect(
        curriedAdd(
          (n, k) => n + k + 2,
          (n, k) => n + k + 2,
        )(3, 2),
      ).toBe(14);
    });
  });
  describe('curryR', () => {
    test('should work as expected', () => {
      const addAndMult = (a, b, c) => a * b + c;
      const curried = curryR(addAndMult);
      expect(curried(1, 2, 3)).toBe(5);
      expect(curried(1, 2)(3)).toBe(5);
      expect(curried(1)(2, 3)).toBe(7);
      expect(curried(1)(2)(3)).toBe(7);
    });
  });
  describe('curryRR', () => {
    test('should work as expected', () => {
      const addAndMult = (a, b, c) => a * b + c;
      const curried = curryRR(addAndMult);
      expect(curried(1, 2, 3)).toBe(7);
      expect(curried(1, 2)(3)).toBe(7);
      expect(curried(1)(2, 3)).toBe(7);
      expect(curried(1)(2)(3)).toBe(7);
    });
  });
});
