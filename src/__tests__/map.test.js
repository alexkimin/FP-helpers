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
        v => sideEffect.push(v * 2));
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
        v => sideEffect.push(v * 2));
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
    test('with Set', () => {
      const data = new Set();
      data.add(1);
      data.add(2);
      expect(map(data, n => n * 2)).toEqual([2, 4]);
    });
    test('with string', () => {
      expect(map('12', n => n * 2)).toEqual([2, 4]);
    });
    test('with arrayLike', () => {
      expect(map(
        {
          0: 5,
          1: 6,
          length: 2,
        },
        n => n * 2,
        )).toEqual([10, 12]);
    });
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
      expect(reduce([1, 2], (a, c) => a + c, 1)).toBe(4);
    });
    test('with object', () => {
      expect(reduce(
        { name: 1, gender: 2 },
        (a, val, key) => {
          if (key === 'name') return a + val;
          return a;
        },
        0,
      )).toBe(1);
      expect(reduce(
        { name: 1, gender: 2 },
        (acc, val, key) => {
          if (key === 'name') {
            acc['checked'] = acc['checked'] ? ++acc['checked'] : 1;
          }
          return acc;
        },
        {},
      )).toEqual({ checked: 1 });
    });
    test('with Map', () => {
      const data = new Map();
      data.set('apple', 1);
      data.set('pineapple', 2);
      expect(reduce(data, (acc, val, key) => acc + val, 0)).toBe(3);
    });
    test('with Set', () => {
      const data = new Set();
      data.add(1);
      data.add(2);
      expect(reduce(data, (acc, val, key) => acc + val, 0)).toBe(3);
    });
    test('with string', () => {
      expect(reduce('12', (acc, val) => acc + val, '')).toBe('12');
    });
    test('with arrayLike', () => {
      expect(reduce(
        {
          0: 5,
          1: 5,
          length: 2,
        },
        (acc, val) => acc + val,
        0
        )).toBe(10);
    });
  });

  describe('reduceR', () => {
    test('with array', () => {
      expect(reduceR([1, 2], (a, c) => a + c, 1)).toBe(4);
    });
    test('with object', () => {
      expect(reduceR(
        { name: 1, gender: 2 },
        (a, val, key) => {
          if (key === 'name') return a + val;
          return a;
        },
        0,
      )).toBe(1);
      expect(reduceR(
        { name: 1, gender: 2 },
        (acc, val, key) => {
          if (key === 'name') {
            acc['checked'] = acc['checked'] ? ++acc['checked'] : 1;
          }
          return acc;
        },
        {},
      )).toEqual({ checked: 1 });
    });
    test('with Map', () => {
      const data = new Map();
      data.set('apple', 1);
      data.set('pineapple', 2);
      expect(reduceR(data, (acc, val, key) => acc + val, 0)).toBe(3);
    });
    test('with Set', () => {
      const data = new Set();
      data.add(1);
      data.add(2);
      expect(reduceR(data, (acc, val, key) => acc + val, 0)).toBe(3);
    });
    test('with string', () => {
      expect(reduceR('12', (acc, val) => acc + val, '')).toBe('21');
    });
    test('with arrayLike', () => {
      expect(reduceR(
        {
          0: 5,
          1: 5,
          length: 2,
        },
        (acc, val) => acc + val,
        0
        )).toBe(10);
    });
  });
});
