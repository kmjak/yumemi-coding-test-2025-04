import fetchPopulationCompByPrefCode from '@/services/populationComp/fetchPopulationCompByPrefCode';
import { PopulationCompResponse } from '@/types/models/populationComp/PopulationCompResponse';

/**
 * @file fetchPopulationCompByPrefCode.test.ts
 * @description fetchPopulationCompByPrefCode関数のテスト
 * @see src/services/populationComp/fetchPopulationCompByPrefCode.ts
 *
 * @author @kmjak
 */

/**
 * apiConfのモック
 * APIのエンドポイントとAPIキーをモックする
 * @see src/conf/apiConf.ts
 */
jest.mock('@/conf/api/apiConf', () => ({
  apiConf: {
    API_ENDPOINT: 'https://test-api.example.com',
    X_API_KEY: 'test-api-key',
  },
}));

/**
 * apiPathのモック
 * 人口構成を取得するAPIのパスをモックする
 * @see src/conf/apiPath.ts
 */
jest.mock('@/conf/api/apiPath', () => ({
  apiPath: {
    POPULATION_COMP: '/api/populationComp',
  },
}));

describe('fetchPopulationCompByPrefCode', () => {
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

  /**
   * テストケース: 正常
   * 都道府県コードを指定して人口構成を取得できる
   *
   * @expect
   * {
   *   boundaryYear: 2020,
   *   data: [
   *     {
   *       label: '総人口',
   *       data: [
   *         {
   *           year: 2010,
   *           value: 1000,
   *         },
   *         {
   *           year: 2015,
   *           value: 1100,
   *         },
   *       ],
   *     },
   *   ],
   * }
   */
  test('人口構成を問題なく取得できる', async (): Promise<void> => {
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

    // fetchPopulationCompByPrefCode関数を実行
    const response: PopulationCompResponse = await fetchPopulationCompByPrefCode({
      prefCode: 1,
    });

    // fetchPopulationCompByPrefCode関数の期待する戻り値と一致するか確認
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

  /**
   * テストケース: fetchのURLとメソッド正しいか確認
   * fetchが正しいURLとヘッダーで呼ばれているか確認
   *
   * @expect
   * fetchが正しいURLとヘッダーで呼ばれていること
   * fetchが1回だけ呼ばれていること
   */
  test('fetchのURLとメソッド正しいか確認', async () => {
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

    await fetchPopulationCompByPrefCode({ prefCode: 1 });

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

  /**
   * テストケース: レスポンスがOKでない場合
   * 基本的にError fetching:...の形式でエラーを投げる
   * 今回は500 Internal Server Errorを想定
   *
   * @expect
   * Error fetching: 500 Internal Server Error
   */
  test('レスポンスがOKでない場合「Error fetching:...」とエラーを投げる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    // fetchPopulationCompByPrefCode関数を実行してエラーをキャッチ
    await expect(fetchPopulationCompByPrefCode({ prefCode: 1 })).rejects.toThrow(
      'Error fetching: 500 Internal Server Error'
    );
  });

  /**
   * テストケース: レスポンスデータにresultがない場合
   *
   * @expect
   * No result in response
   */
  test('レスポンスデータにresultがない場合「No result in response」とエラーを投げる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<unknown> => ({ message: 'No result' }),
    });

    // fetchPopulationCompByPrefCode関数を実行してエラーをキャッチ
    await expect(fetchPopulationCompByPrefCode({ prefCode: 1 })).rejects.toThrow(
      'No result in response'
    );
  });

  /**
   * テストケース: エラーが発生した場合
   * Network errorを想定
   *
   * @expect
   * Error fetching population comp: Network error
   */
  test('エラーが発生した場合そのエラーを投げる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
  });

  /**
   * テストケース: API_ENDPOINTが読み込めなかった場合
   *
   * @expect
   * API_ENDPOINT is empty
   */
  test('API_ENDPOINTが読み込めなかった場合はエラーを投げる', async () => {
    // モジュールをリセット
    jest.resetModules();

    // apiConfをモックするときにAPI_ENDPOINTを空にする
    jest.doMock('@/conf/api/apiConf', () => ({
      apiConf: {
        API_ENDPOINT: '',
        X_API_KEY: 'X-API-KEY',
      },
    }));

    const fetchPopulationCompByPrefCode = (
      await import('@/services/populationComp/fetchPopulationCompByPrefCode')
    ).default;

    // fetchPopulationCompByPrefCode関数を実行してエラーをキャッチ
    await expect(fetchPopulationCompByPrefCode({ prefCode: 1 })).rejects.toThrow(
      'API_ENDPOINT is empty'
    );
  });

  /**
   * テストケース: X_API_KEYが読み込めなかった場合
   *
   * @expect
   * X_API_KEY is empty
   */
  test('X_API_KEYが読み込めなかった場合はエラーを投げる', async () => {
    // モジュールをリセット
    jest.resetModules();

    // apiConfをモックするときにX_API_KEYを空にする
    jest.doMock('@/conf/api/apiConf', () => ({
      apiConf: {
        API_ENDPOINT: 'https://test-api.example.com',
        X_API_KEY: '',
      },
    }));

    const fetchPopulationCompByPrefCode = (
      await import('@/services/populationComp/fetchPopulationCompByPrefCode')
    ).default;

    // fetchPopulationCompByPrefCode関数を実行してエラーをキャッチ
    await expect(fetchPopulationCompByPrefCode({ prefCode: 1 })).rejects.toThrow(
      'X_API_KEY is empty'
    );
  });

  /**
   * テストケース: POPULATION_COMPが読み込めなかった場合
   *
   * @expect
   * POPULATION_COMP is empty
   */
  test('POPULATION_COMPが読み込めなかった場合はエラーを投げる', async () => {
    // モジュールをリセット
    jest.resetModules();

    // apiConfをAPI_ENDPOINTとAPI_KEYにデータを入れる
    jest.doMock('@/conf/api/apiConf', () => ({
      apiConf: {
        API_ENDPOINT: 'https://test-api.example.com',
        X_API_KEY: 'X-API-KEY',
      },
    }));

    // apiPathをモックするときにPOPULATION_COMPを空にする
    jest.doMock('@/conf/api/apiPath', () => ({
      apiPath: {
        POPULATION_COMP: '',
      },
    }));

    const fetchPopulationCompByPrefCode = (
      await import('@/services/populationComp/fetchPopulationCompByPrefCode')
    ).default;

    // fetchPopulationCompByPrefCode関数を実行してエラーをキャッチ
    await expect(fetchPopulationCompByPrefCode({ prefCode: 1 })).rejects.toThrow(
      'POPULATION_COMP is empty'
    );
  });
});
