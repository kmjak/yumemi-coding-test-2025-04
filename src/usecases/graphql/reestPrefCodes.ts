import { updateYumemiCodingTest202504 } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';

export default async function resetPrefCodes({ roomId }: { roomId: string }): Promise<boolean> {
  const client = generateClient();

  try {
    const response = await client.graphql({
      query: updateYumemiCodingTest202504,
      variables: {
        input: {
          roomId,
          prefCodes: [],
        },
      },
    });

    if (response.errors) {
      throw new Error('部屋の都道府県コードのリセットに失敗しました');
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error');
    }
  }
}
