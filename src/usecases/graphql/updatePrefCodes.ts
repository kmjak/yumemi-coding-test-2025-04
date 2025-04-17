import { updateYumemiCodingTest202504 } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';

/**
 * @description updatePrefCodesの型定義
 * @property {string} roomId - 部屋のID
 * @property {number[]} checkedPrefectures - 選択された都道府県のID
 * @property {number} prefCode - 都道府県コード
 */
interface UpdatePrefCodesProps {
  roomId: string;
  checkedPrefectures: number[];
  prefCode: number;
}

/**
 * @file updatePrefCodes.ts
 * @description Appsyncを使って、dynamodbの部屋の都道府県コードを更新する関数
 * @param {UpdatePrefCodesProps} props - 部屋のIDや選択された都道府県番号など
 * @returns {Promise<boolean>} - 成功した場合はtrue、失敗した場合はエラーを投げる
 *
 * @author @kmjak
 */
export default async function updatePrefCodes({
  roomId,
  checkedPrefectures,
  prefCode,
}: UpdatePrefCodesProps): Promise<boolean> {
  const client = generateClient();
  try {
    const response = await client.graphql({
      query: updateYumemiCodingTest202504,
      variables: {
        input: {
          prefCodes: checkedPrefectures.includes(prefCode)
            ? checkedPrefectures.filter((code) => code !== prefCode)
            : [...checkedPrefectures, prefCode],
          roomId,
        },
      },
    });

    if (response.errors || !response.data?.updateYumemiCodingTest202504) {
      throw new Error('部屋の都道府県コードの更新に失敗しました');
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error');
    }
  }
}
