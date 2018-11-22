import { identity } from './common';

// Combinator
const B = f => g => x => f(g(x));
const C = f => g => x => g(f(x));
const K = x => y => x;

// left to right
export const pipe = (...fns) => fns.reduce((prevFn, nextFn) => {
  return (...args) => B(nextFn)(prevFn)(...args);
}, identity);

export const pipeA = (...fns) => (...args) =>
  fns.reduce((chain, func) => chain.then(func), Promise.resolve(...args));

// right to left
export const compose = (...fns) => fns.reduceRight((lastFn, prevFn) => {
  return (...args) => C(lastFn)(prevFn)(...args);
}, identity);

export const composeA = (...fns) => (...args) =>
  fns.reduceRight((chain, func) => chain.then(func), Promise.resolve(...args));
