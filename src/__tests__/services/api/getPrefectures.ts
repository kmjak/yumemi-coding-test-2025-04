import getPrefectures from '@/services/api/getPrefectures';
import { Prefecture } from '@/types/api/Prefecture';

describe('getPrefectures', () => {
  // テストケース: 正常系
  test('都道府県一覧を取得できる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<Prefecture[]> => [
        {
          prefCode: 1,
          prefName: '北海道',
        },
      ],
    });

    // getPrefectures関数を実行
    const response: Prefecture[] | false = await getPrefectures();

    // fetchで取得したデータが正しいか確認
    expect(response).toEqual([
      {
        prefCode: 1,
        prefName: '北海道',
      },
    ]);
  });
});
