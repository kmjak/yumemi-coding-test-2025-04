import { Prefecture } from '@/types/api/models/prefecture/Prefecture';
import getPrefectures from '@/usecases/api/prefecture/getPrefectures';

/**
 * @file getPrefectures.test.ts
 * @description getPrefecture関数のテスト
 * @see src/usecases/api/prefecture/getPrefectures.ts
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

describe('getPrefectures', () => {
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
   * 都道府県一覧を取得できる
   *
   * @expect
   * [
   *   {
   *     prefCode: 1,
   *     prefName: '北海道',
   *   }
   * ]
   */
  test('正常: 都道府県一覧を取得できる', async () => {
    // モックのfetchを定義
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([
        {
          prefCode: 1,
          prefName: '北海道',
        },
      ]),
    });

    // getPrefectures関数を実行
    const response: Prefecture[] = await getPrefectures();

    // 結果の検証
    expect(response).toEqual([
      {
        prefCode: 1,
        prefName: '北海道',
      },
    ]);

    // fetch関数が1回呼び出されたことを確認
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // fetchのURLとオプションを確認
    expect(global.fetch).toHaveBeenCalledWith('https://host.example.com/api/v1/prefecture/list', {
      method: 'GET',
      cache: 'force-cache',
    });
  });

  /**
   * テストケース: レスポンスがOKでない場合
   *
   * @expect
   * Failed to fetch prefectures
   */
  test('レスポンスがOKでない場合「Failed to fetch prefectures」とエラーを投げる', async () => {
    // モックのfetchを定義
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    // getPrefectures関数を実行し、エラーをキャッチ
    await expect(getPrefectures()).rejects.toThrow('Failed to fetch prefectures');

    // fetch関数が1回呼び出されたことを確認
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  /**
   * テストケース: HOST_URLが空
   *
   * @expect
   * HOST_URL is not defined
   */
  test('HOST_URLが空の場合「HOST_URL is not defined」とエラーを投げる', async () => {
    // モジュールをリセット
    jest.resetModules();

    // HOST_URLを空にする
    jest.mock('@/conf/env/envConf', () => ({
      envConf: {
        HOST_URL: '',
      },
    }));

    const getPrefectures = (await import('@/usecases/api/prefecture/getPrefectures')).default;

    // getPrefectures関数を実行し、エラーをキャッチ
    await expect(getPrefectures()).rejects.toThrow('HOST_URL is not defined');
  });
});
