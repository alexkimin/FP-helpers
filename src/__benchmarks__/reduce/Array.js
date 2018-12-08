const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { reduce } = require('../../loop');
const { curry2 } = require('../../curry');

const testArr = Array(100000).fill(1);
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('Array.prototype.reduce array', () => {
    curry2((f, arr) => arr.reduce(f))(fn)(testArr);
  })
  .add('my.reduce array', () => {
    reduce(fn)(testArr);
  })
  .add('Ramda.reduce array', () => {
    Ramda.reduce(fn)(testArr);
  })
  .add('_.reduce array', () => {
    curry2((f, arr) => _.reduce(arr, f))(fn)(testArr);
  });

module.exports = suite;
