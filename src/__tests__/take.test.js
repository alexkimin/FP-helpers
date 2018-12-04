import {
  take,
} from '../take';

describe('take functions', () => {
  describe('take', () => {
    test('should return expected result array', () => {
      expect(take(2, [1, 2, 3, 4])).toEqual([1, 2]);
      expect(take(5, [1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(take(1, { name: 'alex', gender: 'M' })).toEqual(['alex']);
      expect(take(1, new Map([[1, true], [2, false]]))).toEqual([[1, true]]);
      expect(take(2, new Set([1, 2, 3, 4]))).toEqual([1, 2]);
    });
    test('should return expected result string', () => {
      expect(take(2, 'hello')).toBe('he');
      expect(take(10, 'hello')).toBe('hello');
    });
  });
});
