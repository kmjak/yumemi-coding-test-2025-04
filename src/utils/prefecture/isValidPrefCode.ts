/**
 * @file isValidPrefCode.ts
 * @description 都道府県コード正常な値かをチェックする関数
 * @param {prefCode: number} - 都道府県コード
 * @returns {boolean} - 都道府県コードが正常な値かどうか
 * @exports isValidPrefCode
 *
 * @author @kmjak
 */
export default function isValidPrefCode({ prefCode }: { prefCode: number }): boolean {
  return Number.isInteger(prefCode) && prefCode >= 1 && prefCode <= 47;
}
