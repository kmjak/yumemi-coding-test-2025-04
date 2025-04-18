'use client';

import createRoom from '@/usecases/graphql/createRoom';
import getPrefCodes from '@/usecases/graphql/getPrefCodes';
import updatePrefCodes from '@/usecases/graphql/updatePrefCodes';

/**
 * @description useAppsyncの戻り値の型定義
 * @property {function} handleCreateRoom - roomを作成する関数
 * @property {function} handleUpdatePrefCodes - roomの都道府県番号を更新する関数
 * @property {function} handleGetPrefCodes - roomの都道府県番号を取得する関数
 */
interface UseAppsyncReturns {
  handleCreateRoom: ({ roomId }: { roomId: string }) => Promise<boolean>;
  handleUpdatePrefCodes: ({
    roomId,
    prefCode,
    checkedPrefectures,
  }: {
    roomId: string;
    prefCode: number;
    checkedPrefectures: number[];
  }) => Promise<boolean>;
  handleGetPrefCodes: ({ roomId }: { roomId: string }) => Promise<number[]>;
}

/**
 * @file useAppsync.ts
 * @description Appsyncのカスタムフックをまとめたファイル
 * @returns {
 *  handleCreateRoom: ({roomId}: {roomId:string}) => Promise<boolean>;
 *  handleUpdatePrefCodes: ({roomId, prefCode, checkedPrefectures}: {roomId:string; prefCode:number; checkedPrefectures:number[]}) => Promise<boolean>;
 *  handleGetPrefCodes: ({roomId}: {roomId:string}) => Promise<number[]>;
 * }
 *
 * @author @kmjak
 */
export default function useAppsync(): UseAppsyncReturns {
  /**
   * @description roomを作成する関数
   * @param {string}
   * @returns {Promise<boolean>} - 成功した場合はtrue、失敗した場合はfalse
   */
  const handleCreateRoom = async ({ roomId }: { roomId: string }): Promise<boolean> => {
    try {
      // roomIdをもとに部屋を作成
      const isCreated: boolean = await createRoom({ roomId });
      // 成功した場合はtrueを返す
      return isCreated;
    } catch {
      // エラーが発生した場合はfalseを返す
      return false;
    }
  };

  /**
   * @description roomの都道府県番号を更新する関数
   * @param {string} roomId - 部屋のID
   * @param {number} prefCode - 都道府県コード
   * @param {number[]} checkedPrefectures - 選択された都道府県コードの配列
   * @returns {Promise<boolean>} - 成功した場合はtrue、失敗した場合はfalse
   */
  const handleUpdatePrefCodes = async ({
    roomId,
    prefCode,
    checkedPrefectures,
  }: {
    roomId: string;
    prefCode: number;
    checkedPrefectures: number[];
  }): Promise<boolean> => {
    try {
      // roomIdをもとに都道府県コードを更新
      const isUpdated: boolean = await updatePrefCodes({ roomId, checkedPrefectures, prefCode });
      // 成功した場合はtrueを返す
      return isUpdated;
    } catch {
      // エラーが発生した場合はfalseを返す
      return false;
    }
  };

  /**
   * @description roomの都道府県番号を取得する関数
   * @param {string}
   * @returns {Promise<number[]>} - 都道府県コードの配列
   */
  const handleGetPrefCodes = async ({ roomId }: { roomId: string }): Promise<number[]> => {
    try {
      // roomIdをもとに都道府県コードを取得
      const prefCodes: number[] = await getPrefCodes({ roomId });

      // prefCodesを返す
      return prefCodes;
    } catch {
      // エラーが発生した場合は空の配列を返す
      return [];
    }
  };

  return {
    handleCreateRoom,
    handleUpdatePrefCodes,
    handleGetPrefCodes,
  };
}
