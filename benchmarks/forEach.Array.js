const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { forEach } = require('../src/loop');
const { curry2 } = require('../src/curry');

const testArr = [1, 2, 3, 4];
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('Array.prototype.forEach array', () => {
    curry2((arr, f) => arr.forEach(f))(testArr, fn);
  })
  .add('my.forEach array', () => {
    forEach(fn)(testArr);
  })
  .add('Ramda.forEach array', () => {
    Ramda.forEach(fn)(testArr);
  })
  .add('_.forEach array', () => {
    _.forEach(fn)(testArr);
  });

module.exports = suite;
