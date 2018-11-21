import { identity } from './common';

// Compose Combinator
const B = f => g => x => f(g(x));

// left to right
export const pipe = (...fns) => fns.reduce((prevFn, nextFn) => {
  return (...args) => B(nextFn)(prevFn)(...args);
}, identity);

// right to left
export const compose = (...fns) => fns.reduceRight((lastFn, prevFn) => {
  return (...args) => B(prevFn)(lastFn)(...args);
}, identity);
