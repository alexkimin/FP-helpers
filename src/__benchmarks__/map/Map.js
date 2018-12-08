const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { map } = require('../../loop');
const { curry2 } = require('../../curry');

const testMap = new Map(Array(100000).fill([1, 2]));
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('chained function Map', () => {
    curry2((f, m) => [...m].map(f))(fn)(testMap);
  })
  .add('my.map Map', () => {
    map(fn)(testMap);
  })
  .add('Ramda.map Map', () => {
    Ramda.map(fn)(testMap);
  })
  .add('_.map Map', () => {
    curry2((f, m) => _.map(m, f))(fn)(testMap);
  });

module.exports = suite;
