import {
  each,
  eachR,
  map,
  filter,
  reduce,
  reduceR,
} from '../map';

describe('mapper functions', () => {
  describe('each', () => {
    let sideEffect;

    beforeEach(() => {
      sideEffect = [];
    });

    test('with array', () => {
      each([1, 2], v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with object', () => {
      each({ a: 1, b: 2 }, v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with Map', () => {
      const data = new Map();
      data.set('a', 1);
      data.set('b', 2);
      each(data, v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with Set', () => {
      const data = new Set();
      data.add(1);
      data.add(2);
      each(data, v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with string', () => {
      each('12', v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([2, 4]);
    });
    test('with arrayLike', () => {
      each(
        {
          0: 5,
          1: 6,
          length: 2,
        },
        v => sideEffect.push(v * 2),
      );
      expect(sideEffect).toEqual([10, 12]);
    });
  });

  describe('eachR', () => {
    let sideEffect;

    beforeEach(() => {
      sideEffect = [];
    });

    test('with array', () => {
      eachR([1, 2], v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with object', () => {
      eachR({ a: 1, b: 2 }, v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with Map', () => {
      const data = new Map();
      data.set('a', 1);
      data.set('b', 2);
      eachR(data, v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with Set', () => {
      const data = new Set();
      data.add(1);
      data.add(2);
      eachR(data, v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with string', () => {
      eachR('12', v => sideEffect.push(v * 2));
      expect(sideEffect).toEqual([4, 2]);
    });
    test('with arrayLike', () => {
      eachR(
        {
          0: 5,
          1: 6,
          length: 2,
        },
        v => sideEffect.push(v * 2),
      );
      expect(sideEffect).toEqual([12, 10]);
    });
  });

  describe('map', () => {
    test('with array', () => {
      expect(map([1, 2], n => n * 2)).toEqual([2, 4]);
    });
    test('with object', () => {
      expect(map({ a: 1, b: 2 }, n => n * 2)).toEqual([2, 4]);
    });
    test('with Map', () => {
      const data = new Map();
      data.set('a', 1);
      data.set('b', 2);
      expect(map(data, n => n * 2)).toEqual([2, 4]);
    });
    // test('with Set', () => {
    //   const data = new Set();
    //   data.add(1);
    //   data.add(2);
    //   expect(map(data, n => n * 2)).toEqual([2, 4]);
    // });
    // test('with string', () => {
    //   expect(map('12', n => n * 2)).toEqual([2, 4]);
    // });
    // test('with arrayLike', () => {
    //   expect(map(
    //     {
    //       0: 5,
    //       1: 6,
    //       length: 2,
    //     },
    //     n => n * 2,
    //     )).toEqual([10, 12]);
    // });
  });

  describe('filter', () => {
    test('with array', () => {
      expect(filter([1, 2], n => n < 2)).toEqual([1]);
    });
    test('with object', () => {
      expect(filter({ a: 1, b: 2 }, n => n < 2)).toEqual([1]);
    });
    test('with Map', () => {
      const data = new Map();
      data.set('a', 1);
      data.set('b', 2);
      expect(filter(data, n => n < 2)).toEqual([1]);
    });
    test('with Set', () => {
      const data = new Set();
      data.add(1);
      data.add(2);
      expect(filter(data, n => n < 2)).toEqual([1]);
    });
    test('with string', () => {
      expect(filter('12', n => n < 2)).toEqual(['1']);
    });
    test('with arrayLike', () => {
      expect(filter(
        {
          0: 5,
          1: 6,
          length: 2,
        },
        n => n > 5,
      )).toEqual([6]);
    });
  });

  describe('reduce', () => {
    test('with array', () => {
      expect(reduce((a, c) => a + c, [1, 2])).toBe(3);
    });
    test('with object', () => {
      expect(reduce(
        (acc, cur) => acc + cur,
        0,
        { name: 1, gender: 2 },
      )).toBe(3);
      expect(reduce(
        (acc, val) => {
          acc.checked = acc.checked ? ++acc.checked : 1;
          return acc;
        },
        {},
        { name: 1, gender: 2 },
      )).toEqual({ checked: 2 });
    });
    test('with Map', () => {
      const data = new Map([['apple', 1], ['pineapple', 2]]);
      expect(reduce((acc, [key, value]) => acc + value, 0, data)).toBe(3);
    });
    test('with Set', () => {
      const data = new Set([1, 2]);
      expect(reduce((acc, val) => acc + val, data)).toBe(3);
    });
    test('with arrayLike', () => {
      let arg;
      (function (a, b) {
        arg = arguments;
        return a + b;
      }(1, 2));
      expect(reduce(
        (acc, val) => acc + val,
        arg,
      )).toBe(3);
    });
  });
});
