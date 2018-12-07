const Benchmark = require('benchmark');
// const Ramda = require('ramda');
const _ = require('lodash');
const { forEach } = require('../loop');
const { curry2 } = require('../curry');

const testMap = new Map([
  [1, 2],
  [1, 2],
  [1, 2],
  [1, 2],
]);
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('Map.prototype.forEach Map', () => {
    curry2((m, f) => m.forEach(f))(testMap)(fn);
  })
  .add('my.forEach Map', () => {
    forEach(fn)(testMap);
  })
  .add('_.forEach Map', () => {
    _.forEach(fn)(testMap);
  });

module.exports = suite;
