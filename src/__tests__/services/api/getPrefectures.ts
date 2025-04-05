import getPrefectures from '@/services/api/getPrefectures';
import { Prefecture } from '@/types/api/Prefecture';

describe('getPrefectures', () => {
  test('都道府県一覧を取得できる', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<Prefecture[]> => [
        {
          prefCode: 1,
          prefName: '北海道',
        },
      ],
    });
    const response = await getPrefectures();
    expect(response).toEqual([
      {
        prefCode: 1,
        prefName: '北海道',
      },
    ]);
  });
});
