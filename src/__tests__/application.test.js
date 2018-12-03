import {
  apply,
  call,
} from '../application';

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
    });
  });
});
