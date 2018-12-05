import { identity, noop } from './common';
import { isFunction, isArray } from './validation';
import { apply } from './application';
import { pipe } from './composition';
import { curry2 } from './curry';

export const and = curry2((a, b) => a && b);
export const or = curry2((a, b) => a || b);
export const not = (f, a) => (isFunction(f) ? !f(a) : !f);
export const equal = curry2((a, b) => a === b);

export const allTrue = (...fns) => (...a) => fns.every(fn => (isFunction(fn) ? !!fn(...a) : !!fn));
export const anyTrue = (...fns) => (...a) => fns.some(fn => (isFunction(fn) ? !!fn(...a) : !!fn));

export const ifElse = curry2((predicate, onTrue, onFalse = identity) => (...a) =>
  isFunction(predicate)
    ? predicate(...a)
      ? isArray(onTrue)
        ? apply(pipe, onTrue)(...a)
        : onTrue(...a)
      : isArray(onFalse)
        ? apply(pipe, onFalse)(...a)
        : onFalse(...a)
    : noop());
