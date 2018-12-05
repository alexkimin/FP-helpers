/* eslint no-undef: 0 */
import { identity } from '../common';
import {
  pipe, pipeA, pipeP, compose, composeA, composeP,
} from '../composition';

describe('composition functions', () => {
  const fns1 = [n => n * 2, n => n * 3, n => n.toString()];

  const fns2 = [
    async n => (await n) * 2,
    async n => {
      const result = await new Promise(resolve => setTimeout(() => resolve(n * 2), 200));
      return result;
    },
    n => new Promise(resolve => setTimeout(() => resolve(n * 2), 200)),
  ];

  describe('pipe', () => {
    test('should return left to right composed function', () => {
      expect(pipe(...fns1)(1)).toBe('6');
    });
  });
  describe('pipeA', () => {
    test('should return left to right composed async/await(or promise) function', async () => {
      const result = await pipeA(...fns2)(1);
      expect(result).toBe(8);
    });
  });
  describe('pipeP', () => {
    test('should work same as pipeA', async () => {
      const result = await pipeP(...fns2)(1);
      expect(result).toBe(8);
    });
  });

  describe('compose', () => {
    test('should return right to left composed function', () => {
      expect(compose(...fns1)(1)).toBe(6);
    });
  });
  describe('composeA', () => {
    test('should return right to left composed async/await(or promise) function', async () => {
      const result = await composeA(...[n => n.toString(), ...fns2])(1);
      expect(result).toBe('8');
    });
  });
  describe('composeP', () => {
    test('should work same as composeA', async () => {
      const result = await composeP(...[n => n.toString(), ...fns2])(1);
      expect(result).toBe('8');
    });
  });
});
