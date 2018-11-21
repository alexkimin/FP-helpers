import { identity, nothing, isFunction } from './common';

export const ifElse = (predicate, onTrue = identity, onFalse = identity) => arg => {
  return isFunction(predicate, onTrue, onFalse)
    ? predicate(arg)
        ? onTrue(arg)
        : onFalse(arg)
    : nothing;
};