const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { map } = require('../../loop');
const { curry2 } = require('../../curry');

const testObj = Array(100000).reduce((a, c, idx) => {
  a[idx] = idx;
  return a;
}, {});
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('chained function obj', () => {
    curry2((f, obj) => Object.keys(obj).reduce((a, c) => {
      a[c] = f(obj[c]);
      return a;
    }, {}))(fn)(testObj);
  })
  .add('my.map obj', () => {
    map(fn)(testObj);
  })
  .add('Ramda.map obj', () => {
    Ramda.map(fn)(testObj);
  })
  .add('_.map obj', () => {
    curry2((f, arr) => _.map(arr, f))(fn)(testObj);
  });

module.exports = suite;
