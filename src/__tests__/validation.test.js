import {
  isFunction,
} from '../validation';

describe('valdation functions', () => {

  describe('isFunction', () => {
    test('should return true if all arg is a function type', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(() => {}, () => {}, () => {})).toBe(true);
    });
    test('should return false if any arg is not a function type', () => {
      expect(isFunction(() => {}, () => {}, 'hello', () => {})).toBe(false);
    });
  });

});