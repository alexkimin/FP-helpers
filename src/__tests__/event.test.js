/* eslint no-undef: 0 */
import { debounce } from '../event';

describe('event function', () => {
  describe('debounce', () => {
    test('cb should be called once at the end of timers', done => {
      const cb = jest.fn();
      const fn = debounce(() => cb(), 100);
      fn();
      fn();
      fn();
      fn();
      setTimeout(() => {
        try {
          expect(cb).toHaveBeenCalledTimes(0);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 10);
      setTimeout(() => {
        try {
          expect(cb).toHaveBeenCalledTimes(1);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 200);
    });
    test('immediate option true should excute cb once immediately at the beginning', done => {
      const cb = jest.fn();
      const fn = debounce(() => cb(), 300, true);
      fn();
      fn();
      setTimeout(() => {
        try {
          expect(cb).toHaveBeenCalledTimes(1);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 100);
    });
    test('.cancel should cancel timer', done => {
      const cb = jest.fn();
      const fn = debounce(() => cb(), 10);
      fn();
      fn.cancel();
      setTimeout(() => {
        try {
          expect(cb).toHaveBeenCalledTimes(0);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 11);
    });
    test('.flush should cancel timer and return the result of last function immediately', done => {
      const cb = jest.fn();
      const fn = debounce(() => cb(), 100);
      fn();
      fn.flush();
      setTimeout(() => {
        try {
          expect(cb).toHaveBeenCalledTimes(1);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 5);
    });
  });
});
