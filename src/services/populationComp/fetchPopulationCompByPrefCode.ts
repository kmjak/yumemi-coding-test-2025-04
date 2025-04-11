'server-only';

import { apiConf } from '@/conf/api/apiConf';
import { apiPath } from '@/conf/api/apiPath';
import { ApiConf } from '@/types/conf/api/ApiConf';
import { PopulationCompResponse } from '@/types/models/populationComp/PopulationCompResponse';

/**
 * @file fetchPopulationCompByPrefCode.ts
 * @exports fetchPopulationCompByPrefCode
 * @description 指定した都道府県の人口構成を取得する関数
 * @param prefCode 都道府県コード
 * @return 人口構成のデータ
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

    // API_ENDPOINTが空の場合はエラーを投げる
    if (API_ENDPOINT === '') {
      throw new Error('API_ENDPOINT is empty');
    }

    // X_API_KEYが空の場合はエラーを投げる
    if (X_API_KEY === '') {
      throw new Error('X_API_KEY is empty');
    }

    // APIのパスを取得
    const { POPULATION_COMP: POPULATION_COMP_PATH } = apiPath;

    // POPULATION_COMP_PATHが空の場合はエラーを投げる
    if (POPULATION_COMP_PATH === '') {
      throw new Error('POPULATION_COMP is empty');
    }

    // 人口構成を取得するURL
    const apiUrl: string = `${API_ENDPOINT}${POPULATION_COMP_PATH}?prefCode=${prefCode}`;

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

    // レスポンスがOKでない場合は「Error Fetching: ...」とエラーを投げる
    if (!response.ok) {
      throw new Error(`Error fetching: ${response.status} ${response.statusText}`);
    }

    // レスポンスからjsonデータを取得
    const responseJson = await response.json();

    // responseJsonの中にresultがない場合「No result in response」とエラーを投げる
    if (!('result' in responseJson)) {
      throw new Error('No result in response');
    }

    // responseJsonの中にresultがある場合は、resultを取得
    const populationComp: PopulationCompResponse = responseJson.result;

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
