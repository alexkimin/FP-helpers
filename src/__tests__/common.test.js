import {
  identity,
  noop,
  tap,
} from '../common';

describe('common functions', () => {
  describe('identity', () => {
    test('should return identity value', () => {
      expect(identity('hello')).toBe('hello');
    });
  });

  describe('noop', () => {
    test('should return undefined value', () => {
      expect(noop('hello')).toBe(undefined);
    });
  });

  describe('tap', () => {
    const spy = jest.spyOn(global.console, 'log');
    test('should return identity value and should run cb', () => {
      expect(tap(v => console.log(v), 'hello')).toBe('hello');
      expect(spy).toHaveBeenCalled();
    });
  });
});
