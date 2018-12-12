/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
const root = window || {};

export const debounce = (func, wait, immediate) => {
  let timeout;
  let timestamp;
  let result;
  let lastArgs;
  const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function');

  const later = () => {
    const last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = useRAF
        ? root.requestAnimationFrame(later)
        : setTimeout(later, wait - last);
    } else {
      timeout = undefined;
      if (!immediate) {
        result = func(...lastArgs);
        if (!timeout) lastArgs = undefined;
      }
    }
  };

  const _debounced = (...a) => {
    timestamp = Date.now();
    lastArgs = a;
    if (!timeout) {
      timeout = useRAF
        ? root.requestAnimationFrame(later)
        : setTimeout(later, wait);
    }
    if (immediate && !timeout) {
      result = func(...lastArgs);
      lastArgs = undefined;
    }
    return result;
  };

  _debounced.cancel = () => {
    if (timestamp !== undefined) {
      useRAF ? root.cancelAnimationFrame(timeout) : clearTimeout(timeout);
    }
    lastArgs = undefined;
    timestamp = undefined;
  };
  return _debounced;
};
