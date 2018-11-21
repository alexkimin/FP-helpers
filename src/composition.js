import { identity } from './common';

// left to right
export const pipe = (...fns) => fns.reduce((prevFn, nextFn) => {
  return (...args) => nextFn(prevFn(...args));
}, identity);

// right to left
export const compose = (...fns) => fns.reduceRight((lastFn, prevFn) => {
  return (...args) => prevFn(lastFn(...args));
}, identity);