const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { forEach } = require('../loop');
const { curry2 } = require('../curry');


const testObj = Array(100000).reduce((a, c, idx) => {
  a[idx] = idx;
  return a;
}, {});
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('Object.prototype.key and forEach obj', () => {
    curry2((f, obj) => Object.keys(obj).forEach(f))(fn)(testObj);
  })
  .add('my.forEach obj', () => {
    forEach(fn)(testObj);
  })
  .add('Ramda.forEachObjIndexed obj', () => {
    Ramda.forEachObjIndexed(fn)(testObj);
  })
  .add('_.forEach obj', () => {
    _.forEach(fn)(testObj);
  });

module.exports = suite;
