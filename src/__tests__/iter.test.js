import {
  iterValues,
  iterEntries,
} from '../iter';
import { isIterable } from '../validation';

describe('iter functions', () => {
  describe('iterValues', () => {
    test('should work as expected', () => {
      const iter = iterValues({ name: 'alex', age: 7 });
      expect(isIterable(iter)).toBe(true);
      expect(iter.next()).toEqual({ value: 'alex', done: false });
      expect(iter.next()).toEqual({ value: 7, done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
  });
  describe('iterEntries', () => {
    test('should work as expected', () => {
      const iter = iterEntries({ name: 'alex', age: 7 });
      expect(isIterable(iter)).toBe(true);
      expect(iter.next()).toEqual({ value: ['name', 'alex'], done: false });
      expect(iter.next()).toEqual({ value: ['age', 7], done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
  });
});
