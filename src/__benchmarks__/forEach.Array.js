const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { forEach } = require('../loop');
const { curry2 } = require('../curry');

const testArr = Array(100000).fill(1);
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('Array.prototype.forEach array', () => {
    curry2((f, arr) => arr.forEach(f))(fn)(testArr);
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
