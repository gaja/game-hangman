import { describe, it, expect } from 'vitest';
import { calcTimeDelta, getUniqueCharactersLength } from '.';

describe('test unique letters in sentence', () => {
  it('should return length of unique characters', () => {
    expect(getUniqueCharactersLength('aaa')).toEqual(1);
    expect(getUniqueCharactersLength('abaabbba')).toEqual(2);
    expect(getUniqueCharactersLength('')).toEqual(0);
    expect(getUniqueCharactersLength(undefined)).toEqual(0);
    expect(getUniqueCharactersLength(null)).toEqual(0);
    expect(getUniqueCharactersLength('brown fox jumps')).toEqual(13);
  });
});

describe('it should return time diff', () => {
  it('should test for right delta between numbers', () => {
    expect(calcTimeDelta({ start: 2, finish: 4 })).toEqual(2);
    expect(calcTimeDelta({ start: 1700070590292, finish: 1700070613251 })).toEqual(22959);
    expect(calcTimeDelta({ start: 0, finish: 0 })).toEqual(0);
    expect(calcTimeDelta({ start: 0, finish: 2 })).toEqual(0);
    expect(calcTimeDelta({ start: 2, finish: 0 })).toEqual(0);
  });
});
