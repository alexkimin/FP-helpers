import { identity, nothing } from './common';
import { isFunction } from './validation';
import { apply } from './application';
import { pipe } from './composition';

export const ifElse = (predicate, onTrue = identity, onFalse = identity) => (...args) => {
  return isFunction(predicate)
    ? predicate(...args)
        ? Array.isArray(onTrue) ? apply(pipe, onTrue)(...args) : onTrue(...args)
        : Array.isArray(onFalse) ? apply(pipe, onFalse)(...args) : onFalse(...args)
    : nothing(...args);
};

export const and = (a, b) => a && b;

export const or = (a, b) => a || b;

export const not = a => !a;

// export const allTrue

// export const anyTrue