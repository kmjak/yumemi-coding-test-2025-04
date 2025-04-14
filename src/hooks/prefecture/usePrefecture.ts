'use client';

import { useState } from 'react';

/**
 * @file usePrefecture.ts
 * @description 都道府県に関するhandlerをまとめたカスタムフック
 * @returns {
 *  checkedPrefectures: number[],
 *  handleTogglePrefCode: ({ prefCode }: { prefCode: number }) => void,
 * }
 *
 * @author @kmjak
 */

export default function usePrefecture(): {
  checkedPrefectures: number[];
  handleTogglePrefCode: ({ prefCode }: { prefCode: number }) => boolean;
} {
  const [checkedPrefectures, setCheckedPrefectures] = useState<number[]>([]);

  /**
   * @description 都道府県コードを受け取り、チェックボックスの状態のオンオフを切り替える
   * @param {prefCode: number} - 都道府県コード
   * @returns {boolean}
   */
  const handleTogglePrefCode = ({ prefCode }: { prefCode: number }): boolean => {
    if (checkedPrefectures.includes(prefCode)) {
      setCheckedPrefectures((prev) => prev.filter((code) => code !== prefCode));
      return false;
    }
    setCheckedPrefectures((prev) => [...prev, prefCode]);
    return true;
  };

  return { checkedPrefectures, handleTogglePrefCode };
}
