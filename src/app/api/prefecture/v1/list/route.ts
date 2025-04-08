import fetchPrefectures from '@/services/api/prefecture/fetchPrefectures';
import { Prefecture } from '@/types/api/models/prefecture/Prefecture';
import { NextResponse } from 'next/server';

/**
 * @method GET
 * @path /api/v1/prefectures
 * @returns 都道府県一覧のAPIレスポンス
 * @description 都道府県一覧を取得するAPIのレスポンスを返す
 *
 * @author @kmjak
 */

export async function GET(): Promise<NextResponse> {
  try {
    // fetchPrefectures関数を呼び出して都道府県一覧を取得
    const prefectures: Prefecture[] | false = await fetchPrefectures();

    // 都道府県一覧の取得したときにprefecturesがfalseの場合はエラーを表示
    if (prefectures === false) {
      throw new Error('都道府県一覧の取得に失敗しました。');
    }

    // 都道府県一覧を取得できた場合は、NextResponse.jsonでレスポンスを返す
    return NextResponse.json(prefectures);
  } catch (error) {
    // エラーが発生してそのエラーがErrorインスタンスの場合はエラーメッセージを表示
    if (error instanceof Error) {
      console.error(error.message);
    }

    // NextResponse.jsonでエラーレスポンスを返す
    return NextResponse.json(
      {
        message: '都道府県一覧の取得に失敗しました。',
      },
      {
        status: 500,
      }
    );
  }
}
