import isString from '@pansy/is-string';
import cns from './langs/cn-s';
import hks from './langs/hk-s';
import cnb from './langs/cn-b';
import hkb from './langs/hk-b';
import toMoney from './to-money';
import numberToChinese from './number-to-chinese';
import chineseToNumber from './chinese-to-number';
import { Options, Lang } from './types';

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
  private readonly langS: Lang;
  private readonly langB: Lang;

  constructor(options?: Options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.langS = this.options.lang === 'cn' ? cns : hks;
    this.langB = this.options.lang === 'cn' ? cnb : hkb;
  }

  /**
   * 数字转中文
   * @param num
   * @param options
   */
  encode = (num: string | number): string => {
    return numberToChinese(num, this.langS, this.options);
  };

  /**
   * 中文转数字
   * @param zhNum
   * @param options
   */
  decode = (zhNum: string): number => {
    if (!isString(zhNum)) return zhNum;
    return chineseToNumber(zhNum, this.langS);
  };

  /**
   * 数字转金额
   * @param num
   * @param options
   */
  toMoney = (num: string | number): string => {
    if (!num) return num.toString();
    return toMoney(num, this.langB, this.options);
  };
}
