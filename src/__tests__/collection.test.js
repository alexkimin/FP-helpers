/* eslint no-undef: 0 */
import { flatten, reverse, keys } from '../collection';

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
      expect(reverse(arrLikeObj)).toEqual([2, 1]);
      expect(reverse(testObj)).toEqual([2, 1]);
    });
    test('should return reversed string', () => {
      expect(reverse('ab')).toEqual('ba');
    });
    test('should return array if the arg is not a collection', () => {
      expect(reverse(12)).toEqual([]);
    });
  });
  describe('keys', () => {
    test('should return arraylike keys', () => {
      expect(keys(arrLikeObj)).toEqual(['0', '1']);
    });
    test('should return iterable keys', () => {
      expect(keys(testArr)).toEqual([0, 1]);
      expect(keys(testMap)).toEqual(['a', 'b']);
    });
    test('should return object keys', () => {
      expect(keys(testObj)).toEqual(['a', 'b']);
    });
  });
});
