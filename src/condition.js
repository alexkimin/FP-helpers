import { identity, noop } from './common';
import { isFunction, isArray } from './validation';
import { apply } from './application';
import { pipe } from './composition';
import { curry } from './curry';

export const ifElse = curry((predicate, onTrue, onFalse) =>
  (...args) =>
    isFunction(predicate)
      ? predicate(...args)
        ? isArray(onTrue)
          ? apply(pipe, onTrue)(...args)
          : onTrue(...args)
        : isArray(onFalse)
          ? apply(pipe, onFalse || identity)(...args)
          : onFalse ? onFalse(...args) : onTrue(...args)
      : noop());

export const and = (a, b) => a && b;

export const or = (a, b) => a || b;

export const not = a => !a;

export const allTrue = (...args) => data => args.every(fn =>
  isFunction(fn) ? !!fn(data) : !!fn);

export const anyTrue = (...args) => data => args.some(fn =>
  isFunction(fn) ? !!fn(data) : !!fn);
