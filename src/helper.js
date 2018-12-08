import { hasMethod } from './validation';

export const withDefaultMethod = (name, fallbackFn) => (fn, coll) =>
  hasMethod(coll, name) ? coll[name](fn) : fallbackFn(fn, coll);
