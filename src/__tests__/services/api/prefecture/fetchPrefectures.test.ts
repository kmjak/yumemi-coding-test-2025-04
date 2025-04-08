import fetchPrefectures from '@/services/api/prefecture/fetchPrefectures';
import { Prefecture } from '@/types/api/models/prefecture/Prefecture';

/**
 * テストケース: fetchPrefectures
 * 都道府県一覧を取得する関数のテスト
 *
 * @author @kmjak
 */
describe('fetchPrefectures', () => {
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
   * result : [
   *   {
   *     prefCode: 1,
   *     prefName: '北海道',
   *   }
   * ]
   */
  test('都道府県一覧を取得できる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<{ result: Prefecture[] }> => ({
        result: [
          {
            prefCode: 1,
            prefName: '北海道',
          },
        ],
      }),
    });

    // fetchPrefectures関数を実行
    const response: Prefecture[] | false = await fetchPrefectures();

    // fetchPrefectures関数の期待する戻り値と一致するか確認
    expect(response).toEqual([
      {
        prefCode: 1,
        prefName: '北海道',
      },
    ]);
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

    // fetchPrefectures関数を実行してエラーをキャッチ
    await expect(fetchPrefectures()).rejects.toThrow('Error fetching: 500 Internal Server Error');
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
      json: async (): Promise<{ message: string }> => ({ message: 'Hello, World' }),
    });

    // fetchPrefectures関数を実行してエラーをキャッチ
    await expect(fetchPrefectures()).rejects.toThrow('No result in response');
  });

  /**
   * テストケース: レスポンスデータのresultが配列でない場合
   *
   * @expect
   * Prefectures must be an array
   */
  test('レスポンスデータのresultが配列でない場合「Prefectures must be an array」とエラーを投げる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<{ result: { message: string } }> => ({
        result: { message: 'Hello, World' },
      }),
    });

    // fetchPrefectures関数を実行してエラーをキャッチ
    await expect(fetchPrefectures()).rejects.toThrow('Prefectures must be an array');
  });

  /**
   * テストケース: レスポンスデータが空の配列の場合
   *
   * @expect
   * Empty data
   */
  test('レスポンスデータが空の配列の場合「Empty data」とエラーを投げる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<{ result: Prefecture[] }> => ({ result: [] }),
    });

    // fetchPrefectures関数を実行してエラーをキャッチ
    await expect(fetchPrefectures()).rejects.toThrow('Empty data');
  });

  /**
   * テストケース: fetch中にエラーが発生した場合
   *
   * @expect
   * Network error
   */
  test('fetch中にエラーが発生した場合はエラーを投げる', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    // fetchPrefectures関数を実行してエラーをキャッチ
    await expect(fetchPrefectures()).rejects.toThrow('Network error');
  });
});
