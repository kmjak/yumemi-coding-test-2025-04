'use client';

import isValidPrefCode from '@/utils/prefecture/isValidPrefCode';
import { useState } from 'react';

interface UsePrefectureReturn {
  checkedPrefectures: number[];
  handleTogglePrefCode: ({ prefCode }: { prefCode: number }) => boolean;
  handleDeselectAll: () => void;
  handleSetPrefCodes: ({ prefCodes }: { prefCodes: number[] }) => void;
}

/**
 * @file usePrefecture.ts
 * @description 都道府県に関するhandlerをまとめたカスタムフック
 * @returns {
 *  checkedPrefectures: number[],
 *  handleTogglePrefCode: ({ prefCode }: { prefCode: number }) => void,
 *  handleDeselectAll: () => void
 *  handleSetPrefCodes: ({ prefCodes }: { prefCodes: number[] }) => void
 * }
 *
 * @author @kmjak
 */

export default function usePrefecture(): UsePrefectureReturn {
  const [checkedPrefectures, setCheckedPrefectures] = useState<number[]>([]);

  /**
   * @description 都道府県コードを受け取り、チェックボックスの状態のオンオフを切り替える
   * @param {prefCode: number} - 都道府県コード
   * @returns {boolean}
   */
  const handleTogglePrefCode = ({ prefCode }: { prefCode: number }): boolean => {
    // prefCodeが1から47の整数であるかをチェックする
    if (!isValidPrefCode({ prefCode })) {
      return false;
    }
    // チェックボックスの状態を切り替える
    if (checkedPrefectures.includes(prefCode)) {
      setCheckedPrefectures((prev) => prev.filter((code) => code !== prefCode));
      return false;
    }
    setCheckedPrefectures((prev) => [...prev, prefCode]);
    return true;
  };

  const handleDeselectAll = (): void => {
    setCheckedPrefectures([]);
  };

  const handleSetPrefCodes = ({ prefCodes }: { prefCodes: number[] }): void => {
    setCheckedPrefectures(prefCodes);
  };

  return { checkedPrefectures, handleTogglePrefCode, handleDeselectAll, handleSetPrefCodes };
}
