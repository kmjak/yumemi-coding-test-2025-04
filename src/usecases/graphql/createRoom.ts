import { createYumemiCodingTest202504 } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';

interface CreateRoomProps {
  roomId: string;
}

/**
 * @file createRoom.ts
 *
 * @description 都道府県コードを指定して、人口構成の情報を取得する関数
 * @param prefCode 都道府県コード
 * @return 都道府県の人口構成情報
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
