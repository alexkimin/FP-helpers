import { Iter } from '../iter';
import { isIterable } from '../validation';

describe('iter functions', () => {
  describe('Iter.values', () => {
    test('should work as expected', () => {
      const iter = Iter.values({ name: 'alex', age: 7 });
      expect(isIterable(iter)).toBe(true);
      expect(iter.next()).toEqual({ value: 'alex', done: false });
      expect(iter.next()).toEqual({ value: 7, done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
  });
  describe('Iter.entries', () => {
    test('should work as expected', () => {
      const iter = Iter.entries({ name: 'alex', age: 7 });
      expect(isIterable(iter)).toBe(true);
      expect(iter.next()).toEqual({ value: ['name', 'alex'], done: false });
      expect(iter.next()).toEqual({ value: ['age', 7], done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
  });
  describe('Iter.keys', () => {
    test('should work as expected', () => {
      const iter = Iter.keys({ name: 'alex', age: 7 });
      expect(isIterable(iter)).toBe(true);
      expect(iter.next()).toEqual({ value: 'name', done: false });
      expect(iter.next()).toEqual({ value: 'age', done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });
  });
});
