const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { filter } = require('../../loop');
const { curry2 } = require('../../curry');

const testArr = Array(100000).fill(1);
const fn = v => v + 2 > 1;

const suite = new Benchmark.Suite();

suite
  .add('Array.prototype.filter', () => {
    curry2((f, arr) => arr.filter(f))(fn)(testArr);
  })
  .add('my.filter array', () => {
    filter(fn)(testArr);
  })
  .add('Ramda.filter array', () => {
    Ramda.filter(fn)(testArr);
  })
  .add('_.filter array', () => {
    curry2((f, arr) => _.filter(arr, f))(fn)(testArr);
  });

module.exports = suite;
