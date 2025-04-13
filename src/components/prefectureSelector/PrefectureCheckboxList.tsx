'use client';

import { JSX } from 'react';
import Label from '@/components/ui/Label';
import Checkbox from '@/components/ui/Checkbox';
import { Prefecture } from '@/types/models/prefecture/Prefecture';

/**
 * @description PrefectureCheckboxListPropsの型定義
 * @property {Prefecture[]} prefectures - 都道府県の配列
 * @property {number[]} checkedPrefectures - チェックされている都道府県コードの配列
 * @property {function} handleTogglePrefCode - 都道府県コードを受け取り、チェックボックスの状態のオンオフを切り替える関数
 */
interface PrefectureCheckboxListProps {
  prefectures: Prefecture[];
  checkedPrefectures: number[];
  handleTogglePrefCode: ({ prefCode }: { prefCode: number }) => void;
}

/**
 * @file PrefectureCheckboxList.tsx
 * @description 都道府県のチェックボックスリストを表示するコンポーネント
 * @param {Prefecture[]} prefectures - 都道府県の配列
 * @param {number[]} checkedPrefectures - チェックされている都道府県コードの配列
 * @param {function} handleTogglePrefCode - 都道府県コードを受け取り、チェックボックスの状態のオンオフを切り替える関数
 * @returns {JSX.Element} - 都道府県のチェックボックスリストを表示するコンポーネント
 *
 * @author @kmjak
 */
export default function PrefectureCheckboxList({
  prefectures,
  checkedPrefectures,
  handleTogglePrefCode,
}: PrefectureCheckboxListProps): JSX.Element {
  return (
    <fieldset className="flex flex-wrap gap-4 w-full px-4">
      <legend className="text-xl sm:text-2xl md:text-3xl font-bold text-center py-4">
        都道府県一覧チェックボックス
      </legend>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode} className="flex items-center">
          <Checkbox
            id={`prefecture-${prefecture.prefCode}`}
            checked={checkedPrefectures.includes(prefecture.prefCode)}
            onChange={() => handleTogglePrefCode({ prefCode: prefecture.prefCode })}
          />
          <Label
            htmlFor={`prefecture-${prefecture.prefCode}`}
            className="pl-2 text-sm sm:text-base md:text-lg lg:text-xl"
          >
            {prefecture.prefName}
          </Label>
        </div>
      ))}
    </fieldset>
  );
}
