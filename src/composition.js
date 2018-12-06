// import { identity } from './common';
import { reduce } from './loop';

// pipe :: (((a, b, ..., n) -> o), (o -> p), ..., (y -> z)) -> ((a, b, ..., n) -> z)
export const pipe = (...fns) => reduce((f, g) => (...a) => g(f(...a)), fns);

export const pipeP = (...fns) => (...args) =>
  fns.reduce((chain, func) => chain.then(func), Promise.resolve(...args));

export const pipeA = (...fns) => (...args) =>
  fns.reduce(async (prevFn, nextFn) => nextFn(await prevFn), args);

// compose :: ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
export const compose = (...fns) => reduce((f, g) => (...a) => g(f(...a)), fns.reverse());

export const composeP = (...fns) => (...args) =>
  fns.reduceRight((chain, func) => chain.then(func), Promise.resolve(...args));

export const composeA = (...fns) => (...args) =>
  fns.reduceRight(async (prevFn, nextFn) => nextFn(await prevFn), args);
