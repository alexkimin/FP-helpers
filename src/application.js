// base
export const apply = (fn, arg) => fn.apply(null, arg);

export const call = (fn, ...args) => fn.call(null, ...args);