'use client';

import { JSX, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Prefecture } from '@/types/models/prefecture/Prefecture';

/**
 * @description SearchPrefectureFormPropsの型定義
 * @property {Prefecture[]} prefectures - 都道府県の配列
 * @property {function} handlePrefectureSelection - 都道府県コードを受け取り、チェックボックスの状態のオンオフを切り替える関数
 */
interface SearchPrefectureFormProps {
  prefectures: Prefecture[];
  handlePrefectureSelection: ({ prefCode }: { prefCode: number }) => void;
}

/**
 * @file SearchPrefectureForm.tsx
 * @description 都道府県名を入力し、該当する都道府県コードを取得してhandlePrefectureSelectionを実行するコンポーネント
 * @param {Prefecture[]} prefectures - 都道府県の配列
 * @param {function} handlePrefectureSelection - 都道府県コードを受け取り、チェックボックスの状態のオンオフを切り替える関数
 * @returns {JSX.Element} - 都道府県名を入力し、該当する都道府県コードを取得してhandlePrefectureSelectionを実行するコンポーネント
 *
 * @author @kmjak
 */
export default function SearchPrefectureForm({
  prefectures,
  handlePrefectureSelection,
}: SearchPrefectureFormProps): JSX.Element {
  const [searchPrefName, setSearchPrefName] = useState<string>('');

  /**
   * @description 都道府県名を入力し、該当する都道府県コードを取得してhandlePrefectureSelectionを実行する
   * @param {React.FormEvent<HTMLFormElement>} event - フォームのsubmitイベント
   * @returns {void}
   */
  const handleSearchSelect = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const matchedPref: Prefecture | undefined = prefectures.find(
      (pref) => pref.prefName === searchPrefName
    );
    if (matchedPref !== undefined) {
      handlePrefectureSelection({ prefCode: matchedPref.prefCode });
      setSearchPrefName('');
    } else {
      alert('該当する都道府県が見つかりませんでした');
    }
  };

  return (
    <form className="flex justify-center items-center gap-2" onSubmit={handleSearchSelect}>
      <Input
        list="prefecture-list"
        type="text"
        id="searchPrefecture"
        value={searchPrefName}
        onChange={(e) => setSearchPrefName(e.target.value)}
        placeholder="都道府県名を入力"
        className="border px-2 py-1 rounded"
      />
      <datalist id="prefecture-list">
        {prefectures.map((pref) => (
          <option key={pref.prefCode} value={pref.prefName} />
        ))}
      </datalist>
      <Button
        disabled={
          !prefectures.some((prefecture: Prefecture) => prefecture.prefName === searchPrefName)
        }
        className={`${
          prefectures.some((prefecture: Prefecture) => prefecture.prefName === searchPrefName)
            ? 'bg-blue-700 hover:bg-blue-800'
            : 'bg-gray-700 hover:bg-gray-700 cursor-not-allowed'
        }`}
      >
        切り替え
      </Button>
    </form>
  );
}
