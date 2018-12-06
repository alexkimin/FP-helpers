const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { map } = require('../src/loop');

const testMap = new Map([
  [1, 2],
  [1, 2],
  [1, 2],
  [1, 2],
]);
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('my.map Map', () => {
    map(fn, testMap);
  })
  .add('Ramda.map Map', () => {
    Ramda.map(fn, testMap);
  })
  .add('_.map Map', () => {
    _.map(fn, testMap);
  });

module.exports = suite;
