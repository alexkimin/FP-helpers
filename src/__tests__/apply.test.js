import {
  apply,
  call,
  applyE,
} from '../apply';

describe('apply functions', () => {
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

  describe('applyE', () => {
    test('should work with non promise', () => {
      expect(applyE(v => v * 2, 2)).toBe(4);
    });
    test('should work with promise', async () => {
      const result = await applyE(v => v * 2, Promise.resolve(2));
      expect(result).toBe(4);
    });
  });
});
