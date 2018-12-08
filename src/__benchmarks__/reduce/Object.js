const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { reduce } = require('../../loop');
const { curry2 } = require('../../curry');

const testObj = Array(100000).reduce((a, c, idx) => {
  a[idx] = idx;
  return a;
}, {});
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('my.reduce obj', () => {
    reduce(fn)(testObj);
  })
  .add('Ramda.reduce obj', () => {
    Ramda.reduce(fn)(testObj);
  })
  .add('_.reduce obj', () => {
    curry2((m, f) => _.reduce(m, f))(testObj)(fn);
  });

module.exports = suite;
