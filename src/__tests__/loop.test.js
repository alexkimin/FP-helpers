/* eslint no-undef: 0 */
import { each, eachR, reduce, map } from '../loop';

describe('mapper functions', () => {
  describe('each', () => {
    let sideEffect;
    beforeEach(() => {
      sideEffect = [];
    });
    test('with array', () => {
      each(v => sideEffect.push(v * 2), testArr);
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with object', () => {
      each(v => sideEffect.push(v * 2), testObj);
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with Map', () => {
      each((e) => sideEffect.push(e[1] * 2), testMap);
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with Set', () => {
      each(v => sideEffect.push(v * 2), testSet);
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with string', () => {
      each(v => sideEffect.push(v * 2), '12');
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with arrayLike', () => {
      each(v => sideEffect.push(v * 2), arrLikeObj);
      expect(sideEffect).toEqual([2, 4]);
    });
  });

  describe('eachR', () => {
    let sideEffect;
    beforeEach(() => {
      sideEffect = [];
    });
    test('with array', () => {
      eachR(v => sideEffect.push(v * 2), testArr);
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with object', () => {
      eachR(v => sideEffect.push(v * 2), testObj);
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with Map', () => {
      eachR((e) => sideEffect.push(e[1] * 2), testMap);
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with Set', () => {
      eachR(v => sideEffect.push(v * 2), testSet);
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with string', () => {
      eachR(v => sideEffect.push(v * 2), '12');
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with arrayLike', () => {
      eachR(v => sideEffect.push(v * 2), arrLikeObj);
      expect(sideEffect).toEqual([4, 2]);
    });
  });

  describe('map', () => {
    test('with array', () => {
      expect(map(n => n * 2, testArr)).toEqual([2, 4]);
    });
    test('with object', () => {
      expect(map(n => n * 2, testObj)).toEqual({ a: 2, b: 4 });
    });
    test('with Map', () => {
      expect(map(n => n * 2, testMap)).toEqual(new Map([['a', 2], ['b', 4]]));
    });
    test('with Set', () => {
      expect(map(n => n * 2, testSet)).toBe(undefined);
    });
    test('with string', () => {
      expect(map(n => n * 2, '12')).toBe(undefined);
    });
    test('with arrayLike', () => {
      expect(map(n => n * 2, arrLikeObj)).toEqual({ 0: 2, 1: 4 });
    });
  });

  // describe('filter', () => {
  //   test('with array', () => {
  //     expect(filter([1, 2], n => n < 2)).toEqual([1]);
  //   });
  //   test('with object', () => {
  //     expect(filter({ a: 1, b: 2 }, n => n < 2)).toEqual([1]);
  //   });
  //   test('with Map', () => {
  //     const data = new Map();
  //     data.set('a', 1);
  //     data.set('b', 2);
  //     expect(filter(data, n => n < 2)).toEqual([1]);
  //   });
  //   test('with Set', () => {
  //     const data = new Set();
  //     data.add(1);
  //     data.add(2);
  //     expect(filter(data, n => n < 2)).toEqual([1]);
  //   });
  //   test('with string', () => {
  //     expect(filter('12', n => n < 2)).toEqual(['1']);
  //   });
  //   test('with arrayLike', () => {
  //     expect(filter(
  //       {
  //         0: 5,
  //         1: 6,
  //         length: 2,
  //       },
  //       n => n > 5,
  //     )).toEqual([6]);
  //   });
  // });

  describe('reduce', () => {
    test('with array', () => {
      expect(reduce((a, c) => a + c, testArr)).toBe(3);
    });
    test('with object', () => {
      expect(reduce((acc, cur) => acc + cur, 0, testObj)).toBe(3);
      expect(
        reduce(
          (acc) => {
            acc.checked = acc.checked ? ++acc.checked : 1;
            return acc;
          },
          {},
          testObj,
        ),
      ).toEqual({ checked: 2 });
    });
    test('with Map', () => {
      expect(reduce((acc, e) => acc + e[1], 0, testMap)).toBe(3);
    });
    test('with Set', () => {
      expect(reduce((acc, val) => acc + val, testSet)).toBe(3);
    });
    test('with arrayLike', () => {
      expect(reduce((acc, val) => acc + val, arrLikeObj)).toBe(3);
    });
    test('with string', () => {
      expect(reduce((acc, val) => (acc.length < 3 ? acc + val : acc), 'alex')).toBe('ale');
    });
  });
});
