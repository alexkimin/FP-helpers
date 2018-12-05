import {
  then,
} from '../promise';

describe('promise functions', () => {
  describe('then', () => {
    test('should resolve promise', () => {
      expect(then(v => v * 2, new Promise(res => res(2)))).resolves.toBe(4);
      expect(then(v => v * 2, then(v => v * 2, new Promise(res => res(2))))).resolves.toBe(8);
    });
  });
});
