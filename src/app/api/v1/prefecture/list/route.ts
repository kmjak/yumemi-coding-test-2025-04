import fetchPrefectures from '@/services/prefecture/fetchPrefectures';
import { Prefecture } from '@/types/models/prefecture/Prefecture';
import { NextResponse } from 'next/server';

/**
 * @method GET
 * @path /api/v1/prefecture/list
 * @returns 都道府県一覧のAPIレスポンス
 * @description 都道府県一覧を取得するAPIのレスポンスを返す
 *
 * @author @kmjak
 */

export async function GET(): Promise<NextResponse> {
  try {
    // fetchPrefectures関数を呼び出して都道府県一覧を取得
    const prefectures: Prefecture[] = await fetchPrefectures();

    // 都道府県一覧を取得できた場合は、NextResponse.jsonでレスポンスを返す
    return NextResponse.json(prefectures);
  } catch (error) {
    // エラーがErrorインスタンスの場合は、そのままエラーメッセージを返す
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }

    // エラーがErrorインスタンスでない場合は、Unknown errorを返す
    return NextResponse.json(
      {
        message: 'Unknown error',
      },
      { status: 500 }
    );
  }
}
