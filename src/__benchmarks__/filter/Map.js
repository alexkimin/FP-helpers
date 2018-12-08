const Benchmark = require('benchmark');
const Ramda = require('ramda');
// const _ = require('lodash');
const { filter } = require('../../loop');
// const { curry2 } = require('../../curry');

const testMap = new Map(Array(100000).fill([1, 2]));
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('my.filter Map', () => {
    filter(fn)(testMap);
  })
  .add('Ramda.filter Map', () => {
    Ramda.filter(fn)(testMap);
  });

module.exports = suite;
