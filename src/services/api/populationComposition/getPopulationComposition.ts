'server-only';

import { apiConf } from '@/conf/api/apiConf';
import { apiPath } from '@/conf/api/apiPath';
import { ApiConf } from '@/types/api/ApiConf';
import { PopulationCompositionResponse } from '@/types/api/PopulationCompositionResponse';

/**
 * 指定した都道府県の人口構成を取得する関数
 * @param prefCode 都道府県コード
 * @returns 人口構成のデータまたはfalse
 */
export default async function getPopulationComposition({
  prefCode,
}: {
  prefCode: number;
}): Promise<PopulationCompositionResponse | false> {
  try {
    // APIの設定を取得
    const { API_ENDPOINT, X_API_KEY }: ApiConf = apiConf;

    // 人口構成を取得するURL
    const url: string = `${API_ENDPOINT}${apiPath.POPULATION_COMPOSITION}?prefCode=${prefCode}`;

    // 指定した都道府県の人口構成を取得する
    const res = await fetch(url, {
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
    if (!res.ok) {
      console.error(`Error fetching: ${res.status} ${res.statusText}`);
      return false;
    }

    // レスポンスからjsonデータを取得
    const jsonData = await res.json();

    // jsonDataの中にresultがない場合はエラーを表示してfalseを返す
    if (!jsonData.result) {
      console.error('No result in response');
      return false;
    }

    // jsonDataの中にresultがある場合は、resultを取得
    const data: PopulationCompositionResponse = jsonData.result;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching population composition:', error.message);
    } else {
      console.error('Unknown error occurred');
    }
    return false;
  }
}
