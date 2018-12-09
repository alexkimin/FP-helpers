const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { reduce } = require('../../loop');
const { curry2 } = require('../../curry');

const testMap = new Map(Array(100000).fill([1, 2]));
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('my.reduce Map', () => {
    reduce(fn)(testMap);
  })
  .add('Ramda.reduce Map', () => {
    Ramda.reduce(fn)(0, testMap);
  })
  .add('_.reduce Map', () => {
    curry2((m, f) => _.reduce(m, f))(testMap)(fn);
  });

module.exports = suite;
