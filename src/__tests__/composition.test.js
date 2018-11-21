import {
  pipe,
  pipeA,
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
  describe('pipeA', () => {
    test('should return left to right composed async/await(or promise) function', async () => {
      const result = await pipeA(
        async (n) => await n * 2,
        async (n) => {
          const result = await new Promise(resolve => setTimeout(() => {
            return resolve(n * 2);
          }, 200));
          return result;
        },
        (n) => new Promise(resolve => setTimeout(() => {
          return resolve(n * 2);
        }, 200)),
      )(1);
      expect(result).toBe(8);
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