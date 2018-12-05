import {
  then,
  otherwise,
  thenCatch,
} from '../promise';

import { pipe } from '../composition';

describe('promise functions', () => {
  describe('then', () => {
    test('should resolve promise', async () => {
      const result1 = await then(v => v * 2, new Promise(res => res(2)));
      expect(result1).toBe(4);
      const result2 = await then(v => v * 2, then(v => v * 2, new Promise(res => res(2))));
      expect(result2).toBe(8);
    });
    test('should be pipeable ', async () => {
      const resolve = await pipe(
        v => new Promise(res => res(v)),
        then(v => v * 2),
        then(v => v * 2),
        then(v => v * 2),
      )(3);
      expect(resolve).toBe(24);
    });
  });
  describe('otherwise', () => {
    test('should reject promise', async () => {
      const result1 = await otherwise(v => v * 2, new Promise((res, rej) => rej(2)));
      expect(result1).toBe(4);
    });
    test('should be pipeable ', async () => {
      const rejected = await pipe(
        v => new Promise((res, rej) => rej(v)),
        then(v => v * 2),
        otherwise(v => v * 5),
      )(3);
      expect(rejected).toBe(15);
    });
    test('should be pipeable ', async () => {
      const rejected = await pipe(
        v => new Promise((res, rej) => rej(v)),
        then(v => v * 2),
        otherwise(v => v * 5),
        then(v => v * 2),
      )(3);
      expect(rejected).toBe(30);
    });
  });
  describe('thenCatch', () => {
    test('should resolve promise', async () => {
      const result = await thenCatch(v => v * 2, v => v * 3, Promise.resolve(2));
      expect(result).toBe(4);
    });
    test('should reject promise', async () => {
      const result = await thenCatch(v => v * 2, v => v * 3, Promise.reject(2));
      expect(result).toBe(6);
    });
    test('should be pipeable ', async () => {
      const rejected = await pipe(
        v => new Promise((res, rej) => rej(v)),
        thenCatch(v => v * 2, v => v * 5),
      )(3);
      expect(rejected).toBe(15);
    });
  });
});
