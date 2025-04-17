'use client';

import { Prefecture } from '@/types/models/prefecture/Prefecture';
import { JSX } from 'react';
import SearchPrefectureForm from './SearchPrefectureForm';
import PrefectureCheckboxList from './PrefectureCheckboxList';
import usePrefecture from '@/hooks/prefecture/usePrefecture';
import { useSetAtom } from 'jotai';
import { prefectureSelectionActionAtom } from '@/store/prefectureSelection/prefectureSelectionActionAtom';
import DeselectAll from './DeselectAll';

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
  const { checkedPrefectures, handleTogglePrefCode, handleDeselectAll } = usePrefecture();
  const setPrefectureSelectionAction = useSetAtom(prefectureSelectionActionAtom);

  /**
   * @description 都道府県番号を受け取り、チェックボックスの状態のオンオフを切り替える処理+prefectureSelectionActionにどんなアクションをしたかをセットする
   * @param {number} prefCode - 都道府県コード
   * @returns {void}
   */
  const handlePrefectureSelection = async ({ prefCode }: { prefCode: number }): Promise<void> => {
    // チェックボックスの状態を切り替え、checkboxにチェックを入れたのか外したのかを取得(true:チェックを入れた, false:チェックを外した)
    const isChecked: boolean = handleTogglePrefCode({ prefCode });

    if (isChecked) {
      // checkboxにチェックが入った場合、actionをinsertにセット
      setPrefectureSelectionAction({
        action: 'insert',
        prefCode,
      });
    } else {
      // checkboxにチェックが外れた場合、actionをdeleteにセット
      setPrefectureSelectionAction({
        action: 'delete',
        prefCode,
      });
    }
  };

  /**
   * @description 全てのチェックボックスの状態を外す処理
   * @returns {void}
   */
  const handleDeselectAllPrefCodes = (): void => {
    handleDeselectAll();
    setPrefectureSelectionAction({
      action: 'deleteAll',
    });
  };

  return (
    <section className="flex flex-col gap-3 sm:gap-3 md:gap-4 lg:gap-6 w-full">
      <PrefectureCheckboxList
        prefectures={prefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureSelection={handlePrefectureSelection}
      />
      <div className="md:flex md:justify-center items-center">
        <SearchPrefectureForm
          prefectures={prefectures}
          handlePrefectureSelection={handlePrefectureSelection}
        />
        <DeselectAll handleDeselectAllPrefCodes={handleDeselectAllPrefCodes} />
      </div>
    </section>
  );
}
