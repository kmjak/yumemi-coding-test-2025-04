import fetchPopulationCompByPrefCode from '@/services/populationComp/fetchPopulationCompByPrefCode';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @method POST
 * @path /api/v1/population/comp/
 * @return 都道府県の人口構成のAPIレスポンス
 * @description 都道府県番号を使ってその都道府県の人口構成を取得するAPIのレスポンスを返す
 *
 * @author @kmjak
 */

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const requestBody = await request.json();

    // リクエストボディにprefCodeが含まれているか確認
    if (!('prefCode' in requestBody)) {
      return NextResponse.json(
        {
          message: 'prefCode is required',
        },
        { status: 400 }
      );
    }

    // リクエストボディからprefCodeを取得
    const prefCodeString = requestBody.prefCode;

    // prefCodeがundefinedの場合はエラーを返す
    if (prefCodeString === undefined) {
      return NextResponse.json(
        {
          message: 'prefCode is required',
        },
        { status: 400 }
      );
    }

    // 文字列のprefCodeを数値に変換
    const prefCode = Math.trunc(Number(prefCodeString));

    // NaNチェックを追加
    if (isNaN(prefCode)) {
      return NextResponse.json(
        {
          message: 'prefCode must be a valid number',
        },
        { status: 400 }
      );
    }

    // prefCodeが0以下の場合はエラーを返す
    if (prefCode <= 0) {
      return NextResponse.json(
        {
          message: 'prefCode must be greater than 0',
        },
        { status: 400 }
      );
    }

    // prefCodeが47より大きい場合はエラーを返す
    if (prefCode > 47) {
      return NextResponse.json(
        {
          message: 'prefCode must be less than or equal to 47',
        },
        { status: 400 }
      );
    }

    // fetchPopulationCompByPrefCode関数を呼び出してprefCodeに対応する都道府県の人口構成を取得
    const response = await fetchPopulationCompByPrefCode({ prefCode });

    return NextResponse.json(response);
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
