function XWrap(fn) {
  this.f = fn;
}
XWrap.prototype['@@transducer/init'] = function () { };
XWrap.prototype['@@transducer/result'] = function (acc) {
  return acc;
};
XWrap.prototype['@@transducer/step'] = function (acc, cur, key) {
  return this.f(acc, cur, key);
};

export default function _xWrap(fn) { return new XWrap(fn); }
