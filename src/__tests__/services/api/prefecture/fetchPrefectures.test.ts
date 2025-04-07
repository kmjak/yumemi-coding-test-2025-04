import fetchPrefectures from '@/services/api/prefecture/fetchPrefectures';
import { Prefecture } from '@/types/api/models/prefecture/Prefecture';

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

  // テストケース: 正常系
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

  // テストケース: レスポンスがOKでない場合
  test('レスポンスがOKでない場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    // fetchPrefectures関数を実行
    const response: Prefecture[] | false = await fetchPrefectures();

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
    // fetchPrefectures関数を実行
    const response: Prefecture[] | false = await fetchPrefectures();
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

    // fetchPrefectures関数を実行
    const response: Prefecture[] | false = await fetchPrefectures();

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

    // fetchPrefectures関数を実行
    const response: Prefecture[] | false = await fetchPrefectures();

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });

  // テストケース: エラーが発生した場合
  test('エラーが発生した場合はfalseを返す', async (): Promise<void> => {
    // モックのfetch関数を定義
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    // fetchPrefectures関数を実行
    const response: Prefecture[] | false = await fetchPrefectures();

    // レスポンスがfalseであることを確認
    expect(response).toBe(false);
  });
});
