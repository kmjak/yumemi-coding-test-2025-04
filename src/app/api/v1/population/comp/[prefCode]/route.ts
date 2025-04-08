import fetchPopulationCompByPrefCode from '@/services/api/populationComp/fetchPopulationCompByPrefCode';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @method GET
 * @path /api/v1/population/comp/[prefCode]
 * @return 都道府県の人口構成のAPIレスポンス
 * @description 都道府県番号を使ってその都道府県の人口構成を取得するAPIのレスポンスを返す
 *
 * @author @kmjak
 */

export async function GET(request: NextRequest, { params }: { params: { prefCode: string } }) {
  try {
    // URLから文字列型のprefCodeを取得(await がないとエラーになる)
    const { prefCode: prefCodeString } = await params;

    // 文字列のprefCodeを数値に変換
    const prefCode = Number(prefCodeString);
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
