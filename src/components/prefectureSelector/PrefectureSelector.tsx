'use client';

import { Prefecture } from '@/types/models/prefecture/Prefecture';
import { JSX } from 'react';
import SearchPrefectureForm from './SearchPrefectureForm';
import PrefectureCheckboxList from './PrefectureCheckboxList';
import usePrefecture from '@/hooks/prefecture/usePrefecture';

/**
 * @description PrefectureSelectorPropsの型定義
 * @property {Prefecture[]} prefectures - 都道府県の配列
 */
interface PrefectureSelectorProps {
  prefectures: Prefecture[];
}

/**
 * @file PrefectureSelector.tsx
 * @description 都道府県のチェックボックスと検索フォームを表示するコンポーネント
 * @param {Prefecture[]} prefectures - 都道府県の配列
 * @returns {JSX.Element} - 都道府県のチェックボックスと検索フォームを表示するコンポーネント
 *
 * @author @kmjak
 */
export default function PrefectureSelector({ prefectures }: PrefectureSelectorProps): JSX.Element {
  const { checkedPrefectures, handleTogglePrefCode } = usePrefecture();

  return (
    <section className="flex flex-col gap-6 w-full">
      <PrefectureCheckboxList
        prefectures={prefectures}
        checkedPrefectures={checkedPrefectures}
        handleTogglePrefCode={handleTogglePrefCode}
      />
      <SearchPrefectureForm prefectures={prefectures} handleTogglePrefCode={handleTogglePrefCode} />
    </section>
  );
}
