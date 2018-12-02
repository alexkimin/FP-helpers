export const curry = (fn, arr = []) =>
  (...args) => (list =>
    list.length === fn.length
      ? fn(...list)
      : curry(fn, list)
  )([...arr, ...args]);

export const curryR = (fn, arr = []) =>
  (...args) => (list =>
    list.length === fn.length
      ? fn(...list)
      : curryR(fn, list)
  )([...args, ...arr]);

export const curryRR = (fn, arr = []) =>
  (...args) => (list =>
    list.length === fn.length
      ? fn(...list)
      : curryR(fn, list)
  )([...args.reverse(), ...arr]);

export const curry2 = fn => (...arg1) =>
  arg1.length < 2
    ?  (...arg2) => fn(...arg1, ...arg2)
    : fn(...arg1);
