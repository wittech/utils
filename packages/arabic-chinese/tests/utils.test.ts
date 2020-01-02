import { getDigit, clearZero } from '../src/utils';

describe('utils getDigit', () => {
  it('getDigit', () => {
    expect(getDigit(1)).toEqual(1);
  });
});

describe('utils clearZero', () => {
  it('default', () => {
    expect(clearZero('一百零零零零零零零零一零零零零', '零')).toEqual('一百一');
  });

  it('^', () => {
    expect(clearZero('零零零零零零零零一', '零', '^')).toEqual('一');
  });

  it('$', () => {
    expect(clearZero('一百零零零零零零零零', '零', '$')).toEqual('一百');
  });

  it('nto1', () => {
    expect(clearZero('一百零零一零', '零', 'nto1')).toEqual('一百一零');
  });
});
