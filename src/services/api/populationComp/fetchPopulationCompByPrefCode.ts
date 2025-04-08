'server-only';

import { apiConf } from '@/conf/api/apiConf';
import { apiPath } from '@/conf/api/apiPath';
import { ApiConf } from '@/types/api/conf/ApiConf';
import { PopulationCompResponse } from '@/types/api/models/populationComp/PopulationCompResponse';

/**
 * 指定した都道府県の人口構成を取得する関数
 * @param prefCode 都道府県コード
 * @returns 人口構成のデータまたはfalse
 *
 * @author @kmjak
 */

export default async function fetchPopulationCompByPrefCode({
  prefCode,
}: {
  prefCode: number;
}): Promise<PopulationCompResponse> {
  try {
    // APIの設定を取得
    const { API_ENDPOINT, X_API_KEY }: ApiConf = apiConf;

    // 人口構成を取得するURL
    const apiUrl: string = `${API_ENDPOINT}${apiPath.POPULATION_COMP}?prefCode=${prefCode}`;

    // 指定した都道府県の人口構成を取得する
    const response = await fetch(apiUrl, {
      // メソッドはGET
      method: 'GET',

      // 人口構成は基本的に変わることがないのでキャッシュを使用
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
      throw new Error(`Error fetching: ${response.status} ${response.statusText}`);
    }

    // レスポンスからjsonデータを取得
    const responseJson = await response.json();

    // responseJsonの中にresultがない場合はエラーを表示してfalseを返す
    if (!('result' in responseJson)) {
      throw new Error('No result in response');
    }

    // responseJsonの中にresultがある場合は、resultを取得
    const populationComp: PopulationCompResponse = responseJson.result;

    // responseJson.result が配列であるか確認
    if (!Array.isArray(populationComp)) {
      throw new Error('PopulationComp must be an array');
    }

    // populationCompが空の配列の場合はエラーを表示してfalseを返す
    if (populationComp.length === 0) {
      throw new Error('Empty data');
    }

    // データが取得できた場合はそのまま返す
    return populationComp;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // エラーがError型の場合はエラーメッセージを表示
      throw error;
    } else {
      // それ以外のエラーの場合は「Unknown error occurred」を表示
      throw new Error('Unknown error occurred');
    }
  }
}
