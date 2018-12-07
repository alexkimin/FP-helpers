const Benchmark = require('benchmark');
// const Ramda = require('ramda');
const _ = require('lodash');
const { forEach } = require('../src/loop');

const testMap = new Map([
  [1, 2],
  [1, 2],
  [1, 2],
  [1, 2],
]);
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('my.forEach Map', () => {
    forEach(fn, testMap);
  })
  .add('_.forEach Map', () => {
    _.forEach(fn, testMap);
  });

module.exports = suite;
