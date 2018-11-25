import {
  each,
} from '../map';

describe('mapper functions', () => {

  describe('each', () => {
    let sideEffect;

    beforeEach(() => {
      sideEffect = [];
    });

    test('with array', () => {
      each([1, 2], (v) => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with object', () => {
      each({ a: 1, b: 2 }, (v) => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with Map', () => {
      const data = new Map();
      data.set('a', 1);
      data.set('b', 2);
      each(data, (v) => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with Set', () => {
      const data = new Set();
      data.add(1);
      data.add(2);
      each(data, (v) => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with string', () => {
      each('12', (v) => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
  });

});