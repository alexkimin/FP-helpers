const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { filter } = require('../../loop');
const { curry2 } = require('../../curry');

const testObj = Array(100000).reduce((a, c, idx) => {
  a[idx] = idx;
  return a;
}, {});
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('my.filter obj', () => {
    filter(fn)(testObj);
  })
  .add('Ramda.filter obj', () => {
    Ramda.filter(fn)(testObj);
  })
  .add('_.filter obj', () => {
    curry2((f, arr) => _.filter(arr, f))(fn)(testObj);
  });

module.exports = suite;
