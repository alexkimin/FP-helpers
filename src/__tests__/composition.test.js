import {
  pipe,
  compose
} from '../composition';

describe('composition functions', () => {

  describe('pipe', () => {
    test('should return left to right composed function', () => {
      expect(pipe(
        n => n * 2,
        n => n * 3,
        n => n.toString(),
      )(1)).toBe('6');
    });
  });
  describe('compose', () => {
    test('should return right to left composed function', () => {
      expect(compose(
        n => n * 2,
        n => n * 3,
        n => n.toString(),
      )(1)).toBe(6);
    });
  });
});