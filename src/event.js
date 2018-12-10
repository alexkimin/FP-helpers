export const debounce = (func, wait, immediate) => {
  let timeout;
  let timestamp;
  let result;
  let args;
  const later = (...a1) => {
    const last = Date.now() - timestamp;
    args = a1;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func(...args);
        if (!timeout) args = null;
      }
    }
  };
  return (...a2) => {
    timestamp = Date.now();
    args = a2;
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func(...args);
      args = null;
    }
    return result;
  };
};
