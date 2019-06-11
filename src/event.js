/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */

export const debounce = (func, wait, immediate) => {
  let timeoutID;
  let timestamp;
  let result;
  let lastArgs;
  const useRAF = !wait
    && typeof requestAnimationFrame === 'function'
    && typeof cancelAnimationFrame === 'function';

  const _startTimer = (fn, gap) => useRAF
    ? requestAnimationFrame(fn)
    : setTimeout(fn, gap);

  const _laterFn = () => {
    const last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeoutID = _startTimer(_laterFn, wait - last);
    } else {
      timeoutID = undefined;
      if (!immediate) {
        result = func(...lastArgs);
        if (!timeoutID) lastArgs = undefined;
      }
    }
  };

  const _debounce = (...a) => {
    timestamp = Date.now();
    lastArgs = a;
    if (wait === 0 || !wait) return func(...lastArgs);
    if (immediate && !timeoutID) {
      result = func(...lastArgs);
      lastArgs = undefined;
    }
    if (!timeoutID) timeoutID = _startTimer(_laterFn, wait);
    return result;
  };

  _debounce.cancel = () => {
    if (timestamp !== undefined) {
      useRAF ? cancelAnimationFrame(timeoutID) : clearTimeout(timeoutID);
    }
    timeoutID = undefined;
    lastArgs = undefined;
    timestamp = undefined;
  };

  _debounce.flush = () => {
    let flushed;
    if (timestamp !== undefined) {
      useRAF ? cancelAnimationFrame(timeoutID) : clearTimeout(timeoutID);
      flushed = func(...lastArgs);
    }
    timeoutID = undefined;
    lastArgs = undefined;
    timestamp = undefined;
    return flushed;
  };
  return _debounce;
};

// export const throttle = (func, wait, options) => {
//   const { leading, trailing } = options;
//   let lastArgs;
//   let result;
//   let timeoutID;


// };
