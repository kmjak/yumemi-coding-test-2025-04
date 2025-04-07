import getPopulationComposition from '@/services/api/getPopulationComposition';
import { PopulationCompositionResponse } from '@/types/api/PopulationCompositionResponse';

describe('getPopulationComposition', () => {
  // テストケース: 正常系
  test('人口構成を取得できる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<{ result: PopulationCompositionResponse }> => ({
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                {
                  year: 2010,
                  value: 1000,
                },
                {
                  year: 2015,
                  value: 1100,
                },
              ],
            },
          ],
        },
      }),
    });

    // getPopulationComposition関数を実行
    const response: PopulationCompositionResponse | false = await getPopulationComposition({
      prefCode: 1,
    });

    // getPopulationComposition関数の期待する戻り値と一致するか確認
    expect(response).toEqual({
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            {
              year: 2010,
              value: 1000,
            },
            {
              year: 2015,
              value: 1100,
            },
          ],
        },
      ],
    });
  });

  // テストケース: fetchのURLが正しいか確認
  test('fetchが正しいURLとヘッダーで呼ばれているか確認', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                {
                  year: 2010,
                  value: 1000,
                },
                {
                  year: 2015,
                  value: 1100,
                },
              ],
            },
          ],
        },
      }),
    });
    global.fetch = mockFetch;

    await getPopulationComposition({ prefCode: 1 });

    // 正しいURLでfetchが呼ばれているか
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('?prefCode=1'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-API-KEY': expect.any(String),
        }),
      })
    );
  });

  // テストケース: レスポンスがOKでない場合
  test('レスポンスがOKでない場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    // getPopulationComposition関数を実行
    const response: PopulationCompositionResponse | false = await getPopulationComposition({
      prefCode: 1,
    });

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });

  // テストケース: レスポンスデータにresultがない場合
  test('レスポンスデータにresultがない場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<unknown> => ({ message: 'No result' }),
    });

    // getPopulationComposition関数を実行
    const response: PopulationCompositionResponse | false = await getPopulationComposition({
      prefCode: 1,
    });

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });

  // テストケース: エラーが発生した場合
  test('エラーが発生した場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    // getPopulationComposition関数を実行
    const response: PopulationCompositionResponse | false = await getPopulationComposition({
      prefCode: 1,
    });

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });
});
