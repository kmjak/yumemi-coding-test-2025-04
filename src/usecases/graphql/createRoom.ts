import { createYumemiCodingTest202504 } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';

/**
 * @description createRoomの型定義
 * @property {string} roomId - 部屋のID
 */
interface CreateRoomProps {
  roomId: string;
}

/**
 * @file createRoom.ts
 * @description Appsyncを使って、dynamodbに部屋を登録する関数
 * @param {CreateRoomProps} roomId - 部屋のID
 * @returns {Promise<boolean>} - 成功した場合はtrue、失敗した場合はエラーを投げる
 *
 * @author @kmjak
 */
export default async function createRoom({ roomId }: CreateRoomProps): Promise<boolean> {
  const client = generateClient();
  try {
    const response = client.graphql({
      query: createYumemiCodingTest202504,
      variables: {
        input: {
          roomId,
          prefCodes: [],
        },
      },
    });
    const result = await response;
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error');
    }
  }
}
