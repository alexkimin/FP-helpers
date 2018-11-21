import {
  identity,
  nothing,
} from '../common';

describe('common functions', () => {

  describe('identity', () => {
    test('should return identity value', () => {
      expect(identity('hello')).toBe('hello');
    });
  });

  describe('nothing', () => {
    test('should return undefined value', () => {
      expect(nothing('hello')).toBe(undefined);
    });
  });

});