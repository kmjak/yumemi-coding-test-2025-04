import { getYumemiCodingTest202504 } from '@/graphql/queries';
import { YumemiCodingTest202504 } from '@/types/models/graphql/GraphqlSchema';
import { generateClient } from 'aws-amplify/api';

/**
 * @description getPrefCodesの引数の型
 */
interface GetPrefCodesProps {
  roomId: string;
}

/**
 * @file getPrefCodes.ts
 * @exports getPrefCodes
 * @description 都道府県コードを取得する関数
 * @param {string} ルームIDなど
 * @return 都道府県コードの配列
 *
 * @author @kmjak
 */
export default async function getPrefCodes({ roomId }: GetPrefCodesProps): Promise<number[]> {
  const client = generateClient();
  try {
    const response = (await client.graphql({
      query: getYumemiCodingTest202504,
      variables: {
        roomId,
      },
    })) as {
      data: {
        getYumemiCodingTest202504: YumemiCodingTest202504;
      };
    };
    const prefCodes = response.data.getYumemiCodingTest202504.prefCodes;
    return prefCodes.filter((prefCode): prefCode is number => prefCode !== null);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error');
    }
  }
}
