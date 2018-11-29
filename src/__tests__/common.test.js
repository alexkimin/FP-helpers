import {
  identity,
  noop,
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
});
