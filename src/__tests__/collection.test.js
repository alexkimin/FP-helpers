import {
  flatten,
  reverse,
} from '../collection';

describe('collection functions', () => {
  describe('flatten', () => {
    test('should return flattened array width 1 depth', () => {
      expect(flatten([1, [2]])).toEqual([1, 2]);
      expect(flatten([1, [2], [[3]]])).toEqual([1, 2, [3]]);
    });
    test('should return flattened array with desired depth', () => {
      expect(flatten([1, [2], [[3]]], 2)).toEqual([1, 2, 3]);
    });
  });
  describe('reverse', () => {
    test('should return reversed array with values', () => {
      expect(reverse(testArr)).toEqual([2, 1]);
      expect(reverse(testSet)).toEqual([2, 1]);
      expect(reverse(testMap)).toEqual([['b', 2], ['a', 1]]);
      expect(reverse(arrLike)).toEqual([2, 1]);
      expect(reverse(arrLikeObj)).toEqual([2, 1]);
      expect(reverse(testObj)).toEqual([2, 1]);
    });
    test('should return reversed string', () => {
      expect(reverse('ab')).toEqual('ba');
    });
  });
});
