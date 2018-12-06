// import { identity } from './common';
import { reduce, reduceR } from './loop';

/**
 * pipe :: (((a, b, ..., n) -> o), (o -> p), ..., (y -> z)) -> ((a, b, ..., n) -> z)
 */
export const pipe = (...fns) => reduce((f, g) => (...a) => g(f(...a)), fns);

/**
 * pipeP :: Promise pr =>
 *  (((a, b, ..., n) -> pr o), (pr o -> pr p), ..., (pr y -> pr z)) -> ((a, b, ..., n) -> pr z)
 */
export const pipeP = (...fns) => reduce((f, g) => async (...a) => g(await f(...a)), fns);

/**
 * compose :: ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 */
export const compose = (...fns) => reduceR((f, g) => (...a) => g(f(...a)), fns);

/**
 * composeP :: Promise pr =>
 *  ((pr y -> pr z), ..., (pr o -> pr p), ((a, b, ..., n) -> pr o)) -> ((a, b, ..., n) -> pr z)
 */
export const composeP = (...fns) => reduceR((f, g) => async (...a) => g(await f(...a)), fns);
