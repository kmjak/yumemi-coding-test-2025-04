import { envConf } from '@/conf/env/envConf';
import { Prefecture } from '@/types/models/prefecture/Prefecture';

/**
 * @file getPrefectures.ts
 * @exports getPrefectures
 * @description 都道府県の情報を取得する関数
 * @return 都道府県一覧
 *
 * @author @kmjak
 */

export default async function getPrefectures(): Promise<Prefecture[]> {
  try {
    // HOST_URLを取得
    const { HOST_URL } = envConf;

    // HOST_URLが読み込めていない場合はエラーを投げる
    if (HOST_URL === '') {
      throw new Error('HOST_URL is not defined');
    }

    // API RouterのURLを作成
    const apiRouterUrl: string = `${HOST_URL}/api/v1/prefecture/list`;

    // APIの都道府県一覧を取得する
    const response = await fetch(apiRouterUrl, {
      // メソッドはGET
      method: 'GET',

      // 都道府県一覧は基本的に変わることがないのでキャッシュを使用
      cache: 'force-cache',
    });

    // レスポンスがOKでない場合はエラーを投げる
    if (!response.ok) {
      throw new Error('Failed to fetch prefectures');
    }

    // レスポンスをJSON形式で取得
    const responseJson: Prefecture[] = await response.json();

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
