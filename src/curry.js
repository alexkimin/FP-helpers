export const curry = (fn, arr = []) => {
  return (...args) => (list =>
    list.length === fn.length
      ? fn(...list)
      : curry(fn, list)
  )([...arr, ...args]);
};

export const curryR = (fn, arr = []) => {
  return (...args) => (list =>
    list.length === fn.length
      ? fn(...list)
      : curryR(fn, list)
  )([...args, ...arr]);
};

export const curryRR = (fn, arr = []) => {
  return (...args) => (list =>
    list.length === fn.length
      ? fn(...list)
      : curryR(fn, list)
  )([...args.reverse(), ...arr]);
};
