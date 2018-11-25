import {
  flatten,
} from '../list';

describe('list functions', () => {
  describe('flatten', () => {
    test('should return flattened array width 1 depth', () => {
      expect(flatten([1, [2]])).toEqual([1, 2]);
      expect(flatten([1, [2], [[3]]])).toEqual([1, 2, [3]]);
    });
    test('should return flattened array with desired depth', () => {
      expect(flatten([1, [2], [[3]]], 2)).toEqual([1, 2, 3]);
    });
  });
});
