'server-only';

import { apiConf } from '@/conf/api/apiConf';
import { apiPath } from '@/conf/api/apiPath';
import { Prefecture } from '@/types/api/models/prefecture/Prefecture';

/**
 * 都道府県一覧を取得する関数
 * @returns {Promise<Prefecture[] | false>} 都道府県一覧の配列またはfalse
 */

export default async function fetchPrefectures(): Promise<Prefecture[] | false> {
  try {
    // APIの設定を取得
    const { API_ENDPOINT, X_API_KEY } = apiConf;

    // 都道府県一覧を取得するURL
    const apiUrl: string = `${API_ENDPOINT}${apiPath.PREFECTURES}`;

    // APIの都道府県一覧を取得する
    const response = await fetch(apiUrl, {
      // メソッドはGET
      method: 'GET',

      // 都道府県一覧は基本的に変わることがないのでキャッシュを使用
      cache: 'force-cache',

      // リクエストヘッダーにContent-TypeとX-API-KEYを設定
      headers: {
        'Content-Type': 'application/json',

        // X-API-KEYは環境変数から取得
        'X-API-KEY': X_API_KEY,
      },
    });

    // レスポンスがOKでない場合はエラーを表示してfalseを返す
    if (!response.ok) {
      console.error(`Error fetching: ${response.status} ${response.statusText}`);
      return false;
    }

    // レスポンスからjsonデータを取得
    const responseJson = await response.json();

    // responseJsonの中にresultがない場合はエラーを表示してfalseを返す
    if (!responseJson.result) {
      console.error('No result in response');
      return false;
    }

    // responseJsonの中にresultがある場合は、resultを取得
    const prefectures: Prefecture[] = responseJson.result;

    // prefecturesが配列でない、もしくは空の配列の場合はエラーを表示してfalseを返す
    if (!Array.isArray(prefectures) || prefectures.length === 0) {
      console.error('No valid data or empty data');
      return false;
    }

    // データが取得できた場合はそのまま返す
    return prefectures;
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
