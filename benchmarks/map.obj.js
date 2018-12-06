const Benchmark = require('benchmark');
const Ramda = require('ramda');
const _ = require('lodash');
const { map } = require('../src/loop');

const testArr = [1, 2, 3, 4];
const testObj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};
const fn = v => v + 2;

const suite = new Benchmark.Suite();

suite
  .add('map obj', () => {
    map(fn, testObj);
  })
  .add('Ramda.map obj', () => {
    Ramda.mapObjIndexed(fn, testObj);
  })
  .add('_.map obj', () => {
    _.map(fn, testObj);
  });

module.exports = suite;
