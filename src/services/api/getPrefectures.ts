'server-only';

import { apiConf } from '@/conf/api/apiConf';
import { apiPath } from '@/conf/api/apiPath';
import { Prefecture } from '@/types/api/Prefecture';

/**
 * 都道府県一覧を取得する関数
 * @returns {Promise<Prefecture[] | false>} 都道府県一覧の配列またはfalse
 */
export default async function getPrefectures(): Promise<Prefecture[] | false> {
  try {
    // APIの設定を取得
    const { API_ENDPOINT, X_API_KEY } = apiConf;
    // 都道府県一覧を取得するURL
    const url: string = `${API_ENDPOINT}${apiPath.PREFECTURES}`;

    // APIの都道府県一覧を取得する
    const res = await fetch(url, {
      // メソッドはGET
      method: 'GET',
      // キャッシュはno-store
      cache: 'no-store',
      // リクエストヘッダーにContent-TypeとX-API-KEYを設定
      headers: {
        'Content-Type': 'application/json',
        // X-API-KEYは環境変数から取得
        'X-API-KEY': X_API_KEY,
      },
    });

    // レスポンスがOKでない場合はエラーを表示してfalseを返す
    if (!res.ok) {
      console.error(`Error fetching: ${res.status} ${res.statusText}`);
      return false;
    }

    // レスポンスデータからJSONを取得
    const data: Prefecture[] = await res.json();

    // データが配列でなく、もしくは空の配列の場合はエラーを表示してfalseを返す
    if (!Array.isArray(data) || data.length === 0) {
      console.error('No valid data or empty data');
      return false;
    }

    // データが取得できた場合はそのまま返す
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // エラーがError型の場合はエラーメッセージを表示
      console.error('Error fetching prefectures:', error.message);
    } else {
      // それ以外のエラーの場合は「Unknown error occurred」を表示
      console.error('Unknown error occurred');
    }
    return false;
  }
}
