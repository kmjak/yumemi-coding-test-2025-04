import getPopulationCompByPrefCode from '@/usecases/api/populationComp/getPopulationCompByPrefCode';

/**
 * @file getPopulationCompByPrefCode.test.ts
 * @description getPopulationCompByPrefCode関数のテスト
 * @see src/usecases/api/populationComp/getPopulationCompByPrefCode.ts
 *
 * @author @kmjak
 */

/**
 * envConfのモック
 * HOST_URLをモックする
 * @see src/conf/env/envConf.ts
 *
 */
jest.mock('@/conf/env/envConf', () => ({
  envConf: {
    HOST_URL: 'https://host.example.com',
  },
}));

describe('getPopulationCompByPrefCode', () => {
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
   * 都道府県番号を指定して、人口構成の情報を取得できる
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
  test('都道府県番号を指定して、人口構成の情報を取得できる', async () => {
    // モックのfetchの戻り値を設定
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
      }),
    });

    // テスト対象の関数を実行
    const result = await getPopulationCompByPrefCode({ prefCode: 1 });

    // 結果の検証
    expect(result).toEqual({
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

    // fetchが1回だけ呼ばれたことを確認
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // fetchのオプションを確認
    expect(global.fetch).toHaveBeenCalledWith(
      'https://host.example.com/api/v1/population/comp',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prefCode: 1 }),
        cache: 'force-cache',
      })
    );
  });

  /**
   * テストケース: レスポンスがOKでない場合
   *
   * @expect
   * Failed to fetch population composition
   */
  test('レスポンスがOKでない場合「Failed to fetch population composition」とエラーを投げる', async () => {
    // モックのfetchの戻り値を設定
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    // テスト対象の関数を実行し、エラーをキャッチ
    await expect(getPopulationCompByPrefCode({ prefCode: 1 })).rejects.toThrow(
      'Failed to fetch population composition'
    );
  });

  /**
   * テストケース: HOST_URLが空の場合
   *
   * @expect
   * HOST_URL is not defined
   */
  test('HOST_URLが空の場合「HOST_URL is not defined」とエラーを投げる', async () => {
    // モジュールのリセット
    jest.resetModules();

    // HOST_URLを空にする
    jest.mock('@/conf/env/envConf', () => ({
      envConf: {
        HOST_URL: '',
      },
    }));

    // モックのfetchの戻り値を設定
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    const getPopulationCompByPrefCode = (
      await import('@/usecases/api/populationComp/getPopulationCompByPrefCode')
    ).default;

    // テスト対象の関数を実行し、エラーをキャッチ
    await expect(getPopulationCompByPrefCode({ prefCode: 1 })).rejects.toThrow(
      'HOST_URL is not defined'
    );
  });
});
