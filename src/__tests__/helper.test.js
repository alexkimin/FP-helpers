/* eslint no-undef: 0 */
import { withDefaultMethod } from '../helper';

describe('helper functions', () => {
  describe('withDefaultMethod', () => {
    test('should return default method', () => {
      const spy = jest.spyOn(Array.prototype, 'forEach');
      withDefaultMethod('forEach', () => { })(() => { }, testArr);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
    test('should return fallback function', () => {
      const fallback = (f, o) => f(o);
      const cb = jest.fn();
      withDefaultMethod('forEach', fallback)(cb, testObj);
      expect(cb).toHaveBeenCalled();
    });
  });
});
