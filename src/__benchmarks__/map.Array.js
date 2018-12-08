const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { map } = require('../loop');
const { curry2 } = require('../curry');

const testArr = Array(100000).fill(1);
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('Array.prototype.map', () => {
    curry2((f, arr) => arr.map(f))(fn)(testArr);
  })
  .add('my.map array', () => {
    map(fn)(testArr);
  })
  .add('Ramda.map array', () => {
    Ramda.map(fn)(testArr);
  })
  .add('_.map array', () => {
    curry2((f, arr) => _.map(arr, f))(fn)(testArr);
  });

module.exports = suite;
