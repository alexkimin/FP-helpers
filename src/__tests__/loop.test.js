import {
  each,
  eachR,
  map,
  filter,
  reduce,
  reduceR,
} from '../loop';

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
      each(([k, v]) => sideEffect.push(v * 2), testMap);
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
      each(v => sideEffect.push(v * 2), arrLike);
      expect(sideEffect).toEqual([2, 4]);
    });
  });

  // describe('eachR', () => {
  //   let sideEffect;

  //   beforeEach(() => {
  //     sideEffect = [];
  //   });

  //   test('with array', () => {
  //     eachR([1, 2], v => sideEffect.push(v * 2));
  //     expect(sideEffect).toEqual([4, 2]);
  //   });
  //   test('with object', () => {
  //     eachR({ a: 1, b: 2 }, v => sideEffect.push(v * 2));
  //     expect(sideEffect).toEqual([4, 2]);
  //   });
  //   test('with Map', () => {
  //     const data = new Map();
  //     data.set('a', 1);
  //     data.set('b', 2);
  //     eachR(data, v => sideEffect.push(v * 2));
  //     expect(sideEffect).toEqual([4, 2]);
  //   });
  //   test('with Set', () => {
  //     const data = new Set();
  //     data.add(1);
  //     data.add(2);
  //     eachR(data, v => sideEffect.push(v * 2));
  //     expect(sideEffect).toEqual([4, 2]);
  //   });
  //   test('with string', () => {
  //     eachR('12', v => sideEffect.push(v * 2));
  //     expect(sideEffect).toEqual([4, 2]);
  //   });
  //   test('with arrayLike', () => {
  //     eachR(
  //       {
  //         0: 5,
  //         1: 6,
  //         length: 2,
  //       },
  //       v => sideEffect.push(v * 2),
  //     );
  //     expect(sideEffect).toEqual([12, 10]);
  //   });
  // });

  // describe('map', () => {
    // test('with array', () => {
    //   expect(map([1, 2], n => n * 2)).toEqual([2, 4]);
    // });
    // test('with object', () => {
    //   expect(map({ a: 1, b: 2 }, n => n * 2)).toEqual([2, 4]);
    // });
    // test('with Map', () => {
    //   const data = new Map();
    //   data.set('a', 1);
    //   data.set('b', 2);
    //   expect(map(data, n => n * 2)).toEqual([2, 4]);
    // });
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
  // });

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
      expect(reduce(
        (acc, val) => {
          acc.checked = acc.checked ? ++acc.checked : 1;
          return acc;
        },
        {},
        testObj,
      )).toEqual({ checked: 2 });
    });
    test('with Map', () => {
      expect(reduce((acc, [key, value]) => acc + value, 0, testMap)).toBe(3);
    });
    test('with Set', () => {
      expect(reduce((acc, val) => acc + val, testSet)).toBe(3);
    });
    test('with arrayLike', () => {
      expect(reduce((acc, val) => acc + val, arrLike)).toBe(3);
    });
    test('with string', () => {
      expect(reduce((acc, val) => acc.length < 3 ? acc + val : acc, 'alex')).toBe('ale');
    });
  });
});
