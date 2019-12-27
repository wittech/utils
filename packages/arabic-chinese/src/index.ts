import isString from '@pansy/is-string';
import cns from './langs/cn-s';
import hks from './langs/hk-s';
import toMoney from './to-money';
import numberToChinese from './number-to-chinese';
import chineseToNumber from './chinese-to-number';
import { Options } from './types';

export const defaultOptions: Options = {
  ww: true,
  lang: 'cn',
  tenMin: false,
  complete: false,
  outSymbol: true
};

/**
 * 阿拉伯数字和中文数字互转
 *
 * @example
 * ```js
 * const arabicChinese = new ArabicChinese();
 *
 * // 数字转中文
 * arabicChinese.encode('1');
 *
 * // >> '一'
 *
 * // 中文转数字
 * arabicChinese.decode('一');
 *
 * // >> 1
 *
 * // 数字转金额
 * arabicChinese.decode('1');
 *
 * // >> 人民币一元整
 * ```
 */
export default class ArabicChinese {
  private readonly options: Options;

  constructor(options?: Options) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
   * 数字转中文
   * @param num
   * @param options
   */
  encode = (num: string | number): string => {
    const lang = this.options.lang === 'cn' ? cns : hks;
    return numberToChinese(num, lang, this.options);
  };

  /**
   * 中文转数字
   * @param zhNum
   * @param options
   */
  decode = (zhNum: string): number => {
    if (!isString(zhNum)) return zhNum;
    const lang = this.options.lang === 'cn' ? cns : hks;
    return chineseToNumber(zhNum, lang);
  };

  /**
   * 数字转金额
   * @param num
   * @param options
   */
  toMoney = (num: string | number): string => {
    if (!num) return num.toString();
    return toMoney(num, this.options);
  };
}
