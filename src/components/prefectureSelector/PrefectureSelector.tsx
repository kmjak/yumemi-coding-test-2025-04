'use client';

import { Prefecture } from '@/types/models/prefecture/Prefecture';
import { JSX } from 'react';
import SearchPrefectureForm from './SearchPrefectureForm';
import PrefectureCheckboxList from './PrefectureCheckboxList';
import usePrefecture from '@/hooks/prefecture/usePrefecture';
import usePopulationComp from '@/hooks/populationComp/usePopulationComp';
import { PopulationCompResponse } from '@/types/models/populationComp/PopulationCompResponse';
import { useAtom, useSetAtom } from 'jotai';
import { boundaryYearsAtom } from '@/store/populationComp/boundaryYearsAtom';
import { populationCompByPrefCodesAtom } from '@/store/populationComp/populationCompByPrefCodesAtom';
import { BoundaryYears } from '@/types/models/populationComp/BoundaryYears';
import { PopulationCompByPrefCodes } from '@/types/models/populationComp/PopulationCompByPrefCodes';

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
  const { handleGetPopulationCompByPrefCode } = usePopulationComp();
  const setBoundaryYears = useSetAtom(boundaryYearsAtom);
  const setPopulationCompByPrefCodes = useSetAtom(populationCompByPrefCodesAtom);

  /**
   * @description 都道府県番号を受け取り、チェックボックスの状態のオンオフを切り替える処理+その都道府県番号の必要なデータを取得する関数
   * @param {number} prefCode - 都道府県コード
   * @returns {void}
   */
  const handlePrefectureSelection = async ({ prefCode }: { prefCode: number }): Promise<void> => {
    // チェックボックスの状態を切り替え、checkboxにチェックを入れたのか外したのかを取得(true:チェックを入れた, false:チェックを外した)
    const isChecked: boolean = handleTogglePrefCode({ prefCode });

    if (isChecked) {
      // チェックボックスにチェックを入れた場合、都道府県コードに対応する人口構成データを取得

      // 都道府県コードに対応する人口構成データを取得
      const populationCompResponse: PopulationCompResponse | undefined =
        await handleGetPopulationCompByPrefCode({ prefCode });

      // populationCompResponseがundefinedの場合は何もしない
      if (populationCompResponse === undefined) return;

      // populationCompResponseからboundaryYearとpopulationCompを取得
      const { boundaryYear, data: populationComp } = populationCompResponse;

      // boundaryYearが存在する場合、boundaryYearsに追加
      if (boundaryYear) {
        const boundaryYears: BoundaryYears = {
          [prefCode]: boundaryYear,
        };
        setBoundaryYears((prev) => ({ ...prev, ...boundaryYears }));
      }

      // populationCompが存在する場合、populationCompByPrefCodesに追加
      if (populationComp) {
        // 総人口
        const totalPopulation = populationComp[0].data;
        // 若年人口
        const youngPopulation = populationComp[1].data;
        // 生産年齢人口
        const workingPopulation = populationComp[2].data;
        // 高齢人口
        const elderlyPopulation = populationComp[3].data;

        const populationCompByPrefCodes: PopulationCompByPrefCodes = {
          [prefCode]: {
            total: totalPopulation,
            young: youngPopulation,
            working: workingPopulation,
            elderly: elderlyPopulation,
          },
        };

        setPopulationCompByPrefCodes((prev) => ({ ...prev, ...populationCompByPrefCodes }));
      }
    } else {
      // チェックボックスのチェックを外した場合、都道府県コードに対応する人口構成データを削除
      setPopulationCompByPrefCodes((prev) => {
        const newState = { ...prev };
        delete newState[prefCode];
        return newState;
      });
    }
  };

  return (
    <section className="flex flex-col gap-3 sm:gap-3 md:gap-4 lg:gap-6 w-full">
      <PrefectureCheckboxList
        prefectures={prefectures}
        checkedPrefectures={checkedPrefectures}
        handlePrefectureSelection={handlePrefectureSelection}
      />
      <SearchPrefectureForm
        prefectures={prefectures}
        handlePrefectureSelection={handlePrefectureSelection}
      />
    </section>
  );
}
