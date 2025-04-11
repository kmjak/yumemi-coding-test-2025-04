'server-only';

import { apiConf } from '@/conf/api/apiConf';
import { apiPath } from '@/conf/api/apiPath';
import { Prefecture } from '@/types/api/models/prefecture/Prefecture';

/**
 * @file fetchPrefectures.ts
 * @exports fetchPrefectures
 * @description 都道府県一覧を取得する関数
 * @return 都道府県のデータ
 *
 * @author @kmjak
 */

export default async function fetchPrefectures(): Promise<Prefecture[]> {
  try {
    // APIの設定を取得
    const { API_ENDPOINT, X_API_KEY } = apiConf;

    // API_ENDPOINTが空の場合はエラーを投げる
    if (API_ENDPOINT === '') {
      throw new Error('API_ENDPOINT is empty');
    }

    // X_API_KEYが空の場合はエラーを投げる
    if (X_API_KEY === '') {
      throw new Error('X_API_KEY is empty');
    }

    // APIのパスを取得
    const { PREFECTURES: PREFECTURES_PATH } = apiPath;

    //PREFECTURES_PATHが空の場合はエラーを投げる
    if (PREFECTURES_PATH === '') {
      throw new Error('PREFECTURES is empty');
    }

    // 都道府県一覧を取得するURL
    const apiUrl: string = `${API_ENDPOINT}${PREFECTURES_PATH}`;

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

    // レスポンスがOKでない場合はエラーを投げる
    if (!response.ok) {
      throw new Error(`Error fetching: ${response.status} ${response.statusText}`);
    }

    // レスポンスからjsonデータを取得
    const responseJson = await response.json();

    // responseJsonの中にresultがない場合はエラーを投げる
    if (!('result' in responseJson)) {
      throw new Error('No result in response');
    }

    // responseJsonの中にresultがある場合は、resultを取得
    const prefectures: Prefecture[] = responseJson.result;

    // responseJson.result が配列であるか確認
    if (!Array.isArray(prefectures)) {
      throw new Error('Prefectures must be an array');
    }

    // prefecturesが空の配列の場合はエラーを投げる
    if (prefectures.length === 0) {
      throw new Error('Empty data');
    }

    // データが取得できた場合はそのまま返す
    return prefectures;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}
