import {
  apply,
  call,
  then,
} from '../apply';

describe('application functions', () => {
  describe('apply', () => {
    test('should return applied value', () => {
      expect(apply(Math.max, [1, 2])).toBe(2);
      expect(apply(Math.max)([1, 2])).toBe(2);
    });
  });

  describe('call', () => {
    test('should return applied value', () => {
      expect(call(Math.max, 1, 2)).toBe(2);
      expect(call(Math.max)(1, 2)).toBe(2);
      expect(call(Math.max)(1, 2)).toBe(2);
    });
  });

  describe('then', () => {
    test('should resolve promise', () => {
      expect(then(v => v * 2, new Promise(res => res(2)))).resolves.toBe(4);
      expect(then(v => v * 2, then(v => v * 2, new Promise(res => res(2))))).resolves.toBe(8);
    });
  });
});
