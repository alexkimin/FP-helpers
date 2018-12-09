const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { L } = require('../../lazy');
const { pipe } = require('../../composition');
const { curry2 } = require('../../curry');
const { filter, map } = require('../../loop');
const { take } = require('../../take');

let testArr = Array(100000).fill(1);
testArr = testArr.reduce((a, c, i) => {
  a[i] = i % 4;
  return a;
}, []);

// const fn = v => v + 2 > 1;

const suite = new Benchmark.Suite();

suite
  .add('ramda normal pipe operation', () => {
    Ramda.pipe(
      map(v => v * 2),
      filter(v => v % 2 === 1),
    )(testArr).slice(0, 1000);
  })
  .add('lodash normal pipe operation', () => {
    _.flow(
      map(v => v * 2),
      filter(v => v % 2 === 1),
    )(testArr).slice(0, 1000);
  })
  .add('lodash lazy pipe operation', () => {
    _(testArr)
      .chain()
      .map(v => v * 2)
      .filter(v => v % 2 === 1)
      .take(1000)
      .value();
  })
  .add('my.normal pipe operation', () => {
    pipe(
      map(v => v * 2),
      filter(v => v % 2 === 1),
    )(testArr).slice(0, 1000);
  })
  .add('my.lazy pipe operation', () => {
    pipe(
      L.map(v => v * 2),
      L.filter(v => v % 2 === 1),
      take(1000),
    )(testArr);
  });

module.exports = suite;
