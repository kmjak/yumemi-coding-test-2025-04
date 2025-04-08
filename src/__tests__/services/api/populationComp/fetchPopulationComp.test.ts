import fetchPopulationComp from '@/services/api/populationComp/fetchPopulationComp';
import { PopulationCompResponse } from '@/types/api/models/populationComp/PopulationCompoResponse';

describe('fetchPopulationComp', () => {
  // 元のfetchを保存する変数
  let originalFetch: typeof global.fetch;

  // 各テストの前に実行するsetup
  beforeEach(() => {
    // 元のfetchを保存
    originalFetch = global.fetch;
    // モックのfetchをリセット
    global.fetch = jest.fn();
  });

  // 各テストの後に実行するcleanup
  afterEach(() => {
    // テスト後に元のfetchに戻す
    global.fetch = originalFetch;
    // モックのfetchをクリア
    jest.clearAllMocks();
  });

  // テストケース: 正常系
  test('人口構成を取得できる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<{ result: PopulationCompResponse }> => ({
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

    // fetchPopulationComp関数を実行
    const response: PopulationCompResponse | false = await fetchPopulationComp({
      prefCode: 1,
    });

    // fetchPopulationComp関数の期待する戻り値と一致するか確認
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

  // テストケース: fetchのURLとメソッド正しいか確認
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

    await fetchPopulationComp({ prefCode: 1 });

    // 正しいURLでfetchが呼ばれているか
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('?prefCode=1'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-API-KEY': expect.any(String),
        }),
        // GETメソッドかどうか
        method: 'GET',
      })
    );

    // fetchが1回だけ呼ばれているか
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  // テストケース: レスポンスがOKでない場合
  test('レスポンスがOKでない場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    // fetchPopulationComp関数を実行
    const response: PopulationCompResponse | false = await fetchPopulationComp({
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

    // fetchPopulationComp関数を実行
    const response: PopulationCompResponse | false = await fetchPopulationComp({
      prefCode: 1,
    });

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });

  // テストケース: エラーが発生した場合
  test('エラーが発生した場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    // fetchPopulationComp関数を実行
    const response: PopulationCompResponse | false = await fetchPopulationComp({
      prefCode: 1,
    });

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });
});
