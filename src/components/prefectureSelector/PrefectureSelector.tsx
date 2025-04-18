'use client';

import { Prefecture } from '@/types/models/prefecture/Prefecture';
import { JSX, useEffect } from 'react';
import SearchPrefectureForm from './SearchPrefectureForm';
import PrefectureCheckboxList from './PrefectureCheckboxList';
import usePrefecture from '@/hooks/prefecture/usePrefecture';
import { useSetAtom } from 'jotai';
import { prefectureSelectionActionAtom } from '@/store/prefectureSelection/prefectureSelectionActionAtom';
import DeselectAll from './DeselectAll';
import useAppsync from '@/hooks/graphql/useAppsync';
import { generateClient } from 'aws-amplify/api';
import { onUpdateYumemiCodingTest202504 } from '@/graphql/subscriptions';

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
  const roomId = 'kmjak'; // TODO: roomIdを引数で受け取るようにする
  const client = generateClient();
  const { checkedPrefectures, handleTogglePrefCode, handleDeselectAll, handleSetPrefCodes } =
    usePrefecture();
  const { handleUpdatePrefCodes, handleGetPrefCodes, handleResetPrefCodes } = useAppsync();
  const setPrefectureSelectionAction = useSetAtom(prefectureSelectionActionAtom);

  /**
   * @description チェックボックスの状態のオンオフを切り替える処理+prefectureSelectionActionにアクションをセットする+Appsyncのデータを更新する
   * @param {number} prefCode - 都道府県コード
   * @returns {void}
   */
  const handlePrefectureSelection = async ({ prefCode }: { prefCode: number }): Promise<void> => {
    // チェックボックスの状態を切り替え、checkboxにチェックを入れたのか外したのかを取得(true:チェックを入れた, false:チェックを外した)
    const isChecked: boolean = handleTogglePrefCode({ prefCode });

    // Appsyncのデータも更新する
    const isAppsyncUpdated = await handleUpdatePrefCodes({
      roomId, // TODO: roomIdを引数で受け取るようにする
      prefCode,
      checkedPrefectures,
    });

    if (!isAppsyncUpdated) {
      handleTogglePrefCode({ prefCode });
    }

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
  const handleDeselectAllPrefCodes = async (): Promise<void> => {
    handleDeselectAll();
    setPrefectureSelectionAction({
      action: 'deleteAll',
    });

    // Appsyncのデータも更新する
    const isReset = await handleResetPrefCodes({
      roomId, // TODO: roomIdを引数で受け取るようにする
    });
    if (!isReset) {
      alert('都道府県コードのリセットに失敗しました');
    }
  };

  useEffect(() => {
    // Appsyncのデータを取得する
    const fetchPrefCodes = async () => {
      const prefCodes = await handleGetPrefCodes({ roomId }); // TODO: roomIdを引数で受け取るようにする
      handleSetPrefCodes({ prefCodes });
      setPrefectureSelectionAction({
        action: 'insertList',
        prefCodes,
      });
    };

    fetchPrefCodes();
    return () => {
      // コンポーネントがアンマウントされたときに、チェックボックスの状態をリセットする
      handleDeselectAll();
    };
  }, [roomId]);

  useEffect(() => {
    const subscription = client.graphql({ query: onUpdateYumemiCodingTest202504 }).subscribe({
      next: ({ data }) => {
        if (data?.onUpdateYumemiCodingTest202504) {
          const prefCodes = data.onUpdateYumemiCodingTest202504.prefCodes.filter(
            (prefCode): prefCode is number => prefCode !== null
          );
          if (!prefCodes) return;
          handleSetPrefCodes({
            prefCodes,
          });

          setPrefectureSelectionAction({
            action: 'insertList',
            prefCodes,
          });
        }
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client]);

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
