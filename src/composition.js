import { identity } from './common';

// Compose Combinator
const B = f => g => x => f(g(x));

// left to right
export const pipe = (...fns) => fns.reduce((prevFn, nextFn) => {
  return (...args) => B(nextFn)(prevFn)(...args);
}, identity);

export const pipeA = (...fns) => (...args) =>
  fns.reduce((chain, func) => chain.then(func), Promise.resolve(...args));

// right to left
export const compose = (...fns) => fns.reduceRight((lastFn, prevFn) => {
  return (...args) => B(prevFn)(lastFn)(...args);
}, identity);
