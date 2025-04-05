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

  // テストケース: レスポンスがOKでない場合
  test('レスポンスがOKでない場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    // getPrefectures関数を実行
    const response: Prefecture[] | false = await getPrefectures();

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });

  // テストケース: レスポンスデータが配列でない場合
  test('レスポンスデータが配列でない場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<unknown> => ({ message: 'Invalid data' }),
    });

    // getPrefectures関数を実行
    const response: Prefecture[] | false = await getPrefectures();

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });

  // テストケース: レスポンスデータが空の配列の場合
  test('レスポンスデータが空の配列の場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<Prefecture[]> => [],
    });

    // getPrefectures関数を実行
    const response: Prefecture[] | false = await getPrefectures();

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });
});
