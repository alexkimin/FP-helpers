import { identity, nothing } from './common';
import { isFunction } from './validation';
import { apply } from './application';
import { pipe } from './composition';
import { curry } from './curry';

export const ifElse = curry((predicate, onTrue, onFalse) =>
  (...args) =>
    isFunction(predicate)
      ? predicate(...args)
        ? Array.isArray(onTrue)
          ? apply(pipe, onTrue)(...args)
          : onTrue(...args)
        : Array.isArray(onFalse)
          ? apply(pipe, onFalse || identity)(...args)
          : onFalse ? onFalse(...args) : onTrue(...args)
      : nothing());

export const and = (a, b) => a && b;

export const or = (a, b) => a || b;

export const not = a => !a;

export const allTrue = (...args) => args.every(fn =>
  isFunction(fn) ? !!fn() : !!fn);

export const anyTrue = (...args) => args.some(fn =>
  isFunction(fn) ? !!fn() : !!fn);
