const Benchmark = require('benchmark');
// const Ramda = require('ramda');
const _ = require('lodash');
const { forEach } = require('../src/loop');

const testObj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('my.forEach obj', () => {
    forEach(fn, testObj);
  })
  .add('_.forEach obj', () => {
    _.forEach(fn, testObj);
  });

module.exports = suite;
