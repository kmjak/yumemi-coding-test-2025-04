import { envConf } from '@/conf/env/envConf';
import { PopulationCompResponse } from '@/types/models/populationComp/PopulationCompResponse';

/**
 * @description getPopulationCompByPrefCodeの引数の型
 * @property {number} prefCode - 都道府県コード
 */
interface GetPopulationCompByPrefCodeProps {
  prefCode: number;
}

/**
 * @file getPopulationCompByPrefCode.ts
 * @exports getPopulationCompByPrefCode
 * @description 都道府県コードを指定して、人口構成の情報を取得する関数
 * @param prefCode 都道府県コード
 * @return 都道府県の人口構成情報
 *
 * @author @kmjak
 */

export default async function getPopulationCompByPrefCode({
  prefCode,
}: GetPopulationCompByPrefCodeProps): Promise<PopulationCompResponse> {
  try {
    // HOST_URLを取得
    const { HOST_URL } = envConf;

    // HOST_URLが読み込めていない場合はエラーを投げる
    if (HOST_URL === '') {
      throw new Error('HOST_URL is not defined');
    }

    // API RouterのURLを作成
    const apiRouterUrl: string = `${HOST_URL}/api/v1/population/comp`;

    // APIの都道府県コードを指定して人口構成を取得する
    const response: Response = await fetch(apiRouterUrl, {
      // メソッドはPOST
      method: 'POST',

      // ヘッダーを指定
      headers: {
        'Content-Type': 'application/json',
      },

      // リクエストボディを指定
      body: JSON.stringify({ prefCode }),

      // 都道府県コードは基本的に変わることがないのでキャッシュを使用
      cache: 'force-cache',
    });

    // レスポンスがOKでない場合はエラーを投げる
    if (!response.ok) {
      throw new Error('Failed to fetch population composition');
    }

    // レスポンスをJSON形式で取得
    const responseJson: PopulationCompResponse = await response.json();

    // レスポンスのデータを返す
    return responseJson;
  } catch (error) {
    if (error instanceof Error) {
      // エラーがErrorインスタンスの場合は、そのままエラーメッセージを返す
      throw error;
    } else {
      // エラーがErrorインスタンスでない場合は、Unknown errorを返す
      throw new Error('Unknown error');
    }
  }
}
