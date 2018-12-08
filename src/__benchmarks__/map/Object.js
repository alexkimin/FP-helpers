const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { map } = require('../../loop');

const testObj = Array(100000).reduce((a, c, idx) => {
  a[idx] = idx;
  return a;
}, {});
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('my.map obj', () => {
    map(fn, testObj);
  })
  .add('Ramda.map obj', () => {
    Ramda.map(fn, testObj);
  })
  .add('_.map obj', () => {
    _.map(fn, testObj);
  });

module.exports = suite;
