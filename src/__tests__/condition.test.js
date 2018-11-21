import {
  ifElse,
} from '../condition';

describe('condition functions', () => {

  describe('ifElse', () => {
    test('should return true onTure case if the predicate is ture', () => {
      expect(ifElse(
        () => true,
        () => 'onTrue',
        () => 'onFalse',
      )(1)).toBe('onTrue');
    });
    test('should return true onTure case if the predicate is ture', () => {
      expect(ifElse(
        () => true,
        [n => n * 2, n => n * 2],
        [n => n * 0],
      )(1)).toBe(4);
    });
  });

});